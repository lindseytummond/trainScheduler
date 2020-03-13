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
  var trainStart = moment($("#trainStart-input").val().trim(), "HH:mm").format("HH:mm");
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

 // 3. Create Firebase event for adding train schedule to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot) {
   console.log(childSnapshot.val());

   // Store everything into a variable.
   var trainName = childSnapshot.val().trainName;
   var destination = childSnapshot.val().destination;
   var trainStart = childSnapshot.val().trainStart;
   var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(trainStart);
  console.log(frequency);

  //Changes the original moment by subtracting time.
  firstTrainTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");

  var currentTime = moment();
  
  //To get the difference in minutes
  var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    
  //Getting the division remainder
  var tRemainder = diffTime % frequency;
  var minAway = frequency - tRemainder;
  
  var nextTrain = moment().add(minAway, "minutes");
  var nextArrival = moment(nextTrain).format("HH:mm");
  
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minAway),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
 });
