const express = require("express");
const app = express();

app.use(express.static("build"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
