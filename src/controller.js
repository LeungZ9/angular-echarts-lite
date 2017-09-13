/**
 * Created by LeungZ on 2017/9/13.
 */
class Controller {
    static get $inject() {
        return ['$timeout'];
    }

    constructor($timeout) {
        this._timeout = $timeout;
    }
}

export default Controller;