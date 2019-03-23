
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
    var trDestination = $("#destination-input").val().trim();
    var trStart = $("#start-input").val().trim();
    var trFrequency = $("#frequency-input").val().trim();

    console.log(trName);
    console.log(trDestination);
    console.log(trStart);
    console.log(trFrequency);
  
    // Creates local "temporary" object for holding employee data
    var newTr = {
      name: trName,
      destination: trDestination,
      start: trStart,
      frequency: trFrequency,
    };
  
    // Uploads employee data to the database
    database.ref().push(newTr);
  
    // Logs everything to console
    console.log(newTr.name);
    console.log(newTr.destination);
    console.log(newTr.start);
    console.log(newTr.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().role;
    var trStart = childSnapshot.val().start;
    var trFrequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trName);
    console.log(trDestination);
    console.log(trStart);
    console.log(trFrequency);
  
    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trName),
      $("<td>").text(trDestination),
      $("<td>").text(trStart),
      $("<td>").text(""),
      $("<td>").text(trFrequency),
      $("<td>").text("")
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  