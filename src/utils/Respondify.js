const HandleError = function reject (response) {
    return (err) => {
        var message = "404 Not Found";
        if (err && typeof err.message == "string") {
            message = err.message;
        } else if (typeof err == "string") {
            message = err;
        }
        response.writeHead(404, {"Content-Type": "application/json"});
        response.end(JSON.stringify({ message }));
    }
}

const HandleSuccess = function respond (response) {
    return (data) => {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(data));
    }
}

const Responder = function (response) {
    return {
        onSuccess: HandleSuccess(response),
        onFailure: HandleError(response)
    }
}

const Respondify = function (callback) {
    return function (request, response) {
        var responder = Responder(response);
        try {
            callback(request, responder)
        } catch (err) {
            responder.onFailure(err);
        }
    }
}

module.exports = Respondify;