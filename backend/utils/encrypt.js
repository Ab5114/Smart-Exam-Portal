 const crypto = require("crypto");

const algorithm = "aes-256-cbc";
require("dotenv").config();
const secret = process.env.ENCRYPTION_SECRET;
const key = crypto
  .createHash("sha256")
  .update(String(secret)) 
  .digest("base64")
  .substr(0, 32);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

function decrypt(enc) {
  const [ivHex, encryptedText] = enc.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };
