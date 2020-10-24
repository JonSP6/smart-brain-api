const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "a1de17f91e1940039ba6063fec5b66f4",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};

//FOR ANKI QUESTION BEFORE AND AFTER
//Smart Brain API back end image.js
// const handleImage = (req, res, db) => {
//   const { id } = req.body;

//   db("users")
//     .where("id", "=", id)
//     .increment("entries", 1)
//     .returning("entries")
//     .then((entries) => res.json(entries[0]))
//     .catch((err) => res.status(400).json("Unable to get entries"));
// };

// module.exports = {
//   handleImage: handleImage,
// };