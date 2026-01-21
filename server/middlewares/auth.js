const jwt = require("jwt-then");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided 🚫" });
    }

    const token = authHeader.split(" ")[1];
    const payload = await jwt.verify(token, process.env.SECRET);

    req.payload = payload;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid / Expired Token 🚫",
    });
  }
};
