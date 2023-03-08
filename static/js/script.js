function redirectToGame(){

    let url = window.location.href
    metro = document.getElementById("metroSelect").value
    window.location.href = `${url}game?city=${metro}`;
}