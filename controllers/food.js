const food = require("../models/index").foods;
const path = require(`path`);
const Op = require(`sequelize`).Op;
const fs = require(`fs`);
const upload = require("./image").single("image");

exports.getMenu = async (req, res) => {
  const data = await food.findAll();
  return res.json({
    status: true,
    data: data,
    message: "Success to add menu",
  });
};

exports.addMenu = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.json({ message: error });
    }
    if (!req.file) {
      return res.json({ message: "No file" });
    }

    let newMenu = {
      name: req.body.name,
      spicy_level: req.body.spicy_level,
      price: req.body.price,
      image: req.file.filename,
    };

    food
      .create(newMenu)
      .then((result) => {
        return res.json({
          status: true,
          data: result,
          message: "Success to add menu",
        });
      })
      .catch((error) => {
        return res.json({
          status: false,
          message: error.message,
        });
      });
  });
};

exports.updateMenu = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.json({ message: error });
    }
    let id = req.params.id;
    let updatedMenu = {
      name: req.body.name,
      spicy_level: req.body.spicy_level,
      price: req.body.price,
    };
    if (req.file) {
      const menu = await food.findOne({
        where: { id: id },
      });
      const fotolama = menu.image;
      const pathfoto = path.join(__dirname, `../image`, fotolama);
      if (fs.existsSync(pathfoto)) {
        fs.unlinkSync(pathfoto, (error) => console.log(error));
      }
      updatedMenu.image = req.file.filename;
    }
    food
      .update(updatedMenu, { where: { id: id } })
      .then((result) => {
        if (result[0] === 1) {
          return food
            .findByPk(id)
            .then((updatedMenu) => {
              return res.json({
                success: true,
                data: updatedMenu,
                message: "Data food has been updated",
              });
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error.message,
              });
            });
        } else {
          return res.json({
            success: false,
            message: "Data food not found or not updated",
          });
        }
      })
      .catch((error) => {
        return res.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.deleteMenu = async (req, res) => {
  const id = req.params.id;
  const menu = await food.findOne({ where: { id: id } });
  const oldPhoto = menu.image;
  const pathFoto = path.join(__dirname, "../image", oldPhoto);

  if (fs.existsSync(pathFoto)) {
    fs.unlinkSync(pathFoto, (error) => console.log(error));
  }

  food
    .destroy({ where: { id: id } })
    .then((result) => {
      return res.json({
        success: true,
        data: menu,
        message: `Menu has been deleted`,
      });
    })
    .catch((error) => {
      return res.json({
        status: false,
        message: error.message,
      });
    });
};

exports.searchMenu = async (req, res) => {
  let search = req.params.search;
  let menu = await food.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.substring]: search } },
        { spicy_level: { [Op.substring]: search } },
        { price: { [Op.substring]: search } },
      ],
    },
  });
  return res.json({
    success: true,
    data: menu,
    message: `All menus have been loaded`,
  });
};
