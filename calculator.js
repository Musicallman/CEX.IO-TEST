var lastResult = 0;

exports.calculator = function (input1, input2, decimals) {

    var result =(input2 - input1)/((input2 + input1)/2) * 100;
    var date = new Date();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    if (result !== lastResult) {
        console.log("Time: " + minutes + ":" + seconds + " Difference: " + result.toFixed(decimals) + "%");
        lastResult = result;
    }
    return result;
}