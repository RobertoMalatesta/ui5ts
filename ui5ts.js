"use strict";
function UI5(name) {
    return function (target, propertyKey, descriptor) {
        var functionMembers = Object.getOwnPropertyNames(function () { });
        var staticMembers = Object.getOwnPropertyNames(target).filter(function (o) { return functionMembers.indexOf(o) === -1; });
        var instanceMethods = Object.getOwnPropertyNames(target.prototype);
        var baseClass = Object.getPrototypeOf(target); // it is the same as: baseClass = target.__proto__;
        var thisClass = {};
        staticMembers.forEach(function (m) { return thisClass[m] = target[m]; });
        instanceMethods.forEach(function (m) { return thisClass[m] = target.prototype[m]; });
        if (typeof baseClass.extend === "function") {
            return baseClass.extend(name, thisClass);
        }
        else {
            throw new Error("This class doesn't inherit from a UI5 class");
        }
    };
}
function define(aDependencies, vFactory) {
    //remove the dependencies "require" and "exports" generated by typescript compiler
    var newDependencies = aDependencies.slice(2);
    //pass null instead of the dependencies "require" and "exports" and wraps the ui5 dependencies in a default property of a new object
    var newFactory = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var exports = { default: undefined };
        vFactory.apply(void 0, [null, exports].concat(args.map(function (d) { return ({ default: d }); })));
        return exports.default;
    };
    return sap.ui.define(newDependencies, newFactory);
}
//# sourceMappingURL=ui5ts.js.map