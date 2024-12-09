var fs = require('fs')
var express = require('express')
var {table, getBorderCharacters} = require('table')
var port = process.env.PORT || 3000
var app = express()
app.use(express.static(__dirname))
app.use(express.json())
var scoresFile = require(__dirname + "/scores.json")



//index.html
app.get("/", function(req, res, next) {
    console.log("Request received")
    res.status(200).sendFile(__dirname + "/index.html")
})

//flappybird page
app.get("/flappybird", function(req, res, next) {
    res.status(200).sendFile(__dirname + "/flappyBird/flappyBird.html")
})
//snake page
app.get("/snake", function(req, res, next) {
    res.status(200).sendFile(__dirname + "/snake/snake.html")
})
//leaderboard page
app.get("/leaderboard", function(req, res, next) {
    res.status(200).sendFile(__dirname + "/leaderboard/leaderboard.html")
})
//get leaderboard table
app.get("/leaderboard/:gameId", function(req, res, next){
    var gameId = req.params.gameId
    var scoreData = scoresFile[gameId]
    if(scoreData && scoreData.scores){
        const data = [['#', 'Name', 'Score'], ...scoreData.scores.map((score, index) => [index + 1, score.name, score.score])];
        


        res.status(200).json(table(data, {
            border: getBorderCharacters(`norc`)
        }
        ))
    } else {
        res.status(404).send("Game not found")
    }
})


//submit score to leaderboard
app.post("/leaderboard/:gameId/addScore", function(req, res, next) {
    console.log("addScore request received")
    console.log(req.body)
    var gameId = req.params.gameId
    var scoreData = scoresFile[gameId].scores
    
    if(req.body.name != null && req.body.score != null
        && typeof req.body.name === "string" && typeof req.body.score === "number"
    ){
        if(scoreData){
            scoreData.push({
                name: req.body.name,
                score: req.body.score
            })
            //sort scores
            scoreData.sort((a, b) => b.score - a.score)
            fs.writeFile(
                __dirname + "/scores.json",
                JSON.stringify(scoresFile, null, 2),
                function(err, result){
                    if(!err){
                        res.status(200).send("Score added successfully")
                    } else {
                        res.status(500).send("Server error. Try again")
                    }
                }
            )
        } else {
            next()
        }
    } else {
        res.status(400).send("Incomplete request body or invalid data types")
    }

})

//page not found
app.get("*", function(req, res, next) {
    res.status(404).sendFile(__dirname + "/404.html")
})

app.listen(port, function(err){
    if(err) {
        throw err
    } else {
        console.log("Server listening on port " + port)
    }
})