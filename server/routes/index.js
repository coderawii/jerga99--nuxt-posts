const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const filePath = "../../store/initial_data.json";
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
      return res.json({ message: "File Successfully Updated" });
    }
  );

  return res.json({ ...data, name: "Filip", status: "user has been updated" });
});

app.patch("/posts/:id", function(req, res) {
  const id = req.params.id; // req.params.id, a ovo id je jer smo gore u url stavili :id
  const post = req.body;
  const index = initialData.posts.findIndex(p => p._id === post._id);

  if (index != -1) {
    initialData.posts[index] = post;
    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      function(err) {
        if (err) return res.status(422).send(err);

        return res.json({ message: "File Successfully Updated" });
      }
    );
  } else {
    return res.status(422).send({ error: "Post cannot be updated" });
  }
});

app.delete("/posts/:id", function(req, res) {
  const id = req.params.id;
  const index = initialData.posts.findIndex(p => p._id === id);

  if (index !== -1) {
    initialData.posts.splice(index, 1);

    console.log("Deleting post with index of: " + index);

    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      function(err) {
        if (err) return res.status(422).send(err);

        return res.json({ message: "File Successfully Updated" });
      }
    );
  } else {
    return res.status(422).send({ error: "Post cannot be updated" });
  }
});

module.exports = {
  path: "/api",
  handler: app
};
