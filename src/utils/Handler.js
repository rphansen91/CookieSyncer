module.exports = function () {
    var routes = {}
    var handler = {
        get: AddRoute("GET"),
        post: AddRoute("POST"),
        handle: HandleRequest,
        ready: () => HandleRequest
    }
    function AddRoute (method) {
        if (!routes[method]) routes[method] = {}
        return function (route, callback) {
            routes[method][route] = callback;
            return handler;
        } 
    }
    function HandleRequest (request, response) {
        var method = request.method;
        var url = request.url;
        var group = routes[method];
        group && typeof group[url] === 'function' &&
            group[url](request, response);
    }
    return handler;
}