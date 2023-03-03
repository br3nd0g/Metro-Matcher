const coloursArea = document.getElementById("colours")
const linesArea = document.getElementById("linesInfo")

jsonString = linesFromFlask;
const linesObj = JSON.parse(jsonString)
console.log(linesObj)

for(let line of linesObj){
    let colourHtml = `<div style="background-color: ${line.colour}"></div>`

    coloursArea.insertAdjacentHTML('afterbegin', colourHtml)

    let lineHtml = `<div class="metroLine">
        <h4 class="metroName">${line.name}</h4>
        <div class="actualLine" style="background-color: ${line.colour}">`

    for(let stop in line.stops){

        let stopHtml = `<div style="background: linear-gradient(to bottom right, red, blue);" class="lineStop"></div>`

        lineHtml += stopHtml


    }
        
    lineHtml += '</div></div>'

    linesArea.insertAdjacentHTML('beforeend', lineHtml)
}