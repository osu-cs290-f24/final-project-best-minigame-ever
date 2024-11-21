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
    console.log("Request received")
    res.status(200).sendFile(__dirname + "/flappyBird/flappyBird.html")
})
//snake page
app.get("/snake", function(req, res, next) {
    console.log("Request received")
    res.status(200).sendFile(__dirname + "/snake/snake.html")
})
//leaderboard page
app.get("/leaderboard", function(req, res, next) {
    console.log("Request received")
    res.status(200).sendFile(__dirname + "/leaderboard/leaderboard.html")
})


//page not found, fallback
app.get("*", function(req, res, next) {
    res.status(404).send("404 Not Found (this is a placeholder for a real 404 html page)")
})

app.listen(port, function(err){
    if(err) {
        throw err
    } else {
        console.log("Server listening on port " + port)
    }
})