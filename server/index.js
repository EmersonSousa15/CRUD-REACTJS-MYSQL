const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crudgames"
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const { name }  = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    const { image } = req.body;

    let SQL = "INSERT INTO games (name, cost, category, image) VALUES (?, ?, ?, ?)";

    db.query(SQL, [name, cost, category, image], (err, result) => {
        console.log(err);
    })
})

app.get("/getCards", (req, res) => {
    let SQL = "SELECT * FROM games";

    db.query(SQL, (err, result) => {
        (err) ? console.log(err) : res.send(result);
    })
})

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name }  = req.body;
    const { image } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    
    let SQL = "UPDATE games SET name = ?, cost = ?, category = ?, image = ? WHERE idGame = ? ";

    db.query(SQL, [name, cost, category, image, id], (err, result) => {
        (err) ? console.log(err) : res.send(result);
    })
})

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    let SQL = "DELETE FROM games WHERE idGame = ?";

    db.query(SQL, [id], (err, result) => {
        (err) ? console.log(err) : res.send(result);
    })
})

app.listen(3001, () => {
    console.log("Rodando");
})