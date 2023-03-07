let image;

let url = (window.location.href).substring(7)
url = url.substring(0, url.indexOf("/")) + "/score-calculation"

function screenshot(){
  html2canvas(document.getElementById("pizzaContainer"), {
    allowTaint: true,
    useCORS: true,
  })
  .then(function(canvas) {
    image = canvas.toDataURL("image/png", 0.9);
    return image
  })
  .catch((e) => { 
    console.log(e);
    return e
});}

function getUsername(){

}

function submit() {
    
  let image = screenshot()  
  let uName = getUsername()
  POSTdata(uName, image)
}
  
function POSTdata(userName, solutionImage){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      metroName: metroName,
      userName: userName,
      solution: solutionImage
  }));
}