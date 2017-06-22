$(document).ready(function() {

    var date_input=$('input[name="run-date"]'); //our date input has the name "add-run-date"
    date_input.datepicker({
        format: 'mm/dd/yyyy',
        orientation: "auto",
        todayHighlight: true,
        autoclose: true,
    });

    $(".delete-run-button").click(function(event) {
        var id_to_delete = event.target.id;

        $.ajax({
            type: 'POST',
            url: '../ajax/delete-run.php',
            data: {delete_id: id_to_delete},
            success: function(response) {
                console.log(response);
                window.location.reload(true);
            }
        });
    });

});


function userWeather(zipcode) {
    //$(".zipcode").html(zipcode);
    //console.log(zipcode);

    var ajax_url = "http://api.wunderground.com/api/1327244ae3ca9b7d/conditions/q/" + zipcode + ".json";

    $.ajax( {
        url: ajax_url,
        dataType: "json",
        success: function(response) {
            //console.log(response);
            var weather_output = "<p>Local Weather in " + response.current_observation.display_location.city + "</p>";
            weather_output += "<p><img src='http://icons.wxug.com/i/c/k/rain.gif' class='weather_icon'>" + response.current_observation.temp_f + "&deg;";
            weather_output += "<img src='../images/wundergroundLogo_4c_horz.png' class='weather_logo'></p>";


            $(".weather-info").html(weather_output);
        }
    });
}