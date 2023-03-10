//gets the nameInput node and stores it
const nameInput = document.getElementById("uNameInput")
let image;

//gets the url and adds /score-calculation to the end of it, so that we have the url for the post request
let url = (window.location.href).substring(7)
url = url.substring(0, url.indexOf("/"))
let requestUrl = url + "/score-calculation"


//gets user solution image, then their name. if no name, alerts to fill in a name. It then does a POST request
async function submit() {
    
  //converts canvas to an image URI in base64 encoding
  let image = document.getElementById("gameCanvas").toDataURL("image/png", 0.9);

  let uName = nameInput.value
  if(uName.length < 1){
    alert("Please enter a name")
    return
  }
  
  const userScore = POSTdata(uName, image)
}
  
//takes user's name and solution and posts it to the /score-calculation endpoint, receiving the score back, and passing it to the finishgame() function
function POSTdata(userName, solutionImage){
  fetch("http://" + requestUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    metroName: metroName,
    userName: userName,
    solution: solutionImage
  }),
  })
  .then((response) => response.json())
  .then((data) => {
    finishGame(data.score)
  })
  .catch((error) => {
    console.error("Error:", error);
    return error
  });
}

//takes the users score and makes div with score appear, with a button to return home
function finishGame(score){

  const popUp = `
  <div id="final">
    <div id="result">
        <h2>You Scored:</h2>
        <h3>${score}%!</h3>
        <button onclick="goHome()">Home</button>
    </div>
  </div>`
  document.body.insertAdjacentHTML('afterbegin', popUp)
}

//function that redirects user to the home page
function goHome(){
  window.location.href = `http://${url}`;
}