const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => {
  const filePath = `${destination}`;
  fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info(`\nData written to ${filePath}`);
    }
  });
};

const readAndAppend = (content, file) => {
  const filePath = `${file}`;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.notes.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const removeNote = (id, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const filteredData = parsedData.notes.filter((note) => note.id !== id);
      console.log(filteredData);
      writeToFile(file, { notes: filteredData });
    }
  });
};

const getNotes = (file, callback) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      callback(parsedData.notes);
    }
  });
};

const updateNote = (id, updatedNote, file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const parsedData = JSON.parse(data);
        const updatedData = parsedData.notes.map((note) => {
          if (note.id === id) {
            return { ...note, ...updatedNote };
          }
          return note;
        });
        writeToFile(file, { notes: updatedData });
        resolve();
      }
    });
  });
};

module.exports = {
  readFromFile,
  writeToFile,
  readAndAppend,
  removeNote,
  updateNote,
  getNotes,
};
