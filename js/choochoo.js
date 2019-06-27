const firebaseConfig = {
    apiKey: "AIzaSyDmYya9Ohm1z1wapmh4r2bZi3tZJqHBwGk",
    authDomain: "rockpaperscissors-28c3c.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-28c3c.firebaseio.com",
    projectId: "rockpaperscissors-28c3c",
    storageBucket: "rockpaperscissors-28c3c.appspot.com",
    messagingSenderId: "728505213222",
    appId: "1:728505213222:web:08702a8a204a5b02"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

$('#choo-choo').on('click', function(){
    const trains = {
        route: $('#route').val().trim(),
        depart: $('#departure').val().trim(),
        dest: $('#destination').val().trim(),
        time: $('#time').val().trim(),
        hZ: $('#frequency').val().trim()
    }

    database.ref().push(trains);
})

database.ref().on('child_added', function(childSnapshot){
    const route = childSnapshot.val().route;
    const depart = childSnapshot.val().depart;
    const dest = childSnapshot.val().dest;
    const time = childSnapshot.val().time;
    const hZ = childSnapshot.val().hZ;
    let firstTrain = moment(time, 'HH:mm').subtract(1, 'years');
    let timeDif = moment().diff(moment(firstTrain), 'minutes');
    let remain = timeDif % hZ;
    let trainArv = hZ - remain;
    let nextTrain = moment().add(trainArv, 'minutes')

    console.log(firstTrain)
    console.log(timeDif)
    console.log(trainArv)
    const row = $('<tr>').append(
        $('<td>').text(route),
        $('<td>').text(depart),
        $('<td>').text(dest),
        $('<td>').text(hZ),
        $('<td>').text(moment(nextTrain).format('ddd' + ' HH:mm')),
        $('<td>').text(trainArv)
    );

    $('table > tbody').append(row)
}, function(errorObject){
    console.log('Error: ' + errorObject)
})