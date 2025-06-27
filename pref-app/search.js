// ボタンがクリックされたら検索開始
document.getElementById("searchBtn").addEventListener("click", function () {
  const keyword = document.getElementById("keyword").value.trim();
  const result = document.getElementById("result");

  if (!keyword) {
    result.textContent = "都道府県名を入力してください。";
    return;
  }

  // JSONファイルを読み込む
  fetch("prefectures.json")
    .then(function (res) {
      if (!res.ok) throw new Error("読み込み失敗");
      return res.json();
    })
    .then(function (data) {
      // キーワードを含む都道府県を探す
      const found = data.find(function (pref) {
        return pref.name.includes(keyword);
      });

      if (found) {
        result.innerHTML = `
          <p><strong>名前：</strong>${found.name}</p>
          <p><strong>地方：</strong>${found.region}</p>
          <p><strong>県庁所在地：</strong>${found.capital}</p>
        `;
      } else {
        result.textContent = "見つかりませんでした。";
      }
    })
    .catch(function () {
      result.textContent = "エラーが発生しました。";
    });
});
