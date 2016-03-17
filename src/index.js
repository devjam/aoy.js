import "./polyfill/Element-matches"

const aoy = function aoy() {
};

import {version} from "../package.json";
aoy.version = version;

import _detectPointerType from "./_detectPointerType"
aoy._detectPointerType = _detectPointerType;
aoy.pointerType = _detectPointerType();

import _normalizeEventName from "./_normalizeEventName"
aoy._normalizeEventName = _normalizeEventName;
aoy.eventName = _normalizeEventName();

export default aoy
