'use strict'

export let x = 10;

export class listItem {
    value = '';
    important = false;
    done = false;
    id = 0;

    constructor(value, id, important, done) {
        this.value = value;
        // this.id = id;
        // this.important = important;
        // this.done = done;
    }

    get value() {
        return this.value;
    }

    set value(value) {
        this.value = value;
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }
}