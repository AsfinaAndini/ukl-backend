const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "restaurantshop";

const authVerify = async (req, res, next) => {
  try {
    const header = req.headers.authorization; //minta token

    if (!header) {
      //kalo ga ada token
      return res.status(400).json({
        message: "missing token",
        err: null,
      });
    }

    let token = header.split(" ")[1]; //ambil token dari bearer token, ambil elemen kedua

    try {
      const decodedToken = jsonwebtoken.verify(token, SECRET_KEY);
    } catch (error) {
      if (error instanceof jsonwebtoken.TokenExpiredError) {
        //kalo tokennya kadaluwarsa
        return res.status(400).json({
          message: "token sudah expired",
          err: error,
        });
      }

      return res.status(400).json({
        message: "invalid token",
        err: error,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = { authVerify };
