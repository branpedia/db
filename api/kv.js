import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  try {
    if (req.method === 'GET') {
      const value = await kv.get(req.query.key);
      res.status(200).json(value);
    } else if (req.method === 'POST') {
      const { key, value } = req.body;
      await kv.set(key, value);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('KV error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
