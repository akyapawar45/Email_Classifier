import axios from 'axios';

export default async function handler(req, res) {
  const { openaiKey, emails } = req.body;

  const classifications = await Promise.all(
    emails.map(async (email) => {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Classify the following email into one of these categories: Important, Promotions, Social, Marketing, Spam, General.\n\n${email.snippet}`,
        max_tokens: 10,
      }, {
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
        },
      });
      return response.data.choices[0].text.trim();
    })
  );

  res.status(200).json({ classifications });
}
