import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Not Authenticated" });
  }
  let secretKey = process.env.ACCESS_TOKEN_SECRET || "secret";
  const token = req.headers.authorization.split(" ")[1];
  try {
    const credential = jwt.verify(token, secretKey);
    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }
    return res.send({ message: "Token Is Invalid" });
  } catch (error) {
    return res.send(error);
  }
};

export default verifyToken;
