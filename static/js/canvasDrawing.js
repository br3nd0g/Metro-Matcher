const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d");
const colourSelectors = document.querySelectorAll('.colourSelector');
const eraserIcon = document.getElementById("eraser")
let activeColourSelector = document.getElementById("colours").firstChild
activeColourSelector.style.border = "2px solid var(--highlightclr)";


canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

ctx.lineWidth = 15;
ctx.strokeStyle = activeColourSelector.style.backgroundColor
ctx.lineCap = "round";

//drawing begin and end of a line

function drawPoint(x,y){
    ctx.beginPath()
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
}

function getRelativeCoord(percentage, widOrHei){

    return ((canvas[widOrHei] / 100) * percentage)
}

drawPoint(getRelativeCoord(lineEnds[metroName][0][0], "width"), getRelativeCoord(lineEnds[metroName][0][1], "height"))
drawPoint(getRelativeCoord(lineEnds[metroName][1][0], "width"), getRelativeCoord(lineEnds[metroName][1][1], "height"))

let painting = false;
ctx.lineWidth = 10;

function getMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function changeColour(clickedColour){
    if(erasing===true){
        disableErasing()
    }
    activeColourSelector.style.border = "2px solid #000000"
    activeColourSelector = clickedColour
    ctx.strokeStyle = activeColourSelector.style.backgroundColor;
    activeColourSelector.style.border = "2px solid var(--highlightclr)"
}

function startPosition(e){
    painting = true;
    draw(e)
}

function finishedPosition(){
    painting = false
    ctx.beginPath();
}

function draw(e){
    if(!painting) return

    ctx.lineTo(getMousePos(e).x, getMousePos(e).y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(getMousePos(e).x, getMousePos(e).y);
}

let erasing = false;

function enableErasing(){
    erasing = true
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = 18
    colourSelectors.forEach(el => el.style.border = "2px solid #000000");
    eraserIcon.style.filter = "drop-shadow(0 0 2px var(--highlightclr))"
}

function disableErasing(){
    erasing = false
    ctx.lineWidth = 10
    ctx.globalCompositeOperation = "source-over";
    eraserIcon.style.filter = ""
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw)
colourSelectors.forEach(el => el.addEventListener('click', event => {
    changeColour(event.target)
}));