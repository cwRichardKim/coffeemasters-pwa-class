import Menu from './Menu.js';
import Order from './Order.js';
import Router from './Router.js';
// Request Persistant Storage
// note that an anonymous async functio is required because top level await is not supported in all browsers
// in the course this was true by default, but it seems to return false for me. It seems there might not be
// much we can do about this?
(async function() {
    if (!navigator.storage || !navigator.storage.persist) {
        console.log("Storage manager not supported.");
        return;
    }
    console.log("Storage API is supported.");
    const isPersisted = await navigator.storage.persisted();
    console.log(`Persisted storage granted: ${isPersisted}`);
    if (!isPersisted) {
        console.log("Requesting persistent storage...");
        const result = await navigator.storage.persist();
        console.log(`The persistence request returned: ${result}`);
    }
})();

(async function() {
    if (!navigator.storage || !navigator.storage.estimate) {
        console.log("Storage manager not supported.");
        return;
    }
    const q = await navigator.storage.estimate();
    console.log(`Quota: ${q.quota/1024/1024} MB`);
    console.log(`Quota used: ${q.usage/1024/1024} MB`);
})();

window.addEventListener("DOMContentLoaded", () => {
    Router.init();
    Menu.load();
    Order.render();
 } );
