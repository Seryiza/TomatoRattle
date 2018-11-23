// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"storages/objectBased.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: Write unit-tests
var ObjectBasedStorage =
/*#__PURE__*/
function () {
  function ObjectBasedStorage(object, defaultStorage) {
    _classCallCheck(this, ObjectBasedStorage);

    this.storage = new Map(Object.entries(object));
    this.defaultStorage = defaultStorage;
  }

  _createClass(ObjectBasedStorage, [{
    key: "has",
    value: function has(key) {
      return this.storage.has(key);
    }
  }, {
    key: "get",
    value: function get(key) {
      if (!this.has(key) && this.defaultStorage) {
        return this.defaultStorage.get(key);
      }

      return this.storage.get(key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.storage.set(key, value);
    }
  }]);

  return ObjectBasedStorage;
}();

exports.default = ObjectBasedStorage;
},{}],"storages/localBased.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocalBasedStorage =
/*#__PURE__*/
function () {
  function LocalBasedStorage(defaultStorage) {
    _classCallCheck(this, LocalBasedStorage);

    this.storage = localStorage;
    this.defaultStorage = defaultStorage;
  }

  _createClass(LocalBasedStorage, [{
    key: "has",
    value: function has(key) {
      return this.storage.getItem(key) != null;
    }
  }, {
    key: "get",
    value: function get(key) {
      if (!this.has(key) && this.defaultStorage) {
        return this.defaultStorage.get(key);
      }

      return this.storage.getItem(key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.storage.setItem(key, value);
    }
  }]);

  return LocalBasedStorage;
}();

exports.default = LocalBasedStorage;
},{}],"layoutManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayoutManager =
/*#__PURE__*/
function () {
  function LayoutManager(_ref) {
    var start = _ref.start,
        layouts = _ref.layouts,
        events = _ref.events;

    _classCallCheck(this, LayoutManager);

    this.layouts = layouts;
    this.events = events;
    this.goto(start);
  }

  _createClass(LayoutManager, [{
    key: "layout",
    value: function layout(name) {
      if (name) {
        return this.layouts[name];
      }

      return this.layouts[this.current];
    }
  }, {
    key: "goto",
    value: function goto(layoutName) {
      if (!(layoutName in this.layouts)) {
        // TODO: Maybe throw an exception?
        return;
      }

      if (this.events.onChange) {
        this.events.onChange(this, layoutName, this.current);
      }

      this.current = layoutName;
    }
  }]);

  return LayoutManager;
}();

exports.default = LayoutManager;
},{}],"../node_modules/melanke-watchjs/src/watch.js":[function(require,module,exports) {
var define;
/**
 * DEVELOPED BY
 * GIL LOPES BUENO
 * gilbueno.mail@gmail.com
 *
 * WORKS WITH:
 * IE8*, IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, BESEN, Rhino 1.7+
 * For IE8 (and other legacy browsers) WatchJS will use dirty checking  
 *
 * FORK:
 * https://github.com/melanke/Watch.JS
 *
 * LICENSE: MIT
 */

"use strict";
(function (factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        window.WatchJS = factory();
        window.watch = window.WatchJS.watch;
        window.unwatch = window.WatchJS.unwatch;
        window.callWatchers = window.WatchJS.callWatchers;
    }
}(function () {

    var WatchJS = {
        noMore: false,        // use WatchJS.suspend(obj) instead
        useDirtyCheck: false, // use only dirty checking to track changes.
        preserveExistingSetters: false
    },
    lengthsubjects = [];
    
    var dirtyChecklist = [];
    var pendingChanges = []; // used coalesce changes from defineProperty and __defineSetter__
    
    var supportDefineProperty = false;
    try {
        supportDefineProperty = Object.defineProperty && Object.defineProperty({},'x', {});
    } catch(ex) {  /* not supported */  }

    var isFunction = function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
    };

    var isInt = function (x) {
        return x % 1 === 0;
    };

    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var isObject = function(obj) {
        return {}.toString.apply(obj) === '[object Object]';
    };
    
    var getObjDiff = function(a, b){
        var aplus = [],
        bplus = [];

        if(!(typeof a == "string") && !(typeof b == "string")){

            if (isArray(a) && b) {
                for (var i=0; i<a.length; i++) {
                    if (b[i] === undefined) aplus.push(i);
                }
            } else {
                for(var i in a){
                    if (a.hasOwnProperty(i)) {
                        if(b && !b.hasOwnProperty(i)) {
                            aplus.push(i);
                        }
                    }
                }
            }

            if (isArray(b) && a) {
                for (var j=0; j<b.length; j++) {
                    if (a[j] === undefined) bplus.push(j);
                }
            } else {
                for(var j in b){
                    if (b.hasOwnProperty(j)) {
                        if(a && !a.hasOwnProperty(j)) {
                            bplus.push(j);
                        }
                    }
                }
            }
        }

        return {
            added: aplus,
            removed: bplus
        }
    };

    var clone = function(obj){

        if (null == obj || "object" != typeof obj) {
            return obj;
        }

        var copy = obj.constructor();

        for (var attr in obj) {
            copy[attr] = obj[attr];
        }

        return copy;        

    }

    var getExistingSetter = function (obj, propName) {
        if (WatchJS.preserveExistingSetters) {
            var existing = Object.getOwnPropertyDescriptor(obj, propName);
            return existing.set;
        }

        return undefined;
    }

    var defineGetAndSet = function (obj, propName, getter, setter) {
        try {
            var existingSetter = getExistingSetter(obj, propName);
            Object.defineProperty(obj, propName, {
                get: getter,
                set: function(value) {
                    setter.call(this, value, true); // coalesce changes
                    if (existingSetter) {
                        existingSetter(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
        }
        catch(e1) {
            try{
                Object.prototype.__defineGetter__.call(obj, propName, getter);
                Object.prototype.__defineSetter__.call(obj, propName, function(value) {
                    setter.call(this,value,true); // coalesce changes
                });
            }
            catch(e2) {
                observeDirtyChanges(obj,propName,setter);
                //throw new Error("watchJS error: browser not supported :/")
            }
        }

    };

    var defineProp = function (obj, propName, value) {
        try {
            Object.defineProperty(obj, propName, {
                enumerable: false,
                configurable: true,
                writable: false,
                value: value
            });
        } catch(error) {
            obj[propName] = value;
        }
    };

    var observeDirtyChanges = function(obj,propName,setter) {
        dirtyChecklist[dirtyChecklist.length] = {
            prop:       propName,
            object:     obj,
            orig:       clone(obj[propName]),
            callback:   setter
        }        
    }
    
    var watch = function () {

        if (isFunction(arguments[1])) {
            watchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            watchMany.apply(this, arguments);
        } else {
            watchOne.apply(this, arguments);
        }

    };


    var watchAll = function (obj, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if(isArray(obj)) {
            defineWatcher(obj, "__watchall__", watcher, level); // watch all changes on the array
            if (level===undefined||level > 0) {
                for (var prop = 0; prop < obj.length; prop++) { // watch objects in array
                   watchAll(obj[prop],watcher,level, addNRemove);
                }
            }
        } 
        else {
            var prop,props = [];
            for (prop in obj) { //for each attribute if obj is an object
                if (prop == "$val" || (!supportDefineProperty && prop === 'watchers')) {
                    continue;
                }

                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    props.push(prop); //put in the props
                }
            }
            watchMany(obj, props, watcher, level, addNRemove); //watch all items of the props
        }


        if (addNRemove) {
            pushToLengthSubjects(obj, "$$watchlengthsubjectroot", watcher, level);
        }
    };


    var watchMany = function (obj, props, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        for (var i=0; i<props.length; i++) { //watch each property
            var prop = props[i];
            watchOne(obj, prop, watcher, level, addNRemove);
        }

    };

    var watchOne = function (obj, prop, watcher, level, addNRemove) {
        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if(isFunction(obj[prop])) { //dont watch if it is a function
            return;
        }
        if(obj[prop] != null && (level === undefined || level > 0)){
            watchAll(obj[prop], watcher, level!==undefined? level-1 : level); //recursively watch all attributes of this
        }

        defineWatcher(obj, prop, watcher, level);

        if(addNRemove && (level === undefined || level > 0)){
            pushToLengthSubjects(obj, prop, watcher, level);
        }

    };

    var unwatch = function () {

        if (isFunction(arguments[1])) {
            unwatchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            unwatchMany.apply(this, arguments);
        } else {
            unwatchOne.apply(this, arguments);
        }

    };

    var unwatchAll = function (obj, watcher) {

        if (obj instanceof String || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if (isArray(obj)) {
            var props = ['__watchall__'];
            for (var prop = 0; prop < obj.length; prop++) { //for each item if obj is an array
                props.push(prop); //put in the props
            }
            unwatchMany(obj, props, watcher); //watch all itens of the props
        } else {
            var unwatchPropsInObject = function (obj2) {
                var props = [];
                for (var prop2 in obj2) { //for each attribute if obj is an object
                    if (obj2.hasOwnProperty(prop2)) {
                        if (obj2[prop2] instanceof Object) {
                            unwatchPropsInObject(obj2[prop2]); //recurs into object props
                        } else {
                            props.push(prop2); //put in the props
                        }
                    }
                }
                unwatchMany(obj2, props, watcher); //unwatch all of the props
            };
            unwatchPropsInObject(obj);
        }
    };


    var unwatchMany = function (obj, props, watcher) {

        for (var prop2 in props) { //watch each attribute of "props" if is an object
            if (props.hasOwnProperty(prop2)) {
                unwatchOne(obj, props[prop2], watcher);
            }
        }
    };

    var timeouts = [],
        timerID = null;
    function clearTimerID() {
        timerID = null;
        for(var i=0; i< timeouts.length; i++) {
            timeouts[i]();
        }
        timeouts.length = 0;
    }
    var getTimerID= function () {
        if (!timerID)  {
            timerID = setTimeout(clearTimerID);
        }
        return timerID;
    }
    var registerTimeout = function(fn) { // register function to be called on timeout
        if (timerID==null) getTimerID();
        timeouts[timeouts.length] = fn;
    }
    
    // Track changes made to an array, object or an object's property 
    // and invoke callback with a single change object containing type, value, oldvalue and array splices
    // Syntax: 
    //      trackChange(obj, callback, recursive, addNRemove)
    //      trackChange(obj, prop, callback, recursive, addNRemove)
    var trackChange = function() {
        var fn = (isFunction(arguments[2])) ? trackProperty : trackObject ;
        fn.apply(this,arguments);
    }

    // track changes made to an object and invoke callback with a single change object containing type, value and array splices
    var trackObject= function(obj, callback, recursive, addNRemove) {
        var change = null,lastTimerID = -1;
        var isArr = isArray(obj);
        var level,fn = function(prop, action, newValue, oldValue) {
            var timerID = getTimerID();
            if (lastTimerID!==timerID) { // check if timer has changed since last update
                lastTimerID = timerID;
                change = {
                    type: 'update'
                }
                change['value'] = obj;
                change['splices'] = null;
                registerTimeout(function() {
                    callback.call(this,change);
                    change = null;
                });
            }
            // create splices for array changes
            if (isArr && obj === this && change !== null)  {                
                if (action==='pop'||action==='shift') {
                    newValue = [];
                    oldValue = [oldValue];
                }
                else if (action==='push'||action==='unshift') {
                    newValue = [newValue];
                    oldValue = [];
                }
                else if (action!=='splice') { 
                    return; // return here - for reverse and sort operations we don't need to return splices. a simple update will do
                }
                if (!change.splices) change.splices = [];
                change.splices[change.splices.length] = {
                    index: prop,
                    deleteCount: oldValue ? oldValue.length : 0,
                    addedCount: newValue ? newValue.length : 0,
                    added: newValue,
                    deleted: oldValue
                };
            }

        }  
        level = (recursive==true) ? undefined : 0;        
        watchAll(obj,fn, level, addNRemove);
    }
    
    // track changes made to the property of an object and invoke callback with a single change object containing type, value, oldvalue and splices
    var trackProperty = function(obj,prop,callback,recursive, addNRemove) { 
        if (obj && prop) {
            watchOne(obj,prop,function(prop, action, newvalue, oldvalue) {
                var change = {
                    type: 'update'
                }
                change['value'] = newvalue;
                change['oldvalue'] = oldvalue;
                if (recursive && isObject(newvalue)||isArray(newvalue)) {
                    trackObject(newvalue,callback,recursive, addNRemove);
                }               
                callback.call(this,change);
            },0)
            
            if (recursive && isObject(obj[prop])||isArray(obj[prop])) {
                trackObject(obj[prop],callback,recursive, addNRemove);
            }                           
        }
    }
    
    
    var defineWatcher = function (obj, prop, watcher, level) {
        var newWatcher = false;
        var isArr = isArray(obj);
        
        if (!obj.watchers) {
            defineProp(obj, "watchers", {});
            if (isArr) {
                // watch array functions
                watchFunctions(obj, function(index,action,newValue, oldValue) {
                    addPendingChange(obj, index, action,newValue, oldValue);
                    if (level !== 0 && newValue && (isObject(newValue) || isArray(newValue))) {
                        var i,n, ln, wAll, watchList = obj.watchers[prop];
                        if ((wAll = obj.watchers['__watchall__'])) {
                            watchList = watchList ? watchList.concat(wAll) : wAll;
                        }
                        ln = watchList ?  watchList.length : 0;
                        for (i = 0; i<ln; i++) {
                            if (action!=='splice') {
                                watchAll(newValue, watchList[i], (level===undefined)?level:level-1);
                            }
                            else {
                                // watch spliced values
                                for(n=0; n < newValue.length; n++) {
                                    watchAll(newValue[n], watchList[i], (level===undefined)?level:level-1);
                                }
                            }
                        }
                    }
                });
            }
        }

        if (!obj.watchers[prop]) {
            obj.watchers[prop] = [];
            if (!isArr) newWatcher = true;
        }

        for (var i=0; i<obj.watchers[prop].length; i++) {
            if(obj.watchers[prop][i] === watcher){
                return;
            }
        }

        obj.watchers[prop].push(watcher); //add the new watcher to the watchers array

        if (newWatcher) {
            var val = obj[prop];            
            var getter = function () {
                return val;                        
            };

            var setter = function (newval, delayWatcher) {
                var oldval = val;
                val = newval;                
                if (level !== 0 
                    && obj[prop] && (isObject(obj[prop]) || isArray(obj[prop]))
                    && !obj[prop].watchers) {
                    // watch sub properties
                    var i,ln = obj.watchers[prop].length; 
                    for(i=0; i<ln; i++) {
                        watchAll(obj[prop], obj.watchers[prop][i], (level===undefined)?level:level-1);
                    }
                }

                //watchFunctions(obj, prop);
                
                if (isSuspended(obj, prop)) {
                    resume(obj, prop);
                    return;
                }

                if (!WatchJS.noMore){ // this does not work with Object.observe
                    //if (JSON.stringify(oldval) !== JSON.stringify(newval)) {
                    if (oldval !== newval) {
                        if (!delayWatcher) {
                            callWatchers(obj, prop, "set", newval, oldval);
                        }
                        else {
                            addPendingChange(obj, prop, "set", newval, oldval);
                        }
                        WatchJS.noMore = false;
                    }
                }
            };

            if (WatchJS.useDirtyCheck) {
                observeDirtyChanges(obj,prop,setter);
            }
            else {
                defineGetAndSet(obj, prop, getter, setter);
            }
        }

    };

    var callWatchers = function (obj, prop, action, newval, oldval) {
        if (prop !== undefined) {
            var ln, wl, watchList = obj.watchers[prop];
            if ((wl = obj.watchers['__watchall__'])) {
                watchList = watchList ? watchList.concat(wl) : wl;
            }
            ln = watchList ? watchList.length : 0;
            for (var wr=0; wr< ln; wr++) {
                watchList[wr].call(obj, prop, action, newval, oldval);
            }
        } else {
            for (var prop in obj) {//call all
                if (obj.hasOwnProperty(prop)) {
                    callWatchers(obj, prop, action, newval, oldval);
                }
            }
        }
    };

    var methodNames = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice'];
    var defineArrayMethodWatcher = function (obj, original, methodName, callback) {
        defineProp(obj, methodName, function () {
            var index = 0;
            var i,newValue, oldValue, response;                        
            // get values before splicing array 
            if (methodName === 'splice') {
               var start = arguments[0];
               var end = start + arguments[1];
               oldValue = obj.slice(start,end);
               newValue = [];
               for(i=2;i<arguments.length;i++) {
                   newValue[i-2] = arguments[i];
               }
               index = start;
            } 
            else {
                newValue = arguments.length > 0 ? arguments[0] : undefined;
            } 

            response = original.apply(obj, arguments);
            if (methodName !== 'slice') {
                if (methodName === 'pop') {
                    oldValue = response;
                    index = obj.length;
                }
                else if (methodName === 'push') {
                    index = obj.length-1;
                }
                else if (methodName === 'shift') {
                    oldValue = response;
                }
                else if (methodName !== 'unshift' && newValue===undefined) {
                    newValue = response;
                }
                callback.call(obj, index, methodName,newValue, oldValue)
            }
            return response;
        });
    };

    var watchFunctions = function(obj, callback) {

        if (!isFunction(callback) || !obj || (obj instanceof String) || (!isArray(obj))) {
            return;
        }

        for (var i = methodNames.length, methodName; i--;) {
            methodName = methodNames[i];
            defineArrayMethodWatcher(obj, obj[methodName], methodName, callback);
        }

    };

    var unwatchOne = function (obj, prop, watcher) {
        if (prop) {
            if (obj.watchers && obj.watchers[prop]) {
                if (watcher === undefined) {
                    delete obj.watchers[prop]; // remove all property watchers
                }
                else {
                    for (var i = 0; i < obj.watchers[prop].length; i++) {
                        var w = obj.watchers[prop][i];
                        if (w == watcher) {
                            obj.watchers[prop].splice(i, 1);
                        }
                    }
                }
            }
        } else {
            delete obj.watchers;
        }

        removeFromLengthSubjects(obj, prop, watcher);
        removeFromDirtyChecklist(obj, prop);
    };
    
    // suspend watchers until next update cycle
    var suspend = function(obj, prop) {
        if (obj.watchers) {
            var name = '__wjs_suspend__'+(prop!==undefined ? prop : '');
            obj.watchers[name] = true;
        }
    }
    
    var isSuspended = function(obj, prop) {
        return obj.watchers 
               && (obj.watchers['__wjs_suspend__'] || 
                   obj.watchers['__wjs_suspend__'+prop]);
    }
    
    // resumes preivously suspended watchers
    var resume = function(obj, prop) {
        registerTimeout(function() {
            delete obj.watchers['__wjs_suspend__'];
            delete obj.watchers['__wjs_suspend__'+prop];
        })
    }

    var pendingTimerID = null;
    var addPendingChange = function(obj,prop, mode, newval, oldval) {
        pendingChanges[pendingChanges.length] = {
            obj:obj,
            prop: prop,
            mode: mode,
            newval: newval,
            oldval: oldval
        };
        if (pendingTimerID===null) {
            pendingTimerID = setTimeout(applyPendingChanges);
        }
    };
    
    
    var applyPendingChanges = function()  {
        // apply pending changes
        var change = null;
        pendingTimerID = null;
        for(var i=0;i < pendingChanges.length;i++) {
            change = pendingChanges[i];
            callWatchers(change.obj, change.prop, change.mode, change.newval, change.oldval);
        }
        if (change) {
            pendingChanges = [];
            change = null;
        }        
    }

    var loop = function(){

        // check for new or deleted props
        for(var i=0; i<lengthsubjects.length; i++) {

            var subj = lengthsubjects[i];

            if (subj.prop === "$$watchlengthsubjectroot") {

                var difference = getObjDiff(subj.obj, subj.actual);

                if(difference.added.length || difference.removed.length){
                    if(difference.added.length){
                        watchMany(subj.obj, difference.added, subj.watcher, subj.level - 1, true);
                    }

                    subj.watcher.call(subj.obj, "root", "differentattr", difference, subj.actual);
                }
                subj.actual = clone(subj.obj);


            } else {

                var difference = getObjDiff(subj.obj[subj.prop], subj.actual);

                if(difference.added.length || difference.removed.length){
                    if(difference.added.length){
                        for (var j=0; j<subj.obj.watchers[subj.prop].length; j++) {
                            watchMany(subj.obj[subj.prop], difference.added, subj.obj.watchers[subj.prop][j], subj.level - 1, true);
                        }
                    }

                    callWatchers(subj.obj, subj.prop, "differentattr", difference, subj.actual);
                }

                subj.actual = clone(subj.obj[subj.prop]);

            }

        }
        
        // start dirty check
        var n, value;
        if (dirtyChecklist.length > 0) {
            for (var i = 0; i < dirtyChecklist.length; i++) {
                n = dirtyChecklist[i];
                value = n.object[n.prop];
                if (!compareValues(n.orig, value)) {
                    n.orig = clone(value);
                    n.callback(value);
                }
            }
        }

    };

    var compareValues =  function(a,b) {
        var i, state = true;
        if (a!==b)  {
            if (isObject(a)) {
                for(i in a) {
                    if (!supportDefineProperty && i==='watchers') continue;
                    if (a[i]!==b[i]) {
                        state = false;
                        break;
                    };
                }
            }
            else {
                state = false;
            }
        }
        return state;
    }
    
    var pushToLengthSubjects = function(obj, prop, watcher, level){

        var actual;

        if (prop === "$$watchlengthsubjectroot") {
            actual =  clone(obj);
        } else {
            actual = clone(obj[prop]);
        }

        lengthsubjects.push({
            obj: obj,
            prop: prop,
            actual: actual,
            watcher: watcher,
            level: level
        });
    };

    var removeFromLengthSubjects = function(obj, prop, watcher){
        for (var i=0; i<lengthsubjects.length; i++) {
            var subj = lengthsubjects[i];

            if (subj.obj == obj) {
                if (!prop || subj.prop == prop) {
                    if (!watcher || subj.watcher == watcher) {
                        // if we splice off one item at position i
                        // we need to decrement i as the array is one item shorter
                        // so when we increment i in the loop statement we
                        // will land at the correct index.
                        // if it's not decremented, you won't delete all length subjects
                        lengthsubjects.splice(i--, 1);
                    }
                }
            }
        }

    };
    
    var removeFromDirtyChecklist = function(obj, prop){
        var notInUse;
        for (var i=0; i<dirtyChecklist.length; i++) {
            var n = dirtyChecklist[i];
            var watchers = n.object.watchers;
            notInUse = (
                n.object == obj 
                && (!prop || n.prop == prop)
                && watchers
                && (!prop || !watchers[prop] || watchers[prop].length == 0 )
            );
            if (notInUse)  {
                // we use the same syntax as in removeFromLengthSubjects
                dirtyChecklist.splice(i--, 1);
            }
        }

    };    

    setInterval(loop, 50);

    WatchJS.watch = watch;
    WatchJS.unwatch = unwatch;
    WatchJS.callWatchers = callWatchers;
    WatchJS.suspend = suspend; // suspend watchers    
    WatchJS.onChange = trackChange;  // track changes made to object or  it's property and return a single change object

    return WatchJS;

}));

},{}],"timers/simple.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: Read about JSDoc and add comments to it.
var SimpleTimer =
/*#__PURE__*/
function () {
  function SimpleTimer(_ref) {
    var time = _ref.time,
        _ref$events = _ref.events,
        events = _ref$events === void 0 ? {} : _ref$events,
        _ref$stepDivider = _ref.stepDivider,
        stepDivider = _ref$stepDivider === void 0 ? 100 : _ref$stepDivider;

    _classCallCheck(this, SimpleTimer);

    this.time = time;
    this.remainigTime = time;
    this.stepDivider = stepDivider;
    this.events = events;
  }

  _createClass(SimpleTimer, [{
    key: "continue",
    value: function _continue() {
      var _this = this;

      if (this.interval) {
        return;
      } // TODO: Think about step. Ex., 15 min => step +/- ~15 sec. (it's too much)


      var step = this.time / this.stepDivider;
      this.last = Date.now();
      this.interval = setInterval(function () {
        _this.remainigTime -= Date.now() - _this.last;

        if (_this.remainigTime <= 0) {
          _this.stop();

          return;
        }

        if (_this.events.onProgress) {
          _this.events.onProgress(1 - _this.remainigTime / _this.time);
        }

        _this.last = Date.now();
      }, step);
    }
  }, {
    key: "start",
    value: function start() {
      this.remainigTime = this.time;
      this.continue();
    }
  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this.interval);
      this.interval = null;
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.interval);
      this.interval = null;

      if (this.events.onEnd) {
        this.events.onEnd();
      }
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return Boolean(this.interval);
    }
  }]);

  return SimpleTimer;
}();

exports.default = SimpleTimer;
},{}],"timers/pomodoro.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _simple = _interopRequireDefault(require("./simple"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PomodoroTimer =
/*#__PURE__*/
function () {
  function PomodoroTimer(_ref) {
    var _this = this;

    var storage = _ref.storage,
        _ref$startState = _ref.startState,
        startState = _ref$startState === void 0 ? 'work' : _ref$startState,
        _ref$events = _ref.events,
        events = _ref$events === void 0 ? {} : _ref$events;

    _classCallCheck(this, PomodoroTimer);

    this.storage = storage;
    this.events = events;
    this.state = startState;
    this.timer = new _simple.default({
      time: 0,
      events: {
        onProgress: function onProgress(progress) {
          if (_this.events.onProgress) {
            _this.events.onProgress(progress);
          }
        },
        onEnd: function onEnd() {
          switch (_this.state) {
            case 'work':
              {
                _this.state = 'shortBreak';
                break;
              }

            case 'shortBreak':
              {
                _this.state = 'work';
                break;
              }
            // TODO: long break

            default:
              {
                console.error("Unknown state name: ".concat(_this.state));
              }
          }

          if (_this.events.onEnd) {
            _this.events.onEnd(_this.state);
          }
        }
      }
    });
  }

  _createClass(PomodoroTimer, [{
    key: "start",
    value: function start() {
      // TODO: Replace it to key-value object
      switch (this.state) {
        case 'work':
          {
            this.timer.time = this.storage.get('pomodoroSize');
            break;
          }

        case 'shortBreak':
          {
            this.timer.time = this.storage.get('shortBreakSize');
            break;
          }

        case 'longBreak':
          {
            this.timer.time = this.storage.get('longBreakSize');
            break;
          }

        default:
          {
            console.error('Unknown PomodoroTimer state');
            return;
          }
      }

      this.timer.start();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.timer.pause();
    }
  }, {
    key: "continue",
    value: function _continue() {
      this.timer.continue();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.timer.stop();
    }
  }]);

  return PomodoroTimer;
}();

exports.default = PomodoroTimer;
},{"./simple":"timers/simple.js"}],"layouts/layout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default() {
  var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var layout = document.createElement('div');
  layout.className = 'layout';
  layout.innerHTML = template;
  return layout;
};

exports.default = _default;
},{}],"layouts/timerLayout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _melankeWatchjs = require("melanke-watchjs");

var _pomodoro = _interopRequireDefault(require("../timers/pomodoro"));

var _layout = _interopRequireDefault(require("./layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var template = "\n<div class=\"menu-row layout-row\">\n  <div class=\"stop-pomodoro-col menu-element\">\n    <button class=\"hided icon button stop-pomodoro-button\"></button>\n  </div>\n\n  <div class=\"settings-col menu-element\">\n    <button class=\"icon button settings-button\"></button>\n  </div>\n</div>\n<div class=\"pomodoro-status-row layout-row layout-row-max\">Start</div>\n<div class=\"pomodoro-progress-row layout-row layout-row-max\">0%</div>\n<div class=\"copyright-row layout-row\">by Seryiza</div>\n"; // Labels for pomodoro-status-row

var statusTexts = {
  start: 'Start',
  ticking: 'Pause',
  paused: 'Paused'
}; // CSS classes for .layout

var pomodoroCssClasses = {
  work: 'work-pomodoro',
  shortBreak: 'short-break-pomodoro',
  longBreak: 'long-break-pomodoro'
};

var _default = function _default(app) {
  var layout = (0, _layout.default)(template); // = Model =

  var state = {
    stateName: 'start',
    pomodoroType: 'work',
    progress: 0,
    timer: null
  }; // = Controller =
  // TODO: Think about component-architecture

  state.timer = new _pomodoro.default({
    storage: app.storage,
    events: {
      onProgress: function onProgress(progress) {
        state.progress = progress;
      },
      onEnd: function onEnd(pomodoroType) {
        state.stateName = 'start';
        state.pomodoroType = pomodoroType;
        state.progress = 0;
      }
    }
  });

  var pomodoroClick = function pomodoroClick() {
    switch (state.stateName) {
      case 'start':
        {
          state.stateName = 'ticking';
          state.timer.start();
          break;
        }

      case 'ticking':
        {
          state.stateName = 'paused';
          state.timer.pause();
          break;
        }

      case 'paused':
        {
          state.stateName = 'ticking';
          state.timer.continue();
          break;
        }

      default:
        {
          console.error("Unknown state name: '".concat(state.stateName, "'"));
        }
    }
  };

  var statusElem = layout.querySelector('.pomodoro-status-row');
  var progressElem = layout.querySelector('.pomodoro-progress-row');
  statusElem.addEventListener('click', pomodoroClick);
  progressElem.addEventListener('click', pomodoroClick);
  layout.querySelector('.settings-button').addEventListener('click', function () {
    app.layouts.goto('settings');
  });
  layout.querySelector('.stop-pomodoro-button').addEventListener('click', function () {
    state.timer.stop();
  }); // = View =

  var stopPomodoroElem = layout.querySelector('.stop-pomodoro-button'); // Change status text (click to start / pause / continue) when stateName changes

  (0, _melankeWatchjs.watch)(state, 'stateName', function () {
    statusElem.textContent = statusTexts[state.stateName];

    switch (state.stateName) {
      case 'paused':
      case 'ticking':
        {
          stopPomodoroElem.classList.remove('hided');
          break;
        }

      default:
        {
          stopPomodoroElem.classList.add('hided');
          break;
        }
    }
  }); // Update progress bar

  var textProgress = layout.querySelector('.pomodoro-progress-row');
  (0, _melankeWatchjs.watch)(state, 'progress', function () {
    textProgress.textContent = "".concat(Math.round(state.progress * 100), "%");
  }); // Change css-class when pomodoroType changes

  (0, _melankeWatchjs.watch)(state, 'pomodoroType', function () {
    var _layout$classList;

    (_layout$classList = layout.classList).remove.apply(_layout$classList, _toConsumableArray(Object.values(pomodoroCssClasses)));

    layout.classList.add(pomodoroCssClasses[state.pomodoroType]);
  }); // First adding class on start

  layout.classList.add(pomodoroCssClasses[state.pomodoroType]);
  return layout;
};

exports.default = _default;
},{"melanke-watchjs":"../node_modules/melanke-watchjs/src/watch.js","../timers/pomodoro":"timers/pomodoro.js","./layout":"layouts/layout.js"}],"formWrapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var identity = function identity(x) {
  return x;
};

var FormWrapper =
/*#__PURE__*/
function () {
  _createClass(FormWrapper, null, [{
    key: "getStartValues",
    value: function getStartValues() {
      var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.keys(inputs).filter(function (name) {
        return inputs[name].start;
      }).reduce(function (acc, name) {
        return _objectSpread({}, acc, _defineProperty({}, name, inputs[name].start));
      }, {});
    }
  }]);

  function FormWrapper(formElement) {
    var _this = this;

    var inputs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var events = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, FormWrapper);

    this.form = formElement;
    this.inputs = inputs;
    this.events = events; // Fill this.values by start values from inputs[key].start
    // and this.events.onStart (if exists)

    this.values = FormWrapper.getStartValues(inputs);

    if (this.events.onStart) {
      var newValues = {};
      this.events.onStart(newValues);
      this.values = Object.assign(this.values, newValues);
    }

    this.fillStartValues(this.values);
    this.form.addEventListener('submit', function (event) {
      // Cancel sending a request
      event.preventDefault();
      Array.from(_this.form.elements).forEach(function (elem) {
        // TODO: Read about radio / select. Maybe, there's an error.
        // TODO: Maybe rewrite this code? (without side effects)
        _this.setValue(elem.name, elem.value);
      });

      if (_this.events.onSubmit) {
        var copy = Object.assign({}, _this.values);

        _this.events.onSubmit(copy);
      }
    });
  } // TODO: Think about DRY


  _createClass(FormWrapper, [{
    key: "getCastFn",
    value: function getCastFn(name) {
      if (name in this.inputs && this.inputs[name].cast) {
        return this.inputs[name].cast;
      }

      return identity;
    }
  }, {
    key: "getInputFn",
    value: function getInputFn(name) {
      if (name in this.inputs && this.inputs[name].input) {
        return this.inputs[name].input;
      }

      return identity;
    }
  }, {
    key: "getOutputFn",
    value: function getOutputFn(name) {
      if (name in this.inputs && this.inputs[name].output) {
        return this.inputs[name].output;
      }

      return identity;
    }
  }, {
    key: "setValue",
    value: function setValue(name, value) {
      var cast = this.getCastFn(name);
      var fn = this.getInputFn(name);
      this.values[name] = fn(cast(value));
    }
  }, {
    key: "getValue",
    value: function getValue(name) {
      var cast = this.getCastFn(name);
      var fn = this.getOutputFn(name);
      return fn(cast(this.values[name]));
    }
  }, {
    key: "setStartValue",
    value: function setStartValue(name, value) {
      var cast = this.getCastFn(name);
      this.values[name] = cast(value);
    }
  }, {
    key: "fillStartValues",
    value: function fillStartValues(startValues) {
      var _this2 = this;

      Object.keys(startValues).forEach(function (key) {
        _this2.setStartValue(key, startValues[key]);

        _this2.form.elements[key].value = _this2.getValue(key);
      });
    }
  }]);

  return FormWrapper;
}();

exports.default = FormWrapper;
},{}],"layouts/settingsLayout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _melankeWatchjs = require("melanke-watchjs");

var _layout = _interopRequireDefault(require("./layout"));

var _formWrapper = _interopRequireDefault(require("../formWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
var template = "\n<div class=\"menu-row layout-row flex-end\">\n  <div class=\"settings-col menu-element\">\n    <button class=\"icon button settings-button\"></button>\n  </div>\n</div>\n<div class=\"settings-row layout-row layout-row-max\">\n  <h2 class=\"settings-header\">Settings</h2>\n  <form class=\"settings-form\">\n    <label class=\"settings-label\">\n      <div class=\"settings-label-text\">Work Time (min.):</div>\n      <input name=\"work-time\" class=\"settings-input work-time-input\" type=\"number\" min=\"1\">\n    </label>\n    <label class=\"settings-label\">\n      <div class=\"settings-label-text\">Short Break Time (min.):</div>\n      <input name=\"short-break-time\" class=\"settings-input short-break-time-input\" type=\"number\" min=\"1\">\n    </label>\n    <label class=\"settings-label\">\n      <div class=\"settings-label-text\">Long Break Time (min.):</div>\n      <input name=\"long-break-time\" class=\"settings-input long-break-time-input\" type=\"number\" min=\"1\">\n    </label>\n    <label class=\"settings-label\">\n      <div class=\"settings-label-text\">Short Breaks Count Before Long Ones:</div>\n      <input name=\"cycles-count\" class=\"settings-input cycles-before-long-break-input\" type=\"number\" min=\"1\">\n    </label>\n    <label class=\"settings-label\">\n      <div class=\"settings-label-text\">End of Pomodoro Sound:</div>\n      todo\n    </label>\n    <label class=\"settings-label\">\n      <div class=\"settings-label-text\">End of Pomodoro Notification:</div>\n      todo\n    </label>\n\n    <button name=\"save-button\" class=\"button save-button\">Save</button>\n  </form>\n</div>\n<div class=\"copyright-row layout-row\">by Seryiza</div>\n";

var _default = function _default(app) {
  var layout = (0, _layout.default)(template);
  layout.classList.add('settings-layout'); // = Model =

  var state = {
    // TODO: maybe is there better idea for this?
    // TODO: export consts like 'pomodoroSize' in other (shared) file
    pomodoroSize: null,
    shortBreakSize: null,
    longBreakSize: null,
    cyclesCount: null,
    lastSaveTime: null
  }; // = Controller =

  layout.querySelector('.settings-button').addEventListener('click', function () {
    app.layouts.goto('timer');
  }); // Form processing (using FormWrapper module)

  var millisecondsInMinute = 60 * 1000;
  var minutesFromMillisecondsInput = {
    cast: function cast(x) {
      return Number(x);
    },
    input: function input(x) {
      return x * millisecondsInMinute;
    },
    output: function output(x) {
      return x / millisecondsInMinute;
    }
  };
  var settingsInputs = {
    'work-time': minutesFromMillisecondsInput,
    'short-break-time': minutesFromMillisecondsInput,
    'long-break-time': minutesFromMillisecondsInput,
    'cycles-count': {
      cast: function cast(x) {
        return Number(x);
      }
    }
  }; // List to read from/write to app.storage and inputs

  var inputNamesAndStorageKeys = [{
    inputName: 'work-time',
    storageKey: 'pomodoroSize'
  }, {
    inputName: 'short-break-time',
    storageKey: 'shortBreakSize'
  }, {
    inputName: 'long-break-time',
    storageKey: 'longBreakSize'
  }, {
    inputName: 'cycles-count',
    storageKey: 'cyclesCount'
  }];
  var formElem = layout.querySelector('.settings-form'); // eslint-disable-next-line no-unused-vars

  var formWrapper = new _formWrapper.default(formElem, settingsInputs, {
    onStart: function onStart(formData) {
      inputNamesAndStorageKeys.forEach(function (inputData) {
        formData[inputData.inputName] = app.storage.get(inputData.storageKey);
      });
    },
    onSubmit: function onSubmit(formData) {
      inputNamesAndStorageKeys.forEach(function (inputData) {
        app.storage.set(inputData.storageKey, formData[inputData.inputName]);
      });
      state.lastSaveTime = Date.now();
    }
  }); // = View =

  (0, _melankeWatchjs.watch)(state, 'lastSaveTime', function () {
    // TODO: scroll up and show message on layout
    alert('Preferences saved!');
  });
  return layout;
};

exports.default = _default;
},{"melanke-watchjs":"../node_modules/melanke-watchjs/src/watch.js","./layout":"layouts/layout.js","../formWrapper":"formWrapper.js"}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectBased = _interopRequireDefault(require("./storages/objectBased"));

var _localBased = _interopRequireDefault(require("./storages/localBased"));

var _layoutManager = _interopRequireDefault(require("./layoutManager"));

var _timerLayout = _interopRequireDefault(require("./layouts/timerLayout"));

var _settingsLayout = _interopRequireDefault(require("./layouts/settingsLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PomodoroApp = function PomodoroApp(_ref) {
  var _this = this;

  var elem = _ref.elem,
      _ref$defaultsPreferen = _ref.defaultsPreferences,
      defaultsPreferences = _ref$defaultsPreferen === void 0 ? {} : _ref$defaultsPreferen;

  _classCallCheck(this, PomodoroApp);

  this.elem = elem; // Create app storage

  var defaults = new _objectBased.default(defaultsPreferences);
  var locals = new _localBased.default(defaults);
  this.storage = locals; // Create layout manager

  this.layouts = new _layoutManager.default({
    start: 'settings',
    layouts: {
      timer: (0, _timerLayout.default)(this),
      settings: (0, _settingsLayout.default)(this)
    },
    events: {
      onChange: function onChange(layoutManager, nextLayout) {
        // Clean current layout and render (append to this.elem) new layout
        var component = layoutManager.layout(nextLayout);
        _this.elem.innerHTML = '';

        _this.elem.append(component);
      }
    }
  });
};

exports.default = PomodoroApp;
},{"./storages/objectBased":"storages/objectBased.js","./storages/localBased":"storages/localBased.js","./layoutManager":"layoutManager.js","./layouts/timerLayout":"layouts/timerLayout.js","./layouts/settingsLayout":"layouts/settingsLayout.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _app.default({
  elem: document.querySelector('#app'),
  defaultsPreferences: {
    // TODO: Think about naming
    pomodoroSize: 25 * 60 * 1000,
    shortBreakSize: 5 * 60 * 1000,
    longBreakSize: 30 * 60 * 1000,
    cyclesCount: 4
  }
});

exports.default = _default;
},{"./app":"app.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45413" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.map