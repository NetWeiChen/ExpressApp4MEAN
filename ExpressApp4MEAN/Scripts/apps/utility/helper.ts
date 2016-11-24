var moment = require('moment-timezone');
var util = require('util');
import path = require('path');
var pkgjson = require(path.join(path.dirname(require.main.filename), 'package.json'));
var logFormat = "[%s:%s:ver%s]-[p:%s]-[t:%s]-[%s]-%s";// [AppCode-App Name]-[Process id] - [time] - [message type] - message
var sysHostName = pkgjson.name;

export function LogMessage(message: string) {


    console.log(util.format(logFormat, pkgjson.appcode, sysHostName, pkgjson.version, process.pid, moment().format(), "log", message));

}

export function LogError(errMessage: string) {
    console.log(util.format(logFormat, pkgjson.appcode, sysHostName, pkgjson.version, process.pid, moment().format(), "error", errMessage));
}
export function LogInfo(infoMessage: string) {
    console.info(util.format(logFormat, pkgjson.appcode, sysHostName, pkgjson.version, process.pid, moment().format(), "info", infoMessage));;
}

export function SetHostName(hostName: string) {
    sysHostName = hostName;
}