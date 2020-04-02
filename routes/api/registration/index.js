const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../../models/schemas/user');
const { validDateOfUser } = require('../../../validation');

router.post('/', validDateOfUser, (req, res, next) => {
  const { email, password } = req.body;
  //создаем экземпляр пользователя и указываем введенные данные
  User.findOne({ email }).then(u => {
    //если такой пользователь уже есть - сообщаем об этом
    if (u) {
      return res.status(400).json({
        statusMessage: 'Error',
        data: {
          message: 'Email is already in use',
          status: 400,
        },
      });
    }
    const adminUser = new User({ email });
    adminUser.setPassword(password);
    //если нет - добавляем пользователя в базу
    adminUser
      .save()
      .then(u => {
        res.json({ statusMessage: 'Ok', data: {
          id: u._id,
          email: u.email,
        } });
      })
      .catch(e => {
        res.status(500).json({
          statusMessage: 'Error',
          data: {
            message: e.message,
            status: 500,
          },
        });
      });
  });
});

module.exports = router;