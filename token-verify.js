const jwt = require('jsonwebtoken');
const secret = 'myCat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyOTczODExN30.Tcx3Uhr4j0TaTl4I0fJavgU4mRk-ZPNwqugH9ow6SFA';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
