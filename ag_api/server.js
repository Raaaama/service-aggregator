const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

var ip = require("ip");
console.dir ( ip.address() );

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

require("./app/routes/category.routes.js")(app);
require("./app/routes/subcategory.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/servicetype.routes")(app);
require("./app/routes/provider.routes")(app);
require("./app/routes/image.routes")(app);
require("./app/routes/option.routes")(app);
require("./app/routes/timetable.routes")(app);
require("./app/routes/enrollment.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/optiontype.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});