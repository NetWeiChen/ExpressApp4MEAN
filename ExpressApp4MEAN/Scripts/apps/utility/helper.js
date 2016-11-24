"use strict";
var moment = require('moment-timezone');
var util = require('util');
var path = require('path');
var pkgjson = require(path.join(path.dirname(require.main.filename), 'package.json'));
var logFormat = "[%s:%s:ver%s]-[p:%s]-[t:%s]-[%s]-%s"; // [AppCode-App Name]-[Process id] - [time] - [message type] - message
var sysHostName = pkgjson.name;
function LogMessage(message) {
    console.log(util.format(logFormat, pkgjson.appcode, sysHostName, pkgjson.version, process.pid, moment().format(), "log", message));
}
exports.LogMessage = LogMessage;
function LogError(errMessage) {
    console.log(util.format(logFormat, pkgjson.appcode, sysHostName, pkgjson.version, process.pid, moment().format(), "error", errMessage));
}
exports.LogError = LogError;
function LogInfo(infoMessage) {
    console.info(util.format(logFormat, pkgjson.appcode, sysHostName, pkgjson.version, process.pid, moment().format(), "info", infoMessage));
    ;
}
exports.LogInfo = LogInfo;
function SetHostName(hostName) {
    sysHostName = hostName;
}
exports.SetHostName = SetHostName;
//# sourceMappingURL=helper.js.map