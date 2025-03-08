const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

// Serve static files from the dist directory
app.use("/", express.static(path.resolve(__dirname, "../dist")));

// Serve the hello-world.html file
app.get("/", (req, res) => {
  const filePath = path.resolve(__dirname, "../dist/image-caption.html");
  fs.readFile(filePath, "utf8", (err, html) => {
    if (err) {
      res.status(500).send("Error reading index.html");
    } else {
      res.send(html);
    }
  });
});

app.listen(9003, () => {
  console.log("Server is running on port 9003");
});
