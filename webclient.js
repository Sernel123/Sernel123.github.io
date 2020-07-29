$(document).ready(function () {
    $('#connect-button').click(function (e) {
        e.preventDefault();
        var connect = $("#broker_input").val();
        client = mqtt.connect(connect);
        // client.subscribe($("#topic").val());
        client.on("message", function (topic, payload) {
            var row = $("<tr>");
            $("<td>").text(topic).appendTo($(row));
            $("<td>").text(payload).appendTo($(row));
            $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
            $("#tbl-body").append($(row));
        })
        console.log('Connecting..');
        $("#display_status").text("Connecting");
        $("#display_status").removeClass("alert-secondary");
        $("#display_status").addClass("alert-warning");
        client.on("connect", function () {
            $("#display_status").text("Successfully connected");
            $("#display_status").removeClass("alert-warning");
            $("#display_status").addClass("alert alert-success");
            console.log("Successfully Connected.");
        });
    })

    //For Publish 
    $('#pub-button').click(function(){
        var topic = $('#topic-input').val();
        var payload = $('#payload-input').val();
        if (topic == "" && payload == ""){
            alert("Should have the inputs");
        } else {
            if (topic == "" || payload == ""){
                alert("Error");
            } else {
                var row = $("<tr>");
                $("<td>").text(topic).appendTo($(row));
                $("<td>").text(payload).appendTo($(row));
                $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row));
                $("#tbl-body-pub").append($(row));
                console.log("Publish { Topic: " + $("#topic").val() + "," + " Payload: " + $("#payload").val() + "}");
                console.log("Succesfully Published")
            }
        }
    })
})