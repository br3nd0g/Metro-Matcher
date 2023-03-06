window.addEventListener("load",()=>{
    const canvas = document.getElementById("gameCanvas")
    const ctx = canvas.getContext("2d");
  
  
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
  
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#ffffff";
    ctx.lineCap = "round";
    
    let painting = false;

    function getMousePos(e) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
    }

    function getMousePos(e) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
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
  
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw)
    
  });