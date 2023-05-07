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

module.exports = { readFromFile, writeToFile, readAndAppend };
