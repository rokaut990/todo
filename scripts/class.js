'use strict'

export class listItem {
    _value = '';
    _important = false;
    _done = false;
    _id = 0;

    constructor(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }
}