// const express = require("express");
// const consola = require("consola");
// const { Nuxt, Builder } = require("nuxt");
// const app = express();

// // Import and Set Nuxt.js options
// const config = require("../nuxt.config.js");
// config.dev = !(process.env.NODE_ENV === "production");

// async function start() {
//   // Init Nuxt.js
//   const nuxt = new Nuxt(config);

//   const { host, port } = nuxt.options.server;

//   // Build only in dev mode
//   if (config.dev) {
//     const builder = new Builder(nuxt);
//     await builder.build();
//   } else {
//     await nuxt.ready();
//   }

//   app.get("/api/posts", function(req, res) {
//     return res.json({ posts: "Just some testing data" });
//   });

//   app.post("/api/posts", function(req, res) {
//     return res.json({ posts: "Data has been saved!" });
//   });

//   app.patch("/api/posts/:id", function(req, res) {
//     return res.json({ posts: "Data has been updated!" });
//   });

//   app.delete("/api/posts/:slug", function(req, res) {
//     return res.json({ posts: "Data has been deleted!" });
//   });

//   // Give nuxt middleware to express
//   app.use(nuxt.render);

//   // Listen the server
//   app.listen(port, host);
//   consola.ready({
//     message: `Server listening on http://${host}:${port}`,
//     badge: true
//   });
// }
// start();

const consola = require("consola");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/posts", function(req, res) {
  return res.json({ posts: "Just some testing data" });
  // res.status(200).json({ message: "I work" });
});

app.post("/posts", function(req, res) {
  const data = req.body;
  console.log(data);
  data.addedData = "Updated Data";

  return res.json({ ...data, name: "Filip", status: "user has been updated" });
});

app.patch("/posts/:id", function(req, res) {
  const id = req.params.id; // req.params.id, a ovo id je jer smo gore u url stavili :id
  console.log("Param is: ", id);
  return res.json({ posts: "Data has been updated!" });
});

app.delete("/posts/:slug", function(req, res) {
  const slug = req.params.slug; // req.params.slug, a ovo slug je jer smo gore u url stavili :slug
  console.log("Param is: ", slug);
  return res.json({ posts: "Data has been deleted!" });
});

module.exports = {
  path: "/api",
  handler: app
};
