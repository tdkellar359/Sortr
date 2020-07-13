module.exports = {
  "loader": "eslint-loader",
  "options": {
    "emitWarning": true,
  },
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "env": {
    "browser": true,
  },

  // Allow use of console.log()
  "rules": {
    "no-console": 0,
  }
};
