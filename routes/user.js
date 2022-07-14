
const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
router.get('/',(req,res)=> {
    res.send("hello")
});

router.post('/signup', (req, res, next) => {             //signup API
    let user = req.body;
    query = "select email,password,role,status from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name,contactNumber,email,password,status,role) value(?,?,?,?,'false','user')";
                connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "successfully Registered" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "email already exist" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })

})

router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email,password,role,status from user where email=?";
    if (!err) {
        if (results.length <= 0 || results[0].password != user.password) {
            return res.status(401).json({ message: "incorrect username or password" });
        }
        else if (results[0].status === 'false') {
            return res.status(401).json({ message: "wait for admin approval" });
        }
        else if (results[0].password == user.password) {
            const response = { email: results[0].email, role: results[0].role }
            const accesstoken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
            res.status(200).json({ token: accesstoken });
        }
        else {
            return res.status(400).json({ message: "somethings wrong .please try again" });    //JWT TOKEN
        }
    }
    else {
        return res.status(500).json(err);
    }
})


module.exports = router;