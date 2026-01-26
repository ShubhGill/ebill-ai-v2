function calculateScore(m) {
  let score = 700;
  score -= m.returnRate * 200;
  score -= m.cancelRate * 150;
  score -= m.codReturnRate * 250;
  score += m.prepaidRate * 100;
  score += m.completionRate * 150;
  return Math.min(900, Math.max(300, Math.round(score)));
}

module.exports = { calculateScore };
