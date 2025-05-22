"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/esp32-stream";
exports.ids = ["pages/esp32-stream"];
exports.modules = {

/***/ "__barrel_optimize__?names=AppBar,Box,Button,Container,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!./node_modules/@mui/material/index.js":
/*!************************************************************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=AppBar,Box,Button,Container,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!./node_modules/@mui/material/index.js ***!
  \************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppBar: () => (/* reexport default from dynamic */ _AppBar__WEBPACK_IMPORTED_MODULE_0___default.a),\n/* harmony export */   Box: () => (/* reexport default from dynamic */ _Box__WEBPACK_IMPORTED_MODULE_1___default.a),\n/* harmony export */   Button: () => (/* reexport default from dynamic */ _Button__WEBPACK_IMPORTED_MODULE_2___default.a),\n/* harmony export */   Container: () => (/* reexport default from dynamic */ _Container__WEBPACK_IMPORTED_MODULE_3___default.a),\n/* harmony export */   IconButton: () => (/* reexport default from dynamic */ _IconButton__WEBPACK_IMPORTED_MODULE_4___default.a),\n/* harmony export */   Menu: () => (/* reexport default from dynamic */ _Menu__WEBPACK_IMPORTED_MODULE_5___default.a),\n/* harmony export */   MenuItem: () => (/* reexport default from dynamic */ _MenuItem__WEBPACK_IMPORTED_MODULE_6___default.a),\n/* harmony export */   Toolbar: () => (/* reexport default from dynamic */ _Toolbar__WEBPACK_IMPORTED_MODULE_7___default.a),\n/* harmony export */   Typography: () => (/* reexport default from dynamic */ _Typography__WEBPACK_IMPORTED_MODULE_8___default.a),\n/* harmony export */   useMediaQuery: () => (/* reexport safe */ _useMediaQuery__WEBPACK_IMPORTED_MODULE_9__[\"default\"]),\n/* harmony export */   useTheme: () => (/* reexport safe */ C_Users_hyu_apple_disease_detection_agromind_master_web_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_10__.useTheme)\n/* harmony export */ });\n/* harmony import */ var _AppBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppBar */ \"./node_modules/@mui/material/node/AppBar/index.js\");\n/* harmony import */ var _AppBar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_AppBar__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ \"./node_modules/@mui/material/node/Box/index.js\");\n/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Box__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button */ \"./node_modules/@mui/material/node/Button/index.js\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Button__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container */ \"./node_modules/@mui/material/node/Container/index.js\");\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Container__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IconButton */ \"./node_modules/@mui/material/node/IconButton/index.js\");\n/* harmony import */ var _IconButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_IconButton__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Menu */ \"./node_modules/@mui/material/node/Menu/index.js\");\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Menu__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MenuItem */ \"./node_modules/@mui/material/node/MenuItem/index.js\");\n/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_MenuItem__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Toolbar */ \"./node_modules/@mui/material/node/Toolbar/index.js\");\n/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Toolbar__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Typography */ \"./node_modules/@mui/material/node/Typography/index.js\");\n/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_Typography__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _useMediaQuery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./useMediaQuery */ \"./node_modules/@mui/material/node/useMediaQuery/index.js\");\n/* harmony import */ var C_Users_hyu_apple_disease_detection_agromind_master_web_node_modules_mui_material_styles_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@mui/material/styles/index.js */ \"./node_modules/@mui/material/styles/index.js\");\n/**\n * @mui/material v5.17.1\n *\n * @license MIT\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */ /* eslint-disable import/export */ \n\n\n\n\n\n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX19iYXJyZWxfb3B0aW1pemVfXz9uYW1lcz1BcHBCYXIsQm94LEJ1dHRvbixDb250YWluZXIsSWNvbkJ1dHRvbixNZW51LE1lbnVJdGVtLFRvb2xiYXIsVHlwb2dyYXBoeSx1c2VNZWRpYVF1ZXJ5LHVzZVRoZW1lIT0hLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNEM7QUFDTjtBQUNNO0FBQ007QUFDRTtBQUNaO0FBQ1E7QUFDRjtBQUNNO0FBQ00iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ3JvbWluZC13ZWIvLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcz81ZTE3Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG11aS9tYXRlcmlhbCB2NS4xNy4xXG4gKlxuICogQGxpY2Vuc2UgTUlUXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqLyAvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXhwb3J0ICovIFxuZXhwb3J0IHsgZGVmYXVsdCBhcyBBcHBCYXIgfSBmcm9tIFwiLi9BcHBCYXJcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb3ggfSBmcm9tIFwiLi9Cb3hcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCdXR0b24gfSBmcm9tIFwiLi9CdXR0b25cIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb250YWluZXIgfSBmcm9tIFwiLi9Db250YWluZXJcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBJY29uQnV0dG9uIH0gZnJvbSBcIi4vSWNvbkJ1dHRvblwiXG5leHBvcnQgeyBkZWZhdWx0IGFzIE1lbnUgfSBmcm9tIFwiLi9NZW51XCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWVudUl0ZW0gfSBmcm9tIFwiLi9NZW51SXRlbVwiXG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvb2xiYXIgfSBmcm9tIFwiLi9Ub29sYmFyXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHlwb2dyYXBoeSB9IGZyb20gXCIuL1R5cG9ncmFwaHlcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyB1c2VNZWRpYVF1ZXJ5IH0gZnJvbSBcIi4vdXNlTWVkaWFRdWVyeVwiXG5leHBvcnQgeyB1c2VUaGVtZSB9IGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxoeXVcXFxcYXBwbGVfZGlzZWFzZV9kZXRlY3Rpb25cXFxcYWdyb21pbmRfbWFzdGVyXFxcXHdlYlxcXFxub2RlX21vZHVsZXNcXFxcQG11aVxcXFxtYXRlcmlhbFxcXFxzdHlsZXNcXFxcaW5kZXguanNcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///__barrel_optimize__?names=AppBar,Box,Button,Container,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!./node_modules/@mui/material/index.js\n");

/***/ }),

/***/ "__barrel_optimize__?names=Box,Button,CircularProgress,Container,Paper,Typography!=!./node_modules/@mui/material/index.js":
/*!********************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=Box,Button,CircularProgress,Container,Paper,Typography!=!./node_modules/@mui/material/index.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Box: () => (/* reexport default from dynamic */ _Box__WEBPACK_IMPORTED_MODULE_0___default.a),\n/* harmony export */   Button: () => (/* reexport default from dynamic */ _Button__WEBPACK_IMPORTED_MODULE_1___default.a),\n/* harmony export */   CircularProgress: () => (/* reexport default from dynamic */ _CircularProgress__WEBPACK_IMPORTED_MODULE_2___default.a),\n/* harmony export */   Container: () => (/* reexport default from dynamic */ _Container__WEBPACK_IMPORTED_MODULE_3___default.a),\n/* harmony export */   Paper: () => (/* reexport default from dynamic */ _Paper__WEBPACK_IMPORTED_MODULE_4___default.a),\n/* harmony export */   Typography: () => (/* reexport default from dynamic */ _Typography__WEBPACK_IMPORTED_MODULE_5___default.a)\n/* harmony export */ });\n/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ \"./node_modules/@mui/material/node/Box/index.js\");\n/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Box__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ \"./node_modules/@mui/material/node/Button/index.js\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Button__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CircularProgress */ \"./node_modules/@mui/material/node/CircularProgress/index.js\");\n/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CircularProgress__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container */ \"./node_modules/@mui/material/node/Container/index.js\");\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Container__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Paper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Paper */ \"./node_modules/@mui/material/node/Paper/index.js\");\n/* harmony import */ var _Paper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Paper__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Typography */ \"./node_modules/@mui/material/node/Typography/index.js\");\n/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Typography__WEBPACK_IMPORTED_MODULE_5__);\n/**\n * @mui/material v5.17.1\n *\n * @license MIT\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */ /* eslint-disable import/export */ \n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX19iYXJyZWxfb3B0aW1pemVfXz9uYW1lcz1Cb3gsQnV0dG9uLENpcmN1bGFyUHJvZ3Jlc3MsQ29udGFpbmVyLFBhcGVyLFR5cG9ncmFwaHkhPSEuL25vZGVfbW9kdWxlcy9AbXVpL21hdGVyaWFsL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3NDO0FBQ007QUFDb0I7QUFDZDtBQUNSIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdyb21pbmQtd2ViLy4vbm9kZV9tb2R1bGVzL0BtdWkvbWF0ZXJpYWwvaW5kZXguanM/YWM3NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtdWkvbWF0ZXJpYWwgdjUuMTcuMVxuICpcbiAqIEBsaWNlbnNlIE1JVFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi8gLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L2V4cG9ydCAqLyBcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQm94IH0gZnJvbSBcIi4vQm94XCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQnV0dG9uIH0gZnJvbSBcIi4vQnV0dG9uXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2lyY3VsYXJQcm9ncmVzcyB9IGZyb20gXCIuL0NpcmN1bGFyUHJvZ3Jlc3NcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb250YWluZXIgfSBmcm9tIFwiLi9Db250YWluZXJcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBQYXBlciB9IGZyb20gXCIuL1BhcGVyXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVHlwb2dyYXBoeSB9IGZyb20gXCIuL1R5cG9ncmFwaHlcIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///__barrel_optimize__?names=Box,Button,CircularProgress,Container,Paper,Typography!=!./node_modules/@mui/material/index.js\n");

/***/ }),

/***/ "__barrel_optimize__?names=Box,Button,CircularProgress,Grid,Paper,Typography!=!./node_modules/@mui/material/index.js":
/*!***************************************************************************************************************************!*\
  !*** __barrel_optimize__?names=Box,Button,CircularProgress,Grid,Paper,Typography!=!./node_modules/@mui/material/index.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Box: () => (/* reexport default from dynamic */ _Box__WEBPACK_IMPORTED_MODULE_0___default.a),\n/* harmony export */   Button: () => (/* reexport default from dynamic */ _Button__WEBPACK_IMPORTED_MODULE_1___default.a),\n/* harmony export */   CircularProgress: () => (/* reexport default from dynamic */ _CircularProgress__WEBPACK_IMPORTED_MODULE_2___default.a),\n/* harmony export */   Grid: () => (/* reexport default from dynamic */ _Grid__WEBPACK_IMPORTED_MODULE_3___default.a),\n/* harmony export */   Paper: () => (/* reexport default from dynamic */ _Paper__WEBPACK_IMPORTED_MODULE_4___default.a),\n/* harmony export */   Typography: () => (/* reexport default from dynamic */ _Typography__WEBPACK_IMPORTED_MODULE_5___default.a)\n/* harmony export */ });\n/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ \"./node_modules/@mui/material/node/Box/index.js\");\n/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Box__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ \"./node_modules/@mui/material/node/Button/index.js\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Button__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CircularProgress */ \"./node_modules/@mui/material/node/CircularProgress/index.js\");\n/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CircularProgress__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Grid */ \"./node_modules/@mui/material/node/Grid/index.js\");\n/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Grid__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Paper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Paper */ \"./node_modules/@mui/material/node/Paper/index.js\");\n/* harmony import */ var _Paper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Paper__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Typography */ \"./node_modules/@mui/material/node/Typography/index.js\");\n/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Typography__WEBPACK_IMPORTED_MODULE_5__);\n/**\n * @mui/material v5.17.1\n *\n * @license MIT\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */ /* eslint-disable import/export */ \n\n\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX19iYXJyZWxfb3B0aW1pemVfXz9uYW1lcz1Cb3gsQnV0dG9uLENpcmN1bGFyUHJvZ3Jlc3MsR3JpZCxQYXBlcixUeXBvZ3JhcGh5IT0hLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzQztBQUNNO0FBQ29CO0FBQ3hCO0FBQ0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ3JvbWluZC13ZWIvLi9ub2RlX21vZHVsZXMvQG11aS9tYXRlcmlhbC9pbmRleC5qcz9mMmI1Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG11aS9tYXRlcmlhbCB2NS4xNy4xXG4gKlxuICogQGxpY2Vuc2UgTUlUXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqLyAvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXhwb3J0ICovIFxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb3ggfSBmcm9tIFwiLi9Cb3hcIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCdXR0b24gfSBmcm9tIFwiLi9CdXR0b25cIlxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDaXJjdWxhclByb2dyZXNzIH0gZnJvbSBcIi4vQ2lyY3VsYXJQcm9ncmVzc1wiXG5leHBvcnQgeyBkZWZhdWx0IGFzIEdyaWQgfSBmcm9tIFwiLi9HcmlkXCJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGFwZXIgfSBmcm9tIFwiLi9QYXBlclwiXG5leHBvcnQgeyBkZWZhdWx0IGFzIFR5cG9ncmFwaHkgfSBmcm9tIFwiLi9UeXBvZ3JhcGh5XCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///__barrel_optimize__?names=Box,Button,CircularProgress,Grid,Paper,Typography!=!./node_modules/@mui/material/index.js\n");

/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fesp32-stream&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Cesp32-stream.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fesp32-stream&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Cesp32-stream.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages/module.compiled */ \"./node_modules/next/dist/server/future/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"./node_modules/next/dist/pages/_document.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"./src/pages/_app.js\");\n/* harmony import */ var _src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src\\pages\\esp32-stream.js */ \"./src/pages/esp32-stream.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__, _src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__]);\n([private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__, _src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"default\"));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"getStaticProps\");\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"getStaticPaths\");\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"getServerSideProps\");\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"config\");\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"reportWebVitals\");\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"unstable_getStaticProps\");\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"unstable_getStaticPaths\");\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"unstable_getStaticParams\");\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"unstable_getServerProps\");\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__, \"unstable_getServerSideProps\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/esp32-stream\",\n        pathname: \"/esp32-stream\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    components: {\n        App: private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        Document: (private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default())\n    },\n    userland: _src_pages_esp32_stream_js__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTJnBhZ2U9JTJGZXNwMzItc3RyZWFtJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGc3JjJTVDcGFnZXMlNUNlc3AzMi1zdHJlYW0uanMmYWJzb2x1dGVBcHBQYXRoPXByaXZhdGUtbmV4dC1wYWdlcyUyRl9hcHAmYWJzb2x1dGVEb2N1bWVudFBhdGg9cHJpdmF0ZS1uZXh0LXBhZ2VzJTJGX2RvY3VtZW50Jm1pZGRsZXdhcmVDb25maWdCYXNlNjQ9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUErRjtBQUNoQztBQUNMO0FBQzFEO0FBQ29EO0FBQ1Y7QUFDMUM7QUFDMEQ7QUFDMUQ7QUFDQSxpRUFBZSx3RUFBSyxDQUFDLHVEQUFRLFlBQVksRUFBQztBQUMxQztBQUNPLHVCQUF1Qix3RUFBSyxDQUFDLHVEQUFRO0FBQ3JDLHVCQUF1Qix3RUFBSyxDQUFDLHVEQUFRO0FBQ3JDLDJCQUEyQix3RUFBSyxDQUFDLHVEQUFRO0FBQ3pDLGVBQWUsd0VBQUssQ0FBQyx1REFBUTtBQUM3Qix3QkFBd0Isd0VBQUssQ0FBQyx1REFBUTtBQUM3QztBQUNPLGdDQUFnQyx3RUFBSyxDQUFDLHVEQUFRO0FBQzlDLGdDQUFnQyx3RUFBSyxDQUFDLHVEQUFRO0FBQzlDLGlDQUFpQyx3RUFBSyxDQUFDLHVEQUFRO0FBQy9DLGdDQUFnQyx3RUFBSyxDQUFDLHVEQUFRO0FBQzlDLG9DQUFvQyx3RUFBSyxDQUFDLHVEQUFRO0FBQ3pEO0FBQ08sd0JBQXdCLHlHQUFnQjtBQUMvQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFdBQVc7QUFDWCxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVELGlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdyb21pbmQtd2ViLz9mNmY5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VzUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9wYWdlcy9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgYXBwIGFuZCBkb2N1bWVudCBtb2R1bGVzLlxuaW1wb3J0IERvY3VtZW50IGZyb20gXCJwcml2YXRlLW5leHQtcGFnZXMvX2RvY3VtZW50XCI7XG5pbXBvcnQgQXBwIGZyb20gXCJwcml2YXRlLW5leHQtcGFnZXMvX2FwcFwiO1xuLy8gSW1wb3J0IHRoZSB1c2VybGFuZCBjb2RlLlxuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi4vc3JjXFxcXHBhZ2VzXFxcXGVzcDMyLXN0cmVhbS5qc1wiO1xuLy8gUmUtZXhwb3J0IHRoZSBjb21wb25lbnQgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsIFwiZGVmYXVsdFwiKTtcbi8vIFJlLWV4cG9ydCBtZXRob2RzLlxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzID0gaG9pc3QodXNlcmxhbmQsIFwiZ2V0U3RhdGljUHJvcHNcIik7XG5leHBvcnQgY29uc3QgZ2V0U3RhdGljUGF0aHMgPSBob2lzdCh1c2VybGFuZCwgXCJnZXRTdGF0aWNQYXRoc1wiKTtcbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgXCJnZXRTZXJ2ZXJTaWRlUHJvcHNcIik7XG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsIFwiY29uZmlnXCIpO1xuZXhwb3J0IGNvbnN0IHJlcG9ydFdlYlZpdGFscyA9IGhvaXN0KHVzZXJsYW5kLCBcInJlcG9ydFdlYlZpdGFsc1wiKTtcbi8vIFJlLWV4cG9ydCBsZWdhY3kgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCBcInVuc3RhYmxlX2dldFN0YXRpY1Byb3BzXCIpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFN0YXRpY1BhdGhzID0gaG9pc3QodXNlcmxhbmQsIFwidW5zdGFibGVfZ2V0U3RhdGljUGF0aHNcIik7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U3RhdGljUGFyYW1zID0gaG9pc3QodXNlcmxhbmQsIFwidW5zdGFibGVfZ2V0U3RhdGljUGFyYW1zXCIpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclByb3BzID0gaG9pc3QodXNlcmxhbmQsIFwidW5zdGFibGVfZ2V0U2VydmVyUHJvcHNcIik7XG5leHBvcnQgY29uc3QgdW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzID0gaG9pc3QodXNlcmxhbmQsIFwidW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzXCIpO1xuLy8gQ3JlYXRlIGFuZCBleHBvcnQgdGhlIHJvdXRlIG1vZHVsZSB0aGF0IHdpbGwgYmUgY29uc3VtZWQuXG5leHBvcnQgY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgUGFnZXNSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuUEFHRVMsXG4gICAgICAgIHBhZ2U6IFwiL2VzcDMyLXN0cmVhbVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvZXNwMzItc3RyZWFtXCIsXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXJlbid0IHVzZWQgaW4gcHJvZHVjdGlvbi5cbiAgICAgICAgYnVuZGxlUGF0aDogXCJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwiXCJcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQXBwLFxuICAgICAgICBEb2N1bWVudFxuICAgIH0sXG4gICAgdXNlcmxhbmRcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlcy5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fesp32-stream&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Cesp32-stream.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "./src/components/ESP32Stream.js":
/*!***************************************!*\
  !*** ./src/components/ESP32Stream.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,CircularProgress,Container,Paper,Typography!=!@mui/material */ \"__barrel_optimize__?names=Box,Button,CircularProgress,Container,Paper,Typography!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/node/styles/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst StreamContainer = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Paper)(({ theme })=>({\n        padding: theme.spacing(2),\n        margin: theme.spacing(2),\n        display: \"flex\",\n        flexDirection: \"column\",\n        alignItems: \"center\",\n        gap: theme.spacing(2)\n    }));\nconst VideoContainer = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box)(({ theme })=>({\n        width: \"100%\",\n        maxWidth: \"800px\",\n        height: \"600px\",\n        backgroundColor: theme.palette.grey[200],\n        display: \"flex\",\n        justifyContent: \"center\",\n        alignItems: \"center\",\n        borderRadius: theme.shape.borderRadius,\n        overflow: \"hidden\"\n    }));\nconst ESP32Stream = ({ onImageCaptured })=>{\n    const [isConnected, setIsConnected] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [esp32Ip, setEsp32Ip] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const wsRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const imgRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Load saved IP from localStorage\n        const savedIp = localStorage.getItem(\"esp32_ip\");\n        if (savedIp) {\n            setEsp32Ip(savedIp);\n            connectWebSocket(savedIp);\n        } else {\n            setLoading(false);\n        }\n        return ()=>{\n            if (wsRef.current) {\n                wsRef.current.close();\n            }\n        };\n    }, []);\n    const connectWebSocket = (ip)=>{\n        try {\n            const ws = new WebSocket(`ws://${ip}:81`);\n            wsRef.current = ws;\n            ws.onopen = ()=>{\n                setIsConnected(true);\n                setError(\"\");\n                setLoading(false);\n            };\n            ws.onmessage = (event)=>{\n                if (event.data instanceof Blob) {\n                    const reader = new FileReader();\n                    reader.onload = ()=>{\n                        if (imgRef.current) {\n                            imgRef.current.src = reader.result;\n                        }\n                    };\n                    reader.readAsDataURL(event.data);\n                }\n            };\n            ws.onerror = (error)=>{\n                setError(\"Connection error. Please check the ESP32-CAM IP address.\");\n                setIsConnected(false);\n                setLoading(false);\n            };\n            ws.onclose = ()=>{\n                setIsConnected(false);\n                setLoading(false);\n            };\n        } catch (err) {\n            setError(\"Failed to connect to ESP32-CAM\");\n            setIsConnected(false);\n            setLoading(false);\n        }\n    };\n    const handleIpChange = (event)=>{\n        setEsp32Ip(event.target.value);\n    };\n    const handleConnect = ()=>{\n        if (esp32Ip) {\n            localStorage.setItem(\"esp32_ip\", esp32Ip);\n            setLoading(true);\n            connectWebSocket(esp32Ip);\n        }\n    };\n    const handleCapture = ()=>{\n        if (imgRef.current && canvasRef.current) {\n            const canvas = canvasRef.current;\n            const ctx = canvas.getContext(\"2d\");\n            canvas.width = imgRef.current.naturalWidth;\n            canvas.height = imgRef.current.naturalHeight;\n            ctx.drawImage(imgRef.current, 0, 0);\n            canvas.toBlob((blob)=>{\n                if (onImageCaptured) {\n                    onImageCaptured(blob);\n                } else {\n                    const url = URL.createObjectURL(blob);\n                    const a = document.createElement(\"a\");\n                    a.href = url;\n                    a.download = `esp32_capture_${new Date().toISOString()}.jpg`;\n                    document.body.appendChild(a);\n                    a.click();\n                    document.body.removeChild(a);\n                    URL.revokeObjectURL(url);\n                }\n            }, \"image/jpeg\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Container, {\n        maxWidth: \"lg\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StreamContainer, {\n            elevation: 3,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                    variant: \"h5\",\n                    component: \"h2\",\n                    gutterBottom: true,\n                    children: \"ESP32-CAM Stream\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                    lineNumber: 132,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                    sx: {\n                        width: \"100%\",\n                        maxWidth: \"800px\"\n                    },\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            value: esp32Ip,\n                            onChange: handleIpChange,\n                            placeholder: \"Enter ESP32-CAM IP address\",\n                            style: {\n                                width: \"100%\",\n                                padding: \"8px\",\n                                marginBottom: \"16px\",\n                                borderRadius: \"4px\",\n                                border: \"1px solid #ccc\"\n                            }\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                            lineNumber: 137,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                            variant: \"contained\",\n                            color: \"primary\",\n                            onClick: handleConnect,\n                            disabled: !esp32Ip || loading,\n                            fullWidth: true,\n                            children: loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.CircularProgress, {\n                                size: 24\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                                lineNumber: 157,\n                                columnNumber: 24\n                            }, undefined) : \"Connect\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                            lineNumber: 150,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                    lineNumber: 136,\n                    columnNumber: 9\n                }, undefined),\n                error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                    color: \"error\",\n                    variant: \"body2\",\n                    children: error\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                    lineNumber: 162,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(VideoContainer, {\n                    children: isConnected ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                ref: imgRef,\n                                alt: \"ESP32-CAM Stream\",\n                                style: {\n                                    maxWidth: \"100%\",\n                                    maxHeight: \"100%\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                                lineNumber: 170,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                                ref: canvasRef,\n                                style: {\n                                    display: \"none\"\n                                }\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                                lineNumber: 175,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                        variant: \"body1\",\n                        color: \"textSecondary\",\n                        children: loading ? \"Connecting...\" : \"Not connected\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                        lineNumber: 178,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                    lineNumber: 167,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Container_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                    variant: \"contained\",\n                    color: \"secondary\",\n                    onClick: handleCapture,\n                    disabled: !isConnected,\n                    startIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        children: \"\\uD83D\\uDCF8\"\n                    }, void 0, false, void 0, void 0),\n                    children: \"Capture Image\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n                    lineNumber: 184,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n            lineNumber: 131,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\ESP32Stream.js\",\n        lineNumber: 130,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ESP32Stream);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L0VTUDMyU3RyZWFtLmpzPzIyOWEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIENvbnRhaW5lciwgVHlwb2dyYXBoeSwgUGFwZXIsIENpcmN1bGFyUHJvZ3Jlc3MgfSBmcm9tICdAbXVpL21hdGVyaWFsJztcclxuaW1wb3J0IHsgc3R5bGVkIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xyXG5cclxuY29uc3QgU3RyZWFtQ29udGFpbmVyID0gc3R5bGVkKFBhcGVyKSgoeyB0aGVtZSB9KSA9PiAoe1xyXG4gIHBhZGRpbmc6IHRoZW1lLnNwYWNpbmcoMiksXHJcbiAgbWFyZ2luOiB0aGVtZS5zcGFjaW5nKDIpLFxyXG4gIGRpc3BsYXk6ICdmbGV4JyxcclxuICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICBnYXA6IHRoZW1lLnNwYWNpbmcoMiksXHJcbn0pKTtcclxuXHJcbmNvbnN0IFZpZGVvQ29udGFpbmVyID0gc3R5bGVkKEJveCkoKHsgdGhlbWUgfSkgPT4gKHtcclxuICB3aWR0aDogJzEwMCUnLFxyXG4gIG1heFdpZHRoOiAnODAwcHgnLFxyXG4gIGhlaWdodDogJzYwMHB4JyxcclxuICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUuZ3JleVsyMDBdLFxyXG4gIGRpc3BsYXk6ICdmbGV4JyxcclxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgYm9yZGVyUmFkaXVzOiB0aGVtZS5zaGFwZS5ib3JkZXJSYWRpdXMsXHJcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG59KSk7XHJcblxyXG5jb25zdCBFU1AzMlN0cmVhbSA9ICh7IG9uSW1hZ2VDYXB0dXJlZCB9KSA9PiB7XHJcbiAgY29uc3QgW2lzQ29ubmVjdGVkLCBzZXRJc0Nvbm5lY3RlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2VzcDMySXAsIHNldEVzcDMySXBdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IHdzUmVmID0gdXNlUmVmKG51bGwpO1xyXG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBpbWdSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAvLyBMb2FkIHNhdmVkIElQIGZyb20gbG9jYWxTdG9yYWdlXHJcbiAgICBjb25zdCBzYXZlZElwID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VzcDMyX2lwJyk7XHJcbiAgICBpZiAoc2F2ZWRJcCkge1xyXG4gICAgICBzZXRFc3AzMklwKHNhdmVkSXApO1xyXG4gICAgICBjb25uZWN0V2ViU29ja2V0KHNhdmVkSXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaWYgKHdzUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICB3c1JlZi5jdXJyZW50LmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjb25uZWN0V2ViU29ja2V0ID0gKGlwKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB3cyA9IG5ldyBXZWJTb2NrZXQoYHdzOi8vJHtpcH06ODFgKTtcclxuICAgICAgd3NSZWYuY3VycmVudCA9IHdzO1xyXG5cclxuICAgICAgd3Mub25vcGVuID0gKCkgPT4ge1xyXG4gICAgICAgIHNldElzQ29ubmVjdGVkKHRydWUpO1xyXG4gICAgICAgIHNldEVycm9yKCcnKTtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHdzLm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhIGluc3RhbmNlb2YgQmxvYikge1xyXG4gICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbWdSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICAgIGltZ1JlZi5jdXJyZW50LnNyYyA9IHJlYWRlci5yZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChldmVudC5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB3cy5vbmVycm9yID0gKGVycm9yKSA9PiB7XHJcbiAgICAgICAgc2V0RXJyb3IoJ0Nvbm5lY3Rpb24gZXJyb3IuIFBsZWFzZSBjaGVjayB0aGUgRVNQMzItQ0FNIElQIGFkZHJlc3MuJyk7XHJcbiAgICAgICAgc2V0SXNDb25uZWN0ZWQoZmFsc2UpO1xyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgd3Mub25jbG9zZSA9ICgpID0+IHtcclxuICAgICAgICBzZXRJc0Nvbm5lY3RlZChmYWxzZSk7XHJcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBjb25uZWN0IHRvIEVTUDMyLUNBTScpO1xyXG4gICAgICBzZXRJc0Nvbm5lY3RlZChmYWxzZSk7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUlwQ2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICBzZXRFc3AzMklwKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29ubmVjdCA9ICgpID0+IHtcclxuICAgIGlmIChlc3AzMklwKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlc3AzMl9pcCcsIGVzcDMySXApO1xyXG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG4gICAgICBjb25uZWN0V2ViU29ja2V0KGVzcDMySXApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhcHR1cmUgPSAoKSA9PiB7XHJcbiAgICBpZiAoaW1nUmVmLmN1cnJlbnQgJiYgY2FudmFzUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XHJcbiAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICBjYW52YXMud2lkdGggPSBpbWdSZWYuY3VycmVudC5uYXR1cmFsV2lkdGg7XHJcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWdSZWYuY3VycmVudC5uYXR1cmFsSGVpZ2h0O1xyXG4gICAgICBjdHguZHJhd0ltYWdlKGltZ1JlZi5jdXJyZW50LCAwLCAwKTtcclxuXHJcbiAgICAgIGNhbnZhcy50b0Jsb2IoKGJsb2IpID0+IHtcclxuICAgICAgICBpZiAob25JbWFnZUNhcHR1cmVkKSB7XHJcbiAgICAgICAgICBvbkltYWdlQ2FwdHVyZWQoYmxvYik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgYS5ocmVmID0gdXJsO1xyXG4gICAgICAgICAgYS5kb3dubG9hZCA9IGBlc3AzMl9jYXB0dXJlXyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfS5qcGdgO1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcclxuICAgICAgICAgIGEuY2xpY2soKTtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XHJcbiAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAnaW1hZ2UvanBlZycpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Q29udGFpbmVyIG1heFdpZHRoPVwibGdcIj5cclxuICAgICAgPFN0cmVhbUNvbnRhaW5lciBlbGV2YXRpb249ezN9PlxyXG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNVwiIGNvbXBvbmVudD1cImgyXCIgZ3V0dGVyQm90dG9tPlxyXG4gICAgICAgICAgRVNQMzItQ0FNIFN0cmVhbVxyXG4gICAgICAgIDwvVHlwb2dyYXBoeT5cclxuXHJcbiAgICAgICAgPEJveCBzeD17eyB3aWR0aDogJzEwMCUnLCBtYXhXaWR0aDogJzgwMHB4JyB9fT5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtlc3AzMklwfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSXBDaGFuZ2V9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgRVNQMzItQ0FNIElQIGFkZHJlc3NcIlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgcGFkZGluZzogJzhweCcsXHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMTZweCcsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2NjYycsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICB2YXJpYW50PVwiY29udGFpbmVkXCJcclxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29ubmVjdH1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFlc3AzMklwIHx8IGxvYWRpbmd9XHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aFxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7bG9hZGluZyA/IDxDaXJjdWxhclByb2dyZXNzIHNpemU9ezI0fSAvPiA6ICdDb25uZWN0J31cclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICB7ZXJyb3IgJiYgKFxyXG4gICAgICAgICAgPFR5cG9ncmFwaHkgY29sb3I9XCJlcnJvclwiIHZhcmlhbnQ9XCJib2R5MlwiPlxyXG4gICAgICAgICAgICB7ZXJyb3J9XHJcbiAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAgPFZpZGVvQ29udGFpbmVyPlxyXG4gICAgICAgICAge2lzQ29ubmVjdGVkID8gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHJlZj17aW1nUmVmfVxyXG4gICAgICAgICAgICAgICAgYWx0PVwiRVNQMzItQ0FNIFN0cmVhbVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBtYXhXaWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPGNhbnZhcyByZWY9e2NhbnZhc1JlZn0gc3R5bGU9e3sgZGlzcGxheTogJ25vbmUnIH19IC8+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImJvZHkxXCIgY29sb3I9XCJ0ZXh0U2Vjb25kYXJ5XCI+XHJcbiAgICAgICAgICAgICAge2xvYWRpbmcgPyAnQ29ubmVjdGluZy4uLicgOiAnTm90IGNvbm5lY3RlZCd9XHJcbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9WaWRlb0NvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgdmFyaWFudD1cImNvbnRhaW5lZFwiXHJcbiAgICAgICAgICBjb2xvcj1cInNlY29uZGFyeVwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDYXB0dXJlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9eyFpc0Nvbm5lY3RlZH1cclxuICAgICAgICAgIHN0YXJ0SWNvbj17PHNwYW4+8J+TuDwvc3Bhbj59XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgQ2FwdHVyZSBJbWFnZVxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICA8L1N0cmVhbUNvbnRhaW5lcj5cclxuICAgIDwvQ29udGFpbmVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFU1AzMlN0cmVhbTsgIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJCb3giLCJCdXR0b24iLCJDb250YWluZXIiLCJUeXBvZ3JhcGh5IiwiUGFwZXIiLCJDaXJjdWxhclByb2dyZXNzIiwic3R5bGVkIiwiU3RyZWFtQ29udGFpbmVyIiwidGhlbWUiLCJwYWRkaW5nIiwic3BhY2luZyIsIm1hcmdpbiIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImdhcCIsIlZpZGVvQ29udGFpbmVyIiwid2lkdGgiLCJtYXhXaWR0aCIsImhlaWdodCIsImJhY2tncm91bmRDb2xvciIsInBhbGV0dGUiLCJncmV5IiwianVzdGlmeUNvbnRlbnQiLCJib3JkZXJSYWRpdXMiLCJzaGFwZSIsIm92ZXJmbG93IiwiRVNQMzJTdHJlYW0iLCJvbkltYWdlQ2FwdHVyZWQiLCJpc0Nvbm5lY3RlZCIsInNldElzQ29ubmVjdGVkIiwiZXJyb3IiLCJzZXRFcnJvciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXNwMzJJcCIsInNldEVzcDMySXAiLCJ3c1JlZiIsImNhbnZhc1JlZiIsImltZ1JlZiIsInNhdmVkSXAiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29ubmVjdFdlYlNvY2tldCIsImN1cnJlbnQiLCJjbG9zZSIsImlwIiwid3MiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJldmVudCIsImRhdGEiLCJCbG9iIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsInNyYyIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJvbmVycm9yIiwib25jbG9zZSIsImVyciIsImhhbmRsZUlwQ2hhbmdlIiwidGFyZ2V0IiwidmFsdWUiLCJoYW5kbGVDb25uZWN0Iiwic2V0SXRlbSIsImhhbmRsZUNhcHR1cmUiLCJjYW52YXMiLCJjdHgiLCJnZXRDb250ZXh0IiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsImRyYXdJbWFnZSIsInRvQmxvYiIsImJsb2IiLCJ1cmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJhIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImRvd25sb2FkIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsInJldm9rZU9iamVjdFVSTCIsImVsZXZhdGlvbiIsInZhcmlhbnQiLCJjb21wb25lbnQiLCJndXR0ZXJCb3R0b20iLCJzeCIsImlucHV0IiwidHlwZSIsIm9uQ2hhbmdlIiwicGxhY2Vob2xkZXIiLCJzdHlsZSIsIm1hcmdpbkJvdHRvbSIsImJvcmRlciIsImNvbG9yIiwib25DbGljayIsImRpc2FibGVkIiwiZnVsbFdpZHRoIiwic2l6ZSIsImltZyIsInJlZiIsImFsdCIsIm1heEhlaWdodCIsInN0YXJ0SWNvbiIsInNwYW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/ESP32Stream.js\n");

/***/ }),

/***/ "./src/components/Layout/MainLayout.js":
/*!*********************************************!*\
  !*** ./src/components/Layout/MainLayout.js ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=AppBar,Box,Button,Container,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!@mui/material */ \"__barrel_optimize__?names=AppBar,Box,Button,Container,IconButton,Menu,MenuItem,Toolbar,Typography,useMediaQuery,useTheme!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/node/styles/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-firebase-hooks/auth */ \"react-firebase-hooks/auth\");\n/* harmony import */ var react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _services_firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/firebase */ \"./src/services/firebase.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/Menu */ \"@mui/icons-material/Menu\");\n/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/icons-material/AccountCircle */ \"@mui/icons-material/AccountCircle\");\n/* harmony import */ var _mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_7__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_services_firebase__WEBPACK_IMPORTED_MODULE_4__, firebase_auth__WEBPACK_IMPORTED_MODULE_5__]);\n([_services_firebase__WEBPACK_IMPORTED_MODULE_4__, firebase_auth__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\nconst Main = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_8__.styled)(\"main\")(({ theme })=>({\n        flexGrow: 1,\n        padding: theme.spacing(3),\n        marginTop: theme.spacing(8),\n        minHeight: \"100vh\",\n        backgroundColor: theme.palette.background.default\n    }));\nconst MainLayout = ({ children })=>{\n    const [user] = (0,react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_3__.useAuthState)(_services_firebase__WEBPACK_IMPORTED_MODULE_4__.auth);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const theme = (0,_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.useTheme)();\n    const isMobile = (0,_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.useMediaQuery)(theme.breakpoints.down(\"sm\"));\n    const [mobileMenuAnchor, setMobileMenuAnchor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [userMenuAnchor, setUserMenuAnchor] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handleMobileMenuOpen = (event)=>{\n        setMobileMenuAnchor(event.currentTarget);\n    };\n    const handleMobileMenuClose = ()=>{\n        setMobileMenuAnchor(null);\n    };\n    const handleUserMenuOpen = (event)=>{\n        setUserMenuAnchor(event.currentTarget);\n    };\n    const handleUserMenuClose = ()=>{\n        setUserMenuAnchor(null);\n    };\n    const handleLogout = async ()=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_5__.signOut)(_services_firebase__WEBPACK_IMPORTED_MODULE_4__.auth);\n            router.push(\"/auth\");\n        } catch (error) {\n            console.error(\"Error signing out:\", error);\n        }\n    };\n    const menuItems = [\n        {\n            label: \"Trang chủ\",\n            path: \"/\"\n        },\n        {\n            label: \"Chẩn đo\\xe1n\",\n            path: \"/diagnosis\"\n        },\n        {\n            label: \"Lịch sử\",\n            path: \"/history\"\n        },\n        {\n            label: \"Dashboard\",\n            path: \"/dashboard\"\n        },\n        {\n            label: \"ESP32 CAM\",\n            path: \"/esp32-stream\"\n        }\n    ];\n    const renderMobileMenu = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Menu, {\n        anchorEl: mobileMenuAnchor,\n        open: Boolean(mobileMenuAnchor),\n        onClose: handleMobileMenuClose,\n        children: menuItems.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.MenuItem, {\n                onClick: ()=>{\n                    router.push(item.path);\n                    handleMobileMenuClose();\n                },\n                children: item.label\n            }, item.path, false, {\n                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                lineNumber: 79,\n                columnNumber: 9\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n        lineNumber: 73,\n        columnNumber: 5\n    }, undefined);\n    const renderUserMenu = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Menu, {\n        anchorEl: userMenuAnchor,\n        open: Boolean(userMenuAnchor),\n        onClose: handleUserMenuClose,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.MenuItem, {\n            onClick: handleLogout,\n            children: \"Đăng xuất\"\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n            lineNumber: 98,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n        lineNumber: 93,\n        columnNumber: 5\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Box, {\n        sx: {\n            display: \"flex\",\n            flexDirection: \"column\",\n            minHeight: \"100vh\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.AppBar, {\n                position: \"fixed\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Toolbar, {\n                    children: [\n                        isMobile && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.IconButton, {\n                            edge: \"start\",\n                            color: \"inherit\",\n                            \"aria-label\": \"menu\",\n                            onClick: handleMobileMenuOpen,\n                            sx: {\n                                mr: 2\n                            },\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_6___default()), {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                                lineNumber: 114,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                            lineNumber: 107,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {\n                            variant: \"h6\",\n                            component: \"div\",\n                            sx: {\n                                flexGrow: 1\n                            },\n                            children: \"Agromind\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                            lineNumber: 118,\n                            columnNumber: 11\n                        }, undefined),\n                        !isMobile && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Box, {\n                            sx: {\n                                display: \"flex\",\n                                gap: 2\n                            },\n                            children: menuItems.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Button, {\n                                    color: \"inherit\",\n                                    onClick: ()=>router.push(item.path),\n                                    children: item.label\n                                }, item.path, false, {\n                                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                                    lineNumber: 125,\n                                    columnNumber: 17\n                                }, undefined))\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                            lineNumber: 123,\n                            columnNumber: 13\n                        }, undefined),\n                        user ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.IconButton, {\n                                    size: \"large\",\n                                    \"aria-label\": \"account of current user\",\n                                    \"aria-controls\": \"menu-appbar\",\n                                    \"aria-haspopup\": \"true\",\n                                    onClick: handleUserMenuOpen,\n                                    color: \"inherit\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_7___default()), {}, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                                        lineNumber: 146,\n                                        columnNumber: 17\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                                    lineNumber: 138,\n                                    columnNumber: 15\n                                }, undefined),\n                                renderUserMenu\n                            ]\n                        }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Button, {\n                            color: \"inherit\",\n                            onClick: ()=>router.push(\"/auth\"),\n                            children: \"Đăng nhập\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                            lineNumber: 151,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                    lineNumber: 105,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                lineNumber: 104,\n                columnNumber: 7\n            }, undefined),\n            renderMobileMenu,\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Main, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_AppBar_Box_Button_Container_IconButton_Menu_MenuItem_Toolbar_Typography_useMediaQuery_useTheme_mui_material__WEBPACK_IMPORTED_MODULE_9__.Container, {\n                    maxWidth: \"lg\",\n                    children: children\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                    lineNumber: 161,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n                lineNumber: 160,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\components\\\\Layout\\\\MainLayout.js\",\n        lineNumber: 103,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainLayout);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7O3NDQUliLDhEQUFDZCwwS0FBVUE7NEJBQUNvRSxTQUFROzRCQUFLQyxXQUFVOzRCQUFNVCxJQUFJO2dDQUFFMUMsVUFBVTs0QkFBRTtzQ0FBRzs7Ozs7O3dCQUk3RCxDQUFDYSwwQkFDQSw4REFBQzdCLG1LQUFHQTs0QkFBQzBELElBQUk7Z0NBQUVDLFNBQVM7Z0NBQVFTLEtBQUs7NEJBQUU7c0NBQ2hDdEIsVUFBVVEsR0FBRyxDQUFDLENBQUNDLHFCQUNkLDhEQUFDdEQsc0tBQU1BO29DQUVMOEQsT0FBTTtvQ0FDTlAsU0FBUyxJQUFNNUIsT0FBT2UsSUFBSSxDQUFDWSxLQUFLUCxJQUFJOzhDQUVuQ08sS0FBS1IsS0FBSzttQ0FKTlEsS0FBS1AsSUFBSTs7Ozs7Ozs7Ozt3QkFVckJyQixxQkFDQzs7OENBQ0UsOERBQUN6QiwwS0FBVUE7b0NBQ1RtRSxNQUFLO29DQUNMTCxjQUFXO29DQUNYTSxpQkFBYztvQ0FDZEMsaUJBQWM7b0NBQ2RmLFNBQVNoQjtvQ0FDVHVCLE9BQU07OENBRU4sNEVBQUNsRCwwRUFBYUE7Ozs7Ozs7Ozs7Z0NBRWY0Qzs7eURBR0gsOERBQUN4RCxzS0FBTUE7NEJBQUM4RCxPQUFNOzRCQUFVUCxTQUFTLElBQU01QixPQUFPZSxJQUFJLENBQUM7c0NBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT2xFTTswQkFFRCw4REFBQ25DOzBCQUNDLDRFQUFDZix5S0FBU0E7b0JBQUN5RSxVQUFTOzhCQUNqQjlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQUtYO0FBRUEsaUVBQWVELFVBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ3JvbWluZC13ZWIvLi9zcmMvY29tcG9uZW50cy9MYXlvdXQvTWFpbkxheW91dC5qcz81YmMyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtcclxuICBBcHBCYXIsXHJcbiAgVG9vbGJhcixcclxuICBUeXBvZ3JhcGh5LFxyXG4gIENvbnRhaW5lcixcclxuICBCb3gsXHJcbiAgQnV0dG9uLFxyXG4gIEljb25CdXR0b24sXHJcbiAgTWVudSxcclxuICBNZW51SXRlbSxcclxuICB1c2VUaGVtZSxcclxuICB1c2VNZWRpYVF1ZXJ5LFxyXG59IGZyb20gJ0BtdWkvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBzdHlsZWQgfSBmcm9tICdAbXVpL21hdGVyaWFsL3N0eWxlcyc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IHsgdXNlQXV0aFN0YXRlIH0gZnJvbSAncmVhY3QtZmlyZWJhc2UtaG9va3MvYXV0aCc7XHJcbmltcG9ydCB7IGF1dGggfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZSc7XHJcbmltcG9ydCB7IHNpZ25PdXQgfSBmcm9tICdmaXJlYmFzZS9hdXRoJztcclxuaW1wb3J0IE1lbnVJY29uIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvTWVudSc7XHJcbmltcG9ydCBBY2NvdW50Q2lyY2xlIGZyb20gJ0BtdWkvaWNvbnMtbWF0ZXJpYWwvQWNjb3VudENpcmNsZSc7XHJcblxyXG5jb25zdCBNYWluID0gc3R5bGVkKCdtYWluJykoKHsgdGhlbWUgfSkgPT4gKHtcclxuICBmbGV4R3JvdzogMSxcclxuICBwYWRkaW5nOiB0aGVtZS5zcGFjaW5nKDMpLFxyXG4gIG1hcmdpblRvcDogdGhlbWUuc3BhY2luZyg4KSxcclxuICBtaW5IZWlnaHQ6ICcxMDB2aCcsXHJcbiAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLmJhY2tncm91bmQuZGVmYXVsdCxcclxufSkpO1xyXG5cclxuY29uc3QgTWFpbkxheW91dCA9ICh7IGNoaWxkcmVuIH0pID0+IHtcclxuICBjb25zdCBbdXNlcl0gPSB1c2VBdXRoU3RhdGUoYXV0aCk7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xyXG4gIGNvbnN0IGlzTW9iaWxlID0gdXNlTWVkaWFRdWVyeSh0aGVtZS5icmVha3BvaW50cy5kb3duKCdzbScpKTtcclxuICBjb25zdCBbbW9iaWxlTWVudUFuY2hvciwgc2V0TW9iaWxlTWVudUFuY2hvcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbdXNlck1lbnVBbmNob3IsIHNldFVzZXJNZW51QW5jaG9yXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2JpbGVNZW51T3BlbiA9IChldmVudCkgPT4ge1xyXG4gICAgc2V0TW9iaWxlTWVudUFuY2hvcihldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2JpbGVNZW51Q2xvc2UgPSAoKSA9PiB7XHJcbiAgICBzZXRNb2JpbGVNZW51QW5jaG9yKG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVzZXJNZW51T3BlbiA9IChldmVudCkgPT4ge1xyXG4gICAgc2V0VXNlck1lbnVBbmNob3IoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXNlck1lbnVDbG9zZSA9ICgpID0+IHtcclxuICAgIHNldFVzZXJNZW51QW5jaG9yKG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHNpZ25PdXQoYXV0aCk7XHJcbiAgICAgIHJvdXRlci5wdXNoKCcvYXV0aCcpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2lnbmluZyBvdXQ6JywgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1lbnVJdGVtcyA9IFtcclxuICAgIHsgbGFiZWw6ICdUcmFuZyBjaOG7pycsIHBhdGg6ICcvJyB9LFxyXG4gICAgeyBsYWJlbDogJ0No4bqpbiDEkW/DoW4nLCBwYXRoOiAnL2RpYWdub3NpcycgfSxcclxuICAgIHsgbGFiZWw6ICdM4buLY2ggc+G7rScsIHBhdGg6ICcvaGlzdG9yeScgfSxcclxuICAgIHsgbGFiZWw6ICdEYXNoYm9hcmQnLCBwYXRoOiAnL2Rhc2hib2FyZCcgfSxcclxuICAgIHsgbGFiZWw6ICdFU1AzMiBDQU0nLCBwYXRoOiAnL2VzcDMyLXN0cmVhbScgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCByZW5kZXJNb2JpbGVNZW51ID0gKFxyXG4gICAgPE1lbnVcclxuICAgICAgYW5jaG9yRWw9e21vYmlsZU1lbnVBbmNob3J9XHJcbiAgICAgIG9wZW49e0Jvb2xlYW4obW9iaWxlTWVudUFuY2hvcil9XHJcbiAgICAgIG9uQ2xvc2U9e2hhbmRsZU1vYmlsZU1lbnVDbG9zZX1cclxuICAgID5cclxuICAgICAge21lbnVJdGVtcy5tYXAoKGl0ZW0pID0+IChcclxuICAgICAgICA8TWVudUl0ZW1cclxuICAgICAgICAgIGtleT17aXRlbS5wYXRofVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICByb3V0ZXIucHVzaChpdGVtLnBhdGgpO1xyXG4gICAgICAgICAgICBoYW5kbGVNb2JpbGVNZW51Q2xvc2UoKTtcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge2l0ZW0ubGFiZWx9XHJcbiAgICAgICAgPC9NZW51SXRlbT5cclxuICAgICAgKSl9XHJcbiAgICA8L01lbnU+XHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVuZGVyVXNlck1lbnUgPSAoXHJcbiAgICA8TWVudVxyXG4gICAgICBhbmNob3JFbD17dXNlck1lbnVBbmNob3J9XHJcbiAgICAgIG9wZW49e0Jvb2xlYW4odXNlck1lbnVBbmNob3IpfVxyXG4gICAgICBvbkNsb3NlPXtoYW5kbGVVc2VyTWVudUNsb3NlfVxyXG4gICAgPlxyXG4gICAgICA8TWVudUl0ZW0gb25DbGljaz17aGFuZGxlTG9nb3V0fT7EkMSDbmcgeHXhuqV0PC9NZW51SXRlbT5cclxuICAgIDwvTWVudT5cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveCBzeD17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBtaW5IZWlnaHQ6ICcxMDB2aCcgfX0+XHJcbiAgICAgIDxBcHBCYXIgcG9zaXRpb249XCJmaXhlZFwiPlxyXG4gICAgICAgIDxUb29sYmFyPlxyXG4gICAgICAgICAge2lzTW9iaWxlICYmIChcclxuICAgICAgICAgICAgPEljb25CdXR0b25cclxuICAgICAgICAgICAgICBlZGdlPVwic3RhcnRcIlxyXG4gICAgICAgICAgICAgIGNvbG9yPVwiaW5oZXJpdFwiXHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIm1lbnVcIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1vYmlsZU1lbnVPcGVufVxyXG4gICAgICAgICAgICAgIHN4PXt7IG1yOiAyIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8TWVudUljb24gLz5cclxuICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIiBjb21wb25lbnQ9XCJkaXZcIiBzeD17eyBmbGV4R3JvdzogMSB9fT5cclxuICAgICAgICAgICAgQWdyb21pbmRcclxuICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuXHJcbiAgICAgICAgICB7IWlzTW9iaWxlICYmIChcclxuICAgICAgICAgICAgPEJveCBzeD17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMiB9fT5cclxuICAgICAgICAgICAgICB7bWVudUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ucGF0aH1cclxuICAgICAgICAgICAgICAgICAgY29sb3I9XCJpbmhlcml0XCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goaXRlbS5wYXRoKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHt1c2VyID8gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxJY29uQnV0dG9uXHJcbiAgICAgICAgICAgICAgICBzaXplPVwibGFyZ2VcIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cImFjY291bnQgb2YgY3VycmVudCB1c2VyXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9XCJtZW51LWFwcGJhclwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVVc2VyTWVudU9wZW59XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1cImluaGVyaXRcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxBY2NvdW50Q2lyY2xlIC8+XHJcbiAgICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxyXG4gICAgICAgICAgICAgIHtyZW5kZXJVc2VyTWVudX1cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8QnV0dG9uIGNvbG9yPVwiaW5oZXJpdFwiIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKCcvYXV0aCcpfT5cclxuICAgICAgICAgICAgICDEkMSDbmcgbmjhuq1wXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L1Rvb2xiYXI+XHJcbiAgICAgIDwvQXBwQmFyPlxyXG5cclxuICAgICAge3JlbmRlck1vYmlsZU1lbnV9XHJcblxyXG4gICAgICA8TWFpbj5cclxuICAgICAgICA8Q29udGFpbmVyIG1heFdpZHRoPVwibGdcIj5cclxuICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgPC9NYWluPlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW5MYXlvdXQ7ICJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiQXBwQmFyIiwiVG9vbGJhciIsIlR5cG9ncmFwaHkiLCJDb250YWluZXIiLCJCb3giLCJCdXR0b24iLCJJY29uQnV0dG9uIiwiTWVudSIsIk1lbnVJdGVtIiwidXNlVGhlbWUiLCJ1c2VNZWRpYVF1ZXJ5Iiwic3R5bGVkIiwidXNlUm91dGVyIiwidXNlQXV0aFN0YXRlIiwiYXV0aCIsInNpZ25PdXQiLCJNZW51SWNvbiIsIkFjY291bnRDaXJjbGUiLCJNYWluIiwidGhlbWUiLCJmbGV4R3JvdyIsInBhZGRpbmciLCJzcGFjaW5nIiwibWFyZ2luVG9wIiwibWluSGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwicGFsZXR0ZSIsImJhY2tncm91bmQiLCJkZWZhdWx0IiwiTWFpbkxheW91dCIsImNoaWxkcmVuIiwidXNlciIsInJvdXRlciIsImlzTW9iaWxlIiwiYnJlYWtwb2ludHMiLCJkb3duIiwibW9iaWxlTWVudUFuY2hvciIsInNldE1vYmlsZU1lbnVBbmNob3IiLCJ1c2VyTWVudUFuY2hvciIsInNldFVzZXJNZW51QW5jaG9yIiwiaGFuZGxlTW9iaWxlTWVudU9wZW4iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJoYW5kbGVNb2JpbGVNZW51Q2xvc2UiLCJoYW5kbGVVc2VyTWVudU9wZW4iLCJoYW5kbGVVc2VyTWVudUNsb3NlIiwiaGFuZGxlTG9nb3V0IiwicHVzaCIsImVycm9yIiwiY29uc29sZSIsIm1lbnVJdGVtcyIsImxhYmVsIiwicGF0aCIsInJlbmRlck1vYmlsZU1lbnUiLCJhbmNob3JFbCIsIm9wZW4iLCJCb29sZWFuIiwib25DbG9zZSIsIm1hcCIsIml0ZW0iLCJvbkNsaWNrIiwicmVuZGVyVXNlck1lbnUiLCJzeCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwicG9zaXRpb24iLCJlZGdlIiwiY29sb3IiLCJhcmlhLWxhYmVsIiwibXIiLCJ2YXJpYW50IiwiY29tcG9uZW50IiwiZ2FwIiwic2l6ZSIsImFyaWEtY29udHJvbHMiLCJhcmlhLWhhc3BvcHVwIiwibWF4V2lkdGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Layout/MainLayout.js\n");

/***/ }),

/***/ "./src/createEmotionCache.js":
/*!***********************************!*\
  !*** ./src/createEmotionCache.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createEmotionCache)\n/* harmony export */ });\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ \"@emotion/cache\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_cache__WEBPACK_IMPORTED_MODULE_0__]);\n_emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nfunction createEmotionCache() {\n    return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        key: \"css\",\n        prepend: true\n    });\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY3JlYXRlRW1vdGlvbkNhY2hlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXlDO0FBRTFCLFNBQVNDO0lBQ3RCLE9BQU9ELDBEQUFXQSxDQUFDO1FBQUVFLEtBQUs7UUFBT0MsU0FBUztJQUFLO0FBQ2pEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWdyb21pbmQtd2ViLy4vc3JjL2NyZWF0ZUVtb3Rpb25DYWNoZS5qcz9jYzIzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVDYWNoZSBmcm9tICdAZW1vdGlvbi9jYWNoZSc7XHJcbiBcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRW1vdGlvbkNhY2hlKCkge1xyXG4gIHJldHVybiBjcmVhdGVDYWNoZSh7IGtleTogJ2NzcycsIHByZXBlbmQ6IHRydWUgfSk7XHJcbn0gIl0sIm5hbWVzIjpbImNyZWF0ZUNhY2hlIiwiY3JlYXRlRW1vdGlvbkNhY2hlIiwia2V5IiwicHJlcGVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/createEmotionCache.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/node/styles/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"./node_modules/@mui/material/node/CssBaseline/index.js\");\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/react */ \"@emotion/react\");\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../theme */ \"./src/theme.js\");\n/* harmony import */ var _createEmotionCache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../createEmotionCache */ \"./src/createEmotionCache.js\");\n/* harmony import */ var _mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/x-date-pickers/LocalizationProvider */ \"./node_modules/@mui/x-date-pickers/esm/LocalizationProvider/index.js\");\n/* harmony import */ var _mui_x_date_pickers_AdapterDateFns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/x-date-pickers/AdapterDateFns */ \"./node_modules/@mui/x-date-pickers/esm/AdapterDateFns/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_react__WEBPACK_IMPORTED_MODULE_4__, _createEmotionCache__WEBPACK_IMPORTED_MODULE_6__, _mui_x_date_pickers_AdapterDateFns__WEBPACK_IMPORTED_MODULE_8__]);\n([_emotion_react__WEBPACK_IMPORTED_MODULE_4__, _createEmotionCache__WEBPACK_IMPORTED_MODULE_6__, _mui_x_date_pickers_AdapterDateFns__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n// import Script from 'next/script'; // Đã comment vì không còn sử dụng\n\n\n\n\n\n\n // Thử đường dẫn chuẩn hơn\n// Client-side cache, shared for the whole session of the user in the browser.\nconst clientSideEmotionCache = (0,_createEmotionCache__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\nfunction MyApp(props) {\n    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_emotion_react__WEBPACK_IMPORTED_MODULE_4__.CacheProvider, {\n        value: emotionCache,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"initial-scale=1, width=device-width\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\_app.js\",\n                        lineNumber: 22,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"AgroMind\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\_app.js\",\n                        lineNumber: 23,\n                        columnNumber: 9\n                    }, this),\n                    \" \"\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\_app.js\",\n                lineNumber: 21,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_x_date_pickers_LocalizationProvider__WEBPACK_IMPORTED_MODULE_7__.LocalizationProvider, {\n                dateAdapter: _mui_x_date_pickers_AdapterDateFns__WEBPACK_IMPORTED_MODULE_8__.AdapterDateFns,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_9__.ThemeProvider, {\n                    theme: _theme__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\_app.js\",\n                            lineNumber: 31,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                            ...pageProps\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\_app.js\",\n                            lineNumber: 32,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\_app.js\",\n                    lineNumber: 29,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\_app.js\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 20,\n        columnNumber: 5\n    }, this);\n}\nMyApp.propTypes = {\n    Component: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().elementType).isRequired,\n    emotionCache: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),\n    pageProps: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object).isRequired\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDSTtBQUNOO0FBQzdCLHVFQUF1RTtBQUNsQjtBQUNEO0FBQ0w7QUFDbEI7QUFDMEI7QUFDeUI7QUFDWixDQUFDLDBCQUEwQjtBQUUvRiw4RUFBOEU7QUFDOUUsTUFBTVUseUJBQXlCSCwrREFBa0JBO0FBRWxDLFNBQVNJLE1BQU1DLEtBQUs7SUFDakMsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLGVBQWVKLHNCQUFzQixFQUFFSyxTQUFTLEVBQUUsR0FBR0g7SUFFeEUscUJBQ0UsOERBQUNQLHlEQUFhQTtRQUFDVyxPQUFPRjs7MEJBQ3BCLDhEQUFDWixrREFBSUE7O2tDQUNILDhEQUFDZTt3QkFBS0MsTUFBSzt3QkFBV0MsU0FBUTs7Ozs7O2tDQUM5Qiw4REFBQ0M7a0NBQU07Ozs7OztvQkFBZ0I7Ozs7Ozs7MEJBS3pCLDhEQUFDWiwwRkFBb0JBO2dCQUFDYSxhQUFhWiw4RUFBY0E7MEJBQy9DLDRFQUFDTiwrREFBYUE7b0JBQUNHLE9BQU9BLDhDQUFLQTs7c0NBRXpCLDhEQUFDRixrRUFBV0E7Ozs7O3NDQUNaLDhEQUFDUzs0QkFBVyxHQUFHRSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtsQztBQUVBSixNQUFNVyxTQUFTLEdBQUc7SUFDaEJULFdBQVdaLCtEQUFxQixDQUFDdUIsVUFBVTtJQUMzQ1YsY0FBY2IsMERBQWdCO0lBQzlCYyxXQUFXZCwwREFBZ0IsQ0FBQ3VCLFVBQVU7QUFDeEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ3JvbWluZC13ZWIvLi9zcmMvcGFnZXMvX2FwcC5qcz84ZmRhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuLy8gaW1wb3J0IFNjcmlwdCBmcm9tICduZXh0L3NjcmlwdCc7IC8vIMSQw6MgY29tbWVudCB2w6wga2jDtG5nIGPDsm4gc+G7rSBk4bulbmdcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJztcclxuaW1wb3J0IENzc0Jhc2VsaW5lIGZyb20gJ0BtdWkvbWF0ZXJpYWwvQ3NzQmFzZWxpbmUnO1xyXG5pbXBvcnQgeyBDYWNoZVByb3ZpZGVyIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vdGhlbWUnO1xyXG5pbXBvcnQgY3JlYXRlRW1vdGlvbkNhY2hlIGZyb20gJy4uL2NyZWF0ZUVtb3Rpb25DYWNoZSc7XHJcbmltcG9ydCB7IExvY2FsaXphdGlvblByb3ZpZGVyIH0gZnJvbSAnQG11aS94LWRhdGUtcGlja2Vycy9Mb2NhbGl6YXRpb25Qcm92aWRlcic7XHJcbmltcG9ydCB7IEFkYXB0ZXJEYXRlRm5zIH0gZnJvbSAnQG11aS94LWRhdGUtcGlja2Vycy9BZGFwdGVyRGF0ZUZucyc7IC8vIFRo4butIMSRxrDhu51uZyBk4bqrbiBjaHXhuqluIGjGoW5cclxuXHJcbi8vIENsaWVudC1zaWRlIGNhY2hlLCBzaGFyZWQgZm9yIHRoZSB3aG9sZSBzZXNzaW9uIG9mIHRoZSB1c2VyIGluIHRoZSBicm93c2VyLlxyXG5jb25zdCBjbGllbnRTaWRlRW1vdGlvbkNhY2hlID0gY3JlYXRlRW1vdGlvbkNhY2hlKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNeUFwcChwcm9wcykge1xyXG4gIGNvbnN0IHsgQ29tcG9uZW50LCBlbW90aW9uQ2FjaGUgPSBjbGllbnRTaWRlRW1vdGlvbkNhY2hlLCBwYWdlUHJvcHMgfSA9IHByb3BzO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2Vtb3Rpb25DYWNoZX0+XHJcbiAgICAgIDxIZWFkPlxyXG4gICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJpbml0aWFsLXNjYWxlPTEsIHdpZHRoPWRldmljZS13aWR0aFwiIC8+XHJcbiAgICAgICAgPHRpdGxlPkFncm9NaW5kPC90aXRsZT4gey8qIELhuqFuIGPDsyB0aOG7gyB0aGF5IMSR4buVaSB0acOqdSDEkeG7gSDhu58gxJHDonkgKi99XHJcbiAgICAgIDwvSGVhZD5cclxuICAgICAgey8qIFThuqNpIGPDoWMgdOG7h3AgSmF2YVNjcmlwdCDEkeG7i25oIG5naMSpYSBmb250IGNobyBqc1BERiAqL31cclxuICAgICAgey8qIDxTY3JpcHQgc3JjPVwiL2ZvbnRzL1JvYm90by1SZWd1bGFyLW5vcm1hbC5qc1wiIHN0cmF0ZWd5PVwiYmVmb3JlSW50ZXJhY3RpdmVcIiAvPiAqL31cclxuICAgICAgey8qIDxTY3JpcHQgc3JjPVwiL2ZvbnRzL1JvYm90by1SZWd1bGFyLWJvbGQuanNcIiBzdHJhdGVneT1cImJlZm9yZUludGVyYWN0aXZlXCIgLz4gKi99XHJcbiAgICAgIDxMb2NhbGl6YXRpb25Qcm92aWRlciBkYXRlQWRhcHRlcj17QWRhcHRlckRhdGVGbnN9PlxyXG4gICAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XHJcbiAgICAgICAgICB7LyogQ3NzQmFzZWxpbmUga2lja3N0YXJ0IGFuIGVsZWdhbnQsIGNvbnNpc3RlbnQsIGFuZCBzaW1wbGUgYmFzZWxpbmUgdG8gYnVpbGQgdXBvbi4gKi99XHJcbiAgICAgICAgICA8Q3NzQmFzZWxpbmUgLz5cclxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICA8L1RoZW1lUHJvdmlkZXI+XHJcbiAgICAgIDwvTG9jYWxpemF0aW9uUHJvdmlkZXI+XHJcbiAgICA8L0NhY2hlUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuTXlBcHAucHJvcFR5cGVzID0ge1xyXG4gIENvbXBvbmVudDogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLmlzUmVxdWlyZWQsXHJcbiAgZW1vdGlvbkNhY2hlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gIHBhZ2VQcm9wczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG59OyAiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJIZWFkIiwiVGhlbWVQcm92aWRlciIsIkNzc0Jhc2VsaW5lIiwiQ2FjaGVQcm92aWRlciIsInRoZW1lIiwiY3JlYXRlRW1vdGlvbkNhY2hlIiwiTG9jYWxpemF0aW9uUHJvdmlkZXIiLCJBZGFwdGVyRGF0ZUZucyIsImNsaWVudFNpZGVFbW90aW9uQ2FjaGUiLCJNeUFwcCIsInByb3BzIiwiQ29tcG9uZW50IiwiZW1vdGlvbkNhY2hlIiwicGFnZVByb3BzIiwidmFsdWUiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJ0aXRsZSIsImRhdGVBZGFwdGVyIiwicHJvcFR5cGVzIiwiZWxlbWVudFR5cGUiLCJpc1JlcXVpcmVkIiwib2JqZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./src/pages/esp32-stream.js":
/*!***********************************!*\
  !*** ./src/pages/esp32-stream.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ESP32StreamPage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! __barrel_optimize__?names=Box,Button,CircularProgress,Grid,Paper,Typography!=!@mui/material */ \"__barrel_optimize__?names=Box,Button,CircularProgress,Grid,Paper,Typography!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var _components_Layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Layout/MainLayout */ \"./src/components/Layout/MainLayout.js\");\n/* harmony import */ var _components_ESP32Stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ESP32Stream */ \"./src/components/ESP32Stream.js\");\n/* harmony import */ var _services_firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/firebase */ \"./src/services/firebase.js\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/storage */ \"firebase/storage\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var _services_ml__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/ml */ \"./src/services/ml.js\");\n/* harmony import */ var react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-firebase-hooks/auth */ \"react-firebase-hooks/auth\");\n/* harmony import */ var react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__, _services_firebase__WEBPACK_IMPORTED_MODULE_4__, firebase_storage__WEBPACK_IMPORTED_MODULE_5__, firebase_firestore__WEBPACK_IMPORTED_MODULE_6__]);\n([_components_Layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__, _services_firebase__WEBPACK_IMPORTED_MODULE_4__, firebase_storage__WEBPACK_IMPORTED_MODULE_5__, firebase_firestore__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\nfunction ESP32StreamPage() {\n    const [user] = (0,react_firebase_hooks_auth__WEBPACK_IMPORTED_MODULE_8__.useAuthState)(_services_firebase__WEBPACK_IMPORTED_MODULE_4__.auth);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();\n    const [loadingPrediction, setLoadingPrediction] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [predictionResult, setPredictionResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [predictionError, setPredictionError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const handleImageCapturedFromStream = async (imageBlob)=>{\n        if (!user) {\n            alert(\"Bạn cần đăng nhập để thực hiện chẩn đo\\xe1n.\");\n            router.push(\"/auth\");\n            return;\n        }\n        if (!imageBlob) {\n            setPredictionError(\"Kh\\xf4ng nhận được ảnh từ camera.\");\n            return;\n        }\n        setLoadingPrediction(true);\n        setPredictionResult(null);\n        setPredictionError(\"\");\n        try {\n            // Tạo HTMLImageElement từ Blob để mlService có thể xử lý\n            const img = new Image();\n            img.src = URL.createObjectURL(imageBlob);\n            await new Promise((resolve, reject)=>{\n                img.onload = ()=>{\n                    URL.revokeObjectURL(img.src); // Giải phóng object URL sau khi ảnh đã tải\n                    resolve();\n                };\n                img.onerror = (err)=>{\n                    URL.revokeObjectURL(img.src);\n                    reject(err);\n                };\n            });\n            // 1. Get prediction\n            const prediction = await _services_ml__WEBPACK_IMPORTED_MODULE_7__.mlService.predict(img);\n            if (!prediction || !prediction.disease) {\n                throw new Error(\"Kh\\xf4ng thể lấy được kết quả dự đo\\xe1n hoặc t\\xean bệnh.\");\n            }\n            // 2. Upload image to Firebase Storage\n            const predictedClassName = prediction.disease.replace(/\\s+/g, \"_\");\n            const timestamp = Date.now();\n            const imageName = `capture_${timestamp}.jpg`;\n            const storagePath = `esp32_captures/${user.uid}/${predictedClassName}/${imageName}`;\n            const storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_5__.ref)(_services_firebase__WEBPACK_IMPORTED_MODULE_4__.storage, storagePath);\n            await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_5__.uploadBytes)(storageRef, imageBlob); // Tải lên Blob trực tiếp\n            const imageUrl = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_5__.getDownloadURL)(storageRef);\n            // 3. Save to Firestore in the user-specific collection with consistent structure\n            const diagnosisRecord = {\n                userId: user.uid,\n                imageUrl,\n                storagePath,\n                diseaseName: prediction.disease,\n                confidence: prediction.confidence,\n                treatment: prediction.treatment || \"\",\n                prevention: prediction.prevention || \"\",\n                timestamp: new Date(timestamp),\n                platform: \"esp32cam\" // Consistent with history page logic\n            };\n            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.addDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.collection)(_services_firebase__WEBPACK_IMPORTED_MODULE_4__.db, \"users\", user.uid, \"esp32cam\"), diagnosisRecord);\n            setPredictionResult(prediction); // predictionResult on UI can still use the full prediction object\n        } catch (error) {\n            console.error(\"Error during ESP32 CAM diagnosis:\", error);\n            setPredictionError(`Lỗi chẩn đoán: ${error.message || \"Vui l\\xf2ng thử lại.\"}`);\n        // Không alert ở đây để không làm gián đoạn, hiển thị lỗi trên UI\n        } finally{\n            setLoadingPrediction(false);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layout_MainLayout__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ESP32Stream__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                onImageCaptured: handleImageCapturedFromStream\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                lineNumber: 91,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Paper, {\n                sx: {\n                    p: 3,\n                    mt: 3\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                        variant: \"h6\",\n                        gutterBottom: true,\n                        children: \"Kết quả chẩn đo\\xe1n từ ESP32-CAM\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                        lineNumber: 95,\n                        columnNumber: 9\n                    }, this),\n                    loadingPrediction && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Box, {\n                        sx: {\n                            display: \"flex\",\n                            justifyContent: \"center\",\n                            p: 2\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.CircularProgress, {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                lineNumber: 100,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                                sx: {\n                                    ml: 2\n                                },\n                                children: \"Đang chẩn đo\\xe1n...\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                lineNumber: 101,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                        lineNumber: 99,\n                        columnNumber: 11\n                    }, this),\n                    predictionError && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                        color: \"error\",\n                        sx: {\n                            my: 2\n                        },\n                        children: predictionError\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                        lineNumber: 105,\n                        columnNumber: 11\n                    }, this),\n                    predictionResult && !loadingPrediction && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Box, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                                variant: \"body1\",\n                                paragraph: true,\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                        children: \"Bệnh:\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                        lineNumber: 110,\n                                        columnNumber: 15\n                                    }, this),\n                                    \" \",\n                                    predictionResult.disease\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                lineNumber: 109,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                                variant: \"body1\",\n                                paragraph: true,\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                        children: \"Độ ch\\xednh x\\xe1c:\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                        lineNumber: 113,\n                                        columnNumber: 15\n                                    }, this),\n                                    \" \",\n                                    (predictionResult.confidence * 100).toFixed(2),\n                                    \"%\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                lineNumber: 112,\n                                columnNumber: 13\n                            }, this),\n                            predictionResult.treatment && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                                        variant: \"h6\",\n                                        gutterBottom: true,\n                                        sx: {\n                                            mt: 2\n                                        },\n                                        children: \"Hướng dẫn điều trị\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                        lineNumber: 117,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                                        variant: \"body1\",\n                                        paragraph: true,\n                                        children: predictionResult.treatment\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                        lineNumber: 120,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true),\n                            predictionResult.prevention && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                                        variant: \"h6\",\n                                        gutterBottom: true,\n                                        sx: {\n                                            mt: 2\n                                        },\n                                        children: \"Biện ph\\xe1p ph\\xf2ng ngừa\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                        lineNumber: 127,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                                        variant: \"body1\",\n                                        paragraph: true,\n                                        children: predictionResult.prevention\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                        lineNumber: 130,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Button, {\n                                variant: \"outlined\",\n                                onClick: ()=>setPredictionResult(null),\n                                sx: {\n                                    mt: 2\n                                },\n                                children: \"Chẩn đo\\xe1n ảnh kh\\xe1c\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                                lineNumber: 135,\n                                columnNumber: 14\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                        lineNumber: 108,\n                        columnNumber: 11\n                    }, this),\n                    !predictionResult && !loadingPrediction && !predictionError && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Box_Button_CircularProgress_Grid_Paper_Typography_mui_material__WEBPACK_IMPORTED_MODULE_10__.Typography, {\n                        variant: \"body1\",\n                        color: \"textSecondary\",\n                        children: 'Nhấn \"Capture Image\" tr\\xean stream của ESP32-CAM để bắt đầu chẩn đo\\xe1n.'\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                        lineNumber: 145,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n                lineNumber: 94,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\hyu\\\\apple_disease_detection\\\\agromind_master\\\\web\\\\src\\\\pages\\\\esp32-stream.js\",\n        lineNumber: 90,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O3dDQUFDSixJQUFJOzRDQUFFRSxJQUFJO3dDQUFFO2tEQUFHOzs7Ozs7a0RBR3JELDhEQUFDdEUsOEhBQVVBO3dDQUFDdUUsU0FBUTt3Q0FBUU8sU0FBUztrREFDbEN2RCxpQkFBaUJzQyxTQUFTOzs7Ozs7Ozs0QkFJaEN0QyxpQkFBaUJ1QyxVQUFVLGtCQUMxQjs7a0RBQ0UsOERBQUM5RCw4SEFBVUE7d0NBQUN1RSxTQUFRO3dDQUFLQyxZQUFZO3dDQUFDSixJQUFJOzRDQUFFRSxJQUFJO3dDQUFFO2tEQUFHOzs7Ozs7a0RBR3JELDhEQUFDdEUsOEhBQVVBO3dDQUFDdUUsU0FBUTt3Q0FBUU8sU0FBUztrREFDbEN2RCxpQkFBaUJ1QyxVQUFVOzs7Ozs7OzswQ0FJakMsOERBQUMxRCwwSEFBTUE7Z0NBQ0ptRSxTQUFRO2dDQUNSVSxTQUFTLElBQU16RCxvQkFBb0I7Z0NBQ25DNEMsSUFBSTtvQ0FBQ0UsSUFBSTtnQ0FBQzswQ0FDYjs7Ozs7Ozs7Ozs7O29CQUtKLENBQUMvQyxvQkFBb0IsQ0FBQ0YscUJBQXFCLENBQUNJLGlDQUMzQyw4REFBQ3pCLDhIQUFVQTt3QkFBQ3VFLFNBQVE7d0JBQVFLLE9BQU07a0NBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPNUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ3JvbWluZC13ZWIvLi9zcmMvcGFnZXMvZXNwMzItc3RyZWFtLmpzP2Y3ZjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCb3gsIFR5cG9ncmFwaHksIFBhcGVyLCBHcmlkLCBDaXJjdWxhclByb2dyZXNzLCBCdXR0b24gfSBmcm9tICdAbXVpL21hdGVyaWFsJztcclxuaW1wb3J0IE1haW5MYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9MYXlvdXQvTWFpbkxheW91dCc7XHJcbmltcG9ydCBFU1AzMlN0cmVhbUNvbXBvbmVudCBmcm9tICcuLi9jb21wb25lbnRzL0VTUDMyU3RyZWFtJztcclxuaW1wb3J0IHsgc3RvcmFnZSwgZGIsIGF1dGggfSBmcm9tICcuLi9zZXJ2aWNlcy9maXJlYmFzZSc7XHJcbmltcG9ydCB7IHJlZiwgdXBsb2FkQnl0ZXMsIGdldERvd25sb2FkVVJMIH0gZnJvbSAnZmlyZWJhc2Uvc3RvcmFnZSc7XHJcbmltcG9ydCB7IGNvbGxlY3Rpb24sIGFkZERvYyB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7IG1sU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21sJztcclxuaW1wb3J0IHsgdXNlQXV0aFN0YXRlIH0gZnJvbSAncmVhY3QtZmlyZWJhc2UtaG9va3MvYXV0aCc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVTUDMyU3RyZWFtUGFnZSgpIHtcclxuICBjb25zdCBbdXNlcl0gPSB1c2VBdXRoU3RhdGUoYXV0aCk7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgW2xvYWRpbmdQcmVkaWN0aW9uLCBzZXRMb2FkaW5nUHJlZGljdGlvbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByZWRpY3Rpb25SZXN1bHQsIHNldFByZWRpY3Rpb25SZXN1bHRdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3ByZWRpY3Rpb25FcnJvciwgc2V0UHJlZGljdGlvbkVycm9yXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlSW1hZ2VDYXB0dXJlZEZyb21TdHJlYW0gPSBhc3luYyAoaW1hZ2VCbG9iKSA9PiB7XHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgYWxlcnQoJ0LhuqFuIGPhuqduIMSRxINuZyBuaOG6rXAgxJHhu4MgdGjhu7FjIGhp4buHbiBjaOG6qW4gxJFvw6FuLicpO1xyXG4gICAgICByb3V0ZXIucHVzaCgnL2F1dGgnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbWFnZUJsb2IpIHtcclxuICAgICAgc2V0UHJlZGljdGlvbkVycm9yKCdLaMO0bmcgbmjhuq1uIMSRxrDhu6NjIOG6o25oIHThu6sgY2FtZXJhLicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9hZGluZ1ByZWRpY3Rpb24odHJ1ZSk7XHJcbiAgICBzZXRQcmVkaWN0aW9uUmVzdWx0KG51bGwpO1xyXG4gICAgc2V0UHJlZGljdGlvbkVycm9yKCcnKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBU4bqhbyBIVE1MSW1hZ2VFbGVtZW50IHThu6sgQmxvYiDEkeG7gyBtbFNlcnZpY2UgY8OzIHRo4buDIHjhu60gbMO9XHJcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBpbWcuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChpbWFnZUJsb2IpO1xyXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoaW1nLnNyYyk7IC8vIEdp4bqjaSBwaMOzbmcgb2JqZWN0IFVSTCBzYXUga2hpIOG6o25oIMSRw6MgdOG6o2lcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGltZy5vbmVycm9yID0gKGVycikgPT4ge1xyXG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChpbWcuc3JjKTtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gMS4gR2V0IHByZWRpY3Rpb25cclxuICAgICAgY29uc3QgcHJlZGljdGlvbiA9IGF3YWl0IG1sU2VydmljZS5wcmVkaWN0KGltZyk7XHJcbiAgICAgIGlmICghcHJlZGljdGlvbiB8fCAhcHJlZGljdGlvbi5kaXNlYXNlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLaMO0bmcgdGjhu4MgbOG6pXkgxJHGsOG7o2Mga+G6v3QgcXXhuqMgZOG7sSDEkW/DoW4gaG/hurdjIHTDqm4gYuG7h25oLicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyAyLiBVcGxvYWQgaW1hZ2UgdG8gRmlyZWJhc2UgU3RvcmFnZVxyXG4gICAgICBjb25zdCBwcmVkaWN0ZWRDbGFzc05hbWUgPSBwcmVkaWN0aW9uLmRpc2Vhc2UucmVwbGFjZSgvXFxzKy9nLCAnXycpO1xyXG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICBjb25zdCBpbWFnZU5hbWUgPSBgY2FwdHVyZV8ke3RpbWVzdGFtcH0uanBnYDtcclxuICAgICAgY29uc3Qgc3RvcmFnZVBhdGggPSBgZXNwMzJfY2FwdHVyZXMvJHt1c2VyLnVpZH0vJHtwcmVkaWN0ZWRDbGFzc05hbWV9LyR7aW1hZ2VOYW1lfWA7XHJcbiAgICAgIGNvbnN0IHN0b3JhZ2VSZWYgPSByZWYoc3RvcmFnZSwgc3RvcmFnZVBhdGgpO1xyXG4gICAgICBhd2FpdCB1cGxvYWRCeXRlcyhzdG9yYWdlUmVmLCBpbWFnZUJsb2IpOyAvLyBU4bqjaSBsw6puIEJsb2IgdHLhu7FjIHRp4bq/cFxyXG4gICAgICBjb25zdCBpbWFnZVVybCA9IGF3YWl0IGdldERvd25sb2FkVVJMKHN0b3JhZ2VSZWYpO1xyXG5cclxuICAgICAgLy8gMy4gU2F2ZSB0byBGaXJlc3RvcmUgaW4gdGhlIHVzZXItc3BlY2lmaWMgY29sbGVjdGlvbiB3aXRoIGNvbnNpc3RlbnQgc3RydWN0dXJlXHJcbiAgICAgIGNvbnN0IGRpYWdub3Npc1JlY29yZCA9IHtcclxuICAgICAgICB1c2VySWQ6IHVzZXIudWlkLFxyXG4gICAgICAgIGltYWdlVXJsLFxyXG4gICAgICAgIHN0b3JhZ2VQYXRoLFxyXG4gICAgICAgIGRpc2Vhc2VOYW1lOiBwcmVkaWN0aW9uLmRpc2Vhc2UsXHJcbiAgICAgICAgY29uZmlkZW5jZTogcHJlZGljdGlvbi5jb25maWRlbmNlLFxyXG4gICAgICAgIHRyZWF0bWVudDogcHJlZGljdGlvbi50cmVhdG1lbnQgfHwgJycsXHJcbiAgICAgICAgcHJldmVudGlvbjogcHJlZGljdGlvbi5wcmV2ZW50aW9uIHx8ICcnLFxyXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUodGltZXN0YW1wKSwgLy8gT3IgdXNlIFRpbWVzdGFtcC5mcm9tRGF0ZShuZXcgRGF0ZSh0aW1lc3RhbXApKSBmb3IgRmlyZXN0b3JlIFRpbWVzdGFtcFxyXG4gICAgICAgIHBsYXRmb3JtOiAnZXNwMzJjYW0nIC8vIENvbnNpc3RlbnQgd2l0aCBoaXN0b3J5IHBhZ2UgbG9naWNcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGF3YWl0IGFkZERvYyhjb2xsZWN0aW9uKGRiLCAndXNlcnMnLCB1c2VyLnVpZCwgJ2VzcDMyY2FtJyksIGRpYWdub3Npc1JlY29yZCk7XHJcblxyXG4gICAgICBzZXRQcmVkaWN0aW9uUmVzdWx0KHByZWRpY3Rpb24pOyAvLyBwcmVkaWN0aW9uUmVzdWx0IG9uIFVJIGNhbiBzdGlsbCB1c2UgdGhlIGZ1bGwgcHJlZGljdGlvbiBvYmplY3RcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBFU1AzMiBDQU0gZGlhZ25vc2lzOicsIGVycm9yKTtcclxuICAgICAgc2V0UHJlZGljdGlvbkVycm9yKGBM4buXaSBjaOG6qW4gxJFvw6FuOiAke2Vycm9yLm1lc3NhZ2UgfHwgJ1Z1aSBsw7JuZyB0aOG7rSBs4bqhaS4nfWApO1xyXG4gICAgICAvLyBLaMO0bmcgYWxlcnQg4bufIMSRw6J5IMSR4buDIGtow7RuZyBsw6BtIGdpw6FuIMSRb+G6oW4sIGhp4buDbiB0aOG7iyBs4buXaSB0csOqbiBVSVxyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0TG9hZGluZ1ByZWRpY3Rpb24oZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8TWFpbkxheW91dD5cclxuICAgICAgPEVTUDMyU3RyZWFtQ29tcG9uZW50IG9uSW1hZ2VDYXB0dXJlZD17aGFuZGxlSW1hZ2VDYXB0dXJlZEZyb21TdHJlYW19IC8+XHJcbiAgICAgIFxyXG4gICAgICB7LyogSGnhu4NuIHRo4buLIGvhur90IHF14bqjIGThu7EgxJFvw6FuICovfSBcclxuICAgICAgPFBhcGVyIHN4PXt7IHA6IDMsIG10OiAzIH19PlxyXG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNlwiIGd1dHRlckJvdHRvbT5cclxuICAgICAgICAgIEvhur90IHF14bqjIGNo4bqpbiDEkW/DoW4gdOG7qyBFU1AzMi1DQU1cclxuICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAge2xvYWRpbmdQcmVkaWN0aW9uICYmIChcclxuICAgICAgICAgIDxCb3ggc3g9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIHA6IDIgfX0+XHJcbiAgICAgICAgICAgIDxDaXJjdWxhclByb2dyZXNzIC8+XHJcbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHN4PXt7bWw6IDJ9fT7EkGFuZyBjaOG6qW4gxJFvw6FuLi4uPC9UeXBvZ3JhcGh5PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7cHJlZGljdGlvbkVycm9yICYmIChcclxuICAgICAgICAgIDxUeXBvZ3JhcGh5IGNvbG9yPVwiZXJyb3JcIiBzeD17e215OiAyfX0+e3ByZWRpY3Rpb25FcnJvcn08L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7cHJlZGljdGlvblJlc3VsdCAmJiAhbG9hZGluZ1ByZWRpY3Rpb24gJiYgKFxyXG4gICAgICAgICAgPEJveD5cclxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImJvZHkxXCIgcGFyYWdyYXBoPlxyXG4gICAgICAgICAgICAgIDxzdHJvbmc+QuG7h25oOjwvc3Ryb25nPiB7cHJlZGljdGlvblJlc3VsdC5kaXNlYXNlfVxyXG4gICAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MVwiIHBhcmFncmFwaD5cclxuICAgICAgICAgICAgICA8c3Ryb25nPsSQ4buZIGNow61uaCB4w6FjOjwvc3Ryb25nPiB7KHByZWRpY3Rpb25SZXN1bHQuY29uZmlkZW5jZSAqIDEwMCkudG9GaXhlZCgyKX0lXHJcbiAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICAge3ByZWRpY3Rpb25SZXN1bHQudHJlYXRtZW50ICYmIChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgZ3V0dGVyQm90dG9tIHN4PXt7IG10OiAyIH19PlxyXG4gICAgICAgICAgICAgICAgICBIxrDhu5tuZyBk4bqrbiDEkWnhu4F1IHRy4buLXHJcbiAgICAgICAgICAgICAgICA8L1R5cG9ncmFwaHk+XHJcbiAgICAgICAgICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiYm9keTFcIiBwYXJhZ3JhcGg+XHJcbiAgICAgICAgICAgICAgICAgIHtwcmVkaWN0aW9uUmVzdWx0LnRyZWF0bWVudH1cclxuICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3ByZWRpY3Rpb25SZXN1bHQucHJldmVudGlvbiAmJiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNlwiIGd1dHRlckJvdHRvbSBzeD17eyBtdDogMiB9fT5cclxuICAgICAgICAgICAgICAgICAgQmnhu4duIHBow6FwIHBow7JuZyBuZ+G7q2FcclxuICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MVwiIHBhcmFncmFwaD5cclxuICAgICAgICAgICAgICAgICAge3ByZWRpY3Rpb25SZXN1bHQucHJldmVudGlvbn1cclxuICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgIDxCdXR0b24gXHJcbiAgICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZWRcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UHJlZGljdGlvblJlc3VsdChudWxsKX0gXHJcbiAgICAgICAgICAgICAgICBzeD17e210OiAyfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgQ2jhuqluIMSRb8OhbiDhuqNuaCBraMOhY1xyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgeyFwcmVkaWN0aW9uUmVzdWx0ICYmICFsb2FkaW5nUHJlZGljdGlvbiAmJiAhcHJlZGljdGlvbkVycm9yICYmIChcclxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MVwiIGNvbG9yPVwidGV4dFNlY29uZGFyeVwiPlxyXG4gICAgICAgICAgICBOaOG6pW4gXCJDYXB0dXJlIEltYWdlXCIgdHLDqm4gc3RyZWFtIGPhu6dhIEVTUDMyLUNBTSDEkeG7gyBi4bqvdCDEkeG6p3UgY2jhuqluIMSRb8Ohbi5cclxuICAgICAgICAgIDwvVHlwb2dyYXBoeT5cclxuICAgICAgICApfVxyXG4gICAgICA8L1BhcGVyPlxyXG4gICAgPC9NYWluTGF5b3V0PlxyXG4gICk7XHJcbn0gIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJCb3giLCJUeXBvZ3JhcGh5IiwiUGFwZXIiLCJHcmlkIiwiQ2lyY3VsYXJQcm9ncmVzcyIsIkJ1dHRvbiIsIk1haW5MYXlvdXQiLCJFU1AzMlN0cmVhbUNvbXBvbmVudCIsInN0b3JhZ2UiLCJkYiIsImF1dGgiLCJyZWYiLCJ1cGxvYWRCeXRlcyIsImdldERvd25sb2FkVVJMIiwiY29sbGVjdGlvbiIsImFkZERvYyIsIm1sU2VydmljZSIsInVzZUF1dGhTdGF0ZSIsInVzZVJvdXRlciIsIkVTUDMyU3RyZWFtUGFnZSIsInVzZXIiLCJyb3V0ZXIiLCJsb2FkaW5nUHJlZGljdGlvbiIsInNldExvYWRpbmdQcmVkaWN0aW9uIiwicHJlZGljdGlvblJlc3VsdCIsInNldFByZWRpY3Rpb25SZXN1bHQiLCJwcmVkaWN0aW9uRXJyb3IiLCJzZXRQcmVkaWN0aW9uRXJyb3IiLCJoYW5kbGVJbWFnZUNhcHR1cmVkRnJvbVN0cmVhbSIsImltYWdlQmxvYiIsImFsZXJ0IiwicHVzaCIsImltZyIsIkltYWdlIiwic3JjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJvbmxvYWQiLCJyZXZva2VPYmplY3RVUkwiLCJvbmVycm9yIiwiZXJyIiwicHJlZGljdGlvbiIsInByZWRpY3QiLCJkaXNlYXNlIiwiRXJyb3IiLCJwcmVkaWN0ZWRDbGFzc05hbWUiLCJyZXBsYWNlIiwidGltZXN0YW1wIiwiRGF0ZSIsIm5vdyIsImltYWdlTmFtZSIsInN0b3JhZ2VQYXRoIiwidWlkIiwic3RvcmFnZVJlZiIsImltYWdlVXJsIiwiZGlhZ25vc2lzUmVjb3JkIiwidXNlcklkIiwiZGlzZWFzZU5hbWUiLCJjb25maWRlbmNlIiwidHJlYXRtZW50IiwicHJldmVudGlvbiIsInBsYXRmb3JtIiwiZXJyb3IiLCJjb25zb2xlIiwibWVzc2FnZSIsIm9uSW1hZ2VDYXB0dXJlZCIsInN4IiwicCIsIm10IiwidmFyaWFudCIsImd1dHRlckJvdHRvbSIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsIm1sIiwiY29sb3IiLCJteSIsInBhcmFncmFwaCIsInN0cm9uZyIsInRvRml4ZWQiLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/esp32-stream.js\n");

/***/ }),

/***/ "./src/services/firebase.js":
/*!**********************************!*\
  !*** ./src/services/firebase.js ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   storage: () => (/* binding */ storage)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/storage */ \"firebase/storage\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_storage__WEBPACK_IMPORTED_MODULE_3__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_storage__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nconst firebaseConfig = {\n    // Thay thế bằng cấu hình Firebase của bạn\n    apiKey: \"AIzaSyD3HwdAc5qInzq9vEq5PnaepeJiqsUEdP0\",\n    authDomain: \"apple-disease-20b0b.firebaseapp.com\",\n    databaseURL: \"https://apple-disease-20b0b-default-rtdb.asia-southeast1.firebasedatabase.app\",\n    projectId: \"apple-disease-20b0b\",\n    storageBucket: \"apple-disease-20b0b.firebasestorage.app\",\n    messagingSenderId: \"1017696428184\",\n    appId: \"1:1017696428184:web:1265dc2323786b003ef0ed\",\n    measurementId: \"G-HYZXXPCMHZ\"\n};\n// Initialize Firebase\n// const app = initializeApp(firebaseConfig);\n// Kiểm tra xem app đã được khởi tạo chưa\nconst app = !(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig) : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)();\n// Get Firebase services\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);\nconst storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage)(app);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvZmlyZWJhc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBOEQ7QUFDdEI7QUFDVTtBQUNKO0FBRTlDLE1BQU1NLGlCQUFpQjtJQUNyQiwwQ0FBMEM7SUFDMUNDLFFBQVE7SUFDUkMsWUFBWTtJQUNaQyxhQUFhO0lBQ2JDLFdBQVc7SUFDWEMsZUFBZTtJQUNmQyxtQkFBbUI7SUFDbkJDLE9BQU87SUFDUEMsZUFBZTtBQUNqQjtBQUVBLHNCQUFzQjtBQUN0Qiw2Q0FBNkM7QUFFN0MseUNBQXlDO0FBQ3pDLE1BQU1DLE1BQU0sQ0FBQ2QscURBQU9BLEdBQUdlLE1BQU0sR0FBR2hCLDJEQUFhQSxDQUFDTSxrQkFBa0JKLG9EQUFNQTtBQUV0RSx3QkFBd0I7QUFDakIsTUFBTWUsT0FBT2Qsc0RBQU9BLENBQUNZLEtBQUs7QUFDMUIsTUFBTUcsS0FBS2QsZ0VBQVlBLENBQUNXLEtBQUs7QUFDN0IsTUFBTUksVUFBVWQsNERBQVVBLENBQUNVLEtBQUs7QUFFdkMsaUVBQWVBLEdBQUdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZ3JvbWluZC13ZWIvLi9zcmMvc2VydmljZXMvZmlyZWJhc2UuanM/NTQxZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplQXBwLCBnZXRBcHBzLCBnZXRBcHAgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xyXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XHJcbmltcG9ydCB7IGdldEZpcmVzdG9yZSB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XHJcbmltcG9ydCB7IGdldFN0b3JhZ2UgfSBmcm9tICdmaXJlYmFzZS9zdG9yYWdlJztcclxuXHJcbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xyXG4gIC8vIFRoYXkgdGjhur8gYuG6sW5nIGPhuqV1IGjDrG5oIEZpcmViYXNlIGPhu6dhIGLhuqFuXHJcbiAgYXBpS2V5OiBcIkFJemFTeUQzSHdkQWM1cUluenE5dkVxNVBuYWVwZUppcXNVRWRQMFwiLFxyXG4gIGF1dGhEb21haW46IFwiYXBwbGUtZGlzZWFzZS0yMGIwYi5maXJlYmFzZWFwcC5jb21cIixcclxuICBkYXRhYmFzZVVSTDogXCJodHRwczovL2FwcGxlLWRpc2Vhc2UtMjBiMGItZGVmYXVsdC1ydGRiLmFzaWEtc291dGhlYXN0MS5maXJlYmFzZWRhdGFiYXNlLmFwcFwiLFxyXG4gIHByb2plY3RJZDogXCJhcHBsZS1kaXNlYXNlLTIwYjBiXCIsXHJcbiAgc3RvcmFnZUJ1Y2tldDogXCJhcHBsZS1kaXNlYXNlLTIwYjBiLmZpcmViYXNlc3RvcmFnZS5hcHBcIixcclxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxMDE3Njk2NDI4MTg0XCIsXHJcbiAgYXBwSWQ6IFwiMToxMDE3Njk2NDI4MTg0OndlYjoxMjY1ZGMyMzIzNzg2YjAwM2VmMGVkXCIsXHJcbiAgbWVhc3VyZW1lbnRJZDogXCJHLUhZWlhYUENNSFpcIlxyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZVxyXG4vLyBjb25zdCBhcHAgPSBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTtcclxuXHJcbi8vIEtp4buDbSB0cmEgeGVtIGFwcCDEkcOjIMSRxrDhu6NjIGto4bufaSB04bqhbyBjaMawYVxyXG5jb25zdCBhcHAgPSAhZ2V0QXBwcygpLmxlbmd0aCA/IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpIDogZ2V0QXBwKCk7XHJcblxyXG4vLyBHZXQgRmlyZWJhc2Ugc2VydmljZXNcclxuZXhwb3J0IGNvbnN0IGF1dGggPSBnZXRBdXRoKGFwcCk7XHJcbmV4cG9ydCBjb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xyXG5leHBvcnQgY29uc3Qgc3RvcmFnZSA9IGdldFN0b3JhZ2UoYXBwKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwcDsgIl0sIm5hbWVzIjpbImluaXRpYWxpemVBcHAiLCJnZXRBcHBzIiwiZ2V0QXBwIiwiZ2V0QXV0aCIsImdldEZpcmVzdG9yZSIsImdldFN0b3JhZ2UiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJkYXRhYmFzZVVSTCIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsImFwcCIsImxlbmd0aCIsImF1dGgiLCJkYiIsInN0b3JhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/services/firebase.js\n");

/***/ }),

/***/ "./src/services/ml.js":
/*!****************************!*\
  !*** ./src/services/ml.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mlService: () => (/* binding */ mlService)\n/* harmony export */ });\n/* harmony import */ var _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tensorflow/tfjs */ \"@tensorflow/tfjs\");\n/* harmony import */ var _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__);\n\nclass MLService {\n    constructor(){\n        this.model = null;\n        this.isModelLoaded = false;\n    }\n    async loadModel() {\n        try {\n            // TODO: Thay thế URL bằng URL thực của model đã được convert sang TensorFlow.js\n            this.model = await _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__.loadGraphModel(\"/modeljs/model.json\");\n            this.isModelLoaded = true;\n            console.log(\"Graph Model loaded successfully\");\n        } catch (error) {\n            console.error(\"Error loading model:\", error);\n            console.error(\"Error name:\", error.name);\n            console.error(\"Error message:\", error.message);\n            console.error(\"Error stack:\", error.stack);\n            throw error;\n        }\n    }\n    async preprocessImage(imageElement) {\n        // Convert image to tensor\n        const tensor = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__.browser.fromPixels(imageElement);\n        // Resize image to match model input size\n        const resized = _tensorflow_tfjs__WEBPACK_IMPORTED_MODULE_0__.image.resizeBilinear(tensor, [\n            300,\n            300\n        ]);\n        // Bỏ qua bước chuẩn hóa\n        // const normalized = resized.div(255.0);\n        // Add batch dimension\n        // const batched = normalized.expandDims(0);\n        const batched = resized.expandDims(0); // Sử dụng resized trực tiếp nếu không chuẩn hóa\n        // Clean up tensors\n        tensor.dispose();\n        // resized.dispose(); // Không dispose resized nếu nó là output\n        // normalized.dispose();\n        return batched;\n    }\n    async predict(imageElement) {\n        if (!this.isModelLoaded) {\n            await this.loadModel();\n        }\n        try {\n            // Preprocess image\n            const preprocessed = await this.preprocessImage(imageElement);\n            // Get prediction\n            const prediction = await this.model.predict(preprocessed);\n            // Get class with highest probability\n            const probabilities = await prediction.data();\n            const maxIndex = probabilities.indexOf(Math.max(...probabilities));\n            // Clean up tensors\n            preprocessed.dispose();\n            prediction.dispose();\n            // TODO: Thay thế bằng danh sách classes thực tế\n            const classes = [\n                \"Black Rot\",\n                \"frog_eye_leaf_spot\",\n                \"healthy\",\n                \"powdery_mildew\",\n                \"rust\",\n                \"scab\"\n            ];\n            return {\n                disease: classes[maxIndex],\n                confidence: probabilities[maxIndex],\n                treatment: this.getTreatment(classes[maxIndex]),\n                prevention: this.getPrevention(classes[maxIndex])\n            };\n        } catch (error) {\n            console.error(\"Error during prediction:\", error);\n            throw error;\n        }\n    }\n    getTreatment(disease) {\n        // TODO: Thay thế bằng dữ liệu thực tế\n        const treatments = {\n            \"Black Rot\": \"Loại bỏ c\\xe0nh, quả bị bệnh. Phun thuốc фунгицид c\\xf3 chứa captan hoặc mancozeb theo hướng dẫn. Đảm bảo c\\xe2y đủ dinh dưỡng v\\xe0 nước.\",\n            \"frog_eye_leaf_spot\": \"Cắt tỉa v\\xe0 ti\\xeau hủy l\\xe1 bị bệnh. Phun thuốc фунгицид c\\xf3 gốc đồng hoặc mancozeb. Cải thiện lưu th\\xf4ng kh\\xf4ng kh\\xed xung quanh c\\xe2y.\",\n            \"healthy\": \"Kh\\xf4ng cần điều trị, duy tr\\xec chăm s\\xf3c tốt.\",\n            \"powdery_mildew\": \"Phun thuốc фунгициd chứa lưu huỳnh, myclobutanil hoặc trifloxystrobin. Cắt tỉa c\\xe0nh bị nhiễm nặng. Tăng cường lưu th\\xf4ng kh\\xf4ng kh\\xed.\",\n            \"rust\": \"Loại bỏ l\\xe1 v\\xe0 c\\xe0nh bị bệnh. Phun thuốc фунгициd c\\xf3 chứa myclobutanil, propiconazole hoặc triadimefon. Tr\\xe1nh trồng gần c\\xe2y b\\xe1ch x\\xf9 (juniper).\",\n            \"scab\": \"Phun thuốc фунгициd như captan, mancozeb, hoặc dodine. Vệ sinh vườn, loại bỏ l\\xe1 rụng v\\xe0 quả bị bệnh. Chọn giống kh\\xe1ng bệnh nếu c\\xf3 thể.\"\n        };\n        return treatments[disease] || \"Kh\\xf4ng c\\xf3 th\\xf4ng tin điều trị\";\n    }\n    getPrevention(disease) {\n        // TODO: Thay thế bằng dữ liệu thực tế\n        const preventions = {\n            \"Black Rot\": \"Vệ sinh vườn triệt để, loại bỏ quả kh\\xf4, c\\xe0nh chết. Cắt tỉa t\\xe1o t\\xe1o th\\xf4ng tho\\xe1ng. Tr\\xe1nh l\\xe0m tổn thương vỏ c\\xe2y.\",\n            \"frog_eye_leaf_spot\": \"Thu gom v\\xe0 ti\\xeau hủy l\\xe1 rụng v\\xe0o cuối m\\xf9a. Cắt tỉa hợp l\\xfd để tăng lưu th\\xf4ng kh\\xf4ng kh\\xed. B\\xf3n ph\\xe2n c\\xe2n đối.\",\n            \"healthy\": \"Duy tr\\xec lịch tưới nước v\\xe0 b\\xf3n ph\\xe2n đều đặn. Kiểm tra c\\xe2y thường xuy\\xean để ph\\xe1t hiện sớm dấu hiệu bệnh.\",\n            \"powdery_mildew\": \"Chọn giống kh\\xe1ng bệnh. Trồng c\\xe2y ở nơi c\\xf3 đủ nắng v\\xe0 th\\xf4ng tho\\xe1ng. Tr\\xe1nh tưới nước l\\xean l\\xe1 v\\xe0o buổi tối.\",\n            \"rust\": \"Kh\\xf4ng trồng c\\xe2y t\\xe1o gần c\\xe2y b\\xe1ch x\\xf9 hoặc c\\xe1c c\\xe2y thuộc chi Juniperus. Kiểm tra v\\xe0 loại bỏ sớm c\\xe1c ổ bệnh tr\\xean c\\xe2y b\\xe1ch x\\xf9 nếu c\\xf3.\",\n            \"scab\": \"Vệ sinh vườn sạch sẽ, đặc biệt l\\xe0 loại bỏ l\\xe1 rụng v\\xe0o m\\xf9a thu. Chọn giống kh\\xe1ng bệnh. Phun thuốc ph\\xf2ng ngừa v\\xe0o đầu m\\xf9a xu\\xe2n trước khi l\\xe1 non nh\\xfa.\"\n        };\n        return preventions[disease] || \"Kh\\xf4ng c\\xf3 th\\xf4ng tin ph\\xf2ng ngừa\";\n    }\n}\nconst mlService = new MLService();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ1Y7UUFDQSxPQUFPQSxXQUFXLENBQUNQLFFBQVEsSUFBSTtJQUNqQztBQUNGO0FBRU8sTUFBTVEsWUFBWSxJQUFJekMsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL2Fncm9taW5kLXdlYi8uL3NyYy9zZXJ2aWNlcy9tbC5qcz8zZTE1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRmIGZyb20gJ0B0ZW5zb3JmbG93L3RmanMnO1xyXG5cclxuY2xhc3MgTUxTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubW9kZWwgPSBudWxsO1xyXG4gICAgdGhpcy5pc01vZGVsTG9hZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhc3luYyBsb2FkTW9kZWwoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBUT0RPOiBUaGF5IHRo4bq/IFVSTCBi4bqxbmcgVVJMIHRo4buxYyBj4bunYSBtb2RlbCDEkcOjIMSRxrDhu6NjIGNvbnZlcnQgc2FuZyBUZW5zb3JGbG93LmpzXHJcbiAgICAgIHRoaXMubW9kZWwgPSBhd2FpdCB0Zi5sb2FkR3JhcGhNb2RlbCgnL21vZGVsanMvbW9kZWwuanNvbicpO1xyXG4gICAgICB0aGlzLmlzTW9kZWxMb2FkZWQgPSB0cnVlO1xyXG4gICAgICBjb25zb2xlLmxvZygnR3JhcGggTW9kZWwgbG9hZGVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBtb2RlbDonLCBlcnJvcik7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIG5hbWU6JywgZXJyb3IubmFtZSk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIG1lc3NhZ2U6JywgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHN0YWNrOicsIGVycm9yLnN0YWNrKTtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBwcmVwcm9jZXNzSW1hZ2UoaW1hZ2VFbGVtZW50KSB7XHJcbiAgICAvLyBDb252ZXJ0IGltYWdlIHRvIHRlbnNvclxyXG4gICAgY29uc3QgdGVuc29yID0gdGYuYnJvd3Nlci5mcm9tUGl4ZWxzKGltYWdlRWxlbWVudCk7XHJcbiAgICBcclxuICAgIC8vIFJlc2l6ZSBpbWFnZSB0byBtYXRjaCBtb2RlbCBpbnB1dCBzaXplXHJcbiAgICBjb25zdCByZXNpemVkID0gdGYuaW1hZ2UucmVzaXplQmlsaW5lYXIodGVuc29yLCBbMzAwLCAzMDBdKTtcclxuICAgIFxyXG4gICAgLy8gQuG7jyBxdWEgYsaw4bubYyBjaHXhuqluIGjDs2FcclxuICAgIC8vIGNvbnN0IG5vcm1hbGl6ZWQgPSByZXNpemVkLmRpdigyNTUuMCk7XHJcbiAgICBcclxuICAgIC8vIEFkZCBiYXRjaCBkaW1lbnNpb25cclxuICAgIC8vIGNvbnN0IGJhdGNoZWQgPSBub3JtYWxpemVkLmV4cGFuZERpbXMoMCk7XHJcbiAgICBjb25zdCBiYXRjaGVkID0gcmVzaXplZC5leHBhbmREaW1zKDApOyAvLyBT4butIGThu6VuZyByZXNpemVkIHRy4buxYyB0aeG6v3AgbuG6v3Uga2jDtG5nIGNodeG6qW4gaMOzYVxyXG4gICAgXHJcbiAgICAvLyBDbGVhbiB1cCB0ZW5zb3JzXHJcbiAgICB0ZW5zb3IuZGlzcG9zZSgpO1xyXG4gICAgLy8gcmVzaXplZC5kaXNwb3NlKCk7IC8vIEtow7RuZyBkaXNwb3NlIHJlc2l6ZWQgbuG6v3UgbsOzIGzDoCBvdXRwdXRcclxuICAgIC8vIG5vcm1hbGl6ZWQuZGlzcG9zZSgpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gYmF0Y2hlZDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHByZWRpY3QoaW1hZ2VFbGVtZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuaXNNb2RlbExvYWRlZCkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWRNb2RlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIFByZXByb2Nlc3MgaW1hZ2VcclxuICAgICAgY29uc3QgcHJlcHJvY2Vzc2VkID0gYXdhaXQgdGhpcy5wcmVwcm9jZXNzSW1hZ2UoaW1hZ2VFbGVtZW50KTtcclxuICAgICAgXHJcbiAgICAgIC8vIEdldCBwcmVkaWN0aW9uXHJcbiAgICAgIGNvbnN0IHByZWRpY3Rpb24gPSBhd2FpdCB0aGlzLm1vZGVsLnByZWRpY3QocHJlcHJvY2Vzc2VkKTtcclxuICAgICAgXHJcbiAgICAgIC8vIEdldCBjbGFzcyB3aXRoIGhpZ2hlc3QgcHJvYmFiaWxpdHlcclxuICAgICAgY29uc3QgcHJvYmFiaWxpdGllcyA9IGF3YWl0IHByZWRpY3Rpb24uZGF0YSgpO1xyXG4gICAgICBjb25zdCBtYXhJbmRleCA9IHByb2JhYmlsaXRpZXMuaW5kZXhPZihNYXRoLm1heCguLi5wcm9iYWJpbGl0aWVzKSk7XHJcbiAgICAgIFxyXG4gICAgICAvLyBDbGVhbiB1cCB0ZW5zb3JzXHJcbiAgICAgIHByZXByb2Nlc3NlZC5kaXNwb3NlKCk7XHJcbiAgICAgIHByZWRpY3Rpb24uZGlzcG9zZSgpO1xyXG4gICAgICBcclxuICAgICAgLy8gVE9ETzogVGhheSB0aOG6vyBi4bqxbmcgZGFuaCBzw6FjaCBjbGFzc2VzIHRo4buxYyB04bq/XHJcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbJ0JsYWNrIFJvdCcsICdmcm9nX2V5ZV9sZWFmX3Nwb3QnLCAnaGVhbHRoeScsICdwb3dkZXJ5X21pbGRldycsICdydXN0JywgJ3NjYWInXTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGlzZWFzZTogY2xhc3Nlc1ttYXhJbmRleF0sXHJcbiAgICAgICAgY29uZmlkZW5jZTogcHJvYmFiaWxpdGllc1ttYXhJbmRleF0sXHJcbiAgICAgICAgdHJlYXRtZW50OiB0aGlzLmdldFRyZWF0bWVudChjbGFzc2VzW21heEluZGV4XSksXHJcbiAgICAgICAgcHJldmVudGlvbjogdGhpcy5nZXRQcmV2ZW50aW9uKGNsYXNzZXNbbWF4SW5kZXhdKVxyXG4gICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHByZWRpY3Rpb246JywgZXJyb3IpO1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRyZWF0bWVudChkaXNlYXNlKSB7XHJcbiAgICAvLyBUT0RPOiBUaGF5IHRo4bq/IGLhurFuZyBk4buvIGxp4buHdSB0aOG7sWMgdOG6v1xyXG4gICAgY29uc3QgdHJlYXRtZW50cyA9IHtcclxuICAgICAgJ0JsYWNrIFJvdCc6ICdMb+G6oWkgYuG7jyBjw6BuaCwgcXXhuqMgYuG7iyBi4buHbmguIFBodW4gdGh14buRYyDRhNGD0L3Qs9C40YbQuNC0IGPDsyBjaOG7qWEgY2FwdGFuIGhv4bq3YyBtYW5jb3plYiB0aGVvIGjGsOG7m25nIGThuqtuLiDEkOG6o20gYuG6o28gY8OieSDEkeG7pyBkaW5oIGTGsOG7oW5nIHbDoCBuxrDhu5tjLicsXHJcbiAgICAgICdmcm9nX2V5ZV9sZWFmX3Nwb3QnOiAnQ+G6r3QgdOG7iWEgdsOgIHRpw6p1IGjhu6d5IGzDoSBi4buLIGLhu4duaC4gUGh1biB0aHXhu5FjINGE0YPQvdCz0LjRhtC40LQgY8OzIGfhu5FjIMSR4buTbmcgaG/hurdjIG1hbmNvemViLiBD4bqjaSB0aGnhu4duIGzGsHUgdGjDtG5nIGtow7RuZyBraMOtIHh1bmcgcXVhbmggY8OieS4nLFxyXG4gICAgICAnaGVhbHRoeSc6ICdLaMO0bmcgY+G6p24gxJFp4buBdSB0cuG7iywgZHV5IHRyw6wgY2jEg20gc8OzYyB04buRdC4nLFxyXG4gICAgICAncG93ZGVyeV9taWxkZXcnOiAnUGh1biB0aHXhu5FjINGE0YPQvdCz0LjRhtC4ZCBjaOG7qWEgbMawdSBodeG7s25oLCBteWNsb2J1dGFuaWwgaG/hurdjIHRyaWZsb3h5c3Ryb2Jpbi4gQ+G6r3QgdOG7iWEgY8OgbmggYuG7iyBuaGnhu4VtIG7hurduZy4gVMSDbmcgY8aw4budbmcgbMawdSB0aMO0bmcga2jDtG5nIGtow60uJyxcclxuICAgICAgJ3J1c3QnOiAnTG/huqFpIGLhu48gbMOhIHbDoCBjw6BuaCBi4buLIGLhu4duaC4gUGh1biB0aHXhu5FjINGE0YPQvdCz0LjRhtC4ZCBjw7MgY2jhu6lhIG15Y2xvYnV0YW5pbCwgcHJvcGljb25hem9sZSBob+G6t2MgdHJpYWRpbWVmb24uIFRyw6FuaCB0cuG7k25nIGfhuqduIGPDonkgYsOhY2ggeMO5IChqdW5pcGVyKS4nLFxyXG4gICAgICAnc2NhYic6ICdQaHVuIHRodeG7kWMg0YTRg9C90LPQuNGG0LhkIG5oxrAgY2FwdGFuLCBtYW5jb3plYiwgaG/hurdjIGRvZGluZS4gVuG7hyBzaW5oIHbGsOG7nW4sIGxv4bqhaSBi4buPIGzDoSBy4bulbmcgdsOgIHF14bqjIGLhu4sgYuG7h25oLiBDaOG7jW4gZ2nhu5FuZyBraMOhbmcgYuG7h25oIG7hur91IGPDsyB0aOG7gy4nXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRyZWF0bWVudHNbZGlzZWFzZV0gfHwgJ0tow7RuZyBjw7MgdGjDtG5nIHRpbiDEkWnhu4F1IHRy4buLJztcclxuICB9XHJcblxyXG4gIGdldFByZXZlbnRpb24oZGlzZWFzZSkge1xyXG4gICAgLy8gVE9ETzogVGhheSB0aOG6vyBi4bqxbmcgZOG7ryBsaeG7h3UgdGjhu7FjIHThur9cclxuICAgIGNvbnN0IHByZXZlbnRpb25zID0ge1xyXG4gICAgICAnQmxhY2sgUm90JzogJ1bhu4cgc2luaCB2xrDhu51uIHRyaeG7h3QgxJHhu4MsIGxv4bqhaSBi4buPIHF14bqjIGtow7QsIGPDoG5oIGNo4bq/dC4gQ+G6r3QgdOG7iWEgdMOhbyB0w6FvIHRow7RuZyB0aG/DoW5nLiBUcsOhbmggbMOgbSB04buVbiB0aMawxqFuZyB24buPIGPDonkuJyxcclxuICAgICAgJ2Zyb2dfZXllX2xlYWZfc3BvdCc6ICdUaHUgZ29tIHbDoCB0acOqdSBo4buneSBsw6EgcuG7pW5nIHbDoG8gY3Xhu5FpIG3DuWEuIEPhuq90IHThu4lhIGjhu6NwIGzDvSDEkeG7gyB0xINuZyBsxrB1IHRow7RuZyBraMO0bmcga2jDrS4gQsOzbiBwaMOibiBjw6JuIMSR4buRaS4nLFxyXG4gICAgICAnaGVhbHRoeSc6ICdEdXkgdHLDrCBs4buLY2ggdMaw4bubaSBuxrDhu5tjIHbDoCBiw7NuIHBow6JuIMSR4buBdSDEkeG6t24uIEtp4buDbSB0cmEgY8OieSB0aMaw4budbmcgeHV5w6puIMSR4buDIHBow6F0IGhp4buHbiBz4bubbSBk4bqldSBoaeG7h3UgYuG7h25oLicsXHJcbiAgICAgICdwb3dkZXJ5X21pbGRldyc6ICdDaOG7jW4gZ2nhu5FuZyBraMOhbmcgYuG7h25oLiBUcuG7k25nIGPDonkg4bufIG7GoWkgY8OzIMSR4bunIG7huq9uZyB2w6AgdGjDtG5nIHRob8OhbmcuIFRyw6FuaCB0xrDhu5tpIG7GsOG7m2MgbMOqbiBsw6EgdsOgbyBideG7lWkgdOG7kWkuJyxcclxuICAgICAgJ3J1c3QnOiAnS2jDtG5nIHRy4buTbmcgY8OieSB0w6FvIGfhuqduIGPDonkgYsOhY2ggeMO5IGhv4bq3YyBjw6FjIGPDonkgdGh14buZYyBjaGkgSnVuaXBlcnVzLiBLaeG7g20gdHJhIHbDoCBsb+G6oWkgYuG7jyBz4bubbSBjw6FjIOG7lSBi4buHbmggdHLDqm4gY8OieSBiw6FjaCB4w7kgbuG6v3UgY8OzLicsXHJcbiAgICAgICdzY2FiJzogJ1bhu4cgc2luaCB2xrDhu51uIHPhuqFjaCBz4bq9LCDEkeG6t2MgYmnhu4d0IGzDoCBsb+G6oWkgYuG7jyBsw6EgcuG7pW5nIHbDoG8gbcO5YSB0aHUuIENo4buNbiBnaeG7kW5nIGtow6FuZyBi4buHbmguIFBodW4gdGh14buRYyBwaMOybmcgbmfhu6thIHbDoG8gxJHhuqd1IG3DuWEgeHXDom4gdHLGsOG7m2Mga2hpIGzDoSBub24gbmjDui4nXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHByZXZlbnRpb25zW2Rpc2Vhc2VdIHx8ICdLaMO0bmcgY8OzIHRow7RuZyB0aW4gcGjDsm5nIG5n4burYSc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWxTZXJ2aWNlID0gbmV3IE1MU2VydmljZSgpOyAiXSwibmFtZXMiOlsidGYiLCJNTFNlcnZpY2UiLCJjb25zdHJ1Y3RvciIsIm1vZGVsIiwiaXNNb2RlbExvYWRlZCIsImxvYWRNb2RlbCIsImxvYWRHcmFwaE1vZGVsIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwibmFtZSIsIm1lc3NhZ2UiLCJzdGFjayIsInByZXByb2Nlc3NJbWFnZSIsImltYWdlRWxlbWVudCIsInRlbnNvciIsImJyb3dzZXIiLCJmcm9tUGl4ZWxzIiwicmVzaXplZCIsImltYWdlIiwicmVzaXplQmlsaW5lYXIiLCJiYXRjaGVkIiwiZXhwYW5kRGltcyIsImRpc3Bvc2UiLCJwcmVkaWN0IiwicHJlcHJvY2Vzc2VkIiwicHJlZGljdGlvbiIsInByb2JhYmlsaXRpZXMiLCJkYXRhIiwibWF4SW5kZXgiLCJpbmRleE9mIiwiTWF0aCIsIm1heCIsImNsYXNzZXMiLCJkaXNlYXNlIiwiY29uZmlkZW5jZSIsInRyZWF0bWVudCIsImdldFRyZWF0bWVudCIsInByZXZlbnRpb24iLCJnZXRQcmV2ZW50aW9uIiwidHJlYXRtZW50cyIsInByZXZlbnRpb25zIiwibWxTZXJ2aWNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/services/ml.js\n");

/***/ }),

/***/ "./src/theme.js":
/*!**********************!*\
  !*** ./src/theme.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/node/styles/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/colors */ \"./node_modules/@mui/material/node/colors/index.js\");\n\n\n// Create a theme instance.\nconst theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n    palette: {\n        primary: {\n            main: \"#556cd6\"\n        },\n        secondary: {\n            main: \"#19857b\"\n        },\n        error: {\n            main: _mui_material_colors__WEBPACK_IMPORTED_MODULE_1__.red.A400\n        }\n    },\n    typography: {\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGhlbWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFtRDtBQUNSO0FBRTNDLDJCQUEyQjtBQUMzQixNQUFNRSxRQUFRRixpRUFBV0EsQ0FBQztJQUN4QkcsU0FBUztRQUNQQyxTQUFTO1lBQ1BDLE1BQU07UUFDUjtRQUNBQyxXQUFXO1lBQ1RELE1BQU07UUFDUjtRQUNBRSxPQUFPO1lBQ0xGLE1BQU1KLHFEQUFHQSxDQUFDTyxJQUFJO1FBQ2hCO0lBTUY7SUFDQUMsWUFBWTtJQUlaO0FBRUY7QUFFQSxpRUFBZVAsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Fncm9taW5kLXdlYi8uL3NyYy90aGVtZS5qcz9hZmE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVRoZW1lIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xyXG5pbXBvcnQgeyByZWQgfSBmcm9tICdAbXVpL21hdGVyaWFsL2NvbG9ycyc7XHJcblxyXG4vLyBDcmVhdGUgYSB0aGVtZSBpbnN0YW5jZS5cclxuY29uc3QgdGhlbWUgPSBjcmVhdGVUaGVtZSh7XHJcbiAgcGFsZXR0ZToge1xyXG4gICAgcHJpbWFyeToge1xyXG4gICAgICBtYWluOiAnIzU1NmNkNicsXHJcbiAgICB9LFxyXG4gICAgc2Vjb25kYXJ5OiB7XHJcbiAgICAgIG1haW46ICcjMTk4NTdiJyxcclxuICAgIH0sXHJcbiAgICBlcnJvcjoge1xyXG4gICAgICBtYWluOiByZWQuQTQwMCxcclxuICAgIH0sXHJcbiAgICAvLyBC4bqhbiBjw7MgdGjhu4MgdGjDqm0gY8OhYyBtw6B1IGtow6FjIGhv4bq3YyB0w7l5IGNo4buJbmgg4bufIMSRw6J5XHJcbiAgICAvLyBWw60gZOG7pTpcclxuICAgIC8vIGJhY2tncm91bmQ6IHtcclxuICAgIC8vICAgZGVmYXVsdDogJyNmZmYnLFxyXG4gICAgLy8gfSxcclxuICB9LFxyXG4gIHR5cG9ncmFwaHk6IHtcclxuICAgIC8vIFTDuXkgY2jhu4luaCB0eXBvZ3JhcGh5IOG7nyDEkcOieVxyXG4gICAgLy8gVsOtIGThu6U6XHJcbiAgICAvLyBmb250RmFtaWx5OiAnUm9ib3RvLCBzYW5zLXNlcmlmJyxcclxuICB9LFxyXG4gIC8vIELhuqFuIGPDsyB0aOG7gyB0aMOqbSBjw6FjIHTDuXkgY2jhu4luaCBraMOhYyBjaG8gdGhlbWUg4bufIMSRw6J5XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGhlbWU7ICJdLCJuYW1lcyI6WyJjcmVhdGVUaGVtZSIsInJlZCIsInRoZW1lIiwicGFsZXR0ZSIsInByaW1hcnkiLCJtYWluIiwic2Vjb25kYXJ5IiwiZXJyb3IiLCJBNDAwIiwidHlwb2dyYXBoeSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/theme.js\n");

/***/ }),

/***/ "@mui/icons-material/AccountCircle":
/*!****************************************************!*\
  !*** external "@mui/icons-material/AccountCircle" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@mui/icons-material/AccountCircle");

/***/ }),

/***/ "@mui/icons-material/Menu":
/*!*******************************************!*\
  !*** external "@mui/icons-material/Menu" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/icons-material/Menu");

/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@mui/system");

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/system/DefaultPropsProvider");

/***/ }),

/***/ "@mui/system/InitColorSchemeScript":
/*!****************************************************!*\
  !*** external "@mui/system/InitColorSchemeScript" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@mui/system/InitColorSchemeScript");

/***/ }),

/***/ "@mui/system/RtlProvider":
/*!******************************************!*\
  !*** external "@mui/system/RtlProvider" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/system/RtlProvider");

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/colorManipulator");

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/system/createStyled");

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/system/createTheme");

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/styleFunctionSx");

/***/ }),

/***/ "@mui/system/useMediaQuery":
/*!********************************************!*\
  !*** external "@mui/system/useMediaQuery" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/useMediaQuery");

/***/ }),

/***/ "@mui/system/useThemeProps":
/*!********************************************!*\
  !*** external "@mui/system/useThemeProps" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/useThemeProps");

/***/ }),

/***/ "@mui/utils":
/*!*****************************!*\
  !*** external "@mui/utils" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("@mui/utils");

/***/ }),

/***/ "@mui/utils/HTMLElementType":
/*!*********************************************!*\
  !*** external "@mui/utils/HTMLElementType" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/HTMLElementType");

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/capitalize");

/***/ }),

/***/ "@mui/utils/chainPropTypes":
/*!********************************************!*\
  !*** external "@mui/utils/chainPropTypes" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/chainPropTypes");

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/composeClasses");

/***/ }),

/***/ "@mui/utils/debounce":
/*!**************************************!*\
  !*** external "@mui/utils/debounce" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/debounce");

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/deepmerge");

/***/ }),

/***/ "@mui/utils/elementAcceptingRef":
/*!*************************************************!*\
  !*** external "@mui/utils/elementAcceptingRef" ***!
  \*************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/elementAcceptingRef");

/***/ }),

/***/ "@mui/utils/elementTypeAcceptingRef":
/*!*****************************************************!*\
  !*** external "@mui/utils/elementTypeAcceptingRef" ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/elementTypeAcceptingRef");

/***/ }),

/***/ "@mui/utils/extractEventHandlers":
/*!**************************************************!*\
  !*** external "@mui/utils/extractEventHandlers" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/extractEventHandlers");

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/formatMuiErrorMessage");

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/generateUtilityClass");

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/generateUtilityClasses");

/***/ }),

/***/ "@mui/utils/getReactElementRef":
/*!************************************************!*\
  !*** external "@mui/utils/getReactElementRef" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/getReactElementRef");

/***/ }),

/***/ "@mui/utils/getScrollbarSize":
/*!**********************************************!*\
  !*** external "@mui/utils/getScrollbarSize" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/getScrollbarSize");

/***/ }),

/***/ "@mui/utils/integerPropType":
/*!*********************************************!*\
  !*** external "@mui/utils/integerPropType" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/integerPropType");

/***/ }),

/***/ "@mui/utils/isHostComponent":
/*!*********************************************!*\
  !*** external "@mui/utils/isHostComponent" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/isHostComponent");

/***/ }),

/***/ "@mui/utils/ownerDocument":
/*!*******************************************!*\
  !*** external "@mui/utils/ownerDocument" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/ownerDocument");

/***/ }),

/***/ "@mui/utils/ownerWindow":
/*!*****************************************!*\
  !*** external "@mui/utils/ownerWindow" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/ownerWindow");

/***/ }),

/***/ "@mui/utils/refType":
/*!*************************************!*\
  !*** external "@mui/utils/refType" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/refType");

/***/ }),

/***/ "@mui/utils/requirePropFactory":
/*!************************************************!*\
  !*** external "@mui/utils/requirePropFactory" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/requirePropFactory");

/***/ }),

/***/ "@mui/utils/resolveProps":
/*!******************************************!*\
  !*** external "@mui/utils/resolveProps" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/resolveProps");

/***/ }),

/***/ "@mui/utils/useEnhancedEffect":
/*!***********************************************!*\
  !*** external "@mui/utils/useEnhancedEffect" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useEnhancedEffect");

/***/ }),

/***/ "@mui/utils/useEventCallback":
/*!**********************************************!*\
  !*** external "@mui/utils/useEventCallback" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useEventCallback");

/***/ }),

/***/ "@mui/utils/useForkRef":
/*!****************************************!*\
  !*** external "@mui/utils/useForkRef" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useForkRef");

/***/ }),

/***/ "@mui/utils/useIsFocusVisible":
/*!***********************************************!*\
  !*** external "@mui/utils/useIsFocusVisible" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useIsFocusVisible");

/***/ }),

/***/ "@mui/utils/useSlotProps":
/*!******************************************!*\
  !*** external "@mui/utils/useSlotProps" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useSlotProps");

/***/ }),

/***/ "@mui/utils/useTimeout":
/*!****************************************!*\
  !*** external "@mui/utils/useTimeout" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useTimeout");

/***/ }),

/***/ "@tensorflow/tfjs":
/*!***********************************!*\
  !*** external "@tensorflow/tfjs" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@tensorflow/tfjs");

/***/ }),

/***/ "clsx?ce27":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ "react-firebase-hooks/auth":
/*!********************************************!*\
  !*** external "react-firebase-hooks/auth" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("react-firebase-hooks/auth");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("react-is");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("react-transition-group");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "@emotion/cache":
/*!*********************************!*\
  !*** external "@emotion/cache" ***!
  \*********************************/
/***/ ((module) => {

module.exports = import("@emotion/cache");;

/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

module.exports = import("@emotion/react");;

/***/ }),

/***/ "date-fns/addDays":
/*!***********************************!*\
  !*** external "date-fns/addDays" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/addDays");;

/***/ }),

/***/ "date-fns/addHours":
/*!************************************!*\
  !*** external "date-fns/addHours" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/addHours");;

/***/ }),

/***/ "date-fns/addMinutes":
/*!**************************************!*\
  !*** external "date-fns/addMinutes" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/addMinutes");;

/***/ }),

/***/ "date-fns/addMonths":
/*!*************************************!*\
  !*** external "date-fns/addMonths" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("date-fns/addMonths");;

/***/ }),

/***/ "date-fns/addSeconds":
/*!**************************************!*\
  !*** external "date-fns/addSeconds" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/addSeconds");;

/***/ }),

/***/ "date-fns/addWeeks":
/*!************************************!*\
  !*** external "date-fns/addWeeks" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/addWeeks");;

/***/ }),

/***/ "date-fns/addYears":
/*!************************************!*\
  !*** external "date-fns/addYears" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/addYears");;

/***/ }),

/***/ "date-fns/endOfDay":
/*!************************************!*\
  !*** external "date-fns/endOfDay" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/endOfDay");;

/***/ }),

/***/ "date-fns/endOfMonth":
/*!**************************************!*\
  !*** external "date-fns/endOfMonth" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/endOfMonth");;

/***/ }),

/***/ "date-fns/endOfWeek":
/*!*************************************!*\
  !*** external "date-fns/endOfWeek" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("date-fns/endOfWeek");;

/***/ }),

/***/ "date-fns/endOfYear":
/*!*************************************!*\
  !*** external "date-fns/endOfYear" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("date-fns/endOfYear");;

/***/ }),

/***/ "date-fns/format":
/*!**********************************!*\
  !*** external "date-fns/format" ***!
  \**********************************/
/***/ ((module) => {

module.exports = import("date-fns/format");;

/***/ }),

/***/ "date-fns/getDate":
/*!***********************************!*\
  !*** external "date-fns/getDate" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/getDate");;

/***/ }),

/***/ "date-fns/getDaysInMonth":
/*!******************************************!*\
  !*** external "date-fns/getDaysInMonth" ***!
  \******************************************/
/***/ ((module) => {

module.exports = import("date-fns/getDaysInMonth");;

/***/ }),

/***/ "date-fns/getHours":
/*!************************************!*\
  !*** external "date-fns/getHours" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/getHours");;

/***/ }),

/***/ "date-fns/getMilliseconds":
/*!*******************************************!*\
  !*** external "date-fns/getMilliseconds" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = import("date-fns/getMilliseconds");;

/***/ }),

/***/ "date-fns/getMinutes":
/*!**************************************!*\
  !*** external "date-fns/getMinutes" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/getMinutes");;

/***/ }),

/***/ "date-fns/getMonth":
/*!************************************!*\
  !*** external "date-fns/getMonth" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/getMonth");;

/***/ }),

/***/ "date-fns/getSeconds":
/*!**************************************!*\
  !*** external "date-fns/getSeconds" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/getSeconds");;

/***/ }),

/***/ "date-fns/getWeek":
/*!***********************************!*\
  !*** external "date-fns/getWeek" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/getWeek");;

/***/ }),

/***/ "date-fns/getYear":
/*!***********************************!*\
  !*** external "date-fns/getYear" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/getYear");;

/***/ }),

/***/ "date-fns/isAfter":
/*!***********************************!*\
  !*** external "date-fns/isAfter" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/isAfter");;

/***/ }),

/***/ "date-fns/isBefore":
/*!************************************!*\
  !*** external "date-fns/isBefore" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/isBefore");;

/***/ }),

/***/ "date-fns/isEqual":
/*!***********************************!*\
  !*** external "date-fns/isEqual" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/isEqual");;

/***/ }),

/***/ "date-fns/isSameDay":
/*!*************************************!*\
  !*** external "date-fns/isSameDay" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("date-fns/isSameDay");;

/***/ }),

/***/ "date-fns/isSameHour":
/*!**************************************!*\
  !*** external "date-fns/isSameHour" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/isSameHour");;

/***/ }),

/***/ "date-fns/isSameMonth":
/*!***************************************!*\
  !*** external "date-fns/isSameMonth" ***!
  \***************************************/
/***/ ((module) => {

module.exports = import("date-fns/isSameMonth");;

/***/ }),

/***/ "date-fns/isSameYear":
/*!**************************************!*\
  !*** external "date-fns/isSameYear" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/isSameYear");;

/***/ }),

/***/ "date-fns/isValid":
/*!***********************************!*\
  !*** external "date-fns/isValid" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/isValid");;

/***/ }),

/***/ "date-fns/isWithinInterval":
/*!********************************************!*\
  !*** external "date-fns/isWithinInterval" ***!
  \********************************************/
/***/ ((module) => {

module.exports = import("date-fns/isWithinInterval");;

/***/ }),

/***/ "date-fns/locale/en-US":
/*!****************************************!*\
  !*** external "date-fns/locale/en-US" ***!
  \****************************************/
/***/ ((module) => {

module.exports = import("date-fns/locale/en-US");;

/***/ }),

/***/ "date-fns/parse":
/*!*********************************!*\
  !*** external "date-fns/parse" ***!
  \*********************************/
/***/ ((module) => {

module.exports = import("date-fns/parse");;

/***/ }),

/***/ "date-fns/setDate":
/*!***********************************!*\
  !*** external "date-fns/setDate" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/setDate");;

/***/ }),

/***/ "date-fns/setHours":
/*!************************************!*\
  !*** external "date-fns/setHours" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/setHours");;

/***/ }),

/***/ "date-fns/setMilliseconds":
/*!*******************************************!*\
  !*** external "date-fns/setMilliseconds" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = import("date-fns/setMilliseconds");;

/***/ }),

/***/ "date-fns/setMinutes":
/*!**************************************!*\
  !*** external "date-fns/setMinutes" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/setMinutes");;

/***/ }),

/***/ "date-fns/setMonth":
/*!************************************!*\
  !*** external "date-fns/setMonth" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("date-fns/setMonth");;

/***/ }),

/***/ "date-fns/setSeconds":
/*!**************************************!*\
  !*** external "date-fns/setSeconds" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/setSeconds");;

/***/ }),

/***/ "date-fns/setYear":
/*!***********************************!*\
  !*** external "date-fns/setYear" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("date-fns/setYear");;

/***/ }),

/***/ "date-fns/startOfDay":
/*!**************************************!*\
  !*** external "date-fns/startOfDay" ***!
  \**************************************/
/***/ ((module) => {

module.exports = import("date-fns/startOfDay");;

/***/ }),

/***/ "date-fns/startOfMonth":
/*!****************************************!*\
  !*** external "date-fns/startOfMonth" ***!
  \****************************************/
/***/ ((module) => {

module.exports = import("date-fns/startOfMonth");;

/***/ }),

/***/ "date-fns/startOfWeek":
/*!***************************************!*\
  !*** external "date-fns/startOfWeek" ***!
  \***************************************/
/***/ ((module) => {

module.exports = import("date-fns/startOfWeek");;

/***/ }),

/***/ "date-fns/startOfYear":
/*!***************************************!*\
  !*** external "date-fns/startOfYear" ***!
  \***************************************/
/***/ ((module) => {

module.exports = import("date-fns/startOfYear");;

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

module.exports = import("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("firebase/firestore");;

/***/ }),

/***/ "firebase/storage":
/*!***********************************!*\
  !*** external "firebase/storage" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("firebase/storage");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@mui","vendor-chunks/next","vendor-chunks/@babel","vendor-chunks/@swc"], () => (__webpack_exec__("./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fesp32-stream&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Cesp32-stream.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();