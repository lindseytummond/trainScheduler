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
  
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // 2. Button for adding Train Schedules
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var addTrain = {
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
    };
  
    // Uploads train data to the database
    database.ref().push(addTrain);
  
    // Logs everything to console
    console.log(addTrain.trainName);
    console.log(addTrain.destination);
    console.log(addTrain.firstTrainTime);
    console.log(addTrain.frequency);
  
    alert("train schedule successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#frequency-input").val("");
  });

  