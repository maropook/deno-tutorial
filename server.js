import {
    serve
} from "https://deno.land/std@0.138.0/http/server.ts";

import {
    serveDir
} from "https://deno.land/std@0.138.0/http/file_server.ts";



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
    if (req.method === "POST" && pathname === "/reset") {
        previousWord = "しりとり";
        return new Response(previousWord);
    }
    if (req.method === "POST" && pathname === "/shiritori") {
        const requestJson = await req.json();
        console.log(requestJson)
        const nextWord = requestJson.nextWord;
        const historyWords = requestJson.historyWords;
        for (const val of historyWords) {
            if (nextWord == val) {
                return new Response("一度使った単語です", {
                    status: 400
                });
            }
        }

        if (
            nextWord.length > 0 &&
            previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)
        ) {
            return new Response("前の単語に続いていません。", {
                status: 400
            });
        }
        if (
            nextWord.charAt(nextWord.length - 1) === "ん"
        ) {
            return new Response("んがついたら負けです", {
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
