let image;

function submit() {
    
    html2canvas(document.getElementById("pizzaContainer"), {
      allowTaint: true,
      useCORS: true,
    })
      .then(function(canvas) {
        image = canvas.toDataURL("image/png", 0.9);
      })
      .catch((e) => { console.log(e);
});}
  