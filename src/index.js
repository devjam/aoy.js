const aoy = function aoy() {
};

import {version} from "../package.json";
aoy.version = version;

import _detectPointerType from "./_detectPointerType"
aoy._detectPointerType = _detectPointerType;
aoy.pointerType = _detectPointerType();

export default aoy
