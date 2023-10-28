/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.ts":
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.modal = exports.dispatchEvent = exports.getLinksMatching = exports.getNodesMatching = void 0;
function getNodesMatching(tagName, innerTextPattern) {
    var nodes = document.getElementsByTagName(tagName);
    return Array.from(nodes).filter(function (node) {
        return node.innerText && node.innerText.match(innerTextPattern);
    });
}
exports.getNodesMatching = getNodesMatching;
function getLinksMatching(pattern) {
    return getNodesMatching('a', pattern);
}
exports.getLinksMatching = getLinksMatching;
function dispatchEvent(element, eventType) {
    var evt = document.createEvent('Events');
    evt.initEvent(eventType, true, false);
    element.dispatchEvent(evt);
}
exports.dispatchEvent = dispatchEvent;
function modal(text, timeout) {
    if (timeout === void 0) { timeout = 5000; }
    var modal = document.createElement('div');
    var styles = [
        'position: fixed',
        'left: 24px',
        'bottom: 24px',
        'background-color: white',
        'z-index: 100',
        'padding: 8px 52px 8px 24px',
        'color: #5f6368;',
        'border-radius: 4px',
        'box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302), 0 4px 8px 3px rgba(60, 64, 67, 0.149);',
        'font-size: .875rem',
        'letter-spacing: .2px',
        'min-height: 36px',
        'display: flex',
        'align-items: center',
        'line-height: 100%',
    ];
    modal.setAttribute('style', styles.join(';'));
    modal.textContent = text;
    document.body.appendChild(modal);
    setTimeout(function () { return document.body.removeChild(modal); }, timeout);
}
exports.modal = modal;


/***/ }),

/***/ "./src/gmail.ts":
/*!**********************!*\
  !*** ./src/gmail.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unsubscribe = void 0;
var dom_1 = __webpack_require__(/*! ./dom */ "./src/dom.ts");
function clickUnsubscribeButton(topButton) {
    (0, dom_1.dispatchEvent)(topButton, 'click');
    setTimeout(clickUnsubscribeDialogButton, 500);
}
function clickUnsubscribeDialogButton() {
    var dialogButton = (0, dom_1.getNodesMatching)('button', /^Unsubscribe$/)[0];
    if (!dialogButton) {
        console.log("Couldn't click unsubscribe button in dialog.");
        return false;
    }
    (0, dom_1.dispatchEvent)(dialogButton, 'click');
    return true;
}
function getUnsubscribeLinks() {
    var pattern = [
        "unsub(scribe)?",
        "opt(-| )?out",
        "click ?here",
        "email (preferences|settings)",
        "here",
    ];
    return (0, dom_1.getLinksMatching)(new RegExp(pattern.join('|'), 'i'));
}
function unsubscribeFromLinks() {
    var _a;
    var links = getUnsubscribeLinks();
    var link = links.filter(function (link) { return link.href; }).pop();
    if (!link) {
        (0, dom_1.modal)("Couldn't find any unsubscribe links.");
        return false;
    }
    console.log("Opening an unsubscribe link: ".concat(link.href));
    (_a = window.open(link.href, '_blank')) === null || _a === void 0 ? void 0 : _a.focus();
    return true;
}
function unsubscribe() {
    console.log('Unsubscribe triggered.');
    var unsubscribeButton = (0, dom_1.getNodesMatching)('span', /^Unsubscribe$/)[0];
    if (unsubscribeButton) {
        console.log('Found unsubscribe button.');
        return clickUnsubscribeButton(unsubscribeButton);
    }
    else {
        console.log("Couldn't find unsubscribe button.");
        return unsubscribeFromLinks();
    }
}
exports.unsubscribe = unsubscribe;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./src/content_script.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var gmail_1 = __webpack_require__(/*! ./gmail */ "./src/gmail.ts");
chrome.runtime.onMessage.addListener(function (message, sender, res) {
    if (sender.id !== chrome.runtime.id) {
        return;
    }
    switch (message.command) {
        case 'unsubscribe':
            res({ unsubscribed: (0, gmail_1.unsubscribe)() });
            break;
    }
});

})();

/******/ })()
;
//# sourceMappingURL=content_script.bundle.js.map