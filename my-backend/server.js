//server
const express = require('express');
//database options
const sqlite3 = require('sqlite3').verbose();
//middleware that parses the body of incoming HTTP requests.
const bodyParser = require('body-parser');
//middleware that enables CORS(Cross-Origin Resource Sharing).
const cors = require('cors');

// for hashing password(more securety)
const bcrypt = require('bcrypt');
//the number of random characters that hash add into password(if it is bigher, more security but slow app)
const saltRounds = 10;

const app = express();
//enable CORS for your Express app.
app.use(cors());
//this middleware request bodies in JSON format and makes them accessible via req.body.
app.use(bodyParser.json());

//set up the sql connection
const db = new sqlite3.Database('./App_Database.db', (err) => {
    if (err){
        return console.log('connecting faild!');
    }
    console.log('connected to the database.')
});

//create user table if it doesn't exist
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)');

//REgistration route
// .post(path: , handlers:(request, response)) => {express}
app.post('/register', (req, res) => {
    //{username, password} are rquests to server
    const {username,password} = req.body;

    // insert the hashed password into the database
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password!')
        };
        
        //checking that username was not peaked before
        const query0 = 'SELECT * FROM users WHERE username = ?';
        const check = db.get(query0, [username], async (err, user) => {
            if (err){
                console.log('Error during user lookup:', err.message);
                return res.status(500).send('Error quering database');
            }
            
            if (!user){
                return true;
            }else {
                return false;
            }
        });
        //insert data into database
        const query = 'INSERT INTO users (username,password) VALUES (?,?)';

        db.run(query, [username,hashedPassword], (err, result) => {
            if (err){
                return res.status(500).send('Error saving user to database');
            }
            res.send('user registered successfully');
        });
    });
});

// login route
app.post('/login', (req,res) => {
    const {username,password} = req.body;

    //check to exist user
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], async (err, user) => {
        if (err){
            console.log('Error during user lookup:', err.message);
            return res.status(500).send('Error quering database');
        }
        console.log(user);
        if (!user){
            return res.status(400).send('User not found');
        }
        
        

        //user founded so now should check the password
        //const user = results[0];
        const storedHashedPassword = user.password;
        try {
            const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
            if (passwordMatch) {
                return res.send('Logged in successfully');
            }else {
                return res.status(400).send('Invalid credentials');
            }
        }catch (error) {
            return res.status(500).send('Error during password verification');
        }
    });
});

//Gracefully close the database on server shutdown
process.on('SIGINT', () => {
    console.log('Database closed.');
    db.close((err) => {
        if (err){
            console.error('closing faild!:', err.message);
        }
        //exit the process when the database closed
        process.exit(0);
    });
});
//start the server
app.listen(5000, () => {
    console.log('server is running on port 5000');
});