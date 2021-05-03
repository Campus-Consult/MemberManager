"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldBase = void 0;
var FieldBase = /** @class */ (function () {
    function FieldBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.hint = options.hint || '';
        this.placeholder = options.placeholder || '';
        this.options = options.options || [];
    }
    return FieldBase;
}());
exports.FieldBase = FieldBase;
//# sourceMappingURL=field-base.js.map