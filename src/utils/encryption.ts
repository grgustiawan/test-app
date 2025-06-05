import * as crypto from 'crypto';

export class Encryption {
  private static readonly algorithm = 'aes-256-cbc';
  private static readonly key = crypto.randomBytes(32);
  private static readonly iv = crypto.randomBytes(16);

  static encrypt(text: string): { encryptedData: string; iv: string; key: string } {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      encryptedData: encrypted,
      iv: this.iv.toString('hex'),
      key: this.key.toString('hex')
    };
  }
}