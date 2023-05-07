const app = require('express').Router();
const { createNewNote, updateDb } = require('../../lib/note');
const { notes } = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend } = require('../../lib/note');

app.get('/notes', (req, res) => {
  res.json(notes);
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
  updateDb(noteId, notes);
  res.sendStatus(200);
});

module.exports = app;