module.exports = {
  root: true,
  extends: '@react-native-community',
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }]
  }
};
