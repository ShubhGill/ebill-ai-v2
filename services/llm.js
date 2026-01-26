const axios = require("axios");

async function callLLM(prompt) {
  const res = await axios.post(
    `${process.env.OLLAMA_URL}/api/generate`,
    {
      model: process.env.LLM_MODEL,
      prompt,
      stream: false
    }
  );
  return res.data.response;
}

module.exports = { callLLM };
