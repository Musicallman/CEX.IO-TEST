var calcAPI = require('./calculator');
var supertest = require("supertest");
var server = supertest.agent("https://api.coinmarketcap.com/v2/ticker/1/");



describe("must calculate the difference of two numbers as a percentage", function () {
it("Test #1", function () {

    var expectedResult = 0.6143318444898646;
    var result = calcAPI.calculator(6509.28816008, 6549.4);
    if (result !== expectedResult) {
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

});


describe("connecting to API server and getting data", function () {

    it("Test #1", function (done) {
        server.get('/')
            .set('Accept', 'application/json')
            .expect(200, done)
    });
});
