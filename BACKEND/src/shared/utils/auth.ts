import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function generateToken(payload: object): string {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

export function verifyToken(token: string): any {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  return jwt.verify(token, secret);
}