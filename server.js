var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var jwt = require('jsonwebtoken');
var app = express();
var morgan = require("morgan");
var bcrypt = require("bcrypt");
var methodOverride = require('method-override');
app.set('secret', "basdlkfjasfa");
// // Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: true}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));

var db = require("./models");

app.get('/',(req,res) => {res.render('index'); // form that adds admin to db.

});

app.post('/Accounts', (req,res) =>{
	var saltRounds = 10;
		bcrypt.genSalt(saltRounds, (err,salt)=> {
			bcrypt.hash(req.body.password, salt, (err,hash)=> {
				db.Account
		      .create({Username: req.body.username, Password: hash, Email: req.body.email})
		        .then((response)=>{

              setTimeout(function() {
                res.redirect('/makeprofile'), 2000
              });
			     });
	     });
   });
});


app.get('/users', (req,res)=>{
  db.Account
    .findAll({})
      .then((response)=> {
        res.render("Accounts",{Account: response});
       });
});

app.get("/makeprofile", (req,res)=> {
  res.render('makeprofile');
});

app.post("/profiles", (req,res)=> {
  db.Profile
    .create({Bio: req.body.bio, Work: req.body.work, Hobbies: req.body.hobbies,
      Religious_Beliefs: req.body.religiousbeliefs, Languages: req.body.languages})
      .then((Profile)=> {
        setTimeout(()=> res.redirect("profiles"), 2000)
      });
});

app.get('/profiles', (req,res)=>{
  db.Profile
    .findAll({})
     .then((Profile)=>{
       res.render('profiles', {Profile})
     });
 });

app.get('/', (req,res)=> {
 res.send("Add Shifts or Edit Shifts");
}
);



 // secRoutes.use((req,res,next) => {
 // 	var token = req.body.token || req.query.token || req.params.token || req.header['x-access-token'];
 // 	 if (token ) {
 // 	 	jwt.verify(token, app.get('secret'), function(err,decoded) {
 // 	 		if (err) {
 // 	 			return res.json({ success: false, message: 'Failed to authenticate token.'})
 // 	 		}
 // 	 		else {
 // 	 			req.decoded = decoded;
 // 	 			next();
 // 	 		}
 // 	 	});
 // 	 }
 // 	 else {
 // 	 	return res.status(403).send({
 // 	 		success: false,
 // 	 		message: "No token provided.",
 // 	 		reqheader: req.header['x-access-token'],
 // 	 	});
 // 	 	}
 // 	 });

// app.use("/secure", secRoutes);

db.sequelize.sync({force: false }).then(function() {
	app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
});
