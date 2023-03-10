// gets the metro selected by the user from the dropdown and then gets the current url
// with this info, then redirects to the game page with the selected metro in the URL query
function redirectToGame(){

    let url = window.location.href
    metro = document.getElementById("metroSelect").value
    window.location.href = `${url}game?city=${metro}`;
}