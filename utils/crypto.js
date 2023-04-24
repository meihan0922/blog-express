const crypto = require("crypto");

const SECRET_KEY = "WJiol_8776#";

function md5(content) {
  return crypto.createHash("md5").update(content).digest("hex");
}

function genPassword(password) {
  return md5(`password=${password}&key=${SECRET_KEY}`);
}

module.exports = {
  genPassword,
};
