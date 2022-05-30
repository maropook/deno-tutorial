https://maropook-deno-tutorial.deno.dev/:denoの公開

https://github.com/maropook/deno-tutorial

https://docs.google.com/forms/d/e/1FAIpQLSfu3Ute3bl4iCre7pMvoQsnGbCUq3H0CW2VfFeZPZtB9oa4og/viewform

https://deno.land/#installation

https://jigintern.github.io/tutorial/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%B3%E4%BA%8B%E5%89%8D%E8%AA%B2%E9%A1%8C/



// 複数のユーザーで対戦できるようにする
// Vue や React などのフレームワークを使う
// データベースと連携する（※）
// サーバーを JavaScript ではなく TypeScript で作成する


// 他のユーザーが単語を更新したら自動で自分のページの単語が切り替わるようにする
// 最初の単語がランダムに決まるようにする
// 最初からやり直せるようにリセット機能をつける
// ひらがな以外を入力できないようにする
// 「ん」が終わったらゲームを終了する
// 同じ単語を入力できないようにする
// しりとりの単語の履歴を表示する
// CSS でオシャレな見た目にする





<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyArZ9g4JoBjJKOqcanUz_HocPB3sVX5SSc",
    authDomain: "deno-tutorial.firebaseapp.com",
    projectId: "deno-tutorial",
    storageBucket: "deno-tutorial.appspot.com",
    messagingSenderId: "610004079592",
    appId: "1:610004079592:web:95ad7bd02a76cd9c904a5d",
    measurementId: "G-LNL5LL31P6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
