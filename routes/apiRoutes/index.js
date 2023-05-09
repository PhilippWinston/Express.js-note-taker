const app = require('express').Router();
const { updateNote, removeNote, getNotes, readAndAppend} = require('../../lib/note'); 
// const { notes } = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');
let notes = {}
getNotes('./db/db.json',(data) =>{
  notes = data
})

app.get('/notes', (req, res) => {
  getNotes('./db/db.json', (data) => {
    res.json(data)
  })
  
});

app.post('/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };
  notes.push(newNote);
  readAndAppend(newNote, './db/db.json');
  res.json(newNote);
});

app.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  removeNote(noteId, "./db/db.json");
  res.sendStatus(200);
});


app.put("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const updatedNote = req.body;

  updateNote(noteId, updatedNote, "./db/db.json")
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to update the note." });
    });
});
module.exports = app;