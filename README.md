Sortr
===
### By: Tristan Kellar | July 5th, 2020

A file-sharing application created as a part of a 6-hour coding challenge.

Uses Flask for the backend and ReactJS for the frontend.

## Before You Begin

[ TODO ]

## Installation

```bash
# Setup python virtual environment and install dependencies
./bin/install
```

### Development Build
```bash
# Start a development server
./bin/run

# Run in different terminal window
npx webpack --config webpack.dev.js --watch

# OR run in the background
npx webpack --config webpack.dev.js --watch &
```

### Production Build
The frontend components of Sortr need to be compiled to the `sortr/static/js` directory. This can be done with:

```bash
npx webpack --config webpack.prod.js
```

Once the JavaScript is compiles in production mode, you will have to host the site on a web server such as [gunicorn](https://gunicorn.org/).