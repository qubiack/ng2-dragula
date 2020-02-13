(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('dragula'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@supermemo/ng2-dragula', ['exports', 'dragula', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.supermemo = global.supermemo || {}, global.supermemo['ng2-dragula'] = {}),global.dragula,global.ng.core,global.rxjs,global.rxjs.operators));
}(this, (function (exports,dragulaExpt,core,rxjs,operators) { 'use strict';

    var dragulaExpt__default = 'default' in dragulaExpt ? dragulaExpt['default'] : dragulaExpt;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Group = (function () {
        function Group(name, drake, options) {
            this.name = name;
            this.drake = drake;
            this.options = options;
            this.initEvents = false;
        }
        return Group;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @enum {string} */
    var EventTypes = {
        Cancel: "cancel",
        Cloned: "cloned",
        Drag: "drag",
        DragEnd: "dragend",
        Drop: "drop",
        Out: "out",
        Over: "over",
        Remove: "remove",
        Shadow: "shadow",
        DropModel: "dropModel",
        RemoveModel: "removeModel",
    };
    /** @type {?} */
    var AllEvents = Object.keys(EventTypes).map(function (k) { return (EventTypes[(k)]); });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var dragula = dragulaExpt__default || dragulaExpt;
    var DrakeFactory = (function () {
        function DrakeFactory(build) {
            if (build === void 0) {
                build = dragula;
            }
            this.build = build;
        }
        return DrakeFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var filterEvent = function (eventType, filterDragType, projector) {
        return function (input) {
            return input.pipe(operators.filter(function (_a) {
                var event = _a.event, name = _a.name;
                return event === eventType
                    && (filterDragType === undefined || name === filterDragType);
            }), operators.map(function (_a) {
                var name = _a.name, args = _a.args;
                return projector(name, args);
            }));
        };
    };
    /** @type {?} */
    var elContainerSourceProjector = function (name, _a) {
        var _b = __read(_a, 3), el = _b[0], container = _b[1], source = _b[2];
        return ({ name: name, el: el, container: container, source: source });
    };
    var DragulaService = (function () {
        function DragulaService(drakeFactory) {
            if (drakeFactory === void 0) {
                drakeFactory = null;
            }
            var _this = this;
            this.drakeFactory = drakeFactory;
            this.dispatch$ = new rxjs.Subject();
            this.drag = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Drag, groupName, function (name, _a) {
                    var _b = __read(_a, 2), el = _b[0], source = _b[1];
                    return ({ name: name, el: el, source: source });
                }));
            };
            this.dragend = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.DragEnd, groupName, function (name, _a) {
                    var _b = __read(_a, 1), el = _b[0];
                    return ({ name: name, el: el });
                }));
            };
            this.drop = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Drop, groupName, function (name, _a) {
                    var _b = __read(_a, 4), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3];
                    return { name: name, el: el, target: target, source: source, sibling: sibling };
                }));
            };
            this.elContainerSource = function (eventType) {
                return function (groupName) {
                    return _this.dispatch$.pipe(filterEvent(eventType, groupName, elContainerSourceProjector));
                };
            };
            this.cancel = this.elContainerSource(EventTypes.Cancel);
            this.remove = this.elContainerSource(EventTypes.Remove);
            this.shadow = this.elContainerSource(EventTypes.Shadow);
            this.over = this.elContainerSource(EventTypes.Over);
            this.out = this.elContainerSource(EventTypes.Out);
            this.cloned = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.Cloned, groupName, function (name, _a) {
                    var _b = __read(_a, 3), clone = _b[0], original = _b[1], cloneType = _b[2];
                    return { name: name, clone: clone, original: original, cloneType: cloneType };
                }));
            };
            this.dropModel = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.DropModel, groupName, function (name, _a) {
                    var _b = __read(_a, 9), el = _b[0], target = _b[1], source = _b[2], sibling = _b[3], item = _b[4], sourceModel = _b[5], targetModel = _b[6], sourceIndex = _b[7], targetIndex = _b[8];
                    return { name: name, el: el, target: target, source: source, sibling: sibling, item: item, sourceModel: sourceModel, targetModel: targetModel, sourceIndex: sourceIndex, targetIndex: targetIndex };
                }));
            };
            this.removeModel = function (groupName) {
                return _this.dispatch$.pipe(filterEvent(EventTypes.RemoveModel, groupName, function (name, _a) {
                    var _b = __read(_a, 6), el = _b[0], container = _b[1], source = _b[2], item = _b[3], sourceModel = _b[4], sourceIndex = _b[5];
                    return { name: name, el: el, container: container, source: source, item: item, sourceModel: sourceModel, sourceIndex: sourceIndex };
                }));
            };
            this.groups = {};
            if (this.drakeFactory === null) {
                this.drakeFactory = new DrakeFactory();
            }
        }
        /**
         * Public mainly for testing purposes. Prefer `createGroup()`.
         * @param {?} group
         * @return {?}
         */
        DragulaService.prototype.add = /**
         * Public mainly for testing purposes. Prefer `createGroup()`.
         * @param {?} group
         * @return {?}
         */
            function (group) {
                /** @type {?} */
                var existingGroup = this.find(group.name);
                if (existingGroup) {
                    throw new Error('Group named: "' + group.name + '" already exists.');
                }
                this.groups[group.name] = group;
                this.handleModels(group);
                this.setupEvents(group);
                return group;
            };
        /**
         * @param {?} name
         * @return {?}
         */
        DragulaService.prototype.find = /**
         * @param {?} name
         * @return {?}
         */
            function (name) {
                return this.groups[name];
            };
        /**
         * @param {?} name
         * @return {?}
         */
        DragulaService.prototype.destroy = /**
         * @param {?} name
         * @return {?}
         */
            function (name) {
                /** @type {?} */
                var group = this.find(name);
                if (!group) {
                    return;
                }
                group.drake && group.drake.destroy();
                delete this.groups[name];
            };
        /**
         * Creates a group with the specified name and options.
         *
         * Note: formerly known as `setOptions`
         * @template T
         * @param {?} name
         * @param {?} options
         * @return {?}
         */
        DragulaService.prototype.createGroup = /**
         * Creates a group with the specified name and options.
         *
         * Note: formerly known as `setOptions`
         * @template T
         * @param {?} name
         * @param {?} options
         * @return {?}
         */
            function (name, options) {
                console.log(name, options);
                return this.add(new Group(name, this.drakeFactory.build([], options), options));
            };
        /**
         * @param {?} __0
         * @return {?}
         */
        DragulaService.prototype.handleModels = /**
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var _this = this;
                var name = _a.name, drake = _a.drake, options = _a.options;
                /** @type {?} */
                var dragElm;
                /** @type {?} */
                var dragIndex;
                /** @type {?} */
                var dropIndex;
                drake.on('remove', function (el, container, source) {
                    if (!drake.models) {
                        return;
                    }
                    /** @type {?} */
                    var sourceModel = drake.models[drake.containers.indexOf(source)];
                    sourceModel = sourceModel.slice(0);
                    /** @type {?} */
                    var item = sourceModel.splice(dragIndex, 1)[0];
                    // console.log('REMOVE');
                    // console.log(sourceModel);
                    // console.log('REMOVE');
                    // console.log(sourceModel);
                    _this.dispatch$.next({
                        event: EventTypes.RemoveModel,
                        name: name,
                        args: [el, container, source, item, sourceModel, dragIndex]
                    });
                });
                drake.on('drag', function (el, source) {
                    if (!drake.models) {
                        return;
                    }
                    dragElm = el;
                    dragIndex = _this.domIndexOf(el, source);
                });
                drake.on('drop', function (dropElm, target, source, sibling) {
                    if (!drake.models || !target) {
                        return;
                    }
                    dropIndex = _this.domIndexOf(dropElm, target);
                    /** @type {?} */
                    var sourceModel = drake.models[drake.containers.indexOf(source)];
                    /** @type {?} */
                    var targetModel = drake.models[drake.containers.indexOf(target)];
                    /** @type {?} */
                    var item;
                    if (target === source) {
                        sourceModel = sourceModel.slice(0);
                        item = sourceModel.splice(dragIndex, 1)[0];
                        sourceModel.splice(dropIndex, 0, item);
                        // this was true before we cloned and updated sourceModel,
                        // but targetModel still has the old value
                        targetModel = sourceModel;
                    }
                    else {
                        /** @type {?} */
                        var isCopying = dragElm !== dropElm;
                        item = sourceModel[dragIndex];
                        if (isCopying) {
                            if (!options.copyItem) {
                                throw new Error("If you have enabled `copy` on a group, you must provide a `copyItem` function.");
                            }
                            item = options.copyItem(item);
                        }
                        if (!isCopying) {
                            sourceModel = sourceModel.slice(0);
                            sourceModel.splice(dragIndex, 1);
                        }
                        targetModel = targetModel.slice(0);
                        targetModel.splice(dropIndex, 0, item);
                        if (isCopying) {
                            try {
                                target.removeChild(dropElm);
                            }
                            catch (e) { }
                        }
                    }
                    _this.dispatch$.next({
                        event: EventTypes.DropModel,
                        name: name,
                        args: [dropElm, target, source, sibling, item, sourceModel, targetModel, dragIndex, dropIndex]
                    });
                });
            };
        /**
         * @param {?} group
         * @return {?}
         */
        DragulaService.prototype.setupEvents = /**
         * @param {?} group
         * @return {?}
         */
            function (group) {
                var _this = this;
                if (group.initEvents) {
                    return;
                }
                group.initEvents = true;
                /** @type {?} */
                var name = group.name;
                /** @type {?} */
                var emitter = function (event) {
                    group.drake.on(event, function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        _this.dispatch$.next({ event: event, name: name, args: args });
                    });
                };
                AllEvents.forEach(emitter);
            };
        /**
         * @param {?} child
         * @param {?} parent
         * @return {?}
         */
        DragulaService.prototype.domIndexOf = /**
         * @param {?} child
         * @param {?} parent
         * @return {?}
         */
            function (child, parent) {
                return Array.prototype.indexOf.call(parent.children, child);
            };
        DragulaService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DragulaService.ctorParameters = function () {
            return [
                { type: DrakeFactory, decorators: [{ type: core.Optional }] }
            ];
        };
        return DragulaService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DragulaDirective = (function () {
        function DragulaDirective(el, dragulaService) {
            this.el = el;
            this.dragulaService = dragulaService;
            this.dragulaModelChange = new core.EventEmitter();
        }
        Object.defineProperty(DragulaDirective.prototype, "container", {
            get: /**
             * @return {?}
             */ function () {
                return this.el && this.el.nativeElement;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        DragulaDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes && changes.dragula) {
                    var _a = changes.dragula, prev = _a.previousValue, current = _a.currentValue, firstChange = _a.firstChange;
                    /** @type {?} */
                    var hadPreviousValue = !!prev;
                    /** @type {?} */
                    var hasNewValue = !!current;
                    // something -> null       =>  teardown only
                    // something -> something  =>  teardown, then setup
                    //      null -> something  =>  setup only
                    //
                    //      null -> null (precluded by fact of change being present)
                    if (hadPreviousValue) {
                        this.teardown(prev);
                    }
                    if (hasNewValue) {
                        this.setup();
                    }
                }
                else if (changes && changes.dragulaModel) {
                    var _b = changes.dragulaModel, prev = _b.previousValue, current = _b.currentValue, firstChange = _b.firstChange;
                    var drake = this.group.drake;
                    if (this.dragula && drake) {
                        drake.models = drake.models || [];
                        /** @type {?} */
                        var prevIndex = drake.models.indexOf(prev);
                        if (prevIndex !== -1) {
                            // delete the previous
                            drake.models.splice(prevIndex, 1);
                            // maybe insert a new one at the same spot
                            if (!!current) {
                                drake.models.splice(prevIndex, 0, current);
                            }
                        }
                        else if (!!current) {
                            // no previous one to remove; just push this one.
                            drake.models.push(current);
                        }
                    }
                }
            };
        /**
         * @return {?}
         */
        DragulaDirective.prototype.setup = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var checkModel = function (group) {
                    if (_this.dragulaModel) {
                        if (group.drake.models) {
                            group.drake.models.push(_this.dragulaModel);
                        }
                        else {
                            group.drake.models = [_this.dragulaModel];
                        }
                    }
                };
                /** @type {?} */
                var group = this.dragulaService.find(this.dragula);
                if (!group) {
                    /** @type {?} */
                    var options = {};
                    group = this.dragulaService.createGroup(this.dragula, options);
                }
                // ensure model and container element are pushed
                checkModel(group);
                group.drake.containers.push(this.container);
                this.subscribe(this.dragula);
                this.group = group;
            };
        /**
         * @param {?} name
         * @return {?}
         */
        DragulaDirective.prototype.subscribe = /**
         * @param {?} name
         * @return {?}
         */
            function (name) {
                var _this = this;
                this.subs = new rxjs.Subscription();
                this.subs.add(this.dragulaService
                    .dropModel(name)
                    .subscribe(function (_a) {
                    var source = _a.source, target = _a.target, sourceModel = _a.sourceModel, targetModel = _a.targetModel;
                    if (source === _this.el.nativeElement) {
                        _this.dragulaModelChange.emit(sourceModel);
                    }
                    else if (target === _this.el.nativeElement) {
                        _this.dragulaModelChange.emit(targetModel);
                    }
                }));
                this.subs.add(this.dragulaService
                    .removeModel(name)
                    .subscribe(function (_a) {
                    var source = _a.source, sourceModel = _a.sourceModel;
                    if (source === _this.el.nativeElement) {
                        _this.dragulaModelChange.emit(sourceModel);
                    }
                }));
            };
        /**
         * @param {?} groupName
         * @return {?}
         */
        DragulaDirective.prototype.teardown = /**
         * @param {?} groupName
         * @return {?}
         */
            function (groupName) {
                if (this.subs) {
                    this.subs.unsubscribe();
                }
                /** @type {?} */
                var group = this.dragulaService.find(groupName);
                if (group) {
                    /** @type {?} */
                    var itemToRemove = group.drake.containers.indexOf(this.el.nativeElement);
                    if (itemToRemove !== -1) {
                        group.drake.containers.splice(itemToRemove, 1);
                    }
                    if (this.dragulaModel && group.drake && group.drake.models) {
                        /** @type {?} */
                        var modelIndex = group.drake.models.indexOf(this.dragulaModel);
                        if (modelIndex !== -1) {
                            group.drake.models.splice(modelIndex, 1);
                        }
                    }
                }
            };
        /**
         * @return {?}
         */
        DragulaDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.teardown(this.dragula);
            };
        DragulaDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[dragula]' },] }
        ];
        /** @nocollapse */
        DragulaDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: DragulaService }
            ];
        };
        DragulaDirective.propDecorators = {
            dragula: [{ type: core.Input }],
            dragulaModel: [{ type: core.Input }],
            dragulaModelChange: [{ type: core.Output }]
        };
        return DragulaDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DragulaModule = (function () {
        function DragulaModule() {
        }
        /**
         * @return {?}
         */
        DragulaModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: DragulaModule,
                    providers: [DragulaService]
                };
            };
        DragulaModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [DragulaDirective],
                        declarations: [DragulaDirective],
                    },] }
        ];
        return DragulaModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var MockDrakeFactory = new DrakeFactory(function (containers, options) {
        return new MockDrake(containers, options);
    });
    /**
     * You can use MockDrake to simulate Drake events.
     *
     * The three methods that actually do anything are `on(event, listener)`,
     * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
     * events, and if you injected MockDrake properly with MockDrakeFactory or
     * mocked the DragulaService.find() method, then you can make ng2-dragula think
     * drags and drops are happening.
     *
     * Caveats:
     *
     * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
     * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
     *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
     * 3. None of the other methods do anything.
     *    That's ok, because ng2-dragula doesn't use them.
     */
    var /**
     * You can use MockDrake to simulate Drake events.
     *
     * The three methods that actually do anything are `on(event, listener)`,
     * `destroy()`, and a new method, `emit()`. Use `emit()` to manually emit Drake
     * events, and if you injected MockDrake properly with MockDrakeFactory or
     * mocked the DragulaService.find() method, then you can make ng2-dragula think
     * drags and drops are happening.
     *
     * Caveats:
     *
     * 1. YOU MUST MAKE THE DOM CHANGES YOURSELF.
     * 2. REPEAT: YOU MUST MAKE THE DOM CHANGES YOURSELF.
     *    That means `source.removeChild(el)`, and `target.insertBefore(el)`.
     * 3. None of the other methods do anything.
     *    That's ok, because ng2-dragula doesn't use them.
     */ MockDrake = (function () {
        /**
         * @param containers A list of container elements.
         * @param options These will NOT be used. At all.
         * @param models Nonstandard, but useful for testing using `new MockDrake()` directly.
         *               Note, default value is undefined, like a real Drake. Don't change that.
         */
        function MockDrake(containers, options, models) {
            if (containers === void 0) {
                containers = [];
            }
            if (options === void 0) {
                options = {};
            }
            this.containers = containers;
            this.options = options;
            this.models = models;
            /* Doesn't represent anything meaningful. */
            this.dragging = false;
            this.emitter$ = new rxjs.Subject();
            this.subs = new rxjs.Subscription();
        }
        /* Does nothing useful. */
        /**
         * @param {?} item
         * @return {?}
         */
        MockDrake.prototype.start = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                this.dragging = true;
            };
        /* Does nothing useful. */
        /**
         * @return {?}
         */
        MockDrake.prototype.end = /**
         * @return {?}
         */
            function () {
                this.dragging = false;
            };
        /**
         * @param {?=} revert
         * @return {?}
         */
        MockDrake.prototype.cancel = /**
         * @param {?=} revert
         * @return {?}
         */
            function (revert) {
                this.dragging = false;
            };
        /* Does nothing useful. */
        /**
         * @return {?}
         */
        MockDrake.prototype.remove = /**
         * @return {?}
         */
            function () {
                this.dragging = false;
            };
        /**
         * @param {?} event
         * @param {?} callback
         * @return {?}
         */
        MockDrake.prototype.on = /**
         * @param {?} event
         * @param {?} callback
         * @return {?}
         */
            function (event, callback) {
                this.subs.add(this.emitter$
                    .pipe(operators.filter(function (_a) {
                    var eventType = _a.eventType;
                    return eventType === event;
                }))
                    .subscribe(function (_a) {
                    var args = _a.args;
                    callback.apply(void 0, __spread(args));
                }));
            };
        /**
         * @return {?}
         */
        MockDrake.prototype.destroy = /**
         * @return {?}
         */
            function () {
                this.subs.unsubscribe();
            };
        /**
         * This is the most useful method. You can use it to manually fire events that would normally
         * be fired by a real drake.
         *
         * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
         * DragulaService uses to implement [dragulaModel].
         *
         * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
         *
         * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
         */
        /**
         * This is the most useful method. You can use it to manually fire events that would normally
         * be fired by a real drake.
         *
         * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
         * DragulaService uses to implement [dragulaModel].
         *
         * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
         *
         * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
         * @param {?} eventType
         * @param {...?} args
         * @return {?}
         */
        MockDrake.prototype.emit = /**
         * This is the most useful method. You can use it to manually fire events that would normally
         * be fired by a real drake.
         *
         * You're likely most interested in firing `drag`, `remove` and `drop`, the three events
         * DragulaService uses to implement [dragulaModel].
         *
         * See https://github.com/bevacqua/dragula#drakeon-events for what you should emit (and in what order).
         *
         * (Note also, firing dropModel and removeModel won't work. You would have to mock DragulaService for that.)
         * @param {?} eventType
         * @param {...?} args
         * @return {?}
         */
            function (eventType) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                this.emitter$.next({ eventType: eventType, args: args });
            };
        return MockDrake;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.DragulaDirective = DragulaDirective;
    exports.DragulaService = DragulaService;
    exports.DragulaModule = DragulaModule;
    exports.dragula = dragula;
    exports.DrakeFactory = DrakeFactory;
    exports.Group = Group;
    exports.EventTypes = EventTypes;
    exports.MockDrake = MockDrake;
    exports.MockDrakeFactory = MockDrakeFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJtZW1vLW5nMi1kcmFndWxhLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL0BzdXBlcm1lbW8vbmcyLWRyYWd1bGEvR3JvdXAudHMiLCJuZzovL0BzdXBlcm1lbW8vbmcyLWRyYWd1bGEvRXZlbnRUeXBlcy50cyIsIm5nOi8vQHN1cGVybWVtby9uZzItZHJhZ3VsYS9EcmFrZUZhY3RvcnkudHMiLCJuZzovL0BzdXBlcm1lbW8vbmcyLWRyYWd1bGEvY29tcG9uZW50cy9kcmFndWxhLnNlcnZpY2UudHMiLCJuZzovL0BzdXBlcm1lbW8vbmcyLWRyYWd1bGEvY29tcG9uZW50cy9kcmFndWxhLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHN1cGVybWVtby9uZzItZHJhZ3VsYS9jb21wb25lbnRzL2RyYWd1bGEubW9kdWxlLnRzIiwibmc6Ly9Ac3VwZXJtZW1vL25nMi1kcmFndWxhL01vY2tEcmFrZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gXCIuL0RyYWtlV2l0aE1vZGVsc1wiO1xuaW1wb3J0IHsgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tIFwiLi9EcmFndWxhT3B0aW9uc1wiO1xuXG5leHBvcnQgY2xhc3MgR3JvdXAge1xuICBwdWJsaWMgaW5pdEV2ZW50czogYm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxuICAgIHB1YmxpYyBkcmFrZTogRHJha2VXaXRoTW9kZWxzLFxuICAgIHB1YmxpYyBvcHRpb25zOiBEcmFndWxhT3B0aW9uc1xuICApIHt9XG59XG4iLCJleHBvcnQgZW51bSBFdmVudFR5cGVzIHtcbiAgICBDYW5jZWwgPSBcImNhbmNlbFwiLFxuICAgIENsb25lZCA9IFwiY2xvbmVkXCIsXG4gICAgRHJhZyA9IFwiZHJhZ1wiLFxuICAgIERyYWdFbmQgPSBcImRyYWdlbmRcIixcbiAgICBEcm9wID0gXCJkcm9wXCIsXG4gICAgT3V0ID0gXCJvdXRcIixcbiAgICBPdmVyID0gXCJvdmVyXCIsXG4gICAgUmVtb3ZlID0gXCJyZW1vdmVcIixcbiAgICBTaGFkb3cgPSBcInNoYWRvd1wiLFxuICAgIERyb3BNb2RlbCA9IFwiZHJvcE1vZGVsXCIsXG4gICAgUmVtb3ZlTW9kZWwgPSBcInJlbW92ZU1vZGVsXCIsXG59XG5cbmV4cG9ydCBjb25zdCBBbGxFdmVudHM6IEV2ZW50VHlwZXNbXSA9IE9iamVjdC5rZXlzKEV2ZW50VHlwZXMpLm1hcChrID0+IEV2ZW50VHlwZXNbayBhcyBhbnldIGFzIEV2ZW50VHlwZXMpO1xuXG5cbiIsImltcG9ydCB7IERyYWd1bGFPcHRpb25zIH0gZnJvbSAnLi9EcmFndWxhT3B0aW9ucyc7XG5pbXBvcnQgeyBEcmFrZVdpdGhNb2RlbHMgfSBmcm9tICcuL0RyYWtlV2l0aE1vZGVscyc7XG5pbXBvcnQgKiBhcyBkcmFndWxhRXhwdCBmcm9tICdkcmFndWxhJztcbmV4cG9ydCBjb25zdCBkcmFndWxhOiAoY29udGFpbmVycz86IGFueSwgb3B0aW9ucz86IGFueSkgPT4gYW55ID0gKGRyYWd1bGFFeHB0IGFzIGFueSkuZGVmYXVsdCB8fCBkcmFndWxhRXhwdDtcblxuZXhwb3J0IHR5cGUgRHJha2VCdWlsZGVyID0gKGNvbnRhaW5lcnM6IGFueVtdLCBvcHRpb25zOiBEcmFndWxhT3B0aW9ucykgPT4gRHJha2VXaXRoTW9kZWxzO1xuXG5leHBvcnQgY2xhc3MgRHJha2VGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBidWlsZDogRHJha2VCdWlsZGVyID0gZHJhZ3VsYSkge31cbn1cblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAnO1xuaW1wb3J0IHsgRHJhZ3VsYU9wdGlvbnMgfSBmcm9tICcuLi9EcmFndWxhT3B0aW9ucyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV2ZW50VHlwZXMsIEFsbEV2ZW50cyB9IGZyb20gJy4uL0V2ZW50VHlwZXMnO1xuaW1wb3J0IHsgRHJha2VGYWN0b3J5IH0gZnJvbSAnLi4vRHJha2VGYWN0b3J5JztcblxudHlwZSBGaWx0ZXJQcm9qZWN0b3I8VCBleHRlbmRzIHsgbmFtZTogc3RyaW5nOyB9PiA9IChuYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKSA9PiBUO1xudHlwZSBEaXNwYXRjaCA9IHsgZXZlbnQ6IEV2ZW50VHlwZXM7IG5hbWU6IHN0cmluZzsgYXJnczogYW55W107IH07XG5cbmNvbnN0IGZpbHRlckV2ZW50ID0gPFQgZXh0ZW5kcyB7IG5hbWU6IHN0cmluZzsgfT4oXG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlcyxcbiAgZmlsdGVyRHJhZ1R5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgcHJvamVjdG9yOiBGaWx0ZXJQcm9qZWN0b3I8VD5cbikgPT4gKGlucHV0OiBPYnNlcnZhYmxlPERpc3BhdGNoPik6IE9ic2VydmFibGU8VD4gPT4ge1xuICByZXR1cm4gaW5wdXQucGlwZShcbiAgICBmaWx0ZXIoKHsgZXZlbnQsIG5hbWUgfSkgPT4ge1xuICAgICAgcmV0dXJuIGV2ZW50ID09PSBldmVudFR5cGVcbiAgICAgICAgJiYgKGZpbHRlckRyYWdUeXBlID09PSB1bmRlZmluZWQgfHwgbmFtZSA9PT0gZmlsdGVyRHJhZ1R5cGUpO1xuICAgIH0pLFxuICAgIG1hcCgoeyBuYW1lLCBhcmdzIH0pID0+IHByb2plY3RvcihuYW1lLCBhcmdzKSlcbiAgKTtcbn1cblxuY29uc3QgZWxDb250YWluZXJTb3VyY2VQcm9qZWN0b3IgPVxuICAobmFtZTogc3RyaW5nLCBbZWwsIGNvbnRhaW5lciwgc291cmNlXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnRdKSA9PlxuICAgICh7IG5hbWUsIGVsLCBjb250YWluZXIsIHNvdXJjZSB9KTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERyYWd1bGFTZXJ2aWNlIHtcblxuICAvKiBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYSNkcmFrZW9uLWV2ZW50cyAqL1xuXG4gIHByaXZhdGUgZGlzcGF0Y2gkID0gbmV3IFN1YmplY3Q8RGlzcGF0Y2g+KCk7XG5cbiAgcHVibGljIGRyYWcgPSAoZ3JvdXBOYW1lPzogc3RyaW5nKSA9PiB0aGlzLmRpc3BhdGNoJC5waXBlKFxuICAgIGZpbHRlckV2ZW50KFxuICAgICAgRXZlbnRUeXBlcy5EcmFnLFxuICAgICAgZ3JvdXBOYW1lLFxuICAgICAgKG5hbWUsIFtlbCwgc291cmNlXTogW0VsZW1lbnQsIEVsZW1lbnRdKSA9PiAoeyBuYW1lLCBlbCwgc291cmNlIH0pXG4gICAgKVxuICApO1xuXG4gIHB1YmxpYyBkcmFnZW5kID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICBmaWx0ZXJFdmVudChcbiAgICAgIEV2ZW50VHlwZXMuRHJhZ0VuZCxcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIChuYW1lLCBbZWxdOiBbRWxlbWVudF0pID0+ICh7IG5hbWUsIGVsIH0pXG4gICAgKVxuICApO1xuXG4gIHB1YmxpYyBkcm9wID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICBmaWx0ZXJFdmVudChcbiAgICAgIEV2ZW50VHlwZXMuRHJvcCxcbiAgICAgIGdyb3VwTmFtZSxcbiAgICAgIChuYW1lLCBbXG4gICAgICAgIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZ1xuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnRdKSA9PiB7XG4gICAgICAgIHJldHVybiB7IG5hbWUsIGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZyB9O1xuICAgICAgfSlcbiAgKTtcblxuICBwcml2YXRlIGVsQ29udGFpbmVyU291cmNlID1cbiAgICAoZXZlbnRUeXBlOiBFdmVudFR5cGVzKSA9PlxuICAgICAgKGdyb3VwTmFtZT86IHN0cmluZykgPT5cbiAgICAgICAgdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICAgICAgICBmaWx0ZXJFdmVudChldmVudFR5cGUsIGdyb3VwTmFtZSwgZWxDb250YWluZXJTb3VyY2VQcm9qZWN0b3IpXG4gICAgICAgICk7XG5cbiAgcHVibGljIGNhbmNlbCA9IHRoaXMuZWxDb250YWluZXJTb3VyY2UoRXZlbnRUeXBlcy5DYW5jZWwpO1xuICBwdWJsaWMgcmVtb3ZlID0gdGhpcy5lbENvbnRhaW5lclNvdXJjZShFdmVudFR5cGVzLlJlbW92ZSk7XG4gIHB1YmxpYyBzaGFkb3cgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuU2hhZG93KTtcbiAgcHVibGljIG92ZXIgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuT3Zlcik7XG4gIHB1YmxpYyBvdXQgPSB0aGlzLmVsQ29udGFpbmVyU291cmNlKEV2ZW50VHlwZXMuT3V0KTtcblxuICBwdWJsaWMgY2xvbmVkID0gKGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICBmaWx0ZXJFdmVudChcbiAgICAgIEV2ZW50VHlwZXMuQ2xvbmVkLFxuICAgICAgZ3JvdXBOYW1lLFxuICAgICAgKG5hbWUsIFtcbiAgICAgICAgY2xvbmUsIG9yaWdpbmFsLCBjbG9uZVR5cGVcbiAgICAgIF06IFtFbGVtZW50LCBFbGVtZW50LCAnbWlycm9yJyB8ICdjb3B5J10pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgY2xvbmUsIG9yaWdpbmFsLCBjbG9uZVR5cGUgfVxuICAgICAgfSlcbiAgKTtcblxuICBwdWJsaWMgZHJvcE1vZGVsID0gPFQgPSBhbnk+KGdyb3VwTmFtZT86IHN0cmluZykgPT4gdGhpcy5kaXNwYXRjaCQucGlwZShcbiAgICBmaWx0ZXJFdmVudChcbiAgICAgIEV2ZW50VHlwZXMuRHJvcE1vZGVsLFxuICAgICAgZ3JvdXBOYW1lLFxuICAgICAgKG5hbWUsIFtcbiAgICAgICAgZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nLCBpdGVtLCBzb3VyY2VNb2RlbCwgdGFyZ2V0TW9kZWwsIHNvdXJjZUluZGV4LCB0YXJnZXRJbmRleFxuICAgICAgXTogW0VsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIEVsZW1lbnQsIFQsIFRbXSwgVFtdLCBudW1iZXIsIG51bWJlcl0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nLCBpdGVtLCBzb3VyY2VNb2RlbCwgdGFyZ2V0TW9kZWwsIHNvdXJjZUluZGV4LCB0YXJnZXRJbmRleCB9XG4gICAgICB9KVxuICApO1xuXG4gIHB1YmxpYyByZW1vdmVNb2RlbCA9IDxUID0gYW55Pihncm91cE5hbWU/OiBzdHJpbmcpID0+IHRoaXMuZGlzcGF0Y2gkLnBpcGUoXG4gICAgZmlsdGVyRXZlbnQoXG4gICAgICBFdmVudFR5cGVzLlJlbW92ZU1vZGVsLFxuICAgICAgZ3JvdXBOYW1lLFxuICAgICAgKG5hbWUsIFtcbiAgICAgICAgZWwsIGNvbnRhaW5lciwgc291cmNlLCBpdGVtLCBzb3VyY2VNb2RlbCwgc291cmNlSW5kZXhcbiAgICAgIF06IFtFbGVtZW50LCBFbGVtZW50LCBFbGVtZW50LCBULCBUW10sIG51bWJlcl0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgZWwsIGNvbnRhaW5lciwgc291cmNlLCBpdGVtLCBzb3VyY2VNb2RlbCwgc291cmNlSW5kZXggfVxuICAgICAgfVxuICAgIClcbiAgKTtcblxuICBwcml2YXRlIGdyb3VwczogeyBbazogc3RyaW5nXTogR3JvdXAgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgZHJha2VGYWN0b3J5OiBEcmFrZUZhY3RvcnkgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuZHJha2VGYWN0b3J5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmRyYWtlRmFjdG9yeSA9IG5ldyBEcmFrZUZhY3RvcnkoKTtcbiAgICB9XG4gIH1cblxuICAvKiogUHVibGljIG1haW5seSBmb3IgdGVzdGluZyBwdXJwb3Nlcy4gUHJlZmVyIGBjcmVhdGVHcm91cCgpYC4gKi9cbiAgcHVibGljIGFkZChncm91cDogR3JvdXApOiBHcm91cCB7XG4gICAgbGV0IGV4aXN0aW5nR3JvdXAgPSB0aGlzLmZpbmQoZ3JvdXAubmFtZSk7XG4gICAgaWYgKGV4aXN0aW5nR3JvdXApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignR3JvdXAgbmFtZWQ6IFwiJyArIGdyb3VwLm5hbWUgKyAnXCIgYWxyZWFkeSBleGlzdHMuJyk7XG4gICAgfVxuICAgIHRoaXMuZ3JvdXBzW2dyb3VwLm5hbWVdID0gZ3JvdXA7XG4gICAgdGhpcy5oYW5kbGVNb2RlbHMoZ3JvdXApO1xuICAgIHRoaXMuc2V0dXBFdmVudHMoZ3JvdXApO1xuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kKG5hbWU6IHN0cmluZyk6IEdyb3VwIHtcbiAgICByZXR1cm4gdGhpcy5ncm91cHNbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLmZpbmQobmFtZSk7XG4gICAgaWYgKCFncm91cCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBncm91cC5kcmFrZSAmJiBncm91cC5kcmFrZS5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMuZ3JvdXBzW25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBncm91cCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogTm90ZTogZm9ybWVybHkga25vd24gYXMgYHNldE9wdGlvbnNgXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlR3JvdXA8VCA9IGFueT4obmFtZTogc3RyaW5nLCBvcHRpb25zOiBEcmFndWxhT3B0aW9uczxUPik6IEdyb3VwIHtcbiAgICBjb25zb2xlLmxvZyhuYW1lLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5hZGQobmV3IEdyb3VwKFxuICAgICAgbmFtZSxcbiAgICAgIHRoaXMuZHJha2VGYWN0b3J5LmJ1aWxkKFtdLCBvcHRpb25zKSxcbiAgICAgIG9wdGlvbnNcbiAgICApKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlTW9kZWxzKHsgbmFtZSwgZHJha2UsIG9wdGlvbnMgfTogR3JvdXApOiB2b2lkIHtcbiAgICBsZXQgZHJhZ0VsbTogYW55O1xuICAgIGxldCBkcmFnSW5kZXg6IG51bWJlcjtcbiAgICBsZXQgZHJvcEluZGV4OiBudW1iZXI7XG4gICAgZHJha2Uub24oJ3JlbW92ZScsIChlbDogYW55LCBjb250YWluZXI6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICghZHJha2UubW9kZWxzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBzb3VyY2VNb2RlbCA9IGRyYWtlLm1vZGVsc1tkcmFrZS5jb250YWluZXJzLmluZGV4T2Yoc291cmNlKV07XG4gICAgICBzb3VyY2VNb2RlbCA9IHNvdXJjZU1vZGVsLnNsaWNlKDApOyAvLyBjbG9uZSBpdFxuICAgICAgY29uc3QgaXRlbSA9IHNvdXJjZU1vZGVsLnNwbGljZShkcmFnSW5kZXgsIDEpWzBdO1xuICAgICAgLy8gY29uc29sZS5sb2coJ1JFTU9WRScpO1xuICAgICAgLy8gY29uc29sZS5sb2coc291cmNlTW9kZWwpO1xuICAgICAgdGhpcy5kaXNwYXRjaCQubmV4dCh7XG4gICAgICAgIGV2ZW50OiBFdmVudFR5cGVzLlJlbW92ZU1vZGVsLFxuICAgICAgICBuYW1lLFxuICAgICAgICBhcmdzOiBbZWwsIGNvbnRhaW5lciwgc291cmNlLCBpdGVtLCBzb3VyY2VNb2RlbCwgZHJhZ0luZGV4XVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZHJha2Uub24oJ2RyYWcnLCAoZWw6IGFueSwgc291cmNlOiBhbnkpID0+IHtcbiAgICAgIGlmICghZHJha2UubW9kZWxzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGRyYWdFbG0gPSBlbDtcbiAgICAgIGRyYWdJbmRleCA9IHRoaXMuZG9tSW5kZXhPZihlbCwgc291cmNlKTtcbiAgICB9KTtcbiAgICBkcmFrZS5vbignZHJvcCcsIChkcm9wRWxtOiBhbnksIHRhcmdldDogRWxlbWVudCwgc291cmNlOiBFbGVtZW50LCBzaWJsaW5nPzogRWxlbWVudCkgPT4ge1xuICAgICAgaWYgKCFkcmFrZS5tb2RlbHMgfHwgIXRhcmdldCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkcm9wSW5kZXggPSB0aGlzLmRvbUluZGV4T2YoZHJvcEVsbSwgdGFyZ2V0KTtcbiAgICAgIGxldCBzb3VyY2VNb2RlbCA9IGRyYWtlLm1vZGVsc1tkcmFrZS5jb250YWluZXJzLmluZGV4T2Yoc291cmNlKV07XG4gICAgICBsZXQgdGFyZ2V0TW9kZWwgPSBkcmFrZS5tb2RlbHNbZHJha2UuY29udGFpbmVycy5pbmRleE9mKHRhcmdldCldO1xuICAgICAgLy8gY29uc29sZS5sb2coJ0RST1AnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNvdXJjZU1vZGVsKTtcbiAgICAgIGxldCBpdGVtOiBhbnk7XG4gICAgICBpZiAodGFyZ2V0ID09PSBzb3VyY2UpIHtcbiAgICAgICAgc291cmNlTW9kZWwgPSBzb3VyY2VNb2RlbC5zbGljZSgwKVxuICAgICAgICBpdGVtID0gc291cmNlTW9kZWwuc3BsaWNlKGRyYWdJbmRleCwgMSlbMF07XG4gICAgICAgIHNvdXJjZU1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIGl0ZW0pO1xuICAgICAgICAvLyB0aGlzIHdhcyB0cnVlIGJlZm9yZSB3ZSBjbG9uZWQgYW5kIHVwZGF0ZWQgc291cmNlTW9kZWwsXG4gICAgICAgIC8vIGJ1dCB0YXJnZXRNb2RlbCBzdGlsbCBoYXMgdGhlIG9sZCB2YWx1ZVxuICAgICAgICB0YXJnZXRNb2RlbCA9IHNvdXJjZU1vZGVsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGlzQ29weWluZyA9IGRyYWdFbG0gIT09IGRyb3BFbG07XG4gICAgICAgIGl0ZW0gPSBzb3VyY2VNb2RlbFtkcmFnSW5kZXhdO1xuICAgICAgICBpZiAoaXNDb3B5aW5nKSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLmNvcHlJdGVtKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJZiB5b3UgaGF2ZSBlbmFibGVkIGBjb3B5YCBvbiBhIGdyb3VwLCB5b3UgbXVzdCBwcm92aWRlIGEgYGNvcHlJdGVtYCBmdW5jdGlvbi5cIilcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbSA9IG9wdGlvbnMuY29weUl0ZW0oaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzQ29weWluZykge1xuICAgICAgICAgIHNvdXJjZU1vZGVsID0gc291cmNlTW9kZWwuc2xpY2UoMClcbiAgICAgICAgICBzb3VyY2VNb2RlbC5zcGxpY2UoZHJhZ0luZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXRNb2RlbCA9IHRhcmdldE1vZGVsLnNsaWNlKDApXG4gICAgICAgIHRhcmdldE1vZGVsLnNwbGljZShkcm9wSW5kZXgsIDAsIGl0ZW0pO1xuICAgICAgICBpZiAoaXNDb3B5aW5nKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDaGlsZChkcm9wRWxtKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5kaXNwYXRjaCQubmV4dCh7XG4gICAgICAgIGV2ZW50OiBFdmVudFR5cGVzLkRyb3BNb2RlbCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYXJnczogW2Ryb3BFbG0sIHRhcmdldCwgc291cmNlLCBzaWJsaW5nLCBpdGVtLCBzb3VyY2VNb2RlbCwgdGFyZ2V0TW9kZWwsIGRyYWdJbmRleCwgZHJvcEluZGV4XVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwRXZlbnRzKGdyb3VwOiBHcm91cCk6IHZvaWQge1xuICAgIGlmIChncm91cC5pbml0RXZlbnRzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGdyb3VwLmluaXRFdmVudHMgPSB0cnVlO1xuICAgIGNvbnN0IG5hbWUgPSBncm91cC5uYW1lO1xuICAgIGxldCB0aGF0OiBhbnkgPSB0aGlzO1xuICAgIGxldCBlbWl0dGVyID0gKGV2ZW50OiBFdmVudFR5cGVzKSA9PiB7XG4gICAgICBncm91cC5kcmFrZS5vbihldmVudCwgKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2gkLm5leHQoeyBldmVudCwgbmFtZSwgYXJncyB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgQWxsRXZlbnRzLmZvckVhY2goZW1pdHRlcik7XG4gIH1cblxuICBwcml2YXRlIGRvbUluZGV4T2YoY2hpbGQ6IGFueSwgcGFyZW50OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHBhcmVudC5jaGlsZHJlbiwgY2hpbGQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcmFndWxhU2VydmljZSB9IGZyb20gJy4vZHJhZ3VsYS5zZXJ2aWNlJztcbmltcG9ydCB7IERyYWtlV2l0aE1vZGVscyB9IGZyb20gJy4uL0RyYWtlV2l0aE1vZGVscyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tkcmFndWxhXSd9KVxuZXhwb3J0IGNsYXNzIERyYWd1bGFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHB1YmxpYyBkcmFndWxhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBkcmFndWxhTW9kZWw6IGFueVtdO1xuICBAT3V0cHV0KCkgcHVibGljIGRyYWd1bGFNb2RlbENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgcHJpdmF0ZSBzdWJzOiBTdWJzY3JpcHRpb247XG5cbiAgcHJpdmF0ZSBnZXQgY29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbiAgcHJpdmF0ZSBncm91cDogR3JvdXA7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgZHJhZ3VsYVNlcnZpY2U6IERyYWd1bGFTZXJ2aWNlKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczoge2RyYWd1bGE/OiBTaW1wbGVDaGFuZ2UsIGRyYWd1bGFNb2RlbD86IFNpbXBsZUNoYW5nZX0pOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzLmRyYWd1bGEpIHtcbiAgICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZTogcHJldiwgY3VycmVudFZhbHVlOiBjdXJyZW50LCBmaXJzdENoYW5nZSB9ID0gY2hhbmdlcy5kcmFndWxhO1xuICAgICAgbGV0IGhhZFByZXZpb3VzVmFsdWUgPSAhIXByZXY7XG4gICAgICBsZXQgaGFzTmV3VmFsdWUgPSAhIWN1cnJlbnQ7XG4gICAgICAvLyBzb21ldGhpbmcgLT4gbnVsbCAgICAgICA9PiAgdGVhcmRvd24gb25seVxuICAgICAgLy8gc29tZXRoaW5nIC0+IHNvbWV0aGluZyAgPT4gIHRlYXJkb3duLCB0aGVuIHNldHVwXG4gICAgICAvLyAgICAgIG51bGwgLT4gc29tZXRoaW5nICA9PiAgc2V0dXAgb25seVxuICAgICAgLy9cbiAgICAgIC8vICAgICAgbnVsbCAtPiBudWxsIChwcmVjbHVkZWQgYnkgZmFjdCBvZiBjaGFuZ2UgYmVpbmcgcHJlc2VudClcbiAgICAgIGlmIChoYWRQcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIHRoaXMudGVhcmRvd24ocHJldik7XG4gICAgICB9XG4gICAgICBpZiAoaGFzTmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzLmRyYWd1bGFNb2RlbCkge1xuICAgICAgLy8gdGhpcyBjb2RlIG9ubHkgcnVucyB3aGVuIHlvdSdyZSBub3QgY2hhbmdpbmcgdGhlIGdyb3VwIG5hbWVcbiAgICAgIC8vIGJlY2F1c2UgaWYgeW91J3JlIGNoYW5naW5nIHRoZSBncm91cCBuYW1lLCB5b3UnbGwgYmUgZG9pbmcgc2V0dXAgb3IgdGVhcmRvd25cbiAgICAgIC8vIGl0IGFsc28gb25seSBydW5zIGlmIHRoZXJlIGlzIGEgZ3JvdXAgbmFtZSB0byBhdHRhY2ggdG8uXG4gICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWU6IHByZXYsIGN1cnJlbnRWYWx1ZTogY3VycmVudCwgZmlyc3RDaGFuZ2UgfSA9IGNoYW5nZXMuZHJhZ3VsYU1vZGVsO1xuICAgICAgY29uc3QgeyBkcmFrZSB9ID0gdGhpcy5ncm91cDtcbiAgICAgIGlmICh0aGlzLmRyYWd1bGEgJiYgZHJha2UpIHtcbiAgICAgICAgZHJha2UubW9kZWxzID0gZHJha2UubW9kZWxzIHx8IFtdO1xuICAgICAgICBsZXQgcHJldkluZGV4ID0gZHJha2UubW9kZWxzLmluZGV4T2YocHJldik7XG4gICAgICAgIGlmIChwcmV2SW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgLy8gZGVsZXRlIHRoZSBwcmV2aW91c1xuICAgICAgICAgIGRyYWtlLm1vZGVscy5zcGxpY2UocHJldkluZGV4LCAxKTtcbiAgICAgICAgICAvLyBtYXliZSBpbnNlcnQgYSBuZXcgb25lIGF0IHRoZSBzYW1lIHNwb3RcbiAgICAgICAgICBpZiAoISFjdXJyZW50KSB7XG4gICAgICAgICAgICBkcmFrZS5tb2RlbHMuc3BsaWNlKHByZXZJbmRleCwgMCwgY3VycmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEhY3VycmVudCkge1xuICAgICAgICAgIC8vIG5vIHByZXZpb3VzIG9uZSB0byByZW1vdmU7IGp1c3QgcHVzaCB0aGlzIG9uZS5cbiAgICAgICAgICBkcmFrZS5tb2RlbHMucHVzaChjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGNhbGwgbmdPbkluaXQgJ3NldHVwJyBiZWNhdXNlIHdlIHdhbnQgdG8gY2FsbCBpdCBpbiBuZ09uQ2hhbmdlc1xuICAvLyBhbmQgaXQgd291bGQgb3RoZXJ3aXNlIHJ1biB0d2ljZVxuICBwdWJsaWMgc2V0dXAoKTogdm9pZCB7XG4gICAgbGV0IGNoZWNrTW9kZWwgPSAoZ3JvdXA6IEdyb3VwKSA9PiB7XG4gICAgICBpZiAodGhpcy5kcmFndWxhTW9kZWwpIHtcbiAgICAgICAgaWYgKGdyb3VwLmRyYWtlLm1vZGVscykge1xuICAgICAgICAgIGdyb3VwLmRyYWtlLm1vZGVscy5wdXNoKHRoaXMuZHJhZ3VsYU1vZGVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncm91cC5kcmFrZS5tb2RlbHMgPSBbdGhpcy5kcmFndWxhTW9kZWxdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGZpbmQgb3IgY3JlYXRlIGEgZ3JvdXBcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmZpbmQodGhpcy5kcmFndWxhKTtcbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICBsZXQgb3B0aW9ucyA9IHt9O1xuICAgICAgZ3JvdXAgPSB0aGlzLmRyYWd1bGFTZXJ2aWNlLmNyZWF0ZUdyb3VwKHRoaXMuZHJhZ3VsYSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIG1vZGVsIGFuZCBjb250YWluZXIgZWxlbWVudCBhcmUgcHVzaGVkXG4gICAgY2hlY2tNb2RlbChncm91cCk7XG4gICAgZ3JvdXAuZHJha2UuY29udGFpbmVycy5wdXNoKHRoaXMuY29udGFpbmVyKTtcbiAgICB0aGlzLnN1YnNjcmliZSh0aGlzLmRyYWd1bGEpO1xuXG4gICAgdGhpcy5ncm91cCA9IGdyb3VwO1xuICB9XG5cbiAgcHVibGljIHN1YnNjcmliZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN1YnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgdGhpcy5zdWJzLmFkZChcbiAgICAgIHRoaXMuZHJhZ3VsYVNlcnZpY2VcbiAgICAgIC5kcm9wTW9kZWwobmFtZSlcbiAgICAgIC5zdWJzY3JpYmUoKHsgc291cmNlLCB0YXJnZXQsIHNvdXJjZU1vZGVsLCB0YXJnZXRNb2RlbCB9KSA9PiB7XG4gICAgICAgIGlmIChzb3VyY2UgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuZHJhZ3VsYU1vZGVsQ2hhbmdlLmVtaXQoc291cmNlTW9kZWwpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5kcmFndWxhTW9kZWxDaGFuZ2UuZW1pdCh0YXJnZXRNb2RlbCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnMuYWRkKFxuICAgICAgdGhpcy5kcmFndWxhU2VydmljZVxuICAgICAgLnJlbW92ZU1vZGVsKG5hbWUpXG4gICAgICAuc3Vic2NyaWJlKCh7IHNvdXJjZSwgc291cmNlTW9kZWwgfSkgPT4ge1xuICAgICAgICBpZiAoc291cmNlID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLmRyYWd1bGFNb2RlbENoYW5nZS5lbWl0KHNvdXJjZU1vZGVsKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHRlYXJkb3duKGdyb3VwTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3Vicykge1xuICAgICAgdGhpcy5zdWJzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5kcmFndWxhU2VydmljZS5maW5kKGdyb3VwTmFtZSk7XG4gICAgaWYgKGdyb3VwKSB7XG4gICAgICBjb25zdCBpdGVtVG9SZW1vdmUgPSBncm91cC5kcmFrZS5jb250YWluZXJzLmluZGV4T2YodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIGlmIChpdGVtVG9SZW1vdmUgIT09IC0xKSB7XG4gICAgICAgIGdyb3VwLmRyYWtlLmNvbnRhaW5lcnMuc3BsaWNlKGl0ZW1Ub1JlbW92ZSwgMSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5kcmFndWxhTW9kZWwgJiYgZ3JvdXAuZHJha2UgJiYgZ3JvdXAuZHJha2UubW9kZWxzKSB7XG4gICAgICAgIGxldCBtb2RlbEluZGV4ID0gZ3JvdXAuZHJha2UubW9kZWxzLmluZGV4T2YodGhpcy5kcmFndWxhTW9kZWwpO1xuICAgICAgICBpZiAobW9kZWxJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBncm91cC5kcmFrZS5tb2RlbHMuc3BsaWNlKG1vZGVsSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudGVhcmRvd24odGhpcy5kcmFndWxhKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJhZ3VsYURpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZ3VsYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ3VsYVNlcnZpY2UgfSBmcm9tICcuL2RyYWd1bGEuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtEcmFndWxhRGlyZWN0aXZlXSxcbiAgZGVjbGFyYXRpb25zOiBbRHJhZ3VsYURpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIERyYWd1bGFNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IERyYWd1bGFNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtEcmFndWxhU2VydmljZV1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRHJha2VXaXRoTW9kZWxzIH0gZnJvbSAnLi9EcmFrZVdpdGhNb2RlbHMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRXZlbnRUeXBlcyB9IGZyb20gJy4vRXZlbnRUeXBlcyc7XG5pbXBvcnQgeyBEcmFndWxhT3B0aW9ucyB9IGZyb20gJy4vRHJhZ3VsYU9wdGlvbnMnO1xuaW1wb3J0IHsgRHJha2VGYWN0b3J5IH0gZnJvbSAnLi9EcmFrZUZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgTW9ja0RyYWtlRmFjdG9yeSA9IG5ldyBEcmFrZUZhY3RvcnkoKGNvbnRhaW5lcnMsIG9wdGlvbnMpID0+IHtcbiAgcmV0dXJuIG5ldyBNb2NrRHJha2UoY29udGFpbmVycywgb3B0aW9ucyk7XG59KTtcblxuLyoqIFlvdSBjYW4gdXNlIE1vY2tEcmFrZSB0byBzaW11bGF0ZSBEcmFrZSBldmVudHMuXG4gKlxuICogVGhlIHRocmVlIG1ldGhvZHMgdGhhdCBhY3R1YWxseSBkbyBhbnl0aGluZyBhcmUgYG9uKGV2ZW50LCBsaXN0ZW5lcilgLFxuICogYGRlc3Ryb3koKWAsIGFuZCBhIG5ldyBtZXRob2QsIGBlbWl0KClgLiBVc2UgYGVtaXQoKWAgdG8gbWFudWFsbHkgZW1pdCBEcmFrZVxuICogZXZlbnRzLCBhbmQgaWYgeW91IGluamVjdGVkIE1vY2tEcmFrZSBwcm9wZXJseSB3aXRoIE1vY2tEcmFrZUZhY3Rvcnkgb3JcbiAqIG1vY2tlZCB0aGUgRHJhZ3VsYVNlcnZpY2UuZmluZCgpIG1ldGhvZCwgdGhlbiB5b3UgY2FuIG1ha2UgbmcyLWRyYWd1bGEgdGhpbmtcbiAqIGRyYWdzIGFuZCBkcm9wcyBhcmUgaGFwcGVuaW5nLlxuICpcbiAqIENhdmVhdHM6XG4gKlxuICogMS4gWU9VIE1VU1QgTUFLRSBUSEUgRE9NIENIQU5HRVMgWU9VUlNFTEYuXG4gKiAyLiBSRVBFQVQ6IFlPVSBNVVNUIE1BS0UgVEhFIERPTSBDSEFOR0VTIFlPVVJTRUxGLlxuICogICAgVGhhdCBtZWFucyBgc291cmNlLnJlbW92ZUNoaWxkKGVsKWAsIGFuZCBgdGFyZ2V0Lmluc2VydEJlZm9yZShlbClgLlxuICogMy4gTm9uZSBvZiB0aGUgb3RoZXIgbWV0aG9kcyBkbyBhbnl0aGluZy5cbiAqICAgIFRoYXQncyBvaywgYmVjYXVzZSBuZzItZHJhZ3VsYSBkb2Vzbid0IHVzZSB0aGVtLlxuICovXG5leHBvcnQgY2xhc3MgTW9ja0RyYWtlIGltcGxlbWVudHMgRHJha2VXaXRoTW9kZWxzIHtcbiAgLyoqXG4gICAqIEBwYXJhbSBjb250YWluZXJzIEEgbGlzdCBvZiBjb250YWluZXIgZWxlbWVudHMuXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZXNlIHdpbGwgTk9UIGJlIHVzZWQuIEF0IGFsbC5cbiAgICogQHBhcmFtIG1vZGVscyBOb25zdGFuZGFyZCwgYnV0IHVzZWZ1bCBmb3IgdGVzdGluZyB1c2luZyBgbmV3IE1vY2tEcmFrZSgpYCBkaXJlY3RseS5cbiAgICogICAgICAgICAgICAgICBOb3RlLCBkZWZhdWx0IHZhbHVlIGlzIHVuZGVmaW5lZCwgbGlrZSBhIHJlYWwgRHJha2UuIERvbid0IGNoYW5nZSB0aGF0LlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbnRhaW5lcnM6IEVsZW1lbnRbXSA9IFtdLFxuICAgIHB1YmxpYyBvcHRpb25zOiBEcmFndWxhT3B0aW9ucyA9IHt9LFxuICAgIHB1YmxpYyBtb2RlbHM/OiBhbnlbXVtdXG4gICkge31cblxuICAvKiBEb2Vzbid0IHJlcHJlc2VudCBhbnl0aGluZyBtZWFuaW5nZnVsLiAqL1xuICBkcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXG4gIHN0YXJ0KGl0ZW06IEVsZW1lbnQpOiBhbnkge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICB9XG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXG4gIGVuZCgpOiBhbnkge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfVxuICAvKiBEb2VzIG5vdGhpbmcgdXNlZnVsLiAqL1xuICBjYW5jZWwocmV2ZXJ0OiBib29sZWFuKTogYW55O1xuICBjYW5jZWwoKTogYW55O1xuICBjYW5jZWwocmV2ZXJ0PzogYW55KSB7XG4gICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICB9XG4gIC8qIERvZXMgbm90aGluZyB1c2VmdWwuICovXG4gIHJlbW92ZSgpOiBhbnkge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEJhc2ljIGJ1dCBmdWxseSBmdW5jdGlvbmFsIGV2ZW50IGVtaXR0ZXIgc2hpbVxuICBwcml2YXRlIGVtaXR0ZXIkID0gbmV3IFN1YmplY3Q8eyBldmVudFR5cGU6IEV2ZW50VHlwZXMsIGFyZ3M6IGFueVtdIH0+KCk7XG5cbiAgcHJpdmF0ZSBzdWJzID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIG9uKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSB7XG4gICAgdGhpcy5zdWJzLmFkZCh0aGlzLmVtaXR0ZXIkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCh7IGV2ZW50VHlwZSB9KSA9PiBldmVudFR5cGUgPT09IGV2ZW50KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoeyBhcmdzIH0pID0+IHtcbiAgICAgICAgY2FsbGJhY2soLi4uYXJncyk7XG4gICAgICB9KSk7XG4gIH1cblxuICBkZXN0cm95KCk6IGFueSB7XG4gICAgdGhpcy5zdWJzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgbW9zdCB1c2VmdWwgbWV0aG9kLiBZb3UgY2FuIHVzZSBpdCB0byBtYW51YWxseSBmaXJlIGV2ZW50cyB0aGF0IHdvdWxkIG5vcm1hbGx5XG4gICAqIGJlIGZpcmVkIGJ5IGEgcmVhbCBkcmFrZS5cbiAgICpcbiAgICogWW91J3JlIGxpa2VseSBtb3N0IGludGVyZXN0ZWQgaW4gZmlyaW5nIGBkcmFnYCwgYHJlbW92ZWAgYW5kIGBkcm9wYCwgdGhlIHRocmVlIGV2ZW50c1xuICAgKiBEcmFndWxhU2VydmljZSB1c2VzIHRvIGltcGxlbWVudCBbZHJhZ3VsYU1vZGVsXS5cbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhI2RyYWtlb24tZXZlbnRzIGZvciB3aGF0IHlvdSBzaG91bGQgZW1pdCAoYW5kIGluIHdoYXQgb3JkZXIpLlxuICAgKlxuICAgKiAoTm90ZSBhbHNvLCBmaXJpbmcgZHJvcE1vZGVsIGFuZCByZW1vdmVNb2RlbCB3b24ndCB3b3JrLiBZb3Ugd291bGQgaGF2ZSB0byBtb2NrIERyYWd1bGFTZXJ2aWNlIGZvciB0aGF0LilcbiAgICovXG4gIGVtaXQoZXZlbnRUeXBlOiBFdmVudFR5cGVzLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIHRoaXMuZW1pdHRlciQubmV4dCh7IGV2ZW50VHlwZSwgYXJncyB9KVxuICB9XG5cbn1cbiJdLCJuYW1lcyI6WyIoKGRyYWd1bGFFeHB0KSkuZGVmYXVsdCIsImZpbHRlciIsIm1hcCIsIlN1YmplY3QiLCJJbmplY3RhYmxlIiwiT3B0aW9uYWwiLCJFdmVudEVtaXR0ZXIiLCJTdWJzY3JpcHRpb24iLCJEaXJlY3RpdmUiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxvQkF1R3VCLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSTtZQUNBLE9BQU8s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