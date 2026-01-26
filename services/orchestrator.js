const { predictBehavior } = require("./behaviorML");
const { getContext } = require("./rag");
const { callLLM } = require("./llm");
const { calculateScore } = require("./scoreEngine");

async function orchestrate(features) {
  const completionLikelihood = await predictBehavior(features);

  const enriched = {
    ...features,
    completionRate: completionLikelihood
  };

  const prompt = `
Rules:
${getContext()}

Metrics:
${JSON.stringify(enriched, null, 2)}

Explain user behaviour risk.
`;

  const explanation = await callLLM(prompt);
  const score = calculateScore(enriched);

  return { score, explanation, enriched };
}

module.exports = { orchestrate };
