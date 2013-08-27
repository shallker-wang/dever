dever
==========

A dev helper.


## Installation
```bash
npm install dever
```

## Quick Start
```javascript
var debug = require('dever').debug('api/users')
var error = require('dever').error('api/users')
debug('hey, I got something here')
return error('opps, something goes wrong')
```

## Silent Mode
Turn off the output:
```javascript
var debug = require('dever').debug('/api/users', 'shutup')
var error = require('dever').error('/api/users', 'swallow')
``

## dev.json
A config file to control output in development:
```json
{
  "level": {
    "0": "EMERGENCY",
    "1": "ALERT",
    "2": "CRITICAL",
    "3": "ERROR",
    "4": "WARNING",
    "5": "NOTICE",
    "6": "INFO",
    "7": "DEBUG"
  },
  "output": {
    "EMERGENCY": true,
    "ALERT": true,
    "CRITICAL": true,
    "ERROR": true,
    "WARNING": true,
    "NOTICE": true,
    "INFO": true,
    "DEBUG": true 
  },
  "throw": true
}
```

## pro.json
A config file to control output in production:
```json
{
  "level": {
    "0": "EMERGENCY",
    "1": "ALERT",
    "2": "CRITICAL",
    "3": "ERROR",
    "4": "WARNING",
    "5": "NOTICE",
    "6": "INFO",
    "7": "DEBUG"
  },
  "output": {
    "EMERGENCY": true,
    "ALERT": true,
    "CRITICAL": true,
    "ERROR": true,
    "WARNING": true,
    "NOTICE": true,
    "INFO": true,
    "DEBUG": false 
  },
  "throw": false
}
```

---

Copyright (c) 2013 Shallker Wang - MIT License (enclosed)
