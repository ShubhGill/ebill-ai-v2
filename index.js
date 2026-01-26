require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongo");
const Transaction = require("./models/Transaction");
const { buildFeatures } = require("./services/featureBuilder");
const { orchestrate } = require("./services/orchestrator");
const { initRAG } = require("./services/rag");

const app = express();
app.use(express.json());

connectDB();
initRAG();

app.post("/api/v1/transactions", async (req, res) => {
  await Transaction.create(req.body);
  res.status(201).json({ message: "Transaction saved" });
});

app.get("/api/v1/customers/:customerId/score", async (req, res) => {
  const txns = await Transaction.find({ customerId: req.params.customerId });
  if (!txns.length) return res.status(404).json({ message: "No data" });

  const features = buildFeatures(txns);
  const result = await orchestrate(features);

  res.json({
    customerId: req.params.customerId,
    score: result.score,
    explanation: result.explanation,
    metrics: result.enriched
  });
});
app.get("/", (req, res) => {
  res.send("ebill-rag-ml API running");
});

app.listen(process.env.PORT, () =>
  console.log("Server running on", process.env.PORT)
);
