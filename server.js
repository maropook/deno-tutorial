import {
    serve
} from "https://deno.land/std@0.138.0/http/server.ts";

import {
    serveDir
} from "https://deno.land/std@0.138.0/http/file_server.ts";


import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue,
    push
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";


let previousWord = "しりとり";
let historyWords = [];

let myWords = [
    "ひこうき",
    "ふね",
    "きしゃ",
    "くるま",
    "じてんしゃ",
    "かわ",
    "やま",
    "どうろ",
    "いえ",
    "すくりぷと",
];

function getRandam() {
    return myWords[Math.floor(Math.random() * (myWords.length))];
}

console.log("Listening on http://localhost:8000");

serve(async (req) => {
    const firebaseConfig = {
        apiKey: "AIzaSyArZ9g4JoBjJKOqcanUz_HocPB3sVX5SSc",
        authDomain: "deno-tutorial.firebaseapp.com",
        projectId: "deno-tutorial",
        storageBucket: "deno-tutorial.appspot.com",
        messagingSenderId: "610004079592",
        appId: "1:610004079592:web:95ad7bd02a76cd9c904a5d",
        measurementId: "G-LNL5LL31P6"
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const pathname = new URL(req.url).pathname;

    if (req.method === "POST" && pathname === "/lose") {
        const now = new Date();

        const requestJson = await req.json();
        push(ref(database, 'loser'), {
            name: requestJson.name,
            message: requestJson.message,
            date: now.getMonth() + 1 + '月' + now.getDate() + '日' + now.getHours() + '時' + now.getMinutes() + '分'
        });

        return new Response('敗北者を書き込みました');
    }

    if (req.method === "GET" && pathname === "/shiritori") {
        console.log(historyWords)
        return new Response(previousWord);
    }
    if (req.method === "GET" && pathname === "/history") {
        return new Response(historyWords);
    }
    if (req.method === "GET" && pathname === "/loser") {
        const starCountRef = ref(database, 'loser');
        let loserLists;
        onValue(starCountRef, (snapshot) => {
            loserLists = snapshot.val();
        });
        return new Response(JSON.stringify(loserLists));
    }


    if (req.method === "POST" && pathname === "/reset") {
        previousWord = getRandam();

        const requestJson = await req.json();
        historyWords = requestJson.historyWords;
        historyWords.push(previousWord)
        return new Response(previousWord);
    }

    if (req.method === "POST" && pathname === "/shiritori") {

        const requestJson = await req.json();
        console.log(requestJson)
        console.log(getRandam())
        const nextWord = requestJson.nextWord;
        historyWords = requestJson.historyWords;
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
        historyWords.push(nextWord)
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
