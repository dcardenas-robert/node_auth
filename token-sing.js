const jwt = require('jsonwebtoken');
const secret = 'myCat';
const payload = {
  sub: 1,
  role: 'customer',
};

function singToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = singToken(payload, secret);
console.log(token);
