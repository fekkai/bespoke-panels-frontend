(window["webpackJsonpclient"] = window["webpackJsonpclient"] || []).push([["main"],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/App.scss":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--6-oneOf-5-3!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./src/styles/App.scss ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../assets/urwdin-regular-webfont.woff */ "./src/assets/urwdin-regular-webfont.woff"));

// Module
exports.push([module.i, "@font-face {\n  font-family: \"urwdin-regular\";\n  font-style: normal;\n  src: local(\"urwdin-regular-webfont\"), local(\"urwdin-regular-webfont\"), url(" + ___CSS_LOADER_URL___0___ + ") format(\"woff\");\n}\n.btn,\nbutton {\n  font-family: \"urwdin-regular\";\n  background: transparent;\n  color: #545454;\n  height: 3%;\n  font-size: 1.2em;\n  margin: 2% 3% 0 auto;\n  border: 2px solid #545454;\n}\n.btn:hover,\nbutton:hover {\n  background: rgba(0, 0, 0, 0);\n  transition: all 0.3s ease;\n}\n.btn:active,\nbutton:active {\n  background: rgba(0, 0, 0, 0);\n}\n\n.app {\n  font-family: \"urwdin-regular\";\n  padding: 3%;\n}\n.app header {\n  margin-bottom: 30px;\n}\n.app header p {\n  margin-top: auto;\n  padding-bottom: 15px;\n}\n.app .signup-login {\n  padding-left: 3%;\n}\n.app .img-container {\n  display: flex;\n  width: 100%;\n  top: 0;\n}\n.app .img-container img {\n  width: 15%;\n}\n.app .img-container #bespoke-logo {\n  padding: 0;\n  margin-left: auto;\n  padding-right: 3%;\n}\n.app .img-container #fekkai-logo {\n  margin-left: 0;\n  padding: 0;\n  width: 20%;\n  height: 100%;\n}\n.app #logout-approve-btn {\n  align-items: center;\n  display: flex;\n  padding-right: 3%;\n}\n.app #logout-approve-btn div {\n  margin-left: auto;\n}\n.app #welcome {\n  font-size: 26px;\n}\n\n.form {\n  width: 60%;\n  margin: 0 auto;\n}\n.form input {\n  font-size: 75px;\n  margin-bottom: 10px;\n  margin-top: 5px;\n  border-radius: 3px;\n  padding: 5px;\n  display: block;\n  width: 100%;\n}\n.form label {\n  font-size: 75px;\n}\n\n@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {\n  header {\n    margin-bottom: 30px;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {\n  .app .img-container {\n    display: flex;\n    flex-direction: column;\n  }\n  .app .img-container #fekkai-logo {\n    width: 60%;\n    margin: 0 auto;\n  }\n  .app .img-container p {\n    display: none;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {\n  .app .img-container #fekkai-logo {\n    width: 25%;\n    margin: 0 auto;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait) {\n  .app .img-container #fekkai-logo {\n    width: 50%;\n    margin: 0 auto;\n  }\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Lightbox.scss":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--6-oneOf-5-3!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./src/styles/Lightbox.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "@keyframes closeWindow {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.ril__outer {\n  background-color: rgba(0, 0, 0, 0.85);\n  outline: none;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  -ms-content-zooming: none;\n  -ms-user-select: none;\n  -ms-touch-select: none;\n  touch-action: none;\n}\n\n.ril__outerClosing {\n  opacity: 0;\n}\n\n.ril__inner {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.ril__image,\n.ril__imagePrev,\n.ril__imageNext {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  max-width: none;\n  -ms-content-zooming: none;\n  -ms-user-select: none;\n  -ms-touch-select: none;\n  touch-action: none;\n}\n\n.ril__imageDiscourager {\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n}\n\n.ril__navButtons {\n  border: none;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 20px;\n  height: 34px;\n  padding: 40px 30px;\n  margin: auto;\n  cursor: pointer;\n  opacity: 0.7;\n}\n\n.ril__navButtons:hover {\n  opacity: 1;\n}\n\n.ril__navButtons:active {\n  opacity: 0.7;\n}\n\n.ril__navButtonPrev {\n  left: 0;\n  background: rgba(0, 0, 0, 0.2) url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDE5LDMgLTIsLTIgLTE2LDE2IDE2LDE2IDEsLTEgLTE1LC0xNSAxNSwtMTUgeiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==\") no-repeat center;\n}\n\n.ril__navButtonNext {\n  right: 0;\n  background: rgba(0, 0, 0, 0.2) url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDEsMyAyLC0yIDE2LDE2IC0xNiwxNiAtMSwtMSAxNSwtMTUgLTE1LC0xNSB6IiBmaWxsPSIjRkZGIi8+PC9zdmc+\") no-repeat center;\n}\n\n.ril__downloadBlocker {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-image: url(\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\");\n  background-size: cover;\n}\n\n.ril__caption,\n.ril__toolbar {\n  background-color: rgba(0, 0, 0, 0.5);\n  position: absolute;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: space-between;\n}\n\n.ril__caption {\n  bottom: 0;\n  max-height: 150px;\n  overflow: auto;\n}\n\n.ril__captionContent {\n  padding: 10px 20px;\n  color: #fff;\n}\n\n.ril__toolbar {\n  top: 0;\n  height: 50px;\n}\n\n.ril__toolbarSide {\n  height: 50px;\n  margin: 0;\n}\n\n.ril__toolbarLeftSide {\n  padding-left: 20px;\n  padding-right: 0;\n  flex: 0 1 auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.ril__toolbarRightSide {\n  padding-left: 0;\n  padding-right: 20px;\n  flex: 0 0 auto;\n}\n\n.ril__toolbarItem {\n  display: inline-block;\n  line-height: 50px;\n  padding: 0;\n  color: #fff;\n  font-size: 120%;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.ril__toolbarItemChild {\n  vertical-align: middle;\n}\n\n.ril__builtinButton {\n  width: 40px;\n  height: 35px;\n  cursor: pointer;\n  border: none;\n  opacity: 0.7;\n}\n\n.ril__builtinButton:hover {\n  opacity: 1;\n}\n\n.ril__builtinButton:active {\n  outline: none;\n}\n\n.ril__builtinButtonDisabled {\n  cursor: default;\n  opacity: 0.5;\n}\n\n.ril__builtinButtonDisabled:hover {\n  opacity: 0.5;\n}\n\n.ril__closeButton {\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBkPSJtIDEsMyAxLjI1LC0xLjI1IDcuNSw3LjUgNy41LC03LjUgMS4yNSwxLjI1IC03LjUsNy41IDcuNSw3LjUgLTEuMjUsMS4yNSAtNy41LC03LjUgLTcuNSw3LjUgLTEuMjUsLTEuMjUgNy41LC03LjUgLTcuNSwtNy41IHoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=\") no-repeat center;\n}\n\n.ril__zoomInButton {\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PHBhdGggZD0iTTEyIDV2NiIvPjwvZz48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+\") no-repeat center;\n}\n\n.ril__zoomOutButton {\n  background: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTEgMTlsNi02Ii8+PHBhdGggZD0iTTkgOGg2Ii8+PC9nPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=\") no-repeat center;\n}\n\n.ril__outerAnimating {\n  animation-name: closeWindow;\n}\n\n@keyframes pointFade {\n  0%, 19.999%, 100% {\n    opacity: 0;\n  }\n  20% {\n    opacity: 1;\n  }\n}\n.ril__loadingCircle {\n  width: 60px;\n  height: 60px;\n  position: relative;\n}\n\n.ril__loadingCirclePoint {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.ril__loadingCirclePoint::before {\n  content: \"\";\n  display: block;\n  margin: 0 auto;\n  width: 11%;\n  height: 30%;\n  background-color: #fff;\n  border-radius: 30%;\n  animation: pointFade 800ms infinite ease-in-out both;\n}\n\n.ril__loadingCirclePoint:nth-of-type(1) {\n  transform: rotate(0deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(7) {\n  transform: rotate(180deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(1)::before,\n.ril__loadingCirclePoint:nth-of-type(7)::before {\n  animation-delay: -800ms;\n}\n\n.ril__loadingCirclePoint:nth-of-type(2) {\n  transform: rotate(30deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(8) {\n  transform: rotate(210deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(2)::before,\n.ril__loadingCirclePoint:nth-of-type(8)::before {\n  animation-delay: -666ms;\n}\n\n.ril__loadingCirclePoint:nth-of-type(3) {\n  transform: rotate(60deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(9) {\n  transform: rotate(240deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(3)::before,\n.ril__loadingCirclePoint:nth-of-type(9)::before {\n  animation-delay: -533ms;\n}\n\n.ril__loadingCirclePoint:nth-of-type(4) {\n  transform: rotate(90deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(10) {\n  transform: rotate(270deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(4)::before,\n.ril__loadingCirclePoint:nth-of-type(10)::before {\n  animation-delay: -400ms;\n}\n\n.ril__loadingCirclePoint:nth-of-type(5) {\n  transform: rotate(120deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(11) {\n  transform: rotate(300deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(5)::before,\n.ril__loadingCirclePoint:nth-of-type(11)::before {\n  animation-delay: -266ms;\n}\n\n.ril__loadingCirclePoint:nth-of-type(6) {\n  transform: rotate(150deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(12) {\n  transform: rotate(330deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(6)::before,\n.ril__loadingCirclePoint:nth-of-type(12)::before {\n  animation-delay: -133ms;\n}\n\n.ril__loadingCirclePoint:nth-of-type(7) {\n  transform: rotate(180deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(13) {\n  transform: rotate(360deg);\n}\n\n.ril__loadingCirclePoint:nth-of-type(7)::before,\n.ril__loadingCirclePoint:nth-of-type(13)::before {\n  animation-delay: 0ms;\n}\n\n.ril__loadingContainer {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.ril__imagePrev .ril__loadingContainer,\n.ril__imageNext .ril__loadingContainer {\n  display: none;\n}\n\n.ril__errorContainer {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n}\n\n.ril__imagePrev .ril__errorContainer,\n.ril__imageNext .ril__errorContainer {\n  display: none;\n}\n\n.ril__loadingContainer__icon {\n  color: #fff;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%);\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Panel.scss":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--6-oneOf-5-3!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./src/styles/Panel.scss ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../assets/urwdin-regular-webfont.woff */ "./src/assets/urwdin-regular-webfont.woff"));

// Module
exports.push([module.i, "@font-face {\n  font-family: \"urwdin-regular\";\n  font-style: normal;\n  src: local(\"urwdin-regular-webfont\"), local(\"urwdin-regular-webfont\"), url(" + ___CSS_LOADER_URL___0___ + ") format(\"woff\");\n}\nbutton {\n  font-family: \"urwdin-regular\";\n  background: transparent;\n  color: #545454;\n  height: 3%;\n  font-size: 1.2em;\n  margin: 2% 3% 0 auto;\n  border: 2px solid #545454;\n}\nbutton:hover {\n  background: rgba(0, 0, 0, 0);\n  transition: all 0.3s ease;\n}\nbutton:active {\n  background: rgba(0, 0, 0, 0);\n}\n\n#list-view-btn {\n  margin: 0;\n}\n\n.dashboard {\n  width: 100vw;\n}\n.dashboard .table label {\n  font-size: 18px;\n  margin: 15px 10px 15px 10px;\n}\n.dashboard .table label textarea:focus,\n.dashboard .table label input:focus {\n  outline: none;\n}\n.dashboard .table label input {\n  border: none;\n  border-bottom: 1px solid black;\n  width: 25%;\n  font-size: 18px;\n}\n\n.table label {\n  margin: 10px;\n}\n.table label textarea:focus,\n.table label input {\n  border-bottom: 1px solid black;\n}\n.table label input:focus {\n  outline: none;\n}\n.table .list-header,\n.table .row {\n  color: #000000;\n  display: flex;\n  font-size: 11px;\n}\n.table .list-header div,\n.table .row div {\n  flex: 1 1;\n  padding: 0.2rem 0.4em;\n  border: 1px solid #545454;\n}\n.table .list-header {\n  display: flex;\n  position: -webkit-sticky;\n  position: sticky;\n  border: none;\n  margin-top: 20px;\n  color: white;\n  background-color: #545454;\n  text-align: center;\n  width: 100%;\n  top: 0;\n}\n.table .list-header div {\n  cursor: pointer;\n}\n\n.carousel .slider-wrapper.axis-horizontal .slider .slide .selected {\n  padding: none;\n}\n\n.stylist-panel-customer {\n  display: grid;\n  grid-template-rows: 1fr;\n  grid-template-columns: 1.1fr 0.9fr 1fr;\n  grid-gap: 1px;\n  margin-top: 5px;\n  padding: 5px;\n  font-size: 14px;\n}\n.stylist-panel-customer .mobile {\n  display: none;\n}\n.stylist-panel-customer .column-title {\n  text-align: center;\n  background: #545454;\n  color: white;\n}\n.stylist-panel-customer .info-container-1 {\n  display: grid;\n  padding: 10px 4%;\n  grid-template-rows: 1fr;\n  line-height: 25px;\n}\n.stylist-panel-customer .info-container-1 span {\n  display: inline-block;\n  height: 100%;\n}\n.stylist-panel-customer .info-container-2 {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.stylist-panel-customer .info-container {\n  display: grid;\n  grid-row-gap: 10px;\n  row-gap: 10px;\n  padding: 10px 4%;\n  text-align: left;\n  color: #000000;\n}\n.stylist-panel-customer .selfie-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto;\n  padding: 0;\n  width: 400px;\n  background: black;\n}\n.stylist-panel-customer .selfie-container div {\n  display: flex;\n  justify-content: center;\n}\n.stylist-panel-customer .selfie-container div #selfie {\n  margin: 0 auto;\n  width: 85%;\n  height: 100%;\n}\n\n.section {\n  text-align: center;\n  grid-gap: 0;\n  border: 0.5px solid black;\n}\n\n.dashboard {\n  font-size: 13px;\n  /* margin: 0 auto; */\n  width: 100%;\n  height: 100%;\n}\n\n.section-1 {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.section-2 {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  border-bottom: 0.5px solid grey;\n}\n\nh3,\np {\n  text-align: center;\n}\n\nimg {\n  width: 100%;\n  /* height: 45%; */\n  padding: 15px;\n}\n\n.section-subcontainer {\n  width: 25%;\n}\n\n.skeleton-content {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n}\n\n.skeleton {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 50%;\n}\n\n.section-3 {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n  padding-top: 10px;\n}\n\n.column-skeleton-fragrance {\n  width: 20%;\n  margin-top: 5px;\n}\n\n.column {\n  width: 66.6%;\n  margin: 5px 0 5px 0;\n  text-align: center;\n  overflow: auto;\n}\n\n.column:hover {\n  background-color: #ddd;\n}\n\n.column-name {\n  /* display: flex; */\n  /* width: 100%; */\n  background: lightgrey;\n  margin: 0;\n  padding: 7px;\n}\n\n.sub-header {\n  font-size: 14px;\n}\n\nselect {\n  display: block;\n  margin: 0 auto;\n  margin-top: 13px;\n}\n\n.list {\n  list-style: none;\n  padding-left: 0;\n}\n\nli {\n  padding-left: 10px;\n}\n\n.box {\n  display: flex;\n  justify-content: center;\n}\n\n.box:hover {\n  background-color: #ddd;\n}\n\n.box select {\n  margin: 0 auto;\n  background-color: #444444;\n  margin: 4px;\n  color: white;\n  padding: 12px;\n  width: 250px;\n  border: none;\n  font-size: 20px;\n  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);\n  -webkit-appearance: button;\n  -moz-appearance: button;\n       appearance: button;\n  outline: none;\n}\n\n.box select option {\n  padding: 30px;\n}\n\n.btn-container {\n  padding-left: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-content: space-around;\n}\n\n.dropdown {\n  background: #545454;\n  text-align: center;\n  position: absolute;\n  width: 14%;\n  z-index: 2;\n  /* Safari, Chrome and Opera > 12.1 */\n  /* Firefox < 16 */\n  /* Internet Explorer */\n  /* Opera < 12.1 */\n  animation: fadein 0.4s;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\nli {\n  padding: 8px 12px;\n}\n\nli:hover {\n  background-color: rgba(0, 0, 0, 0.14);\n  cursor: pointer;\n}\n\n#filter {\n  /* Safari, Chrome and Opera > 12.1 */\n  /* Firefox < 16 */\n  /* Internet Explorer */\n  /* Opera < 12.1 */\n  animation: conditionalOpen;\n  font-size: 18px;\n  transition: all 0.5s ease-in-out;\n  overflow: hidden;\n  height: 0;\n}\n\n#filter:target {\n  height: 100%;\n}\n\n@keyframes fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/* Firefox < 16 */\n/* Safari, Chrome and Opera > 12.1 */\n/* Internet Explorer */\n/* Opera < 12.1 */\n@keyframes conditionalOpen {\n  from {\n    transform: scaleY(0);\n  }\n  to {\n    transform: scaleY(1);\n  }\n}\n@keyframes conditionalClose {\n  from {\n    transform: scaleY(1);\n  }\n  to {\n    transform: scaleY(0);\n  }\n}\n@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {\n  #filter {\n    margin: 1em;\n  }\n\n  #list-view-btn {\n    width: 10%;\n    font-size: 13px;\n  }\n\n  .table {\n    font-family: \"urwdin-regular\";\n    margin: 1em;\n    display: flex;\n    flex-direction: column;\n    padding-top: 0;\n    /* Safari, Chrome and Opera > 12.1 */\n    /* Firefox < 16 */\n    /* Internet Explorer */\n    /* Opera < 12.1 */\n    animation: fadein 0.8s;\n  }\n  .table label {\n    margin: 10px;\n  }\n  .table label textarea:focus,\n.table label input {\n    border-bottom: 1px solid black;\n  }\n  .table label input:focus {\n    outline: none;\n  }\n  .table .list-header,\n.table .row {\n    color: #000000;\n    display: flex;\n    font-size: 11px;\n  }\n  .table .list-header div,\n.table .row div {\n    flex: 1 1;\n    padding: 0.2rem 0.4em;\n    border: 1px solid #545454;\n  }\n  .table .list-header {\n    color: white;\n    background-color: #545454;\n    text-align: center;\n  }\n  .table .list-header #conditions-goals {\n    font-size: 11px;\n  }\n  .table .list-header div {\n    cursor: pointer;\n  }\n  .table .list-header span {\n    font-size: 11px;\n  }\n  .table .body {\n    padding: 20px 0;\n  }\n}\n@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {\n  .row {\n    font-size: 11px;\n  }\n\n  .table .list-header {\n    font-size: 11px;\n  }\n  .table .list-header div {\n    font-size: 9px;\n  }\n  .table .list-header div div {\n    font-size: 9px;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) {\n  .dashboard #filter {\n    display: none;\n  }\n\n  .table .list-header {\n    display: none;\n  }\n\n  #list-view-btn {\n    width: 30%;\n    font-size: 13px;\n  }\n\n  .stylist-panel-customer {\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 1fr;\n  }\n  .stylist-panel-customer .mobile {\n    display: grid;\n  }\n  .stylist-panel-customer .hidden {\n    display: none;\n  }\n  .stylist-panel-customer .selfie-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0;\n    background: black;\n    width: 90%;\n  }\n  .stylist-panel-customer .selfie-container div {\n    margin: 0 auto;\n  }\n  .stylist-panel-customer .selfie-container div #selfie {\n    height: 100%;\n    width: 85%;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {\n  .dashboard #filter {\n    display: inline;\n    margin: 1em;\n    font-size: 13px;\n  }\n\n  .table .list-header {\n    display: flex;\n  }\n  .table .list-header div div {\n    font-size: 9px;\n  }\n  .table .list-header div div span {\n    font-size: 4px;\n  }\n\n  #list-view-btn {\n    width: 15%;\n    font-size: 13px;\n  }\n\n  .stylist-panel-customer {\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 1fr;\n  }\n  .stylist-panel-customer .mobile {\n    display: grid;\n  }\n  .stylist-panel-customer .column-title {\n    font-size: 13px;\n  }\n  .stylist-panel-customer .info-container {\n    font-size: 13px;\n  }\n  .stylist-panel-customer .info-container-1 {\n    font-size: 13px;\n  }\n  .stylist-panel-customer .info-container-2 {\n    font-size: 13px;\n  }\n  .stylist-panel-customer .selfie-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0;\n    background: black;\n    width: 75%;\n  }\n  .stylist-panel-customer .selfie-container div #selfie {\n    width: 70%;\n    height: 100%;\n  }\n}\n@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: portrait) {\n  .stylist-panel-customer {\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 1fr;\n  }\n  .stylist-panel-customer .mobile {\n    display: grid;\n  }\n  .stylist-panel-customer .mobile {\n    display: grid;\n  }\n  .stylist-panel-customer .hidden {\n    display: none;\n  }\n  .stylist-panel-customer .selfie-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0;\n    background: black;\n    width: 90%;\n  }\n  .stylist-panel-customer .selfie-container div {\n    margin: 0 auto;\n  }\n  .stylist-panel-customer .selfie-container div #selfie {\n    height: 100%;\n    width: 85%;\n  }\n}\n@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: landscape) {\n  .table .list-header {\n    display: flex;\n  }\n  .table .list-header div div {\n    font-size: 8.5px;\n  }\n  .table .list-header div div span {\n    font-size: 6px;\n  }\n\n  .stylist-panel-customer .mobile {\n    display: grid;\n  }\n  .stylist-panel-customer .selfie-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0;\n    background: black;\n    width: 100%;\n  }\n  .stylist-panel-customer .selfie-container div #selfie {\n    width: 70%;\n    height: 100%;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait) {\n  .dashboard #filter {\n    display: none;\n  }\n\n  .table .list-header {\n    display: none;\n  }\n\n  #list-view-btn {\n    width: 28%;\n    font-size: 12px;\n  }\n\n  .stylist-panel-customer {\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 1fr;\n  }\n  .stylist-panel-customer .mobile {\n    display: grid;\n  }\n  .stylist-panel-customer .hidden {\n    display: none;\n  }\n  .stylist-panel-customer .selfie-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0;\n    background: black;\n    width: 90%;\n  }\n  .stylist-panel-customer .selfie-container div {\n    margin: 0 auto;\n  }\n  .stylist-panel-customer .selfie-container div #selfie {\n    height: 100%;\n    width: 85%;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: landscape) {\n  .dashboard #filter {\n    display: inline;\n    margin: 1em;\n    font-size: 9px;\n  }\n\n  .table .list-header {\n    display: flex;\n  }\n  .table .list-header div div {\n    font-size: 7px;\n  }\n  .table .list-header div div span {\n    font-size: 6px;\n  }\n\n  #list-view-btn {\n    width: 16%;\n    font-size: 12px;\n  }\n\n  .stylist-panel-customer {\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 1fr;\n  }\n  .stylist-panel-customer .mobile {\n    display: grid;\n  }\n  .stylist-panel-customer .hidden {\n    display: none;\n  }\n  .stylist-panel-customer .column-title {\n    font-size: 10px;\n  }\n  .stylist-panel-customer .info-container {\n    font-size: 10px;\n  }\n  .stylist-panel-customer .info-container-1 {\n    font-size: 10px;\n  }\n  .stylist-panel-customer .info-container-2 {\n    font-size: 10px;\n  }\n  .stylist-panel-customer .selfie-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0;\n    background: black;\n    width: 90%;\n  }\n  .stylist-panel-customer .selfie-container div #selfie {\n    width: 70%;\n    height: 100%;\n  }\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Row.scss":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--6-oneOf-5-3!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./src/styles/Row.scss ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".MuiCardContent-root {\n  padding: 0;\n}\n\n.card-content {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 0px;\n}\n.card-content .locale {\n  display: flex;\n  justify-content: center;\n  flex: 0.7 1;\n  padding: 0.2rem 0.4em;\n}\n.card-content .name {\n  display: flex;\n  justify-content: center;\n  flex: 0.4 1;\n  padding: 0.2rem 0.4em;\n  font-size: 13px;\n}\n.card-content .image {\n  display: flex;\n  flex: 0.7 1;\n  justify-content: center;\n  height: auto;\n  padding: 0.2rem 0.4em;\n  font-size: 13px;\n}\n.card-content .image #modal {\n  display: none;\n  position: absolute;\n  width: 500px;\n  height: auto;\n}\n.card-content .image #selfie {\n  width: 50%;\n  height: 50%;\n  display: inline-block;\n  padding: 2px;\n}\n.card-content .user-attributes {\n  text-align: center;\n  padding: 0.2rem 0.4em;\n  flex: 1 1;\n  line-height: 24px;\n  font-size: 13px;\n}\n.card-content .user-attributes div {\n  font-size: 13px;\n}\n\n@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {\n  .locale {\n    text-align: center;\n    font-size: 11px;\n  }\n\n  .name {\n    text-align: center;\n    font-size: 11px;\n  }\n\n  .image {\n    display: inline-block;\n    display: flex;\n    flex: 0.7 1;\n    justify-content: center;\n    height: auto;\n  }\n\n  .user-attributes {\n    font-size: 11px;\n  }\n  .user-attributes div {\n    font-size: 11px;\n  }\n}\n@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {\n  .card-content {\n    font-size: 11px;\n  }\n  .card-content .locale {\n    font-size: 9px;\n    text-align: center;\n  }\n  .card-content .name {\n    font-size: 11px;\n    text-align: center;\n  }\n  .card-content .image {\n    font-size: 11px;\n  }\n\n  #selfie {\n    width: 50%;\n    height: 50%;\n    display: inline-block;\n  }\n\n  .user-attributes {\n    font-size: 11px;\n  }\n  .user-attributes div {\n    font-size: 11px;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {\n  .card-content {\n    display: flex;\n    flex-direction: column;\n  }\n  .card-content .image #selfie {\n    width: 90%;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape) {\n  .card-content .locale {\n    font-size: 9px;\n  }\n  .card-content .name {\n    font-size: 11px;\n    text-align: center;\n  }\n}\n@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: portrait) {\n  .card-content {\n    display: flex;\n    flex-direction: column;\n  }\n  .card-content .locale {\n    font-size: 13px;\n  }\n  .card-content .image #selfie {\n    width: 90%;\n  }\n\n  .user-attributes {\n    font-size: 13px;\n  }\n  .user-attributes div {\n    font-size: 13px;\n  }\n}\n@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: landscape) {\n  .card-content .locale {\n    font-size: 9px;\n  }\n  .card-content .name {\n    font-size: 11px;\n    text-align: center;\n  }\n  .card-content .image {\n    font-size: 11px;\n  }\n}\n.user-attributes {\n  font-size: 11px;\n}\n.user-attributes div {\n  font-size: 9px;\n}\n\n@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: portrait) {\n  .card-content {\n    display: flex;\n    flex-direction: column;\n  }\n  .card-content .image #selfie {\n    width: 90%;\n  }\n  .card-content .user-attributes {\n    font-size: 13px;\n  }\n  .card-content .user-attributes div {\n    font-size: 13px;\n  }\n}\n@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation: landscape) {\n  .card-content .locale {\n    font-size: 8px;\n  }\n  .card-content .name {\n    font-size: 11px;\n    text-align: center;\n  }\n  .card-content .image {\n    font-size: 11px;\n  }\n  .card-content .user-attributes {\n    font-size: 11px;\n  }\n  .card-content .user-attributes div {\n    font-size: 11px;\n  }\n}", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/index.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\",\n    \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\",\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\",\n    monospace;\n}\n", ""]);



/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-reveal/Fade */ "./node_modules/react-reveal/Fade.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_StylistPanelList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/StylistPanelList */ "./src/components/StylistPanelList.js");
/* harmony import */ var _components_StylistPanelCustomer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/StylistPanelCustomer */ "./src/components/StylistPanelCustomer.js");
/* harmony import */ var _assets_fekkai_logo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/fekkai-logo.png */ "./src/assets/fekkai-logo.png");
/* harmony import */ var _assets_fekkai_logo_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_fekkai_logo_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_apiService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/apiService */ "./src/services/apiService.js");
/* harmony import */ var aws4__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! aws4 */ "./node_modules/aws4/aws4.js");
/* harmony import */ var aws4__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(aws4__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _styles_App_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./styles/App.scss */ "./src/styles/App.scss");
/* harmony import */ var _styles_App_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_App_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/authService */ "./src/services/authService.js");
/* harmony import */ var _styles_Lightbox_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styles/Lightbox.scss */ "./src/styles/Lightbox.scss");
/* harmony import */ var _styles_Lightbox_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_Lightbox_scss__WEBPACK_IMPORTED_MODULE_11__);
var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/App.js";
// Packages and Libraries


 // Components


 // Assets

 // Helper functions

 // Packages


 // Css



 //AWS4 auth

let request = {
  hostname: "5qdtfxj5j5.execute-api.us-east-1.amazonaws.com",
  method: "GET",
  url: "https://5qdtfxj5j5.execute-api.us-east-1.amazonaws.com/latest",
  path: "/latest"
};
let signedRequest = aws4__WEBPACK_IMPORTED_MODULE_7___default.a.sign(request, {
  accessKeyId: "AKIA2XUR3X2XQ6MDEGJM",
  secretAccessKey: "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"
});
delete signedRequest.headers["Host"];
delete signedRequest.headers["Content-Length"];

class App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    this.fetchOrders = async () => {
      try {
        let response = await axios__WEBPACK_IMPORTED_MODULE_8___default.a.get("https://bespoke-backend-db.herokuapp.com/");
        this.setState({
          orders: response.data.orders
        });
      } catch (error) {
        console.error(error);
      }
    };

    this.fetchUserCode = async () => {
      try {
        await axios__WEBPACK_IMPORTED_MODULE_8___default.a.get("https://fekk.ai/backend/get_formula?user_code=".concat(this.state.note_attributes)).then(res => {
          this.setState({
            csv: res.data,
            thickness: res.data.user_data.answers.hair_thickness,
            texture: res.data.user_data.answers.hair_texture,
            hairCondition: res.data.user_data.answers["hair-condition"],
            hairGoals: res.data.user_data.answers["hair-goals"],
            age: res.data.user_data.answers.age,
            diet: res.data.user_data.answers.diet,
            zip: res.data.user_data.answers.zipcode.zip,
            city: res.data.user_data.weather.city,
            wash: res.data.user_data.answers.wash_frequency,
            afterwash: res.data.user_data.answers.afterwash,
            hairGoals2: res.data.user_data.answers["hair-goals-2"],
            sideSelfie: res.data.user_data["side_selfie"],
            frontSelfie: res.data.user_data["front_selfie"],
            shampooFormula: res.data.ingredients.shampoo.formula,
            conditionerFormula: res.data.ingredients.conditioner.formula
          });
        });
      } catch (error) {
        console.error(error);
      }
    };

    this.renderOrders = () => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        style: {
          listStyle: "none",
          textAlign: "left",
          overflow: "scroll",
          height: "".concat(400, "px"),
          paddingLeft: "0",
          paddingRight: "".concat(10, "px"),
          marginBottom: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }, !this.state.orders ? "" : this.state.orders.map(element => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "order",
        onClick: async () => {
          return await this.setState({
            name: element.shipping_address.name,
            address: element.shipping_address.address1 + (element.shipping_address.address2 ? " " + element.shipping_address.address2 : "") + " " + element.shipping_address.city + " " + element.shipping_address.province_code + " " + element.shipping_address.zip,
            zip: element.shipping_address.zip,
            email: element.email,
            phone: element.phone,
            orderNumber: element.order_number,
            createdAt: element.created_at,
            browserIp: element.browser_ip,
            gateway: element.gateway,
            note_attributes: undefined || !element.note_attributes[0] || null ? "" : element.note_attributes[0].value,
            isLoading: true
          }), await this.fetchUserCode(); // await this.setState({
          //   isLoading: false
          // });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: element.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        },
        __self: this
      }, "Order ID:"), " ", element.id), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: element.shipping_address.name,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 191
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        },
        __self: this
      }, "Name:"), " ", element.shipping_address.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 195
        },
        __self: this
      })))));
    };

    this.state = {
      user: {},
      orders: null,
      validationError: "",
      name: "",
      address: "",
      zip: "",
      email: "",
      phone: "",
      orderNumber: "",
      createdAt: "",
      note_attributes: null,
      thickness: null,
      texture: null,
      hairCondition: null,
      hairGoals: null,
      age: null,
      diet: null,
      city: null,
      wash: null,
      afterwash: null,
      hairGoals2: null,
      conditionerFormula: null,
      shampooFormula: null,
      photoIndex: 0,
      isOpen: false
    };
  }

  async componentDidMount() {
    try {
      const fetchedUser = await Object(_services_apiService__WEBPACK_IMPORTED_MODULE_6__["getProfile"])();
      this.setState(state => {
        return {
          isSignedIn: _services_authService__WEBPACK_IMPORTED_MODULE_10__["default"].isAuthenticated(),
          user: fetchedUser
        };
      });
    } catch (e) {
      throw e;
    }

    this.fetchOrders();
    this.setState({
      currentLocation: window.location.pathname
    });
  }

  render() {
    const _this$state = this.state,
          user = _this$state.user,
          thickness = _this$state.thickness,
          texture = _this$state.texture,
          hairCondition = _this$state.hairCondition,
          hairGoals = _this$state.hairGoals,
          age = _this$state.age,
          name = _this$state.name,
          diet = _this$state.diet,
          orderNumber = _this$state.orderNumber,
          createdAt = _this$state.createdAt,
          city = _this$state.city,
          wash = _this$state.wash,
          afterwash = _this$state.afterwash,
          hairGoals2 = _this$state.hairGoals2,
          sideSelfie = _this$state.sideSelfie,
          frontSelfie = _this$state.frontSelfie,
          currentLocation = _this$state.currentLocation,
          isLoading = _this$state.isLoading;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "app",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 228
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 229
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_2___default.a, {
      big: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 230
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
      className: "img-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 231
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      id: "fekkai-logo",
      alt: "fekkai-logo",
      src: _assets_fekkai_logo_png__WEBPACK_IMPORTED_MODULE_5___default.a,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 232
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      style: {
        marginBottom: 0
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 237
      },
      __self: this
    })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
      id: "main-page",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 246
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 247
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
      exact: true,
      path: "/",
      component: _components_StylistPanelList__WEBPACK_IMPORTED_MODULE_3__["default"],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 248
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
      path: "/stylist-panel-list",
      user: user,
      component: _components_StylistPanelList__WEBPACK_IMPORTED_MODULE_3__["default"],
      createdAt: createdAt,
      orderNumber: orderNumber,
      name: name,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 249
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
      thickness: thickness ? thickness === 1 ? "finest" :  false || thickness === 2 ? "finer" :  false || thickness === 3 ? "fine" :  false || thickness === 4 ? "medium" :  false || thickness === 5 ? "thick" :  false || thickness === 6 ? "thicker" :  false || thickness === 7 ? "thickest" : "" : "",
      texture: texture ? texture === 1 ? "straight" :  false || texture === 2 ? "wavy" :  false || texture === 3 ? "curly" :  false || texture === 4 ? "coily" : "" : "",
      hairCondition: hairCondition,
      hairGoals: hairGoals,
      age: age,
      diet: diet,
      zip: !this.state.zip ? "" : this.state.zip,
      orderNumber: orderNumber,
      city: city,
      wash: wash,
      afterwash: afterwash,
      hairGoals2: hairGoals2,
      sideSelfie: sideSelfie,
      frontSelfie: frontSelfie,
      isLoading: isLoading,
      path: "/stylist-panel-customer",
      user: user,
      component: _components_StylistPanelCustomer__WEBPACK_IMPORTED_MODULE_4__["default"],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 257
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 309
      },
      __self: this
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/assets/fekkai-logo.png":
/*!************************************!*\
  !*** ./src/assets/fekkai-logo.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/fekkai-logo.8629731c.png";

/***/ }),

/***/ "./src/assets/no-photo.png":
/*!*********************************!*\
  !*** ./src/assets/no-photo.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAGBGCm0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUZCMEQzRkNCNDNFMTFFOEJFMzdEREMyNTY3MzVDRTkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUZCMEQzRkJCNDNFMTFFOEJFMzdEREMyNTY3MzVDRTkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjNCMzVCQkIwMDIyQ0M4NjcwREIxQ0I4ODk1MTg1NDMyIiBzdFJlZjpkb2N1bWVudElEPSIzQjM1QkJCMDAyMkNDODY3MERCMUNCODg5NTE4NTQzMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkIVOboAABfvSURBVHja7NUxCsMgFAbgpGZy9gp6Ae9/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"

/***/ }),

/***/ "./src/assets/urwdin-regular-webfont.woff":
/*!************************************************!*\
  !*** ./src/assets/urwdin-regular-webfont.woff ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/urwdin-regular-webfont.47b5f38a.woff";

/***/ }),

/***/ "./src/components/Conditions.js":
/*!**************************************!*\
  !*** ./src/components/Conditions.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Conditions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Panel_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/Panel.scss */ "./src/styles/Panel.scss");
/* harmony import */ var _styles_Panel_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_Panel_scss__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/components/Conditions.js";


function Conditions(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    style: {
      display: "flex",
      flexDirection: "column",
      listStyle: "none"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "bleached",
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, "bleached"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "color-treated-highlights",
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, "color-treated-highlights"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "chemically-treated",
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "chemically-treated"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "chemically-straightened",
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "chemically-straightened"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "split-ends",
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "split-ends"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "frequent-heat-styling-tools",
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "frequent-heat-styling-tools"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "none",
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, "none"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  })));
}

/***/ }),

/***/ "./src/components/Goals.js":
/*!*********************************!*\
  !*** ./src/components/Goals.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Goals; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Panel_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/Panel.scss */ "./src/styles/Panel.scss");
/* harmony import */ var _styles_Panel_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_Panel_scss__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/components/Goals.js";


function Goals(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    style: {
      display: "flex",
      flexDirection: "column",
      listStyle: "none"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, "color-protect"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, "uv-protect"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, "damage-repair"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, "frizz-control"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, "smoothing"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "healthy-shine"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, "hydrate"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "hair-loss-prevention"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    onClick: props.handleChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, "volumizing ")));
}

/***/ }),

/***/ "./src/components/ScrollToTop.js":
/*!***************************************!*\
  !*** ./src/components/ScrollToTop.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");



class ScrollToTop extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(ScrollToTop));

/***/ }),

/***/ "./src/components/StylistPanelCustomer.js":
/*!************************************************!*\
  !*** ./src/components/StylistPanelCustomer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StylistPanelCustomer; });
/* harmony import */ var _Users_jameskim_dev_bespoke_bespoke_panels_client_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-reveal/Fade */ "./node_modules/react-reveal/Fade.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var aws4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! aws4 */ "./node_modules/aws4/aws4.js");
/* harmony import */ var aws4__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(aws4__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_responsive_carousel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-responsive-carousel */ "./node_modules/react-responsive-carousel/lib/index.js");
/* harmony import */ var react_responsive_carousel__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_responsive_carousel__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _assets_no_photo_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/no-photo.png */ "./src/assets/no-photo.png");
/* harmony import */ var _assets_no_photo_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_no_photo_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _styles_Panel_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/Panel.scss */ "./src/styles/Panel.scss");
/* harmony import */ var _styles_Panel_scss__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_Panel_scss__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-responsive-carousel/lib/styles/carousel.min.css */ "./node_modules/react-responsive-carousel/lib/styles/carousel.min.css");
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_12__);

var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/components/StylistPanelCustomer.js";

function _templateObject() {
  const data = Object(_Users_jameskim_dev_bespoke_bespoke_panels_client_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  display: block;\n  margin: 0 auto;\n  border-color: red;\n  margin-top: ", "%;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}













const override = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject(), 7);
let request = {
  hostname: "5qdtfxj5j5.execute-api.us-east-1.amazonaws.com",
  method: "GET",
  url: "https://5qdtfxj5j5.execute-api.us-east-1.amazonaws.com/latest",
  path: "/latest"
};
let signedRequest = aws4__WEBPACK_IMPORTED_MODULE_6___default.a.sign(request, {
  accessKeyId: "AKIA2XUR3X2XQ6MDEGJM",
  secretAccessKey: "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"
});
delete signedRequest.headers["Host"];
delete signedRequest.headers["Content-Length"];
class StylistPanelCustomer extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);

    this.fetchUserCodeData = async () => {
      let userResponse = await axios__WEBPACK_IMPORTED_MODULE_5___default.a.get( // https://fekk.ai/backend/get_formula?user_code=
      "https://fekkai-backend.herokuapp.com/backend/formula?user_code=".concat(this.props.location.state.userCode));
      await this.setState({
        loading: false,
        thickness: userResponse.data.user_data.answers.hair_thickness,
        texture: parseInt(userResponse.data.user_data.answers.hair_texture),
        length: parseInt(userResponse.data.user_data.answers.hair_length),
        condition: userResponse.data.user_data.answers.hair_condition,
        hairGoals: userResponse.data.user_data.answers.hair_goals,
        zip: userResponse.data.user_data.answers.zipcode ? userResponse.data.user_data.answers.zipcode : "n/a",
        city: !userResponse.data.user_data.weather ? "n/a" : userResponse.data.user_data.weather.city,
        uvRisk: !userResponse.data.user_data.weather ? "n/a" : userResponse.data.user_data.weather.scores.uv_risk.score ? userResponse.data.user_data.weather.scores.uv_risk.score : userResponse.data.user_data.weather.scores.uv_risk,
        airQuality: !userResponse.data.user_data.weather ? "n/a" : userResponse.data.user_data.weather.scores.air_quality.score ? userResponse.data.user_data.weather.scores.air_quality.score : userResponse.data.user_data.weather.scores.air_quality,
        waterHardness: !userResponse.data.user_data.weather ? "n/a" : userResponse.data.user_data.weather.scores.water_hardness.score ? userResponse.data.user_data.weather.scores.water_hardness.score : userResponse.data.user_data.weather.scores.water_hardness,
        humidity: !userResponse.data.user_data.weather ? "n/a" : userResponse.data.user_data.weather.scores.humidity.score ? userResponse.data.user_data.weather.scores.humidity.score : userResponse.data.user_data.weather.scores.humidity,
        windSpeed: !userResponse.data.user_data.weather ? "n/a" : userResponse.data.user_data.weather.scores.wind_speed.score ? userResponse.data.user_data.weather.scores.wind_speed.score : userResponse.data.user_data.weather.scores.wind_speed,
        frontSelfie: userResponse.data.user_data.front_selfie
      });
    };

    this.formulaKeys = () => {
      const shampooFormulaData = this.state.shampooFormula;
      const shampooScores = [];
      const conditionerScores = [];
      const skeletons = [// "volume1",
      // "colorprotect1",
      // "moisture1",
      // "repair1",
      // "blond1"
      "moi1_SH", "moi1_CN", "rep1_SH", "rep1_CN", "moi1_TH", "vol1_SH", "vol1_CN", "vol1_TH", "col1_SH", "col1_CN", "col1_TH"];
      let shampooKey;
      let shampooValue;
      let conditionerKey;
      let conditionerValue; // console.log(recoFormula, conditionerFormulaData);

      for (let key in shampooFormulaData) {
        if (skeletons.indexOf(key) > -1) {
          console.log(skeletons);
          shampooScores.push(shampooFormulaData[key]);
          shampooScores.sort((a, b) => b - a);
        }

        if (shampooScores[0] === shampooFormulaData[key]) {
          console.log(shampooScores);
          shampooKey = key;
          shampooValue = shampooFormulaData[key];
        }
      }

      shampooScores.sort((a, b) => b - a);

      for (let key in shampooFormulaData) {
        if (skeletons.indexOf(key) > -1) {
          conditionerScores.push(shampooFormulaData[key]);
          conditionerScores.sort((a, b) => b - a);
        }

        if (conditionerScores[0] === shampooFormulaData[key]) {
          conditionerKey = key;
          conditionerValue = shampooFormulaData[key];
        }
      }

      conditionerScores.sort((a, b) => b - a);
      this.setState({
        collectionLoading: false,
        shampooKey,
        shampooValue,
        conditionerKey,
        conditionerValue
      });
    };

    this.state = {
      loading: true,
      collectionLoading: true,
      photoIndex: 0,
      isOpen: false,
      userCode: ""
    };
  }

  async componentDidMount() {
    await this.fetchUserCodeData();
    await this.formulaKeys();
  }

  render() {
    const _this$props$location$ = this.props.location.state,
          userCode = _this$props$location$.userCode,
          name = _this$props$location$.name,
          locale = _this$props$location$.locale,
          email = _this$props$location$.email,
          thickness = _this$props$location$.thickness,
          texture = _this$props$location$.texture,
          condition = _this$props$location$.condition,
          hairGoals = _this$props$location$.hairGoals,
          hairColor = _this$props$location$.hairColor,
          length = _this$props$location$.length,
          city = _this$props$location$.city,
          uvRisk = _this$props$location$.uvRisk,
          airQuality = _this$props$location$.airQuality,
          waterHardness = _this$props$location$.waterHardness,
          humidity = _this$props$location$.humidity,
          windSpeed = _this$props$location$.windSpeed,
          shampooKey = _this$props$location$.shampooKey,
          conditionerKey = _this$props$location$.conditionerKey,
          thirdKey = _this$props$location$.thirdKey,
          frontSelfie = _this$props$location$.frontSelfie;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 192
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/stylist-panel-list",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 193
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      id: "list-view-btn",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 194
      },
      __self: this
    }, "\u2190 LIST VIEW")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_8__["RingLoader"], {
      css: override,
      size: 150 //size={"150px"} this also works
      ,
      color: "#000000",
      loading: this.state.loading,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 196
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_3___default.a, {
      big: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 203
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Paper"], {
      elevation: 1,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 204
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "stylist-panel-customer",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 205
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 206
      },
      __self: this
    }, "CUSTOMER"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 207
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 208
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "info-container-1",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 209
      },
      __self: this
    }, "NAME: ", name, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 211
      },
      __self: this
    }), "EMAIL: ", email, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 213
      },
      __self: this
    }), "USER CODE: ", userCode), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "info-container-1 hidden",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 216
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "info-container-1 hidden",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 217
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 218
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 219
      },
      __self: this
    })))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Paper"], {
      elevation: 1,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 224
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "stylist-panel-customer",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 225
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 226
      },
      __self: this
    }, "CHARACTERISTICS"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title hidden",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 227
      },
      __self: this
    }, "PROFILE"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title hidden",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 228
      },
      __self: this
    }, "SELFIE"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "info-container info-container2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 229
      },
      __self: this
    }, "THICKNESS:", " ", thickness ? thickness : "n/a", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 249
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 250
      },
      __self: this
    }), "TEXTURE:", " ", texture ? texture : "n/a", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 264
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 265
      },
      __self: this
    }), "COLOR:", " ", hairColor ? hairColor : "n/a", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 285
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 286
      },
      __self: this
    }), "HAIR LENGTH:", " ", length ? length : "n/a", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 300
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 301
      },
      __self: this
    }), "CONDITION:", " ", !condition ? "n/a" : condition === "none" ? "" : condition.join(", "), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 308
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 309
      },
      __self: this
    }), "MAIN GOALS:", " ", !hairGoals || hairGoals === "none" ? "n/a" : hairGoals.join(", "), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 314
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 315
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "info-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 318
      },
      __self: this
    }, "CITY: ", !city ? "n/a" : city, " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 319
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 320
      },
      __self: this
    }), " UV: ", !uvRisk ? "n/a" : uvRisk, ";", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 320
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 321
      },
      __self: this
    }), "AIR QUALITY: ", !airQuality ? "n/a" : airQuality, ";", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 322
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 323
      },
      __self: this
    }), " WATER PH: ", !waterHardness ? "n/a" : waterHardness, ";", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 323
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 324
      },
      __self: this
    }), " HUMIDITY: ", !humidity ? "n/a" : humidity, ";", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 324
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 325
      },
      __self: this
    }), " WIND: ", !windSpeed ? "n/a" : windSpeed, ";", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 326
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "selfie-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 329
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 331
      },
      __self: this
    }, frontSelfie ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      id: "selfie",
      alt: frontSelfie,
      src: frontSelfie,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 333
      },
      __self: this
    }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      id: "selfie",
      style: {
        height: "100%"
      },
      alt: _assets_no_photo_png__WEBPACK_IMPORTED_MODULE_10___default.a,
      src: _assets_no_photo_png__WEBPACK_IMPORTED_MODULE_10___default.a,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 335
      },
      __self: this
    }))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Paper"], {
      elevation: 1,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 347
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "stylist-panel-customer",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 348
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title mobile",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 349
      },
      __self: this
    }, "FORMULAS"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title hidden",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 350
      },
      __self: this
    }, "SHAMPOO"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title hidden",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 351
      },
      __self: this
    }, "CONDITIONER"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "column-title hidden",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 352
      },
      __self: this
    }, "THIRD"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "info-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 353
      },
      __self: this
    }, "RECO COLLECTION", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      class: "mobile",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 354
      },
      __self: this
    }, " SHAMPOO:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 355
      },
      __self: this
    }, this.state.collectionLoading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_8__["PulseLoader"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 357
      },
      __self: this
    }) : shampooKey ? shampooKey === "vol1_SH" ? "Full Blown (Lightest Weight)" :  false || shampooKey === "col1_SH" ? "Technician Color (Medium Moisture)" :  false || shampooKey === "moi1_SH" ? "Brilliant Gloss (Medium Moisture)" :  false || shampooKey === "rep1_SH" ? "Super Strength (Strong Moisture)" :  false || shampooKey === "bl1_SH" ? "Baby Blonde (Medium Moisture)" : "" : "")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "info-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 377
      },
      __self: this
    }, "RECO COLLECTION", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      class: "mobile",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 378
      },
      __self: this
    }, " CONDITIONER:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 379
      },
      __self: this
    }, this.state.collectionLoading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_8__["PulseLoader"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 381
      },
      __self: this
    }) : conditionerKey ? conditionerKey === "vol1_CN" ? "Full Blown (Lightest Weight)" :  false || conditionerKey === "col1_CN" ? "Technician Color (Medium Moisture)" :  false || conditionerKey === "moi1_CN" ? "Brilliant Gloss (Medium Moisture)" :  false || conditionerKey === "rep1_CN" ? "Super Strength (Strong Moisture)" : "" : "")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "info-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 399
      },
      __self: this
    }, "RECO COLLECTION", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      class: "mobile",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 400
      },
      __self: this
    }, " THIRD:"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 401
      },
      __self: this
    }, this.state.collectionLoading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_8__["PulseLoader"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 403
      },
      __self: this
    }) : thirdKey ? thirdKey === "vol1_TH" ? "Full Blown (Lightest Weight)" :  false || thirdKey === "col1_TH" ? "Technician Color (Medium Moisture)" :  false || thirdKey === "moi1_TH" ? "Brilliant Gloss (Medium Moisture)" :  false || thirdKey === "rep1_TH" ? "Super Strength (Strong Moisture)" :  false || thirdKey === "bl1_TH" ? "Baby Blonde (Medium Moisture)" : "" : ""))))));
  }

}

/***/ }),

/***/ "./src/components/StylistPanelList.js":
/*!********************************************!*\
  !*** ./src/components/StylistPanelList.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StylistPanelList; });
/* harmony import */ var _Users_jameskim_dev_bespoke_bespoke_panels_client_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Conditions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Conditions */ "./src/components/Conditions.js");
/* harmony import */ var _Goals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Goals */ "./src/components/Goals.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "./src/components/common/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-reveal/Fade */ "./node_modules/react-reveal/Fade.js");
/* harmony import */ var react_reveal_Fade__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ "./node_modules/@material-ui/core/esm/CircularProgress/index.js");
/* harmony import */ var _styles_Panel_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/Panel.scss */ "./src/styles/Panel.scss");
/* harmony import */ var _styles_Panel_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_Panel_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var aws4__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! aws4 */ "./node_modules/aws4/aws4.js");
/* harmony import */ var aws4__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(aws4__WEBPACK_IMPORTED_MODULE_13__);

var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/components/StylistPanelList.js";

function _templateObject() {
  const data = Object(_Users_jameskim_dev_bespoke_bespoke_panels_client_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  display: block;\n  margin: 0 auto;\n  margin-top: ", "%;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

 //components








 // styling





const override = Object(_emotion_core__WEBPACK_IMPORTED_MODULE_11__["css"])(_templateObject(), 7);
const primary = [600];
let request = {
  hostname: "5qdtfxj5j5.execute-api.us-east-1.amazonaws.com",
  method: "GET",
  url: "https://5qdtfxj5j5.execute-api.us-east-1.amazonaws.com/latest",
  path: "/latest"
};
let signedRequest = aws4__WEBPACK_IMPORTED_MODULE_13___default.a.sign(request, {
  accessKeyId: "AKIA2XUR3X2XQ6MDEGJM",
  secretAccessKey: "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"
});
delete signedRequest.headers["Host"];
delete signedRequest.headers["Content-Length"];
const apiKey = "804727d788a44db68a47c64f10fa573f";
class StylistPanelList extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);
    this.container1 = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
    this.container2 = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();

    this.fetchOrders = async () => {
      try {
        let response = await axios__WEBPACK_IMPORTED_MODULE_12___default()("https://fekkai-backend.herokuapp.com/backend/get_user_codes?apikey=804727d788a44db68a47c64f10fa573f"); // response = JSON.parse(JSON.stringify(response));

        const data = [];

        for (let userCode of response.data.slice(response.data.length - 100, response.data.length).reverse()) {
          let userResponse = await axios__WEBPACK_IMPORTED_MODULE_12___default.a.get("https://fekkai-backend.herokuapp.com/backend/formula?user_code=".concat(userCode.user_code));
          const shampooScores = [];
          const conditionerScores = [];
          const thirdScores = [];
          const skeletons = ["moi1_SH", "moi1_CN", "moi1_TH", "col1_SH", "col1_CN", "col1_TH", "vol1_SH", "vol1_CN", "vol1_TH", "rep1_SH", "rep1_CN", "rep1_TH", "bl1_SH", "bl1_TH"]; // sort shampoo scores

          if (userResponse.data.user_data.compute === true) {
            let shampooKey;
            let conditionerKey;
            let thirdKey;
            let shampooValue;
            let conditionerValue;
            let thirdValue; // data.push({
            //   userCode: userCode.user_code,
            //   locale: userCode.created || userCode.updated
            // });
            // } else {

            for (let key in userResponse.data.ingredients.master.formula) {
              if (key.includes("SH") && skeletons.indexOf(key) > -1) {
                // indexOf returns first index where an element can be found. -1 is not present.
                shampooScores.push(parseInt(userResponse.data.ingredients.master.formula[key]));
                shampooScores.sort((a, b) => b - a);
              }

              if (shampooScores[0] === userResponse.data.ingredients.master.formula[key] && key.includes("SH")) {
                shampooKey = key;
                shampooValue = userResponse.data.ingredients.master.formula[key];
              }
            }

            shampooScores.sort((a, b) => b - a); // sort conditioner scores

            for (let key in userResponse.data.ingredients.master.formula) {
              if (key.includes("CN") && skeletons.indexOf(key) > -1) {
                // indexOf returns first index where an element can be found. -1 is not present.
                conditionerScores.push(parseInt(userResponse.data.ingredients.master.formula[key]));
                conditionerScores.sort((a, b) => b - a);
              }

              if (conditionerScores[0] === userResponse.data.ingredients.master.formula[key] && key.includes("CN")) {
                conditionerKey = key;
                conditionerValue = userResponse.data.ingredients.master.formula[key];
              }
            }

            conditionerScores.sort((a, b) => b - a);

            for (let key in userResponse.data.ingredients.master.formula) {
              if (key.includes("TH") && skeletons.indexOf(key) > -1) {
                // indexOf returns first index where an element can be found. -1 is not present.
                thirdScores.push(parseInt(userResponse.data.ingredients.master.formula[key]));
                thirdScores.sort((a, b) => b - a);
              }

              if (thirdScores[0] === userResponse.data.ingredients.master.formula[key] && key.includes("TH")) {
                thirdKey = key;
                thirdValue = userResponse.data.ingredients.master.formula[key];
              }
            }

            thirdScores.sort((a, b) => b - a);
            data.push({
              id: userResponse.data._id,
              userCode: userCode.user_code,
              locale: userCode.created || userCode.updated,
              name: userResponse.data.user_data.name,
              email: userResponse.data.user_data.email,
              thickness: userResponse.data.user_data.answers.hair_thickness,
              texture: userResponse.data.user_data.answers.hair_texture,
              hairColor: userResponse.data.user_data.answers.hair_color,
              condition: userResponse.data.user_data.answers.hair_condition,
              hairGoals: userResponse.data.user_data.answers.hair_goals,
              length: userResponse.data.user_data.answers.hair_length,
              city: userResponse.data.user_data.weather.city,
              uvRisk: userResponse.data.user_data.weather.scores.uv_risk,
              airQuality: userResponse.data.user_data.weather.scores.air_quality,
              waterHardness: userResponse.data.user_data.weather.scores.water_hardness,
              humidity: userResponse.data.user_data.weather.scores.humidity,
              windSpeed: userResponse.data.user_data.weather.scores.wind_speed,
              shampooKey,
              conditionerKey,
              thirdKey,
              frontSelfie: userResponse.data.user_data.front_selfie
            });
          }
        }

        this.setState({
          data
        });
      } catch (error) {
        console.error(error);
      }
    };

    this.compareAsc = key => {
      this.setState({
        ascending: true
      });
      return function (a, b) {
        if (a[key] < b[key]) {
          return -1;
        }
      };
    };

    this.compareDsc = key => {
      this.setState({
        ascending: false
      });
      return function (a, b) {
        if (a[key] > b[key]) {
          return -1;
        }
      };
    };

    this.sortBy = key => {
      let arrayCopy = [...this.state.data];

      if (this.state.ascending === true) {
        arrayCopy.sort(this.compareDsc(key));
        this.setState({
          data: arrayCopy
        });
      } else if (this.state.ascending === false) {
        arrayCopy.sort(this.compareAsc(key));
        this.setState({
          data: arrayCopy
        });
      }
    };

    this.handleChange = e => {
      this.setState({
        filter: e.target.innerText || e.target.name,
        checked: true,
        conditionOpen: false,
        goalsOpen: false
      });
    };

    this.reset = e => {
      this.setState({
        filter: "",
        conditionOpen: false,
        goalsOpen: false
      });
    };

    this.handleConditionBtn = () => {
      this.setState(state => {
        return {
          conditionOpen: !state.conditionOpen
        };
      });
    };

    this.handleGoalsBtn = () => {
      this.setState(state => {
        return {
          goalsOpen: !state.goalsOpen
        };
      });
    };

    this.handleClickOutside = event => {
      if (this.container1.current && !this.container1.current.contains(event.target)) {
        this.setState({
          conditionOpen: false
        });
      }

      if (this.container2.current && !this.container2.current.contains(event.target)) {
        this.setState({
          goalsOpen: false
        });
      }
    };

    this.refreshPage = () => {
      window.location.reload();
    };

    this.state = {
      reload: false,
      filter: "",
      data: [],
      ascending: false,
      loading: true,
      checked: false,
      conditionOpen: false,
      goalsOpen: false
    };
  }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    await this.fetchOrders();
    await this.setState({
      loading: false
    });
    const script = document.createElement("script");
    script.src = "https://use.typekit.net/foobar.js";
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    let counter = 0;
    const _this$state = this.state,
          filter = _this$state.filter,
          data = _this$state.data,
          ascending = _this$state.ascending;
    const filteredData = data.filter(item => {
      return Object.keys(item).some(key => key === "condition" || key === "hairGoals" ? item[key].toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) : "");
    });
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "dashboard",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 325
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      id: "product-component-2dd3c8704e6",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 326
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_reveal_Fade__WEBPACK_IMPORTED_MODULE_6___default.a, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 327
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      onClick: this.refreshPage,
      id: "list-view-btn",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 328
      },
      __self: this
    }, "REFRESH"), !this.state.loading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      align: "left",
      id: "filter",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 332
      },
      __self: this
    }, this.state.filter ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 334
      },
      __self: this
    }, "conditions/goals:", " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      style: {
        border: "2px solid #545454",
        padding: "0 7px"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 336
      },
      __self: this
    }, this.state.filter, " ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      style: {
        cursor: "pointer"
      },
      onClick: this.reset,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 343
      },
      __self: this
    }, "x"))) : "") : "", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Paper"], {
      elevation: 0,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 360
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "table",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 361
      },
      __self: this
    }, !this.state.loading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "list-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 365
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 0.7
      },
      onClick: () => this.sortBy("locale"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 366
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 372
      },
      __self: this
    }, " ", "DATE_TIME ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 374
      },
      __self: this
    }, ascending ? "▲" : "▼"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 0.4
      } // onClick={() => this.sortBy("name")}
      ,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 377
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 383
      },
      __self: this
    }, "NAME ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 384
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 0.7
      } // onClick={() => this.sortBy("frontSelfie")}
      ,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 388
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 394
      },
      __self: this
    }, "SELFIE")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 0.5
      },
      onClick: () => this.sortBy("thickness"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 396
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 402
      },
      __self: this
    }, "THICK ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 403
      },
      __self: this
    }, ascending ? "▲" : "▼"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 0.5
      },
      onClick: () => this.sortBy("texture"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 406
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 412
      },
      __self: this
    }, "TEXTURE ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 413
      },
      __self: this
    }, ascending ? "▲" : "▼"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 0.5
      },
      onClick: () => this.sortBy("hairColor"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 416
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 422
      },
      __self: this
    }, "COLOR ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 423
      },
      __self: this
    }, ascending ? "▲" : "▼"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      style: {
        flex: 0.5
      },
      onClick: () => this.sortBy("length"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 426
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 432
      },
      __self: this
    }, "LENGTH ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 433
      },
      __self: this
    }, ascending ? "▲" : "▼"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "container",
      id: "conditions-goals",
      style: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        flex: 1
      },
      ref: this.container1,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 436
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      onClick: this.handleConditionBtn,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 447
      },
      __self: this
    }, "CONDITIONS \u2630"), this.state.conditionOpen && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Conditions__WEBPACK_IMPORTED_MODULE_2__["default"] // checked={this.state.checked}
    , {
      handleChange: this.handleChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 449
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      id: "conditions-goals",
      style: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        flex: 1
      },
      ref: this.container2,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 456
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      onClick: this.handleGoalsBtn,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 466
      },
      __self: this
    }, "GOALS \u2630"), this.state.goalsOpen && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Goals__WEBPACK_IMPORTED_MODULE_3__["default"], {
      handleChange: this.handleChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 468
      },
      __self: this
    }))) : "", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 475
      },
      __self: this
    }, filteredData.map(rowData => {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], {
        key: rowData.id,
        style: {
          textDecoration: "none"
        },
        to: {
          pathname: "/stylist-panel-customer",
          state: {
            userCode: rowData.userCode,
            name: rowData.name,
            locale: rowData.locale,
            email: rowData.email,
            thickness: rowData.thickness,
            texture: rowData.texture,
            hairColor: rowData.hairColor,
            condition: rowData.condition,
            hairGoals: rowData.hairGoals,
            length: rowData.length,
            city: rowData.city,
            uvRisk: rowData.uvRisk,
            airQuality: rowData.airQuality,
            waterHardness: rowData.waterHardness,
            humidity: rowData.humidity,
            windSpeed: rowData.windSpeed,
            shampooKey: rowData.shampooKey,
            conditionerKey: rowData.conditionerKey,
            thirdKey: rowData.thirdKey,
            frontSelfie: rowData.frontSelfie
          }
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 478
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_common__WEBPACK_IMPORTED_MODULE_4__["Row"], Object.assign({}, rowData, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 509
        },
        __self: this
      })));
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_8__["RingLoader"], {
      css: override,
      size: 150,
      color: "#545454",
      loading: this.state.loading,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 513
      },
      __self: this
    }))))));
  }

}

/***/ }),

/***/ "./src/components/common/Button.js":
/*!*****************************************!*\
  !*** ./src/components/common/Button.js ***!
  \*****************************************/
/*! exports provided: Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/components/common/Button.js";

const Button = ({
  onClick,
  title,
  type
}) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
  type: type,
  onClick: onClick,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 3
  },
  __self: undefined
}, title);

/***/ }),

/***/ "./src/components/common/Container.js":
/*!********************************************!*\
  !*** ./src/components/common/Container.js ***!
  \********************************************/
/*! exports provided: Container */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/components/common/Container.js";

const Container = ({
  classname,
  children
}) => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classname,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: undefined
  }, children);
};

/***/ }),

/***/ "./src/components/common/Header.js":
/*!*****************************************!*\
  !*** ./src/components/common/Header.js ***!
  \*****************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/components/common/Header.js";

const Header = ({
  classname,
  children
}) => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classname,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: undefined
  }, children);
};

/***/ }),

/***/ "./src/components/common/Row.js":
/*!**************************************!*\
  !*** ./src/components/common/Row.js ***!
  \**************************************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return Row; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Card */ "./node_modules/@material-ui/core/esm/Card/index.js");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/CardContent */ "./node_modules/@material-ui/core/esm/CardContent/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _styles_Row_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/Row.scss */ "./src/styles/Row.scss");
/* harmony import */ var _styles_Row_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_Row_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_no_photo_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/no-photo.png */ "./src/assets/no-photo.png");
/* harmony import */ var _assets_no_photo_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_no_photo_png__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/components/common/Row.js";






const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["makeStyles"])({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    padding: 0
  },
  title: {
    fontSize: 15,
    color: "#000000",
    fontFamily: "urwdin-regular",
    padding: 0
  },
  pos: {
    marginBottom: 12
  }
}); //convert function - readable date format

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const Row = ({
  date,
  dueDate,
  name,
  email,
  locale,
  thickness,
  texture,
  hairColor,
  length,
  condition,
  hairGoals,
  frontSelfie
}) => {
  dueDate = new Date(date).addDays(2).toLocaleString("en-US", {
    timeZone: "America/New_York"
  }).split(",")[0];
  const classes = useStyles(); // hover img zoom
  // const modal = $("#modal");
  // $(function() {
  //   var currentMousePos = { x: -1, y: -1 };
  //   $(document).mousemove(function(event) {
  //     currentMousePos.x = event.pageX;
  //     currentMousePos.y = event.pageY;
  //     if ($("#modal").css("display") != "none") {
  //       $("#modal").css({
  //         top: currentMousePos.y - 100,
  //         left: currentMousePos.x + 50
  //       });
  //     }
  //   });
  //   $(".image").on("mouseover", function() {
  //     var image = $(this).find("img");
  //     var modal = $("#modal");
  //     $(modal).html(image.clone());
  //     $(modal).css({
  //       top: currentMousePos.y,
  //       left: currentMousePos.x + 12
  //     });
  //     $(modal).show();
  //   });
  //   $(".image").on("mouseleave", function() {
  //     $(modal).hide();
  //   });
  // });

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_1__["default"] // className={classes.card}
  , {
    style: {
      overflowX: "hidden",
      overflowY: "auto",
      marginBottom: "".concat(5, "px")
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "locale",
    color: "textSecondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    },
    __self: undefined
  }, new Date(locale).toLocaleString("en-US", {
    timeZone: "America/New_York"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "name",
    color: "textSecondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: undefined
  }, name ? name : "n/a"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "image",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101
    },
    __self: undefined
  }, frontSelfie ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    id: "selfie",
    alt: frontSelfie,
    src: frontSelfie,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    },
    __self: undefined
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    id: "selfie",
    alt: _assets_no_photo_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    src: _assets_no_photo_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "modal",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107
    },
    __self: undefined
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "user-attributes",
    style: {
      flex: 0.5
    },
    color: "textSecondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109
    },
    __self: undefined
  }, " ", !thickness ? "n/a" : thickness), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "user-attributes",
    style: {
      flex: 0.5
    },
    color: "textSecondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137
    },
    __self: undefined
  }, typeof texture === "number" ? texture === 1 || "1" ? "straight" :  false || texture === "2" || 2 ? "wavy" :  false || texture === 3 ? "curly" :  false || texture === 4 ? "coily" : "" : typeof texture === "string" ? texture : "n/a"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "user-attributes",
    style: {
      flex: 0.5
    },
    color: "textSecondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158
    },
    __self: undefined
  }, hairColor ? hairColor : "n/a"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "user-attributes",
    style: {
      flex: 0.5
    },
    color: "textSecondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167
    },
    __self: undefined
  }, length ? length : "n/a"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "user-attributes",
    color: "textSecondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176
    },
    __self: undefined
  }, !condition ? "n/a" : condition === "none" ? "none" : condition.map(e => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: e,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 183
      },
      __self: undefined
    }, e, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 184
      },
      __self: undefined
    }));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "user-attributes",
    style: {
      flex: 1,
      lineHeight: "24px"
    },
    color: "textSecondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 189
    },
    __self: undefined
  }, !hairGoals ? "n/a" : hairGoals ? hairGoals.join(", ") : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 200
    },
    __self: undefined
  }))));
};

/***/ }),

/***/ "./src/components/common/index.js":
/*!****************************************!*\
  !*** ./src/components/common/index.js ***!
  \****************************************/
/*! exports provided: Container, Button, Header, Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ "./src/components/common/Container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return _Container__WEBPACK_IMPORTED_MODULE_0__["Container"]; });

/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ "./src/components/common/Button.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _Button__WEBPACK_IMPORTED_MODULE_1__["Button"]; });

/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header */ "./src/components/common/Header.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return _Header__WEBPACK_IMPORTED_MODULE_2__["Header"]; });

/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Row */ "./src/components/common/Row.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return _Row__WEBPACK_IMPORTED_MODULE_3__["Row"]; });






/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css",
      function () {
        var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var _components_ScrollToTop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ScrollToTop */ "./src/components/ScrollToTop.js");
var _jsxFileName = "/Users/jameskim/dev/bespoke/bespoke-panels/client/src/index.js";






react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["HashRouter"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ScrollToTop__WEBPACK_IMPORTED_MODULE_5__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_4__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 11
  },
  __self: undefined
}))), document.getElementById("root"));

/***/ }),

/***/ "./src/services/apiService.js":
/*!************************************!*\
  !*** ./src/services/apiService.js ***!
  \************************************/
/*! exports provided: login, getProfile, signUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProfile", function() { return getProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signUp", function() { return signUp; });
//this folder is essentially what interfaces with the api
const axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

const BASE_URL = "http://localhost:8001"; // const BASE_URL = "https://bespoke-backend-db.herokuapp.com/";

const JWT_TOKEN = localStorage.getItem("token"); //returns false if does not exist
//create axios client that is reusable

const apiClient = axios.create({
  baseURL: BASE_URL,
  // this is where the api is coming from
  headers: {
    Authorization: "Bearer ".concat(JWT_TOKEN)
  }
}); //if you get a cors error, you cannot fix it from the front end
//this is login function, async bc api call

const login = async data => {
  try {
    // console.log('this also works', data)
    const response = await apiClient.post("/auth/login", data); // console.log(response)

    const _response$data = response.data,
          token = _response$data.token,
          user = _response$data.user; //token and user are being 'plucked' from resposne

    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    throw error;
  }
};
const getProfile = async () => {
  try {
    const response = await apiClient.get("/app/profile");
    const user = response.data.user;
    return user;
  } catch (error) {
    throw error;
  }
};
const signUp = async data => {
  try {
    console.log(data);
    const response = await apiClient.post("/auth/signup", data);
    const _response$data2 = response.data,
          token = _response$data2.token,
          user = _response$data2.user;
    localStorage.setItem("token", token); //this is the key to login after signing up. token in local storage

    return user;
  } catch (error) {
    throw error;
  }
};

/***/ }),

/***/ "./src/services/authService.js":
/*!*************************************!*\
  !*** ./src/services/authService.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const authService = {
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  },
  signOut: () => {
    localStorage.removeItem('token');
  }
};
/* harmony default export */ __webpack_exports__["default"] = (authService);

/***/ }),

/***/ "./src/styles/App.scss":
/*!*****************************!*\
  !*** ./src/styles/App.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/App.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/App.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/App.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/styles/Lightbox.scss":
/*!**********************************!*\
  !*** ./src/styles/Lightbox.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Lightbox.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Lightbox.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Lightbox.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Lightbox.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Lightbox.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Lightbox.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/styles/Panel.scss":
/*!*******************************!*\
  !*** ./src/styles/Panel.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Panel.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Panel.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Panel.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Panel.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Panel.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Panel.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./src/styles/Row.scss":
/*!*****************************!*\
  !*** ./src/styles/Row.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Row.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Row.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Row.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Row.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!../../node_modules/postcss-loader/src??postcss!../../node_modules/resolve-url-loader??ref--6-oneOf-5-3!../../node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./Row.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./src/styles/Row.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ 0:
/*!**********************************************************************************!*\
  !*** multi ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/jameskim/dev/bespoke/bespoke-panels/client/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /Users/jameskim/dev/bespoke/bespoke-panels/client/src/index.js */"./src/index.js");


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime~main",0]]]);
//# sourceMappingURL=main.chunk.js.map