const express = require('express');
const bodyparses = require('body-parser');

const app = express();
var items = ['Mop','Exercise','Jhadu','Breakfast'];
let workitems = [];
app.set('view engine', 'ejs');

app.use(bodyparses.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  var date = new Date();
  let options = {
    weekday : "long",
    day: "numeric",
    month : "long",
  }
  let day = date.toLocaleDateString("hi-IN",options)
  res.render('list', {Dayofweek: day , Todo: items});

})

app.post("/", function(req, res){
  console.log(req.body);
  if ( req.body.submit === "Work"){
  workitems.push(req.body.next);
  res.redirect('/work');
}
else{
  items.push(req.body.next );
  res.redirect("/");
}})

app.get("/work", function(req, res){
  res.render("list",{Dayofweek:"Work List",Todo:workitems});
})

app.get("/about", function(req, res){
  res.render("about");
})


app.listen(3000, function(){
  console.log("Listening on port number 3000");
})
