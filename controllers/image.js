const clarigai=require('clarifai');
const { json } = require('body-parser');
const app = new Clarifai.App({
  // cId: "751197ddb2a841839187c99239fb4b9c",
  apiKey: '899fc8a19c7d4d1fb836f3bc96c53365',
});

const handleApicall=(req,res)=>{
    app.models
      .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.status(400).json("unableato work with API"));
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(404).json("unable to get entries"));
};
module.exports = {
  handleImage,
  handleApicall
};
