const jwt = require("jsonwebtoken");
const { constants } = require("./constants");

const tokenSecret = process.env.TOKEN_SECRET_KEY;
const tokenExp = process.env.TOKEN_EXP;

const JWTMiddleware = async (req, res, next) => {
  try {
    const token = req?.header("Authorization");

    if (!token) {
      res.status(401).send({
        message: constants.unAuthorized,
      });
      return;
    }
    const secretToken = token?.replace("Bearer ", "");
    jwt.verify(secretToken, tokenSecret, (err, data) => {
      if (err) {
        res.status(401).send({
          message: constants.tokenMissMatch,
        });
        return;
      }
      next();
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const generateToken = (email) => {
  const token = jwt.sign({ email: email }, tokenSecret, {
    expiresIn: tokenExp,
  });
  return token;
};

module.exports = { JWTMiddleware, generateToken };
