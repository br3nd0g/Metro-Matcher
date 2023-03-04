let jsonString = leaderFromFlask;
const leaderObj = JSON.parse(jsonString)
console.log(leaderObj)

const leaderSelect = document.getElementById("leadMetroSelect")
let currentLeaderboard = "singapore";

const tbody = document.getElementById("leaderTable")

for(let i = 0;i < leaderObj[currentLeaderboard].length;i++){

    let htmlToInsert = `
    <tr>
        <td>${leaderObj[currentLeaderboard][i].name}</td>
        <td>${leaderObj[currentLeaderboard][i].score}</td>
    </tr>`

    tbody.insertAdjacentHTML('beforeend', htmlToInsert)
}

leaderSelect.addEventListener('change', () => {

	currentLeaderboard = leaderSelect.value;

    tbody.innerHTML = ''

    for(let i = 0;i < leaderObj[currentLeaderboard].length;i++){

        let htmlToInsert = `
        <tr>
            <td>${leaderObj[currentLeaderboard][i].name}</td>
            <td>${leaderObj[currentLeaderboard][i].score}</td>
        </tr>`
    
        tbody.insertAdjacentHTML('beforeend', htmlToInsert)
    }

}, false);