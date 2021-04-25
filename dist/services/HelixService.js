var API_ACCESS_TOKEN = "1234567890-ABCDEFGH";
var HelixService = /** @class */ (function () {
    function HelixService() {
    }
    HelixService.prototype.post = function (url, json, callback) {
        var _this = this;
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_ACCESS_TOKEN,
            },
            body: json,
        })
            .then(this.validateResponse)
            .then(function (data) {
            return data.json();
        })
            .catch(function (error) {
            console.log(error);
            throw new Error(_this.errorGenerator(error));
        })
            .finally(callback);
    };
    HelixService.prototype.validateResponse = function (response) {
        if (response.ok) {
            return response;
        }
        else {
            throw Error(response.statusText);
        }
    };
    HelixService.prototype.errorGenerator = function (error) {
        return "[HELIX Error]: " + error.message;
    };
    return HelixService;
}());
export default HelixService;
//# sourceMappingURL=HelixService.js.map