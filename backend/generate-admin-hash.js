import bcrypt from 'bcryptjs';

const password = 'UgMwAnGi23$';  // Password admin
const salt = bcrypt.genSaltSync(12);
const hash = bcrypt.hashSync(password, salt);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nJSON untuk MongoDB Atlas:');
console.log(JSON.stringify({
  username: "arjunnadhief",
  email: "arjunnadhief@gmail.com",
  password: hash,
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
}, null, 2));