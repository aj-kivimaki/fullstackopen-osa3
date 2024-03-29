const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

let persons = [
  { id: 1, name: "Arto Hellas", number: "0123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-67843" },
  { id: 3, name: "Dan Abramov", number: "12-43-578543" },
  { id: 4, name: "Mary Poppendick", number: "39-23-23478" },
];

const generateID = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :body"));
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

app.get("/info", (req, res) => {
  res.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date().toString()}</p>
    </div>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;

  if (!name || !number)
    return res.status(400).json({
      message: "number or name missing",
    });

  const duplicatePerson = persons.find((person) => person.name === name);

  if (duplicatePerson)
    return res.status(400).json({ error: "name must be unique" });

  const person = {
    name,
    number,
    id: generateID(),
  };

  persons = persons.concat(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
