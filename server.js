const express = require("express");
const apiRoutes = require("./routes/apiRoutes/index");
const htmlRoutes = require("./routes/htmlRoutes/index");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 👾`)
);
