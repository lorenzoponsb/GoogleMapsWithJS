/**
 * Created by Lorenzo on 27/02/2016.
 */
$(document).ready(function () {

    // Reference of current object
    var base = this;

    // Display default map
    base.map = new google.maps.Map($("#myMap").get(0), {
        zoom: 11,
        center: {lat: 39.94, lng: 4.07},
        disableDefaultUI: true
    });

    // jQuery object for full screen icon
    var $full = $('#fullScreenIcon');

    // Depends if the slider is show or not use one glyphicon or other
    if ($('#sidebar-wrapper').css('width') == "0px") {
        $full.addClass('glyphicon-resize-small');
    } else {
        $full.addClass('glyphicon-resize-full');
    }

    // On click full screen button change de glyphicon and refresh map
    $("#fullScreen").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        $full.toggleClass('glyphicon-resize-small');
        $full.toggleClass('glyphicon-resize-full');
        setTimeout(function () {
            google.maps.event.trigger(base.map, 'resize')
        }, 500);
    });

    // Call to displayer map
    $("#btnShow").click(function () {
        showRoutes();
    });

    // Get all data of route and display route in the map
    function showRoutes() {

        new google.maps.DirectionsService().route({

            origin: $('#iFrom').val(),
            destination: $('#iTo').val(),
            travelMode: $('#goRadios [name="transport"]:checked').val()

        }, function (response, status) {

            if (status === "OK") {
                new google.maps.DirectionsRenderer({
                    directions: response,
                    map: base.map = new google.maps.Map($("#myMap").get(0), {disableDefaultUI: true})
                });
                displayData(response);
            } else {
                setError();
            }
        });
    }

    // Display data on Information:
    function displayData(response) {

        var goBy = {
            DRIVING: "Driving",
            BICYCLING: "Bicycling",
            WALKING: "Walking"
        };

        // Insert data on Go by:
        $('#iGoBy').text(goBy[response.request.travelMode]);

        // Insert data on Time:
        $('#iTime').text(response.routes[0].legs[0].duration.text);

        // Insert data on Distance:
        $('#iDistance').text(response.routes[0].legs[0].distance.text);

        // Insert data on Road name:
        $('#iRoad').text(response.routes[0].summary);

        // Show displayer
        $('#displayer').css("display", "block");
    }

    // Display error
    function setError(){

        // Set error on input Origin:
        $('#iFrom').change(function(){
            $(this).parent().removeClass("has-error");
        }).parent().addClass("has-error").val("");

        // Set error on Destination
        $('#iTo').change(function(){
            $(this).parent().removeClass("has-error");
        }).parent().addClass("has-error").val("");

    }
});

