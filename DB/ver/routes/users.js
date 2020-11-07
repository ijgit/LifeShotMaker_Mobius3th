// routes/users.js

const crypto = require("crypto");

router.post("/sign_up", function(req,res,next){
    let body = req.body;

    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    models.user.create({
        name: body.userName,
        email: body.userEmail,
        password: hashPassword,
        salt: salt
    })
    .then( result => {
        res.redirect("/users/sign_up");
    })
    .catch( err => {
        console.log(err)
  })
})