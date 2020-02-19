"use strict";

function countNeighbours(data, row, col) {
    // TODO: 単純なコードの場合、以下のパターンを施行すれば実施できる
    //  ([targetX - 1][targetY - 1]),([targetX][targetY - 1]) , ([targetX + 1][targetY - 1])
    //  ([targetX - 1][targetY]) , ([targetX + 1][targetY])
    //  ([targetX - 1][targetY + 1]) , ([targetX][targetY + 1]) , ([targetX + 1][targetY + 1])
    //ただし、アクセスする際に対象の値が0以下になるとOutofIndexとなりエラーが発生するため防ぐためのガード処理が必要。

    // TODO:上記でも要件を満たすことは可能だがもう一歩踏み込んで指定された周辺マスすべてを検索するプログラムを製作してみる。
    //  検索範囲は 8(n)ずつ大きくなっていく。 
    //  検索方法（開始地点）： rowの開始地点はstartX-(n) , colの開始地点はstartY - (n)
    //  検索方法 1： startX - (n)からstartX + (n)までを検索する。
    //  検索方法 2： startY - (n)からstartY + (n)までを検索する。
    //  検索方法 3： startX + (n)からstartX - (n)までを検索する。
    //  検索方法 4： startY + (n)からstartY - (n)までを検索する。
    // ただし、そのまま実行すると斜め上下に存在するマスを2度参照するためポイントを移動させるが確認させない処理が必要。

    let result = 0;

    // 与えられたデータは正方形を想定。 正方形ではなかった場合一度dataをfor文で読み込んでから下記関数に渡す。
    accessAround(1,row,col,data.length,data[0].length,(x,y)=>{
        // console.log("data[" + x + "][" + y + "] -> " + data[x][y]);
        if(data[x][y]){
            result++;
        }
    })

    console.log(result);
    return result;
}

// Input pi : 指定されたX、Yの周囲何マスに対してアクセスするかを指定する。< 0 だった場合、エラーを返却する。
// Input startX : 配列のindexを想定。そのため0以下はInputされない想定 & 入力されたらエラーを返却する。
// Input startY : 配列のindexを想定。そのため0以下はInputされない想定 & 入力されたらエラーを返却する。
// Input callback : アクセスした配列に対してのCallback(x , y)
function accessAround(pi, startX , startY , xLength, yLength, callback){
    if( startX < 0 || startY < 0){
        console.log(" Input Error! X or Y must be >= 0 ");
        return;
    }

    if( pi <= 0){
        console.log(" Input Error! pi must be > 0 ");
        return;
    }

    const validateIndex = (x, y) => {
        if (x < 0 || y < 0 || xLength <= x || yLength <= y){
            return false;
        }
        return true;
    }

    for( let i = 1; i <= pi; i++){
        let x = startX - i;
        let y = startY - i;
    
        for(; x + 1 <= startX + i; x++){
            if(validateIndex(x,y)){
                callback(x,y);
            }
        }
    
        for(; y + 1 <= startY + i; y++){
            if(validateIndex(x,y)){
                callback(x,y);
            }
        }
    
        for(; x - 1 >= startX - i; x--){
            if(validateIndex(x,y)){
                callback(x,y);
            }
        }
    
        for(; y - 1 >= startY - i; y--){
            if(validateIndex(x,y)){
                callback(x,y);
            }
        }
    }
}

var assert = require('assert');

if (!global.is_checking) {
    assert.equal(countNeighbours([[1, 0, 0, 1, 0],
                                  [0, 1, 0, 0, 0],
                                  [0, 0, 1, 0, 1],
                                  [1, 0, 0, 0, 0],
                                  [0, 0, 1, 0, 0]], 1, 2), 3 , "1st example");

    assert.equal(countNeighbours([[1, 0, 0, 1, 0],
                                  [0, 1, 0, 0, 0],
                                  [0, 0, 1, 0, 1],
                                  [1, 0, 0, 0, 0],
                                  [0, 0, 1, 0, 0]], 0, 0), 1, "2nd example");

    assert.equal(countNeighbours([[1, 1, 1],
                                  [1, 1, 1],
                                  [1, 1, 1]], 0, 2), 3, "Dense corner");

    assert.equal(countNeighbours([[0, 0, 0],
                                  [0, 1, 0],
                                  [0, 0, 0]], 1, 1), 0, "Single");

    console.log("Coding complete? Click 'Check' to review your tests and earn cool rewards!");
}
