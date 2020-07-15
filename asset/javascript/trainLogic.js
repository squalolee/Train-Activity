var firebaseConfig = {
    apiKey: "AIzaSyBXNXp4lldKHNSk5CtxATvLb1-T04IreXI",
    authDomain: "test-project-01-b27ab.firebaseapp.com",
    databaseURL: "https://test-project-01-b27ab.firebaseio.com",
    projectId: "test-project-01-b27ab",
    storageBucket: "test-project-01-b27ab.appspot.com",
    messagingSenderId: "312489434875",
    appId: "1:312489434875:web:87691ea15434eafa7d1a5e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var trainData = firebase.database();

  $("#addTrainBtn").on("click",function(event){
    event.preventDefault();
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      console.log(trainName);

      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      }

      trainData.ref().push(newTrain);

      alert("Train Added!");

      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frequencyInput").val("");

      return false;
  })

  trainData.ref().on("child_added", function(snapshot) {

    var sv = snapshot.val();
      

      var trainName = sv.name;
      var destination = sv.destination;
      var frequency = sv.frequency;
      var firstTrain = sv.firstTrain;

      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes,"m").format("hh:mm A");



      console.log(remainder);
      console.log(minutes);
      console.log(arrival);
      console.log(sv.name);

    $("#tbody").append("<tr><td>"+trainName+"</td><td>"+destination+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  })