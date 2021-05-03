"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownQuestion = void 0;
var field_base_1 = require("./field-base");
var DropdownQuestion = /** @class */ (function (_super) {
    __extends(DropdownQuestion, _super);
    function DropdownQuestion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controlType = 'dropdown';
        return _this;
    }
    return DropdownQuestion;
}(field_base_1.FieldBase));
exports.DropdownQuestion = DropdownQuestion;
//# sourceMappingURL=field-dropdown.js.map