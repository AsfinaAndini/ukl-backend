const admin = require("../models/index").admin;
const md5 = require("md5");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "restaurantshop";

exports.login = async (req, res) => {
  try {
    //masukin email dan password admin
    const data = {
      email: req.body.email,
      password: md5(req.body.password),
    };
    const cariAdmin = await admin.findOne({ where: data }); //nyari admin yang punya email dan password kyk yang dimasukkan
    if (!cariAdmin) {
      return res.status(400).json({
        message: "You can't log in",
      });
    }
    //data di dalam token
    let tokenPayLoad = {
      id_admin: cariAdmin.id,
      name: cariAdmin.name,
      email: cariAdmin.email,
    };
    //buat jadi token
    let token = jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);
    return res.status(200).json({
      status: true,
      message: "You are logged in",
      data: {
        id_admin: cariAdmin.id,
        name: cariAdmin.name,
        email: cariAdmin.email,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      name: req.body.name,
      password: md5(req.body.password),
    };
    await admin.create(data);
    return res.status(200).json({
      status: true,
      message: "Success create data",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error,
    });
  }
};
