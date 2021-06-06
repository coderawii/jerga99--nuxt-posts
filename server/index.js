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
const fs = require("fs");
const path = require("path");

const filePath = "../store/initial_data.json";
const initialData = require(filePath);

app.use(express.json());

//************ REQUESTS
app.get("/posts", function(req, res) {
  return res.json({ posts: "Just some testing data" });
  // res.status(200).json({ message: "I work" });
});

app.post("/posts", function(req, res) {
  const post = req.body;
  // initialData.push(post); // post koji primamo iz rikvesta pushujemo u initial_data.json. //! PUSH ne radi ovde direktno nad initialData, zasto? Jer on f-nise sa nizovima, a initialData je OBJEKAT, msm json smo napravili kao objekat jelte. Dakle dodajemo posts tj initialData.posts.push(post)
  initialData.posts.push(post);

  fs.writeFile(
    path.join(__dirname, filePath), // absolute path to initial_data.json/
    JSON.stringify(initialData, null, 2), //! ovo initialData ovde je difoltno OBJEKAT, a ne mozem objekat da sacuvamo u fajl, vec nam treba string. za to koristimo JSON.stringify(). ovo JSON.stringify(initialData, null, 2)) tj ovo 2 znaci da ce json biti indented za dva spejsa
    function(err) {
      if (err) return res.status(422).send(err);

      console.log("Sending data to client");
      return res.json("File Successfully updated");
    }
  );

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