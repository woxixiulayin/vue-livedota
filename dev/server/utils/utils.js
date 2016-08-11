import {DEBUG} from '../config.js'

var log = function (str) {
    if (DEBUG === true) {
        let date = new Date();
        console.log('------------------------------------');
        if (typeof str === "string") {
            console.log(date.toLocaleString() + ": " +  str)
        } else {
            console.log(date.toLocaleString());
        console.log(str);
        }
    }
}

export {log};