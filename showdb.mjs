import mongoose from './server/node_modules/mongoose/index.js';

async function showDB() {
  await mongoose.connect('mongodb://127.0.0.1/fixtrail');

  const UserSchema = new mongoose.Schema({}, { strict: false });
  const User = mongoose.model('User', UserSchema, 'users');

  console.log('\n========================================');
  console.log('  FIXTRAIL — LIVE DATABASE USERS');
  console.log('  MongoDB: fixtrail.users collection');
  console.log('========================================\n');

  const users = await User.find({}, {
    username: 1, email: 1, role: 1,
    reputation: 1, createdAt: 1, password: 1
  }).lean();

  users.forEach((u, i) => {
    console.log(`USER ${i + 1}:`);
    console.log(`  _id       : ${u._id}`);
    console.log(`  username  : ${u.username}`);
    console.log(`  email     : ${u.email}`);
    console.log(`  role      : ${u.role}`);
    console.log(`  reputation: ${u.reputation}`);
    console.log(`  password  : ${u.password ? u.password.substring(0, 30) + '... (bcrypt hashed)' : 'N/A'}`);
    console.log(`  createdAt : ${u.createdAt}`);
    console.log('');
  });

  console.log(`Total users in database: ${users.length}`);
  console.log('========================================\n');

  process.exit(0);
}

showDB().catch(e => { console.error(e.message); process.exit(1); });
