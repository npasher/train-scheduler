$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyCKydCfuiJkyNh-eb3VixxjJSjnkYccOmQ",
    authDomain: "train-scheduler-5896f.firebaseapp.com",
    databaseURL: "https://train-scheduler-5896f.firebaseio.com",
    projectId: "train-scheduler-5896f",
    storageBucket: "train-scheduler-5896f.appspot.com",
    messagingSenderId: "484178492119"
    };

    firebase.initializeApp(config);
    var database=firebase.database();
  
    $("body").on("click","#submit-id",function(event) {
      event.preventDefault(); //Prevent Page Reload//
    // User Inputs//
      var trainName=$("#train").val().trim();
      var destId=$("#destination").val().trim();
      var intialTrain=$("#initialTrain").val().trim();
      var freqId=$("#frequency").val().trim();
    // Math Go Here//
      var firstTimeConverted=moment(intialTrain,"hh:mm A").subtract(10,"years");
      var timeRemainder=moment().diff(moment(firstTimeConverted),"minutes") % freqId;
      var minutesAway=freqId-timeRemainder;
      var nextTrain=moment().add(minutesAway,"minutes").format("hh:mm A");
      database.ref().push(
    {
      TrainName:trainName,
      Destination:destId,
      IntialTrain:intialTrain,
      Frequency:freqId,
      Arrival:nextTrain,
      MinutesAway:minutesAway,
    });
      database.ref().on("child_added",function(childSnapshot) {
        var fireTrainName=childSnapshot.val().TrainName;
        var Firedest=childSnapshot.val().Destination;
        var fireArrival=childSnapshot.val().Arrival;
        var fireFreq=childSnapshot.val().Frequency;
        // Table Data//
        $(".table").append("<tr><td> " + childSnapshot.val().TrainName +
          " </td><td> " + childSnapshot.val().Destination +
          " </td><td> " + childSnapshot.val().Frequency +
          " </td><td> " + childSnapshot.val().Arrival + "</td><td> " + childSnapshot.val().MinutesAway + "</td></tr>");
      });
    $( "#train").val("");
    $( "#destination").val("");
    $( "#initialTrain").val("");
    $( "#frequency").val("");
    });
});