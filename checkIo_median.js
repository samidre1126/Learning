"use strict";

function median(data) {
    //中央値を演算するプログラム
    //TODO: 与えられたData配列を昇順にソートする。
    //TODO: 与えられたDataのLengthが偶数かを判別する。
    //TODO: 偶数だった場合は Data[(Length / 2) - 1]  と Data[(Length / 2 )]の平均値を返却する。
    //TODO: 奇数だった場合は Data[(Length / 2)]の値を返却する。　Length / 2　の演算結果は小数点を含むものになるがそれは切り捨てられる想定。
    // Result :　小数点の値で配列アクセスしてしまい、Undefinedが返却される羽目に…。　値を切り捨てる処理を追加する。

    // Result : Js標準で搭載されているsortは辞書順で実施されるため、今回の要件にはマッチしなかった。
    //          そのため、sortにFunctionを仕込み数的にsortするように修正する。
    // sortについての詳細　-> https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    let result = -1;

    let sortedAscData = data.sort((first , second) => {
        return first - second;
    });
    let sortedDataLength = sortedAscData.length;
    console.log(sortedAscData);
    console.log(sortedDataLength);

    if(sortedDataLength % 2 == 0){
        let evenSum = sortedAscData[ (sortedDataLength / 2) -1 ] + sortedAscData[ (sortedDataLength / 2) ];
        result = evenSum / 2;
    }else{
        let index = Math.floor(sortedDataLength / 2);
        result = sortedAscData[index];
    }

    console.log("Result -> " + result);
    return result;
}

var assert = require('assert');
if (!global.is_checking) {
    assert.equal(median([1, 2, 3, 4, 5]), 3, "1st example");
    assert.equal(median([3, 1, 2, 5, 3]), 3, "2nd example");
    assert.equal(median([1, 300, 2, 200, 1]), 2, "3rd example");
    assert.equal(median([3, 6, 20, 99, 10, 15]), 12.5, "4th example");
    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}

