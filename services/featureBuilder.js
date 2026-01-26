function buildFeatures(txns) {
  const total = txns.length;

  const returns = txns.filter(t => t.returnFlag).length;
  const cancelled = txns.filter(t => t.orderStatus === "CANCELLED").length;
  const cod = txns.filter(t => t.paymentMode === "COD");
  const codReturns = cod.filter(t => t.returnFlag).length;
  const prepaid = txns.filter(t => t.paymentMode === "PREPAID");
  const delivered = txns.filter(t => t.orderStatus === "DELIVERED");

  return {
    returnRate: returns / total,
    cancelRate: cancelled / total,
    codReturnRate: cod.length ? codReturns / cod.length : 0,
    prepaidRate: prepaid.length / total,
    completionRate: delivered.length / total
  };
}

module.exports = { buildFeatures };
