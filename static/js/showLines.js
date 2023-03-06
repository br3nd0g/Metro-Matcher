const coloursArea = document.getElementById("colours")
const linesArea = document.getElementById("linesInfo")

jsonString = linesFromFlask;
const linesObj = JSON.parse(jsonString)

for(let line of linesObj){
    let colourHtml = `<div style="background-color: ${line.colour}"></div>`

    coloursArea.insertAdjacentHTML('afterbegin', colourHtml)

    let stopHtml;

    let lineHtml = `<div class="metroLine">
        <h4 class="metroName">${line.name}</h4>
        <div class="actualLine" style="background-color: ${line.colour}">`

    for(let i = 0; i < line.stops.length; i++){

        if(line.stops[i].length === 1){
            stopHtml = `<div style="background-color: ${line.stops[i][0]};" class="lineStop"></div>`
        }
        else{

            let percentage = 100/line.stops[i].length

            let gradientStatement = ""
            let gradientProgress = 0

            for(let c = 0; c < line.stops[i].length; c++){
                gradientStatement += `, ${line.stops[i][c]} ${gradientProgress}%`
                gradientProgress += percentage
                gradientStatement += `, ${line.stops[i][c]} ${gradientProgress}%`
            }

            stopHtml = `<div style="background: linear-gradient(to bottom right${gradientStatement});" class="lineStop"></div>`
        }

        lineHtml += stopHtml

    }
        
    lineHtml += '</div></div>'

    linesArea.insertAdjacentHTML('beforeend', lineHtml)
}