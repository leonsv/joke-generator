import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var categories = ["Any", "Misc", "Programming", "Dark", "Pun", "Spooky", "Christmas"]

app.get("/",  async(req, res) => {  
      
    try {
        var response= await axios.get(API_URL+"Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");
        const result = response.data;
        res.render("index.ejs", {
            jokeobj : result});
      } catch (error) {
        res.render("index.ejs", {
            jokeobj : result});
      }
});

app.post("/", async(req, res) => {

    if(req.body["choice"]){
        try {
            var response= await axios.get(API_URL+req.body["choice"]);
            const result = response.data;
            res.render("index.ejs", {
                jokeobj : result});
          } catch (error) {
            res.render("index.ejs", {
                jokeobj : result});
          }
    }
    else{
       
        try {
            var response= await axios.get(API_URL+"Any?contains="+req.body["filterword"]);
            const result = response.data;
            res.render("index.ejs", {
                jokeobj : result});
          } catch (error) {
            res.render("index.ejs", {
                jokeobj : result});
          }
    }


});

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
}); 