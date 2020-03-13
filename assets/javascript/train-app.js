// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBfywuA8PQl7wwAdl0bZUnEXfsk2gQl3V8",
  authDomain: "trainscheduler-ae8a5.firebaseapp.com",
  databaseURL: "https://trainscheduler-ae8a5.firebaseio.com",
  projectId: "trainscheduler-ae8a5",
  storageBucket: "trainscheduler-ae8a5.appspot.com",
  messagingSenderId: "245073313272",
  appId: "1:245073313272:web:80d6b45eac8d9db5a5ea0d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button to Add Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainStart = moment($("#trainStart-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    trainStart: trainStart,
    frequency: frequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.trainStart);
  console.log(newTrain.frequency);

  alert("Train Schedule successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#trainStart-input").val("");
  $("#frequency-input").val("");
});

// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot) {
//   console.log(childSnapshot.val());

//   // Store everything into a variable.
//   var empName = childSnapshot.val().name;
//   var empRole = childSnapshot.val().role;
//   var empStart = childSnapshot.val().start;
//   var empRate = childSnapshot.val().rate;

//   // Employee Info
//   console.log(empName);
//   console.log(empRole);
//   console.log(empStart);
//   console.log(empRate);

//   // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

//   // Create the new row
//   var newRow = $("<tr>").append(
//     $("<td>").text(empName),
//     $("<td>").text(empRole),
//     $("<td>").text(empStartPretty),
//     $("<td>").text(empMonths),
//     $("<td>").text(empRate),
//     $("<td>").text(empBilled)
//   );

//   // Append the new row to the table
//   $("#employee-table > tbody").append(newRow);
// });

// // Example Time Math
// // -----------------------------------------------------------------------------
// // Assume Employee start date of January 1, 2015
// // Assume current date is March 1, 2016

// // We know that this is 15 months.
// // Now we will create code in moment.js to confirm that any attempt we use meets this test case
