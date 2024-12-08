var flappyBirdLeaderboard = document.querySelectorAll("#flappyBird-scores-container")[0]
var snakeLeaderboard = document.querySelectorAll("#snake-scores-container")[0]

async function getLeaderboard(gameId){
    var response = await fetch("/leaderboard/" + gameId)
    var data = await response.json()
    if(response.ok){
        return data
    } else {
        throw new Error(data)
    }
}

//load flappybird leaderboard into flappyBirdLeaderboard container
getLeaderboard("flappyBird").then(data => {
    var pre = document.createElement("pre")
    pre.textContent = data
    flappyBirdLeaderboard.appendChild(pre)
}).catch(err => {
    var pre = document.createElement("pre")
    pre.textContent = "Error loading leaderboard"
    flappyBirdLeaderboard.appendChild(pre)
    console.log(err)
})

//load snake leaderboard into snakeLeaderboard container
getLeaderboard("snake").then(data => {
    var pre = document.createElement("pre")
    pre.textContent = data
    snakeLeaderboard.appendChild(pre)
}).catch(err => {
    var pre = document.createElement("pre")
    pre.textContent = "Error loading leaderboard"
    snakeLeaderboard.appendChild(pre)
    console.log(err)
})