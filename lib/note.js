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
      const filteredData = parsedData.filter((note) => note.id !== id);
      writeToFile(file, filteredData)
        .then(() => {
          console.log("Note deleted.");
        })
        .catch((err) => {
          console.error(err);
        });
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
        const updatedData = parsedData.map((note) => {
          if (note.id === id) {
            return { ...note, ...updatedNote };
          }
          return note;
        });
        writeToFile(file, updatedData);
        resolve();
      }
    });
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, removeNote, updateNote };