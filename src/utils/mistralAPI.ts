import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

const chatResponse = await client.chat.complete({
  model: 'mistral-large-latest',
  messages: [{role: 'user', content: 'Digite em português do Brasil, uma frase motivacional para pessoas que estão abandonando o vício de cigarro, deve ser uma frase com no máximo 20 palavras'}],
});

console.log('Chat:', chatResponse.choices[0].message.content);