const express = require("express");
const app = express();

app.use(express.static("build"));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
