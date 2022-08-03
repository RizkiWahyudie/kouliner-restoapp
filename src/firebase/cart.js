import firebase from "./firebase.js";

const db = firebase.ref("/keranjangs");

class cart {
    getAll() {
        return db;
    }

    create(add) {
        return db.push(add);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new cart();
