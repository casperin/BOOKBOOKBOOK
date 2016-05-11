# Iters

My personal little helper library for working with the `::` function bind.

Here's a starting point for a package.json:

```json
{
  "scripts": {
    "start": "watchify in.js -v -d -t babelify -o index.js"
  },
  "babel": {
    "presets": [
      "es2015",
      "stage-0"
    ]
  },
  "devDependencies": {
    "babel-core": "^6.7.7",
    "babel-polyfill": "^6.7.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-stage-0": "^6.5.0",
    "babelify": "^7.3.0",
    "watchify": "^3.7.0"
  },
  "eslintConfig": {
    "ecmaFeatures": {
      "modules": true
    },
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    }
  }
}
```
