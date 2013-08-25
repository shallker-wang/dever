/* Log level */
/*
  0 EMERGENCY system is unusable
  1 ALERT action must be taken immediately
  2 CRITICAL the system is in critical condition
  3 ERROR error condition
  4 WARNING warning condition
  5 NOTICE a normal but significant condition
  6 INFO a purely informational message
  7 DEBUG messages to debug an application
*/

var fs = require('fs'),
    dev,
    pro;

function readFileJSON(path) {
  var json = fs.readFileSync(path, {encoding: 'utf8'});
  return JSON.parse(json);
}

function defaultConfig() {
  return {
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
}

try { dev = readFileJSON(__dirname + '/../dev.json') } catch (e) {}
try { pro = readFileJSON(__dirname + '/../pro.json'); } catch (e) {}

config = dev || pro || defaultConfig();

function debug(args) {
  args.unshift('[Debug]');
  console.log.apply(console, args);
}

function info(args) {
  args.unshift('[Info]');
  console.info.apply(console, args)
}

function notice(args) {
  args.unshift('[Notice]');
  console.log.apply(console, args);
}

function warn(args) {
  args.unshift('[Warn]');
  console.warn.apply(console, args);
}

function error(err) {
  if (config["throw"]) {
    throw err;
  } else {
    var args = ['[Error]'];
    err.name && (err.name += ':') && (args.push(err.name));
    args.push(err.message);
    console.log.apply(console, args);
  }
  return false;
}


exports.debug = function(from) {
  from && (from = '[' + from + ']')
  return function() {
    if (!config.output['DEBUG']) return;
    var args = Array.prototype.slice.call(arguments);
    from && args.unshift(from);
    return debug(args);
  }
}

exports.info = function(from) {
  from && (from = '[' + from + ']')
  return function() {
    if (!config.output['INFO']) return;
    var args = Array.prototype.slice.call(arguments);
    from && args.unshift(from);
    return info(args);
  }
}

exports.notice = function(from) {
  from && (from = '[' + from + ']')
  return function() {
    if (!config.output['NOTICE']) return;
    var args = Array.prototype.slice.call(arguments);
    from && args.unshift(from);
    return notice(args);
  }
}

exports.warn = function(from) {
  from && (from = '[' + from + ']')
  return function() {
    if (!config.output['WARNING']) return;
    var args = Array.prototype.slice.call(arguments);
    from && args.unshift(from);
    return warn(args);
  }
}

exports.error = function(from) {
  return function() {
    if (!config.output['ERROR']) return;
    var args = Array.prototype.slice.call(arguments);
    var err = new Error(args.join(' '));
    from && (err.name = from);
    return error(err);
  }
}
