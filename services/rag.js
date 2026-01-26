const fs = require("fs");

let rules = "";

function initRAG() {
  rules = fs.readFileSync("rag_docs/scoring_rules.txt", "utf8");
}

function getContext() {
  return rules;
}

module.exports = { initRAG, getContext };
