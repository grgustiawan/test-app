import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Encryption } from '../utils/encryption';

export class TransactionController {
  static generateTransaction(req: Request, res: Response): void {
    try {
      // Generate array besar transaksi random (misal 10000)
      const transactions = [];
      const now = new Date();
      for (let i = 0; i < 1000; i++) {
        const transaction = {
          transaction_time: new Date(now.getTime() - i * 1000).toISOString().replace('T', ' ').slice(0, 19),
          transaction_status: "capture",
          transaction_id: uuidv4(),
          status_message: "midtrans payment notification",
          status_code: "200",
          signature_key: uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, ''), // random hex string
          payment_type: "credit_card",
          order_id: `Order-${Date.now()}-${i}`,
          merchant_id: "G141532850",
          masked_card: "48111111-1114",
          gross_amount: (Math.floor(Math.random() * 1000000) / 100).toFixed(2), // random amount
          fraud_status: "accept",
          eci: "05",
          currency: "IDR",
          channel_response_message: "Approved",
          channel_response_code: "00",
          card_type: "credit",
          bank: "bni",
          approval_code: (Date.now() + i).toString()
        };
        transactions.push(transaction);
      }

      const encryptedData = Encryption.encrypt(JSON.stringify(transactions));
      res.json({ data: encryptedData, count: transactions.length });
    } catch (error) {
      console.error('Error generating or encrypting transactions:', error);
      res.status(500).json({ message: 'Internal server error generating transactions' });
    }
  }
}
