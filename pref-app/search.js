document.getElementById("searchBtn").addEventListener("click", function () {
  const keyword = document.getElementById("keyword").value.trim();
  const result = document.getElementById("result");

  if (!keyword) {
    result.textContent = "都道府県名を入力してください。";
    return;
  }

  fetch("prefectures.json")
    .then(function (res) {
      if (!res.ok) {
        throw new Error("JSONの読み込みに失敗しました");
      }
      return res.json();
    })
    .then(function (data) {
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
    .catch(function (err) {
      console.error("読み込みエラー:", err);
      result.textContent = "読み込み中にエラーが起きました。";
    });
});
