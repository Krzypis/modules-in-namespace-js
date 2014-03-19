(function (root) {
    "use strict";

    // The constructor for a new namespace
    var Namespace = function (options) {
        var defaultOptions = {

            // Specifies the namespace's root name
            rootName: "NSModuleRoot",

            // Specifies the module's names delimiter
            delimiter: ".",

            // Turns on a simple console debugging
            debug: false,

            // Adds internal properties to the newly created modules, under
            // the _namespace_ property:
            //   name: The modules name (the last part of it)
            //   prefix: Preceding modules, if any
            //   fullName: Prefix + name
            addProperties: false,

            // Adds parent-child relation to the newly created modules, so
            // that you can access the child module from its parent,
            // without the need of using the namespace object at all
            addParentChildRelation: true
        };

        this.opt = this.defaults(defaultOptions, options);

        this.namespace = new this.NSModule(this.opt.rootName, this.opt);
    };

    if (root.Namespace) {
        throw "root.Namespace already polluted";
    } else {
        root.Namespace = Namespace;
    }

    // Simple class for modules
    // Options are addProperties, debug. The descriptions stands the same
    // as for Namespace.
    Namespace.prototype.NSModule = function (fullName, options) {

        if (options.addProperties) {
            var nameSplitted = fullName.split(options.delimiter);
            var lastPart = nameSplitted.pop();
            var prefix = nameSplitted.join(options.delimiter);

            this._namespace_ = {
                name: lastPart,
                prefix: prefix,
                fullName: fullName
            };
        }

        if (options.debug) {
            console.log("NSModule created " + fullName, this);
        }
    };

    // Creates one module and adds it to the namespace
    Namespace.prototype.createModule = function (fullName, name, parentModule) {
        if (!this.namespace[fullName]) {
            this.namespace[fullName] = new this.NSModule(fullName, this.opt);
        }

        if (this.opt.addParentChildRelation) {
            parentModule[name] = parentModule[name] || this.namespace[fullName];
        }
    };

    // Creates multiple parent-child-related modules and adds them to
    // the namespace
    Namespace.prototype.use = function (fullName) {
        var nameSplitted = fullName.split(this.opt.delimiter);
        var parentModule = this.namespace;
        var currentFullName = "";
        var currentName = "";

        // Create every module specified in "name", if it doesn't exist yet
        for (var i = 0; i < nameSplitted.length; i++) {
            currentFullName += nameSplitted[i];
            currentName = nameSplitted[i];

            this.createModule(currentFullName, currentName, parentModule);

            parentModule = parentModule[currentName];
            currentFullName += this.opt.delimiter;
        }

        // Return the newly created module
        return this.namespace[fullName];
    };

    // Add a getter for the root module for convenience
    Namespace.prototype.getRoot = function () {
        return this.namespace;
    };

    Namespace.prototype.defaults = function (defaultOptions, options) {

        options = options || {};

        for (var key in defaultOptions) {
            if (options.hasOwnProperty(key)) {
                defaultOptions[key] = options[key];
            }
        }

        return defaultOptions;
    };

})(this);
