import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyBnCIkrsRp4TRJtFVI3GaxKSakrj0zAOjA'; // 👈 Dán key Gemini của bạn

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi từ AI';
    res.json({ reply });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ reply: 'Lỗi máy chủ AI' });
  }
});

app.listen(3000, () => {
  console.log('✅ Gemini server chạy tại http://localhost:3000');
});
