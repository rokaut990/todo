'use strict'

export let x = 10;

export class listItem {
    _value = '';
    _important = false;
    _done = false;
    _id = 0;

    constructor(value, id, important, done) {
        this._value = value;
        //this._id = id;
        // this._important = important;
        // this._done = done;
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