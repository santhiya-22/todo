const express=require('express')
const app=express()
const port=3000

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Db config

const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo"
});



app.post('/addtodo',(req,res)=>{

    const title = req.body.title
    const description = req.body.description

    const sql = `INSERT INTO todo(title, description) VALUES ('${title}','${description}')`;

    con.query(sql, function (err, result) {
        if (err){
            console.log(err)
            return res.send({status:false})
        } else{
            console.log("1 record inserted");
            return res.send({status:true})
        }

    })
})

app.get('/gettodolist',(req,res)=>{

    const sql = `SELECT * FROM todo`;

    con.query(sql, function (err, result) {
        if (err){
            console.log(err)
            return res.send({status:false})
        } else{
            return res.send({status:true,todolist:result})
        }

    })
})

app.post('/updatetodo',(req,res)=>{

    const id = req.body.id
    const completed = req.body.completed

    const sql = `UPDATE todo SET completed = '${completed}' WHERE id = '${id}'`;

    con.query(sql, function (err, result) {
        if (err){
            console.log(err)
            return res.send({status:false})
        } else{
            console.log("updated");
            return res.send({status:true})
        }

    })
})


app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})