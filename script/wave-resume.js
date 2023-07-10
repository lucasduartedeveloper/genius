// 1 - 0.5
// 0.01
// 50

// 3 - 0.2 / 0.5 / 0.2
// 
// 50

// 49
// 
// 50

/*
    var pct = (1/50)*received.length;

    for (var n = 0; n < storage.length; n++) {
        storage[n] = 0;
    }
*/

var resumeWave = function(freqArray) {
    var blocks = 50;
    var blockSize = Math.floor(freqArray.length / blocks);

    var resumedArray = [];
    var sum = 0;
    for (var n = 0; n < blocks; n++) {
        sum = 0;
        for (var k = 0; k < blockSize; k++) {
            var m = (n * blockSize) + k;
             if ((m+1) <= freqArray.length) {
                 sum += freqArray[m];
             }
        }

        resumedArray.push(sum/blockSize);
    }
    console.log(blockSize);
    console.log(resumedArray);

    return resumedArray;
};