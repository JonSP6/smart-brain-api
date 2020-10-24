const handleHome = (req, res, db) => {
  db.select("*")
    .from("users")
    .then((resp) => {
      if (resp.length) {
        return res.json(resp);
      } else {
        return res.status(400).json("users?");
      }
    })
    .catch(() => res.status(400).json("Unable to retrieve users"));
};

module.exports = {
  handleHome: handleHome,
};
