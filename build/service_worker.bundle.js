/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/service_worker.ts ***!
  \*******************************/

chrome.commands.onCommand.addListener(function (command) {
    if (command !== 'unsubscribe') {
        return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (_a) {
        var tab = _a[0];
        if (tab === undefined || typeof tab.id !== 'number') {
            return;
        }
        chrome.tabs.sendMessage(tab.id, { command: 'unsubscribe' });
    });
});

/******/ })()
;
//# sourceMappingURL=service_worker.bundle.js.map