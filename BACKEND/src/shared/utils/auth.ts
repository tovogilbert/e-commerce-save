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
  console.log('=== DEBUG COMPARAISON MOT DE PASSE ===');
  console.log('Texte clair:', `"${plainPassword}"`, 'Longueur:', plainPassword.length);
  console.log('Hash:', hashedPassword);
  
  if (!plainPassword || !hashedPassword) {
    console.error('Mot de passe ou hash manquant');
    return false;
  }

  if (!hashedPassword.startsWith('$2a$') && !hashedPassword.startsWith('$2b$')) {
    console.error('Format de hash invalide - pas un hash bcrypt');
    return false;
  }

  try {
    const trimmedPassword = plainPassword.trim();
    const result = await bcrypt.compare(trimmedPassword, hashedPassword);
    console.log('Résultat comparaison:', result);
    return result;
  } catch (err) {
    console.error('Erreur bcrypt.compare:', err);
    return false;
  }
}

export function generateToken(payload: object): string {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

export function verifyToken(token: string): any {
  const secret = process.env.JWT_SECRET || "your-secret-key";
  return jwt.verify(token, secret);
}


//teste automatique pour bcrypt
// async function testBcrypt() {
//   const plain = "admin123";
//   console.log("Testing with:", plain);
  
//   const hash = await hashPassword(plain);
//   console.log("Generated hash:", hash);
  
//   const result = await comparePasswords(plain, hash);
//   console.log("Comparison result:", result);
// }

// testBcrypt(); 