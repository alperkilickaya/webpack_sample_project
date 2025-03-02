const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

// Serve static files from the dist directory
app.use("/static", express.static(path.resolve(__dirname, "../dist")));

// Serve the patato-image.html file
app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "../dist/patato-image.html");
  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) {
      res.status(500).send("Error reading patato-image.html");
    } else {
      res.send(html);
    }
  });
});

app.listen(9002, () => {
  console.log("Server is running on port 9002");
});
