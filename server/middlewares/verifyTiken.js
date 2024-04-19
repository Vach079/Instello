const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.slice(7);
  if (!token) {
    return res.status(403).send({ auth: false, message: "No Token provided" });
  }
  jwt.verify(
    token,
    "gsasgcht5698uhggvtfxtrds4e543267878890909jkjhbyfctdxeszruyuuiy",
    (err, decoded) => {
      console.log(err);
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authentication token." });
      }
      req.userId = decoded.id;
      next();
    }
  );
};

module.exports = verifyToken;
