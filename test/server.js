import {
    serve
} from "https://deno.land/std@0.138.0/http/server.ts";

import {
    serveDir
} from "https://deno.land/std@0.138.0/http/file_server.ts";

// 「ん」が終わったらゲームを終了する
// 最初の単語がランダムに決まるようにする
// 同じ単語を入力できないようにする
// ひらがな以外を入力できないようにする
// しりとりの単語の履歴を表示する
// 最初からやり直せるようにリセット機能をつける
// 他のユーザーが単語を更新したら自動で自分のページの単語が切り替わるようにする
// 複数のユーザーで対戦できるようにする
// CSS でオシャレな見た目にする
// Vue や React などのフレームワークを使う
// サーバーを JavaScript ではなく TypeScript で作成する
// データベースと連携する（※）

let previousWord = "しりとり";
let myWords = [
    "飛行機",
    "船",
    "汽車",
    "車",
    "自転車",
    "川",
    "山",
    "道路",
    "家",
    "スクリプト",
];

function getRandamWord(n) {
    for (let i = 0; i < 5; i++) {
        let num = Math.floor(Math.random() * (myWords.length - n)) + n;
        console.log(num);
    }
};
console.log("Listening on http://localhost:8000");

serve(async (req) => {
    const pathname = new URL(req.url).pathname;
    if (req.method === "GET" && pathname === "/shiritori") {
        return new Response(previousWord);
    }
    if (req.method === "POST" && pathname === "/shiritori") {
        const requestJson = await req.json();
        const nextWord = requestJson.nextWord;

        if (
            nextWord.length > 0 &&
            previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)
        ) {
            return new Response("前の単語に続いていません。", {
                status: 400
            });
        }

        if (
            previousWord.charAt(nextWord.length - 1) !== nextWord.charAt(0)
        ) {
            return new Response("前の単語に続いていません。", {
                status: 400
            });
        }

        previousWord = nextWord;
        return new Response(previousWord);
    }


    return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
    });

});
