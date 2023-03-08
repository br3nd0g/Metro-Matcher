const nameInput = document.getElementById("uNameInput")
let image;

let url = (window.location.href).substring(7)
url = url.substring(0, url.indexOf("/"))
let requestUrl = url + "/score-calculation"



async function submit() {
    
  let image = document.getElementById("gameCanvas").toDataURL("image/png", 0.9);

  let uName = nameInput.value
  if(uName.length < 1){
    alert("Please enter a name")
    return
  }
  
  const userScore = POSTdata(uName, image)
}
  
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

function goHome(){
  window.location.href = `http://${url}`;
}