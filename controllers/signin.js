// Note handleSignin will receive req, res, and db and bcrypt through dependency injection.
const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};

//TODO: Alternative way to handle Dependency Injection
// const handleSignin = (db, bcrypt) => (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json("incorrect form submission");
//   }

//   db.select("email", "hash")
//     .from("login")
//     .where("email", "=", email)
//     .then((data) => {
//       const isValid = bcrypt.compareSync(password, data[0].hash);
//       if (isValid) {
//         return db
//           .select("*")
//           .from("users")
//           .where("email", "=", email)
//           .then((user) => {
//             res.json(user[0]);
//           })
//           .catch((err) => res.status(400).json("unable to get user"));
//       } else {
//         res.status(400).json("wrong credentials");
//       }
//     })
//     .catch((err) => res.status(400).json("wrong credentials"));
// };

// module.exports = {
//   handleSignin: handleSignin,
// };
