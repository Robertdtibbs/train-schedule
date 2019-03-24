$(document).ready(function(){
 
 var config = {
    apiKey: "AIzaSyCmu0qffMdcNKkuRMrJ2NegSsFzNjuxsJk",
    authDomain: "train-28e83.firebaseapp.com",
    databaseURL: "https://train-28e83.firebaseio.com",
    projectId: "train-28e83",
    storageBucket: "train-28e83.appspot.com",
    messagingSenderId: "1070609242529"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trName = $("#train-name-input").val().trim();
    var trDest = $("#dest-input").val().trim();
    var trStart = $("#start-input").val().trim();
    var trFrequency = $("#frequency-input").val().trim();

    console.log(trName);
    console.log(trDest);
    console.log(trStart);
    console.log(trFrequency);
  
    // Creates local "temporary" object for holding employee data
    var newTr = {
      name: trName,
      dest: trDest,
      start: trStart,
      frequency: trFrequency,
    };
  
    // Uploads employee data to the database
    database.ref().push(newTr);
  
    // Logs everything to console
    console.log(newTr.name);
    console.log(newTr.dest);
    console.log(newTr.start);
    console.log(newTr.frequency);

  
    // Clear Text-box
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  //firebase snapshot - pulling data from server.
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Variable for firebase data
    var trName = childSnapshot.val().name;
    var trDest = childSnapshot.val().dest;
    var trStart = childSnapshot.val().start;
    var trFrequency = childSnapshot.val().frequency;
  
    // Check if data is pulling
    console.log(trName);
    console.log(trDest);
    console.log(trStart);
    console.log(trFrequency);
  
    // Create time based data that updates in real time.
    
    var firstTimeConverted = moment(trStart, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trFrequency;
    var tMinutesTillTrain = trFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var trainTime = moment().format(nextTrain, 'hh:mm a')
    console.log(nextTrain);
    // var arTime = moment().format(nextTrain, "LT");

  
    // Dynamically greating new rows
    var newRow = $("<tr>").append(
      $("<td>").text(trName),
      $("<td>").text(trDest),
      $("<td>").text(trFrequency),
      $("<td>").text(trainTime),
      $("<td>").text(tMinutesTillTrain),
    );
  
    $("#train-table > tbody").append(newRow);
  });
});