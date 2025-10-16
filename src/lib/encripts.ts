import bcrypt from 'bcryptjs';

const saltRounds = 10;

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}