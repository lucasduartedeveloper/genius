// Heroku build time
// var heroku_releaseId = "";
var heroku_version = "[BUILDING]";
var heroku_outputStreamUrl = "";
var heroku_buildStatus = "";
var heroku_buildLogs = "";

$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader("Authorization",
        "Bearer a75752e9-e348-45e9-924a-06e71730c9b6");
        request.setRequestHeader("Accept",
        "application/vnd.heroku+json; version=3");
        request.setRequestHeader("Range",
        "started_at; order=desc,max=1;");
    },
    dataType: "json",
    url: "https://api.heroku.com/apps/ragnarok-online/builds"
})
.done(function(data) {
    //Heroku release id
    //heroku_releaseId =data[0].release.id;
    heroku_buildStatus = data[0].status;
    heroku_outputStreamUrl = 
    data[0].output_stream_url;
 
    var xhr = new XMLHttpRequest();
    xhr.open("GET", heroku_outputStreamUrl, true);
    xhr.onprogress = function () {
        //console.clear();
        //log("heroku-api : build logs", xhr.responseText);
        heroku_buildLogs = xhr.responseText;
        var n = xhr.responseText.indexOf("Released");

        if (n > -1) {
             heroku_version =
             xhr.responseText.substring(n +9, n+14); 
             if (heroku_buildStatus == "pending") {
                 heroku_version += "*";
                 setTimeout(() => {
                     location.reload();
                 }, 20000);
             }
         }
        $("#heroku-version").text(heroku_version);
    }
    xhr.send();
});
// Get build state
// If newer version available
// Update all clients