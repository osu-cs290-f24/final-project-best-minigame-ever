var fs = require('fs')
var express = require('express')
var port = process.env.PORT || 3000
var app = express()
app.use(express.static(__dirname))


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

//submit score to leaderboard
app.post("/leaderboard/:gameId/addScore", function(req, res, next) {
    console.log("addScore request received")
    
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