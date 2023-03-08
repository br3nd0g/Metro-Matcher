const nameInput = document.getElementById("uNameInput")
let image;

let requestUrl = (window.location.href).substring(7)
requestUrl = requestUrl.substring(0, requestUrl.indexOf("/")) + "/score-calculation"



function submit() {
    
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
    console.log("Success:", data);
    return data
  })
  .catch((error) => {
    console.error("Error:", error);
    return error
  });
}