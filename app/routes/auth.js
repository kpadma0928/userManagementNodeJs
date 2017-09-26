var passport = require('passport');
var bCrypt = require('bcrypt-nodejs');
var config = require('../../config.js');
var jwt = require('jsonwebtoken');
var requireAuth =  passport.authenticate('jwt', { session: false });
module.exports = function(app, user, user_role){
    var User = user;
    var UserRole = user_role
    console.log("AAAAAAAAAAAAAAA")
    console.log(user)
    app.post('/login', function(req, res){
        var email = req.body.email;
        var password = req.body.password;
        var isValidPassword = function(userPwd, password){
            return bCrypt.compareSync(password, userPwd)
        }
        User.findOne({where: {email: email}}).then(function(user){
            
            if(!user){
                res.json({message: "Email not found"})
            }
            
            if(user){
                if(!isValidPassword(user.password, password)){
                res.json({message: "Wrong password"})
            }
                var payload = {id: user.id}
                const token = jwt.sign(payload, config.jwtSecret, {
              expiresIn: 10080 
            });
            res.status(200).json({ success: true, token: 'JWT ' + token });

            }
        })
    })
    app.post('/users', function(req, res){
        var User = user
        var generateHash = function(password){
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            console.log(req.body)
            User.findOne({where: {email: req.body.email}}).then(function(user){
                if(user){
                    res.send({message: "User already created"})
                } else {
                    var encryptedPwd = generateHash(req.body.password)
                    var userData = {
                        email:  req.body.email,
                        password: encryptedPwd,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        phone_number: req.body.phone_number
                    }
                    User.create(userData).then(function(newUser, err){
                        if(!newUser){
                            res.send("User not created")
                        } else {
                            res.send(newUser);
                        }
                    })
                }

            })
    })
console.log(user)
    app.get('/user',requireAuth, function(req, res){
        res.json(req.user)
    })
    app.get('/users', function(req,res){
        User.findAll().then(function(users, err){
            res.send(users);
        }); 
    })

    app.get('/users/:id', function(req, res){
        User.findOne({where: {id: req.params.id}}).then(function(user, err){
            res.send(user)
        })
    })

    app.put('/users/:id/edit', function(req, res){
        User.findOne({where: {id: req.params.id}}).then(function(user, err){
            if(user){
                user.update(req.body).then(function(user, err){
                if(err)
                    res.send(err)
                res.send(user)  
                })
            }
        })                         
    })

    app.delete('/users/:id', function(req, res){
        User.destroy({where: {id: req.params.id}}).then(function(user, err){
            if(err){
                res.sendStatus(401)
            } 
            res.send("User deleted sucessfully")
        })        
    })


}


