function redirectToGame(){
    metro = document.getElementById("metroSelect").value
    window.location.href = `http://192.168.1.94:81/game?city=${metro}`;
}