const UserService = require('./user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const { ne } = require('sequelize/types/lib/operators');
const { password } = require('pg/lib/defaults');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    user.password;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {
      recoveryToken: token,
    });
    const mail = {
      from: '"DRCP 👻" <zoey.halvorson34@ethereal.email>', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar constraseña', // Subject line
      html: `<b>Ingresa este link => ${link} </b>`, // html body
    };

    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (!user) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: hash,
      });
      return {
        message: 'password changed',
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      secure: false, // true for port 465, false for other ports
      port: 587,
      auth: {
        user: 'zoey.halvorson34@ethereal.email',
        pass: 'DNvv2e4D5vAHa9qeQb',
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail send' };
  }
}

module.exports = AuthService;
