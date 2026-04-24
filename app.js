const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const accounts = [];

app.get("/", (req, res) => {
  res.render("index", { accounts });
});

app.post("/add", (req, res) => {
  accounts.push({
    name: req.body.name,
    amount: req.body.amount
  });
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  accounts.splice(req.params.id, 1);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const account = accounts[req.params.id];
  res.render("edit", { account, id: req.params.id });
});

app.post("/edit/:id", (req, res) => {
  accounts[req.params.id] = {
    name: req.body.name,
    amount: req.body.amount,
  };
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});