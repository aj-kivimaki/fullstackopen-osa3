const express = require("express");

let persons = [
  { id: 1, name: "Arto Hellas", number: "0123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-67843" },
  { id: 3, name: "Dan Abramov", number: "12-43-578543" },
  { id: 4, name: "Mary Poppendick", number: "39-23-23478" },
];

const PORT = 3001;

const app = express();

app.use(express.json());

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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
