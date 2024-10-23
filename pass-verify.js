const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin123';
  const hash = '$2b$10$WuzwaDU4MB60WEA/Ue1MoejNw8VCIguJMv6reUvq8DDZ19fQs7mf6';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
