// アイコン（カード内で使い回すSVG。サイズは表示先のCSSで文脈に応じて指定）
const ICONS = {
  photoPlaceholder: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838a4 4 0 100 8 4 4 0 000-8zm6.406-.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`
};

// 未入力時に使うデフォルト表示テキスト
const DEFAULT_HOURS_TEXT = "営業時間：〇〇:〇〇〜〇〇:〇〇";
const DEFAULT_CLOSED_DAY_TEXT = "定休日：〇曜日";
const DEFAULT_COMMENT_TEXT = "（行った感想 or 気になる理由をメモ）";

// localStorageに保存する際のキー
const STORAGE_KEY = "flowerShopGuide.shops";

// 保存されている店舗データを読み込む（なければnull）
function loadShopsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("保存データの読み込みに失敗しました", e);
    return null;
  }
}

// 現在の店舗データをlocalStorageに保存する
function saveShopsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shops));
  } catch (e) {
    console.error("保存に失敗しました（データ容量が大きすぎる可能性があります）", e);
    alert("データの保存に失敗しました。写真の容量が大きすぎる可能性があります。お手数ですが、写真を減らすか、別の画像で試してみてください。");
  }
}

// 初回アクセス時のサンプルデータ
const DEFAULT_SHOPS = [
  {
    id: 1,
    name: "HANANONA",
    area: "渋谷区・笹塚",
    status: "want", // "want" | "visited"
    hours: DEFAULT_HOURS_TEXT,
    closedDay: DEFAULT_CLOSED_DAY_TEXT,
    tags: ["#ドライフラワー", "#隠れ家風", "#ギフト向け"],
    comment: DEFAULT_COMMENT_TEXT,
    instagramUrl: "#",
    photo: null,
    flowerPhotos: [null, null, null],
    ratings: { flower: null, staff: null, price: null },
    starRating: null
  },
  {
    id: 2,
    name: "BIANCA BARET BY OASEEDS",
    area: "東京ミッドタウン日比谷店",
    status: "want",
    hours: DEFAULT_HOURS_TEXT,
    closedDay: DEFAULT_CLOSED_DAY_TEXT,
    tags: ["#商業施設内", "#ブーケ"],
    comment: DEFAULT_COMMENT_TEXT,
    instagramUrl: "#",
    photo: null,
    flowerPhotos: [null, null, null],
    ratings: { flower: null, staff: null, price: null },
    starRating: null
  },
  {
    id: 3,
    name: "emu Flower",
    area: "自由が丘",
    status: "want",
    hours: DEFAULT_HOURS_TEXT,
    closedDay: DEFAULT_CLOSED_DAY_TEXT,
    tags: ["#ナチュラル系", "#雑貨あり"],
    comment: DEFAULT_COMMENT_TEXT,
    instagramUrl: "#",
    photo: null,
    flowerPhotos: [null, null, null],
    ratings: { flower: null, staff: null, price: null },
    starRating: null
  },
  {
    id: 4,
    name: "HANACHO umegaoka",
    area: "梅ヶ丘",
    status: "want",
    hours: DEFAULT_HOURS_TEXT,
    closedDay: DEFAULT_CLOSED_DAY_TEXT,
    tags: ["#町の花屋", "#普段使い"],
    comment: DEFAULT_COMMENT_TEXT,
    instagramUrl: "#",
    photo: null,
    flowerPhotos: [null, null, null],
    ratings: { flower: null, staff: null, price: null },
    starRating: null
  },
  {
    id: 5,
    name: "喫茶いのん",
    area: "京都",
    status: "want",
    hours: DEFAULT_HOURS_TEXT,
    closedDay: DEFAULT_CLOSED_DAY_TEXT,
    tags: ["#花と喫茶", "#旅の思い出"],
    comment: DEFAULT_COMMENT_TEXT,
    instagramUrl: "#",
    photo: null,
    flowerPhotos: [null, null, null],
    ratings: { flower: null, staff: null, price: null },
    starRating: null
  }
];

// 保存データがあればそれを使い、なければサンプルデータを使う
const shops = loadShopsFromStorage() ?? DEFAULT_SHOPS;

// 店舗写真ブロックのHTML（写真があれば表示、なければプレースホルダー）
function renderShopPhotoBlock(shop) {
  if (shop.photo) {
    return `<img src="${shop.photo}" class="full-cover-img">`;
  }
  return `
    ${ICONS.photoPlaceholder}
    <span class="placeholder-text">店舗写真プレースホルダー</span>
  `;
}

// 花・ラッピング写真3枠のHTML（写真があれば表示、なければプレースホルダー）
function renderFlowerPhotoThumbs(shop) {
  const labels = ["花の写真", "花の写真", "ラッピング写真"];
  const colorClasses = ["mini-thumb-flower", "mini-thumb-flower", "mini-thumb-wrap"];

  return shop.flowerPhotos
    .map((src, i) => {
      if (src) {
        return `<div class="mini-thumb"><img src="${src}" class="full-cover-img"></div>`;
      }
      return `<div class="mini-thumb mini-thumb-placeholder ${colorClasses[i]}">${labels[i]}</div>`;
    })
    .join("");
}

// 評価項目（花の種類・スタッフ・値段）の選択値 → 表示ラベルの対応表
const RATING_LABELS = {
  flower: { many: "🌼 花の種類：多い", few: "🌼 花の種類：少ない" },
  staff: { good: "🙂 スタッフ：良い", average: "🙂 スタッフ：普通", bad: "🙂 スタッフ：悪い" },
  price: { high: "💰 値段：高め", low: "💰 値段：安め" }
};

// 選択されている評価項目だけをバッジのHTMLにする（未選択のものは表示しない）
function renderRatingBadges(shop) {
  if (!shop.ratings) return "";
  return ["flower", "staff", "price"]
    .map(key => {
      const value = shop.ratings[key];
      const label = value && RATING_LABELS[key][value];
      return label ? `<span class="rating-badge">${label}</span>` : "";
    })
    .join("");
}

// 星評価（1〜5）のHTML。未評価の場合は何も返さない
function renderStars(shop) {
  if (!shop.starRating) return "";
  const stars = Array.from({ length: 5 }, (_, i) => (i < shop.starRating ? "★" : "☆")).join("");
  return `
    <dl class="shop-card-star-dl">
      <dt class="sr-only">評価</dt>
      <dd class="shop-card-stars" aria-label="評価 ${shop.starRating} / 5">${stars}</dd>
    </dl>
  `;
}

// 店舗名+エリアからGoogleマップ用の検索クエリを作成
function getMapQuery(shop) {
  return encodeURIComponent(`${shop.name} ${shop.area}`);
}
// カードに埋め込む地図プレビュー（APIキー不要のGoogleマップ埋め込み）のURL
function getMapEmbedUrl(shop) {
  return `https://maps.google.com/maps?q=${getMapQuery(shop)}&z=15&output=embed`;
}
// 「Googleマップで見る」ボタンから開く実際のGoogleマップのURL
function getMapSearchUrl(shop) {
  return `https://www.google.com/maps/search/?api=1&query=${getMapQuery(shop)}`;
}

// タップして初めて地図を操作可能にする（スマホでスクロールと地図操作が競合しないように）
function activateMap(button) {
  const iframe = button.previousElementSibling;
  iframe.classList.remove("pointer-events-none");
  button.remove();
}

// 1件分の店舗カードHTMLを生成
function createShopCardHTML(shop) {
  const tagsHTML = shop.tags
    .map(tag => `<span class="shop-card-tag">${tag}</span>`)
    .join("");
  const ratingBadgesHTML = renderRatingBadges(shop);

  return `
    <article class="card-hover" data-shop-id="${shop.id}">
      <div class="shop-card-photo">
        ${renderShopPhotoBlock(shop)}
      </div>
      <div class="shop-card-body">
        <div class="shop-card-header">
          <h3 class="font-display shop-card-title">${shop.name}</h3>
          <div class="shop-card-meta">
            <span class="shop-card-area">${shop.area}</span>
            <button type="button" onclick="openRegisterModal(${shop.id})" class="shop-card-edit-btn" aria-label="編集">
              ${ICONS.edit}
            </button>
          </div>
        </div>
        <div class="shop-card-toggle-wrap">
          <button type="button" role="switch" aria-checked="${shop.status === "visited"}" aria-label="行きたい／行った の切り替え" class="status-toggle${shop.status === "visited" ? " is-visited" : ""}" onclick="toggleStatus(${shop.id})">
            <span class="status-toggle-knob"></span>
            <span class="status-toggle-labels"><span>行きたい</span><span>行った</span></span>
          </button>
        </div>
        <div class="shop-card-hours">
          <span class="shop-card-hours-icon">${ICONS.clock}</span>
          <dl class="shop-card-hours-text">
            <dt class="sr-only">営業時間</dt>
            <dd>${shop.hours}</dd>
            ${shop.closedDay ? `<dt class="sr-only">定休日</dt><dd>${shop.closedDay}</dd>` : ""}
          </dl>
        </div>
        ${ratingBadgesHTML ? `
        <dl class="shop-card-ratings-dl">
          <dt class="sr-only">店舗詳細</dt>
          <dd class="shop-card-ratings">${ratingBadgesHTML}</dd>
        </dl>` : ""}
        <dl class="shop-card-tags-dl">
          <dt class="sr-only">タグ</dt>
          <dd class="shop-card-tags">
            ${tagsHTML}
          </dd>
        </dl>
        <dl class="shop-card-section">
          <dt class="shop-card-section-title">🌸 花の種類・ラッピング</dt>
          <dd class="photo-grid-3">
            ${renderFlowerPhotoThumbs(shop)}
          </dd>
        </dl>
        <dl class="shop-card-section">
          <dt class="shop-card-section-title">📍 地図</dt>
          <dd class="map-wrap">
            <iframe src="${getMapEmbedUrl(shop)}" class="map-frame pointer-events-none" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <button type="button" onclick="activateMap(this)" class="map-overlay-btn">タップして地図を操作</button>
          </dd>
        </dl>
        ${renderStars(shop)}
        <dl class="comment-bubble">
          <dt class="comment-bubble-title">💬 コメント・メモ</dt>
          <dd class="comment-bubble-text">${shop.comment}</dd>
        </dl>
        <div class="shop-card-actions">
          <a href="${shop.instagramUrl}" class="card-action-btn card-action-btn-primary">
            ${ICONS.instagram}
            Instagram
          </a>
          <a href="${getMapSearchUrl(shop)}" target="_blank" rel="noopener noreferrer" class="card-action-btn card-action-btn-secondary">
            ${ICONS.map}
            地図を見る
          </a>
        </div>
      </div>
    </article>
  `;
}

// 検索・タグ絞り込みで選択中のタグ
let activeFilterTags = new Set();

// 検索キーワード・選択中タグの条件に合う店舗だけを抽出
function getFilteredShops(status) {
  const query = document.getElementById("search-input").value.trim().toLowerCase();

  return shops.filter(shop => {
    if (shop.status !== status) return false;

    if (query) {
      const haystack = `${shop.name} ${shop.area} ${shop.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (activeFilterTags.size > 0) {
      const hasAllSelectedTags = [...activeFilterTags].every(tag => shop.tags.includes(tag));
      if (!hasAllSelectedTags) return false;
    }

    return true;
  });
}

// 検索中かどうか（空状態のメッセージ出し分けに使う）
function isFiltering() {
  return document.getElementById("search-input").value.trim() !== "" || activeFilterTags.size > 0;
}

// グリッドと空状態表示の出し分け
function applyEmptyState(gridEl, emptyEl, count, emptyTitle, emptyHint) {
  if (count > 0) {
    gridEl.classList.remove("hidden");
    emptyEl.classList.add("hidden");
    return;
  }
  gridEl.classList.add("hidden");
  emptyEl.classList.remove("hidden");
  emptyEl.querySelector(".empty-title").textContent = emptyTitle;
  emptyEl.querySelector(".empty-hint").textContent = emptyHint;
}

// 全店舗のタグから絞り込み用のタグチップ一覧を描画
function renderTagFilterOptions() {
  const container = document.getElementById("filter-tag-list");
  const allTags = [...new Set(shops.flatMap(shop => shop.tags))].sort();

  if (allTags.length === 0) {
    container.innerHTML = `<p class="filter-tag-empty">タグを登録するとここに表示されます</p>`;
    return;
  }

  container.innerHTML = allTags
    .map(tag => `<button type="button" class="tag-option${activeFilterTags.has(tag) ? " is-selected" : ""}" data-tag="${tag}">${tag}</button>`)
    .join("");
}

// ステータスごとにカードを描画
function renderShops() {
  const wantGrid = document.getElementById("want-grid");
  const wantEmpty = document.getElementById("want-empty");
  const visitedGrid = document.getElementById("visited-grid");
  const visitedEmpty = document.getElementById("visited-empty");

  const wantShops = getFilteredShops("want");
  const visitedShops = getFilteredShops("visited");

  wantGrid.innerHTML = wantShops.map(createShopCardHTML).join("");
  visitedGrid.innerHTML = visitedShops.map(createShopCardHTML).join("");

  const filtering = isFiltering();
  document.getElementById("clear-filter-btn").classList.toggle("hidden", !filtering);
  applyEmptyState(
    wantGrid, wantEmpty, wantShops.length,
    filtering ? "条件に一致する花屋がありません" : "まだ「行きたい」お店がありません",
    filtering ? "検索キーワードやタグの条件を変えてみてください。" : "「花屋を登録する」から追加してみましょう。"
  );
  applyEmptyState(
    visitedGrid, visitedEmpty, visitedShops.length,
    filtering ? "条件に一致する花屋がありません" : "まだ「行った」お店がありません",
    filtering ? "検索キーワードやタグの条件を変えてみてください。" : "カード内のスイッチを「行った」に切り替えると、ここに移動してきます。"
  );

  renderTagFilterOptions();
}

// 検索・タグ絞り込みのイベントを設定
function initFilters() {
  document.getElementById("search-input").addEventListener("input", renderShops);

  document.getElementById("filter-tag-list").addEventListener("click", e => {
    const btn = e.target.closest(".tag-option");
    if (!btn) return;
    const tag = btn.dataset.tag;
    if (activeFilterTags.has(tag)) {
      activeFilterTags.delete(tag);
    } else {
      activeFilterTags.add(tag);
    }
    renderShops();
  });

  document.getElementById("clear-filter-btn").addEventListener("click", () => {
    activeFilterTags.clear();
    document.getElementById("search-input").value = "";
    renderShops();
  });
}

// 「行きたい」⇔「行った」の切り替え
function toggleStatus(shopId) {
  const shop = shops.find(s => s.id === shopId);
  if (!shop) return;
  shop.status = shop.status === "want" ? "visited" : "want";
  saveShopsToStorage();
  renderShops();
}

// エリア切り替えタブ（「行きたい」「行った」パネル）
function switchTab(status) {
  const panelWant = document.getElementById("panel-want");
  const panelVisited = document.getElementById("panel-visited");
  const tabWant = document.getElementById("tab-want");
  const tabVisited = document.getElementById("tab-visited");

  if (status === "want") {
    panelWant.classList.remove("hidden");
    panelVisited.classList.add("hidden");
    tabWant.classList.add("tab-active");
    tabWant.classList.remove("tab-inactive");
    tabVisited.classList.add("tab-inactive");
    tabVisited.classList.remove("tab-active");
    tabWant.setAttribute("aria-selected", "true");
    tabVisited.setAttribute("aria-selected", "false");
  } else {
    panelVisited.classList.remove("hidden");
    panelWant.classList.add("hidden");
    tabVisited.classList.add("tab-active");
    tabVisited.classList.remove("tab-inactive");
    tabWant.classList.add("tab-inactive");
    tabWant.classList.remove("tab-active");
    tabVisited.setAttribute("aria-selected", "true");
    tabWant.setAttribute("aria-selected", "false");
  }
}

// 登録モーダルの状態（編集中の店舗ID、写真データ）
let editingShopId = null;
let formPhotoState = { shopPhoto: null, flowerPhotos: [null, null, null] };

// 登録モーダル（shopIdを渡すと編集モード、渡さなければ新規登録モード）
function openRegisterModal(shopId = null) {
  resetRegisterForm();
  editingShopId = shopId;

  const shop = shopId !== null ? shops.find(s => s.id === shopId) : null;
  if (shop) {
    fillFormWithShop(shop);
    document.getElementById("register-modal-title").textContent = "🌷 花屋を編集する";
    document.getElementById("register-submit-btn").textContent = "💾 更新する";
  }

  document.getElementById("register-overlay").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeRegisterModal() {
  document.getElementById("register-overlay").classList.add("hidden");
  document.body.style.overflow = "";
  resetRegisterForm();
}
function closeRegisterModalOnOverlay(e) {
  if (e.target.id === "register-overlay") closeRegisterModal();
}

// 既存の店舗データをフォームに反映する（編集モード用）
function fillFormWithShop(shop) {
  document.getElementById("input-name").value = shop.name;
  document.getElementById("input-area").value = shop.area;
  document.getElementById("input-instagram").value = shop.instagramUrl === "#" ? "" : shop.instagramUrl;
  document.getElementById("input-comment").value = shop.comment;

  // 営業時間が「◯◯:00〜◯◯:00」のちょうど1時間単位ならプルダウンに反映、
  // それ以外（30分単位や自由文言）は手入力欄にそのまま表示
  const hoursMatch = shop.hours.match(/(\d{2}):(\d{2})[〜~](\d{2}):(\d{2})/);
  if (hoursMatch && hoursMatch[2] === "00" && hoursMatch[4] === "00") {
    document.getElementById("input-hours-start").value = `${hoursMatch[1]}:00`;
    document.getElementById("input-hours-end").value = `${hoursMatch[3]}:00`;
    document.getElementById("input-hours-manual").value = "";
  } else {
    document.getElementById("input-hours-start").value = "";
    document.getElementById("input-hours-end").value = "";
    document.getElementById("input-hours-manual").value = shop.hours;
  }

  // 定休日の文言に含まれる曜日・祝の文字を見つけて、対応するボタンを選択状態にする
  const closedDayText = shop.closedDay || "";
  document.querySelectorAll("#closed-day-options .tag-option").forEach(btn => {
    btn.classList.toggle("is-selected", closedDayText.includes(btn.dataset.day));
  });

  const setCheckedRating = (name, value) => {
    if (!value) return;
    const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
    if (input) input.checked = true;
  };
  if (shop.ratings) {
    setCheckedRating("rating-flower", shop.ratings.flower);
    setCheckedRating("rating-staff", shop.ratings.staff);
    setCheckedRating("rating-price", shop.ratings.price);
  }
  setCheckedRating("rating-stars", shop.starRating);

  formPhotoState = {
    shopPhoto: shop.photo,
    flowerPhotos: [...shop.flowerPhotos]
  };
  renderPhotoPreviews();

  const suggestions = document.getElementById("tag-suggestions");
  shop.tags.forEach(tag => {
    let btn = [...suggestions.querySelectorAll(".tag-option")].find(b => b.dataset.tag === tag);
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tag-option";
      btn.dataset.tag = tag;
      btn.textContent = tag;
      suggestions.appendChild(btn);
    }
    btn.classList.add("is-selected");
  });
}

// 写真アップロード枠の見た目を、現在の formPhotoState に合わせて描画
function renderPhotoPreviews() {
  const shopZone = document.getElementById("shop-photo-dropzone");
  shopZone.innerHTML = formPhotoState.shopPhoto
    ? `<div class="photo-preview-wrap">
        <img src="${formPhotoState.shopPhoto}" class="full-cover-img">
        <button type="button" onclick="event.preventDefault(); event.stopPropagation(); removeShopPhoto();" class="photo-remove-btn photo-remove-btn-lg">×</button>
      </div>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg><span class="placeholder-text">画像をアップロード</span>`;

  document.querySelectorAll("#flower-photo-grid .photo-dropzone").forEach(zone => {
    const index = Number(zone.dataset.index);
    const src = formPhotoState.flowerPhotos[index];
    zone.innerHTML = src
      ? `<div class="photo-preview-wrap">
          <img src="${src}" class="full-cover-img">
          <button type="button" onclick="event.preventDefault(); event.stopPropagation(); removeFlowerPhoto(${index});" class="photo-remove-btn">×</button>
        </div>`
      : ICONS.upload;
  });
}

// 店舗写真を削除
function removeShopPhoto() {
  formPhotoState.shopPhoto = null;
  renderPhotoPreviews();
}

// 花・ラッピング写真を削除
function removeFlowerPhoto(index) {
  formPhotoState.flowerPhotos[index] = null;
  renderPhotoPreviews();
}

// 画像ファイルを縮小してからBase64に変換する（スマホの写真は数MBあり、
// そのまま保存するとlocalStorageの容量上限を超えて保存に失敗するため）
function resizeImageToDataUrl(file, maxSize, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("画像の読み込みに失敗しました"));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round(height * (maxSize / width));
            width = maxSize;
          } else {
            width = Math.round(width * (maxSize / height));
            height = maxSize;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// 写真アップロード欄のファイル選択イベントを設定
// （クリックでの起動は<label for>によるネイティブな挙動に任せているので、ここでは変更の監視だけでよい）
function initPhotoInputs() {
  document.getElementById("input-shop-photo").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    resizeImageToDataUrl(file, 800, 0.8).then(dataUrl => {
      formPhotoState.shopPhoto = dataUrl;
      renderPhotoPreviews();
    }).catch(err => {
      console.error("画像の処理に失敗しました", err);
      alert("画像の読み込みに失敗しました。別の画像で試してみてください。");
    });
  });

  [0, 1, 2].forEach(index => {
    document.getElementById(`input-flower-photo-${index}`).addEventListener("change", e => {
      const file = e.target.files[0];
      if (!file) return;
      resizeImageToDataUrl(file, 500, 0.8).then(dataUrl => {
        formPhotoState.flowerPhotos[index] = dataUrl;
        renderPhotoPreviews();
      }).catch(err => {
        console.error("画像の処理に失敗しました", err);
        alert("画像の読み込みに失敗しました。別の画像で試してみてください。");
      });
    });
  });
}

// 登録モーダルの「おすすめタグ」プリセット（リセット時に残すタグ）
const DEFAULT_TAG_PRESETS = ["#ドライフラワー", "#ギフト向け", "#普段使い", "#カフェ併設"];

// タグチップのクリックで選択/解除を切り替え
function initTagSelector() {
  document.getElementById("tag-suggestions").addEventListener("click", e => {
    const btn = e.target.closest(".tag-option");
    if (!btn) return;
    btn.classList.toggle("is-selected");
  });
}

// 「新しいタグを追加」欄でEnterを押したらタグチップとして追加
function initNewTagInput() {
  const input = document.getElementById("input-new-tag");
  input.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const raw = input.value.trim();
    if (!raw) return;
    const tag = raw.startsWith("#") ? raw : `#${raw}`;

    const suggestions = document.getElementById("tag-suggestions");
    const alreadyExists = [...suggestions.querySelectorAll(".tag-option")]
      .some(btn => btn.dataset.tag === tag);

    if (!alreadyExists) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tag-option is-selected";
      btn.dataset.tag = tag;
      btn.textContent = tag;
      suggestions.appendChild(btn);
    }
    input.value = "";
  });
}

// 営業時間の開店・閉店プルダウンに 00:00〜23:00 の選択肢を生成する
function initHoursSelects() {
  const startSelect = document.getElementById("input-hours-start");
  const endSelect = document.getElementById("input-hours-end");
  for (let hour = 0; hour < 24; hour++) {
    const value = `${String(hour).padStart(2, "0")}:00`;
    startSelect.insertAdjacentHTML("beforeend", `<option value="${value}">${value}</option>`);
    endSelect.insertAdjacentHTML("beforeend", `<option value="${value}">${value}</option>`);
  }
}

// 定休日ボタンのクリックで選択/解除を切り替え（複数選択可）
function initClosedDaySelector() {
  document.getElementById("closed-day-options").addEventListener("click", e => {
    const btn = e.target.closest(".tag-option");
    if (!btn) return;
    btn.classList.toggle("is-selected");
  });
}

// 入力済みの営業時間を求める（プルダウン優先、手入力があればそちら優先、
// どちらも空なら編集中の元の値を維持、新規登録なら既定文言）
function resolveHours() {
  const manual = document.getElementById("input-hours-manual").value.trim();
  const start = document.getElementById("input-hours-start").value;
  const end = document.getElementById("input-hours-end").value;

  if (manual) {
    return manual.includes("営業時間") ? manual : `営業時間：${manual}`;
  }
  if (start && end) {
    return `営業時間：${start}〜${end}`;
  }
  if (editingShopId !== null) {
    return shops.find(s => s.id === editingShopId).hours;
  }
  return DEFAULT_HOURS_TEXT;
}

// 選択された定休日ボタンから表示文言を作る（月〜日は「◯曜日」、祝は「祝日」としてまとめる）
function formatClosedDayText(days) {
  const weekdays = days.filter(d => d !== "祝");
  const parts = [];
  if (weekdays.length > 0) parts.push(`${weekdays.join("・")}曜日`);
  if (days.includes("祝")) parts.push("祝日");
  return parts.length > 0 ? `定休日：${parts.join("・")}` : "";
}

// 入力済みの定休日を求める（ボタン選択優先、なければ編集中の元の値を維持、新規登録なら既定文言）
function resolveClosedDay() {
  const selectedDays = [...document.querySelectorAll("#closed-day-options .tag-option.is-selected")]
    .map(btn => btn.dataset.day);

  if (selectedDays.length > 0) {
    return formatClosedDayText(selectedDays);
  }
  if (editingShopId !== null) {
    return shops.find(s => s.id === editingShopId).closedDay;
  }
  return DEFAULT_CLOSED_DAY_TEXT;
}

// フォームの入力内容を保存する（新規登録 / 既存店舗の編集の両方を担当）
function saveShop() {
  const nameInput = document.getElementById("input-name");
  const areaInput = document.getElementById("input-area");
  const instagramInput = document.getElementById("input-instagram");
  const commentInput = document.getElementById("input-comment");
  const errorEl = document.getElementById("register-error");

  const name = nameInput.value.trim();
  const area = areaInput.value.trim();

  if (!name || !area) {
    errorEl.classList.remove("hidden");
    return;
  }
  errorEl.classList.add("hidden");

  const selectedTags = [...document.querySelectorAll("#tag-suggestions .tag-option.is-selected")]
    .map(btn => btn.dataset.tag);

  const getCheckedRating = name => document.querySelector(`input[name="${name}"]:checked`)?.value || null;

  const shopData = {
    name,
    area,
    hours: resolveHours(),
    closedDay: resolveClosedDay(),
    tags: selectedTags,
    comment: commentInput.value.trim() || DEFAULT_COMMENT_TEXT,
    instagramUrl: instagramInput.value.trim() || "#",
    photo: formPhotoState.shopPhoto,
    flowerPhotos: [...formPhotoState.flowerPhotos],
    ratings: {
      flower: getCheckedRating("rating-flower"),
      staff: getCheckedRating("rating-staff"),
      price: getCheckedRating("rating-price")
    },
    starRating: Number(getCheckedRating("rating-stars")) || null
  };

  if (editingShopId !== null) {
    Object.assign(shops.find(s => s.id === editingShopId), shopData);
  } else {
    shops.push({ id: Date.now(), status: "want", ...shopData });
    switchTab("want");
  }

  saveShopsToStorage();
  renderShops();
  closeRegisterModal();
}

// モーダルを閉じるときにフォームを初期状態へ戻す
function resetRegisterForm() {
  document.getElementById("register-form").reset();
  document.getElementById("register-error").classList.add("hidden");
  document.getElementById("register-modal-title").textContent = "🌷 花屋を登録する";
  document.getElementById("register-submit-btn").textContent = "🌱 登録する";

  editingShopId = null;
  formPhotoState = { shopPhoto: null, flowerPhotos: [null, null, null] };
  renderPhotoPreviews();

  const suggestions = document.getElementById("tag-suggestions");
  suggestions.querySelectorAll(".tag-option").forEach(btn => {
    if (DEFAULT_TAG_PRESETS.includes(btn.dataset.tag)) {
      btn.classList.remove("is-selected");
    } else {
      btn.remove();
    }
  });

  document.querySelectorAll("#closed-day-options .tag-option").forEach(btn => {
    btn.classList.remove("is-selected");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderShops();
  initFilters();
  initTagSelector();
  initNewTagInput();
  initPhotoInputs();
  renderPhotoPreviews();
  initHoursSelects();
  initClosedDaySelector();
});
