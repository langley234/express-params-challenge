const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const students  = require('./students.json')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

   
app.get('/', (req, res) => {
   res.send(students);
})

app.get('/students/:studentId', (req, res) => {
    /* GET a user by their id */
    console.log(req.params);
    if (req.params.studentId !== undefined)
    {
        let matchFound = false;
        for (let i = 0; i < students.length; i++)
        {
            if (students[i].id === parseInt(req.params.studentId)){
                res.send(students[i]);
                matchFound = true;
            }
        }
        if (!matchFound) {
            res.send("Could Not Find Student with that ID");
        }
    } else {
        res.send('received get request with id');
    }   
    
})

app.get('/grades/:studentId', (req, res) => {
    /* GET a user by their id */
    console.log(req.params);
    if (req.params.studentId !== undefined)
    {
        let matchFound = false;
        for (let i = 0; i < students.length; i++)
        {
            if (students[i].id === parseInt(req.params.studentId)){
                res.send(students[i].grades);
                matchFound = true;
            }
        }
        if (!matchFound) {
            res.send("Could Not Find Student with that ID");
        }
    } else {
        res.send('received get request with id');
    }   
    
})

app.post('/grades/', (req, res) => {
    let grades = JSON.parse(req.body.grades);
    let id = req.body.id;

    if (grades !== undefined && Array.isArray(grades) && id !== undefined) {
        let matchFound = false;
        let index = 0;
        for (index ; index < students.length && !matchFound; index++)
        {
            if (students[index].id === parseInt(id)){
                students[index].grades = students[index].grades.concat(grades);
                matchFound = true;
            }
        }
        if (!matchFound){
            res.send(`No Student Could be found with the ID provided`);
        } else {
            res.send(`Post submitted : ${students[index-1].grades}`);
        }

    } else {
        res.send(`Could not post grades with invalid grade data provided`)
    }
})

app.post('/register', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;

    if (username !== undefined && email !== undefined){
        res.send(`Valid register data received, adding user...but not really, cuz' I didn't code it.`)
    } else {
        res.send(`Could not register, must provide both username and email`)
    }
})

const port = 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))