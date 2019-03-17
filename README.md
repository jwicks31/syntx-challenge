Syntax Challenge
==================================

Getting Started
---------------

```sh

# Go Into Back-End
cd syntax-back-end

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Go Into Front-End
cd ../syntax-front-end

# start development live-reload server
npm run dev

```

Backend Architecture
---------------

GET /api/weather?city=xxx&zipCode=xxx
Requires an access-token
Returns an object with forecast, city, and state.

Middleware:
There is 1 middleware running, which checks for an access-token and returns 401 Not Authorized if not found or invalid.

Whenever a request is made to the /api/weather?city=xxx&zipCode=xxx endpoint, several subsequent calls are made to  <https://www.metaweather.com/api/> to gather the necessary information to return the forecast. If a zipCode is supplied, then it will make a call to <https://www.zipcodeapi.com/> to retrieve latt and long coordinates.

Front-End Architecture
---------------

The front-end site is a Nextjs/React application. I am using redux for the state management. Side-effects are being managed with redux-saga.

License
-------

MIT
