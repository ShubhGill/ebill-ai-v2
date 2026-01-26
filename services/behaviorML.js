const { spawn } = require("child_process");
const path = require("path");

function predictBehavior(features) {
  return new Promise(resolve => {
    const py = spawn("python3", [
      path.join(process.cwd(), "ml", "predict.py"),
      JSON.stringify(features)
    ]);

    let out = "";
    py.stdout.on("data", d => out += d.toString());
    py.on("close", () => resolve(Number(out)));
  });
}

module.exports = { predictBehavior };
