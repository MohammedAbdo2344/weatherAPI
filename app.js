const express = require("express");
const https = require("https");
const bodyparser = require("body-parser")

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("CSS"))

//send file html from server 
app.get("/", function (req, res,) {
    res.sendFile(__dirname + "/index.html");
})
app.get("/result", function (req, res) {
    res.sendFile(__dirname + "/result.html");
})


// API 
app.post("/result", function (req, res) {

    const cityName = req.body.cityName;
    const url = "https://api.weatherapi.com/v1/current.json?key=f6e87b7a2e3b4299a25143258232302&q=" + cityName + "&aqi=yes";

    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data) // Get data from API
            const locationName = weatherData.location.name;
            const tempC = weatherData.current.temp_c;
            const conditionText = weatherData.current.condition.text;
            const wind_mph= weatherData.current.wind_mph;
            const conditionIcon=weatherData.current.condition.icon;
            const wind_degree=weatherData.current.wind_degree;
            const wind_dir=weatherData.current.wind_dir;

            res.write('<!doctype html> <html lang="en" class="h-100"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta name="description" content=""> <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors"> <meta name="generator" content="Hugo 0.108.0"> <title>Weather</title> <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/cover/"> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" /> <meta name="theme-color" content="#712cf9"> <style> .bd-placeholder-img { font-size: 1.125rem; text-anchor: middle; -webkit-user-select: none; -moz-user-select: none; user-select: none; } @media (min-width: 768px) { .bd-placeholder-img-lg { font-size: 3.5rem; } } .b-example-divider { height: 3rem; background-color: rgba(0, 0, 0, .1); border: solid rgba(0, 0, 0, .15); border-width: 1px 0; box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15); } .b-example-vr { flex-shrink: 0; width: 1.5rem; height: 100vh; } .bi { vertical-align: -.125em; fill: currentColor; } .nav-scroller { position: relative; z-index: 2; height: 2.75rem; overflow-y: hidden; } .nav-scroller .nav { display: flex; flex-wrap: nowrap; padding-bottom: 1rem; margin-top: -1px; overflow-x: auto; text-align: center; white-space: nowrap; -webkit-overflow-scrolling: touch; } </style>  <link href="/style.css" rel="stylesheet"> </head> <body class="d-flex h-100 text-center text-bg-dark"> <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"> <header class="mb-auto"> <div> <h3 class="float-md-start mb-0">Weather API</h3> <nav class="nav nav-masthead justify-content-center float-md-end"> <form action="/home" method="post"> <a class="nav-link fw-bold py-1 px-0 active" type="submit" aria-current="page" href="/home">Home</a> </form> </nav> </div> </header> <main class="px-3"> <div class="row row-lg-4"></div> <div class="row"> <div class="co-lg-6"> <div class="card" style="background-color: #333;"> <div class="w-50 h-50 d-flex justify-content-center"></div> <div class="card-body"> <h1 class="card-title">'+conditionText+'</h1> <p class="lead" style="font-size: 80px;">'+tempC+'°C</p> <div class="row d-flex justify-content-center"> <div class="col-lg-4 " style="font-size: 25px;"> <i class="fa-solid fa-wind" style="size: 25px;"></i>'+' '+wind_mph +'</div> <div class="col-lg-4" style="font-size: 25px;"> <i class="fa-solid fa-diamond-turn-right" style="size: 25px;"></i>'+" "+ wind_dir +'</div> </div> </div> </div> </div> </div> </main> <footer class="mt-auto text-white-50"> <p>© Mohammed Hassan</p> </footer> </div> </body> </html>')
            res.send()

        })

    })


})

app.get("/home",function(req,res){
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server is running in 3000")
})