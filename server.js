const express = require("express");
const PORT = 3001;

const data = [
  { id: 1, name: "Arto Hellas", number: "0123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-67843" },
  { id: 3, name: "Dan Abramov", number: "12-43-578543" },
  { id: 4, name: "Mary Poppendick", number: "39-23-23478" },
];

const app = express();

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.send(data);
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
