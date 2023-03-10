let jsonString = leaderFromFlask;
const leaderObj = JSON.parse(jsonString)
//gets the json from flask, and parses it a JavaScript object


//stores the dropdown to select the leaderboard and sets the currentLeaderboard to Singapore
//also selects the table to be able to clear it later
const leaderSelect = document.getElementById("leadMetroSelect")
let currentLeaderboard = "singapore";
const tbody = document.getElementById("leaderTable")

//adds the data of each leaderboard log as HTML inside the table, using the insertAdjacentHTML function
function fillLeaderboard(currentLeaderboard){

    for(let i = 0;i < leaderObj[currentLeaderboard].length;i++){

        let htmlToInsert = `
        <tr>
            <td>${leaderObj[currentLeaderboard][i].name}</td>
            <td>${leaderObj[currentLeaderboard][i].score}</td>
        </tr>`
    
        tbody.insertAdjacentHTML('beforeend', htmlToInsert)
    }
}

fillLeaderboard(currentLeaderboard)

//listener for dropdown changing, when it does, gets the selected metro and wipes the table, filling it with the new info
leaderSelect.addEventListener('change', () => {

	currentLeaderboard = leaderSelect.value;

    tbody.innerHTML = ''

    fillLeaderboard(currentLeaderboard)

}, false);