//selects the html canvas and its 2D context
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d");
//selects the colourSelectors and the eraser nodes
const colourSelectors = document.querySelectorAll('.colourSelector');
const eraserIcon = document.getElementById("eraser")
//sets the first colour selector as the 'activeColourSelector'
let activeColourSelector = document.getElementById("colours").firstChild
//changes its border to show it is selected
activeColourSelector.style.border = "2px solid var(--highlightclr)";

//sets the emulated witdh and height to the nodes height and with 
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

//sets the lineWidth to 15, the colour to the active colour, and makes the drawn lines round
ctx.lineWidth = 15;
ctx.strokeStyle = activeColourSelector.style.backgroundColor
ctx.lineCap = "round";

//drawing begin and end of one of the metro's lines
function drawPoint(x,y){
    ctx.beginPath()
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
}

//using percentages returns the relative x and y pixels on the canvas
function getRelativeCoord(percentage, widOrHei){
    return ((canvas[widOrHei] / 100) * percentage)
}

//using the above functions draws the start and end points of one of the metro's lines
drawPoint(getRelativeCoord(lineEnds[metroName][0][0], "width"), getRelativeCoord(lineEnds[metroName][0][1], "height"))
drawPoint(getRelativeCoord(lineEnds[metroName][1][0], "width"), getRelativeCoord(lineEnds[metroName][1][1], "height"))

//sets the linewidth to 10 and declares the painting and erasing variables
let painting = false;
let erasing = false;
ctx.lineWidth = 10;


//function that returns the x and y of the user's mouse position, and subtracts the canvas's distance from the top and left as the canvas treats the top left of it as (0,0), although the cursor's position is relative to the entire window, so must be made relative to the canvas
function getMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

//changes the current colour being used when a colour selector is clicked, as well as changing the colour selector's border to make it apparent it is selected
function changeColour(clickedColour){
    if(erasing===true){
        disableErasing()
    }
    activeColourSelector.style.border = "2px solid #000000"
    activeColourSelector = clickedColour
    ctx.strokeStyle = activeColourSelector.style.backgroundColor;
    activeColourSelector.style.border = "2px solid var(--highlightclr)"
}

//starts the drawing on mouse down
function startPosition(e){
    painting = true;
    draw(e)
}

//finishes the drawing on mouse up
function finishedPosition(){
    painting = false
    ctx.beginPath();
}

//called when the mouse is moved, and draws at the cursor if painting is true
function draw(e){
    if(!painting) return

    ctx.lineTo(getMousePos(e).x, getMousePos(e).y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(getMousePos(e).x, getMousePos(e).y);
}

//changes the canvas context's drawing mode to essentially erasing, and changes the line width to 18
function enableErasing(){
    erasing = true
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = 18
    colourSelectors.forEach(el => el.style.border = "2px solid #000000");
    eraserIcon.style.filter = "drop-shadow(0 0 2px var(--highlightclr))"
}

//changes the canvas context's drawing mode back to actually drawing, as well as the line width back to 10
function disableErasing(){
    erasing = false
    ctx.lineWidth = 10
    ctx.globalCompositeOperation = "source-over";
    eraserIcon.style.filter = ""
}

//adds listeners for different mouse events
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw)
colourSelectors.forEach(el => el.addEventListener('click', event => {
    changeColour(event.target)
}));