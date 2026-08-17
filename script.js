// アイコン（カード内で使い回すSVG）
const ICONS = {
  photoPlaceholder: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838a4 4 0 100 8 4 4 0 000-8zm6.406-.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`
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
    flowerPhotos: [null, null, null]
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
    flowerPhotos: [null, null, null]
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
    flowerPhotos: [null, null, null]
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
    flowerPhotos: [null, null, null]
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
    flowerPhotos: [null, null, null]
  }
];

// 保存データがあればそれを使い、なければサンプルデータを使う
const shops = loadShopsFromStorage() ?? DEFAULT_SHOPS;

// 店舗写真ブロックのHTML（写真があれば表示、なければプレースホルダー）
function renderShopPhotoBlock(shop) {
  if (shop.photo) {
    return `<img src="${shop.photo}" class="w-full h-full object-cover">`;
  }
  return `
    ${ICONS.photoPlaceholder}
    <span class="text-xs">店舗写真プレースホルダー</span>
  `;
}

// 花・ラッピング写真3枠のHTML（写真があれば表示、なければプレースホルダー）
function renderFlowerPhotoThumbs(shop) {
  const labels = ["花の写真", "花の写真", "ラッピング写真"];
  const bgColors = ["bg-[#EDE7D6]", "bg-[#EDE7D6]", "bg-[#F3E4D8]"];
  const textColors = ["text-[#B8AE95]", "text-[#B8AE95]", "text-[#B89F80]"];

  return shop.flowerPhotos
    .map((src, i) => {
      if (src) {
        return `<div class="mini-thumb rounded-lg overflow-hidden"><img src="${src}" class="w-full h-full object-cover"></div>`;
      }
      return `<div class="mini-thumb ${bgColors[i]} rounded-lg flex items-center justify-center text-[9px] ${textColors[i]} text-center px-1">${labels[i]}</div>`;
    })
    .join("");
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
    .map(tag => `<span class="text-xs bg-[#E9EFE0] text-[#6E7F5C] px-2.5 py-1 rounded-full">${tag}</span>`)
    .join("");

  return `
    <div class="card-hover bg-white rounded-2xl border border-[#E7E0CE] overflow-hidden" data-shop-id="${shop.id}">
      <div class="aspect-[4/3] bg-[#EDE7D6] flex flex-col items-center justify-center text-[#B8AE95] overflow-hidden">
        ${renderShopPhotoBlock(shop)}
      </div>
      <div class="p-5">
        <div class="flex items-start justify-between mb-1.5">
          <h3 class="font-display text-lg font-bold text-[#4A4438] leading-snug">${shop.name}</h3>
          <div class="flex items-center gap-1.5 ml-2 shrink-0">
            <span class="text-[10px] bg-[#EDE7D6] text-[#8A7F6A] px-2 py-1 rounded-full whitespace-nowrap">${shop.area}</span>
            <button type="button" onclick="openRegisterModal(${shop.id})" class="p-1.5 -m-1.5 rounded-full text-[#A79C86] hover:text-[#6E7F5C] hover:bg-[#EDE7D6]" aria-label="編集">
              ${ICONS.edit}
            </button>
          </div>
        </div>
        <div class="mb-3">
          <div class="status-toggle${shop.status === "visited" ? " is-visited" : ""}" onclick="toggleStatus(${shop.id})">
            <div class="status-toggle-knob"></div>
            <div class="status-toggle-labels"><span>行きたい</span><span>行った</span></div>
          </div>
        </div>
        <div class="flex items-start gap-1.5 text-xs text-[#8A7F6A] mb-3">
          <span class="mt-0.5">${ICONS.clock}</span>
          <div class="leading-relaxed">
            <p>${shop.hours}</p>
            ${shop.closedDay ? `<p>${shop.closedDay}</p>` : ""}
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5 mb-3">
          ${tagsHTML}
        </div>
        <div class="mb-3">
          <p class="text-[11px] font-bold text-[#8A7F6A] mb-1.5">🌸 花の種類・ラッピング</p>
          <div class="grid grid-cols-3 gap-1.5">
            ${renderFlowerPhotoThumbs(shop)}
          </div>
        </div>
        <div class="mb-3">
          <p class="text-[11px] font-bold text-[#8A7F6A] mb-1.5">📍 地図</p>
          <div class="relative">
            <iframe src="${getMapEmbedUrl(shop)}" class="w-full h-32 rounded-lg border border-[#E7E0CE] pointer-events-none" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <button type="button" onclick="activateMap(this)" class="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#6E7F5C] bg-white/30 backdrop-blur-[1px] rounded-lg">タップして地図を操作</button>
          </div>
        </div>
        <div class="comment-bubble bg-[#FBF8F2] rounded-xl p-3 mb-4">
          <p class="text-xs text-[#8A7F6A] mb-1 font-bold">💬 コメント・メモ</p>
          <p class="text-sm text-[#5C5546] leading-relaxed">${shop.comment}</p>
        </div>
        <div class="flex gap-2">
          <a href="${shop.instagramUrl}" class="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#C89B7B] to-[#D4AC8B] py-2.5 rounded-lg">
            ${ICONS.instagram}
            Instagram
          </a>
          <a href="${getMapSearchUrl(shop)}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-[#6E7F5C] bg-[#EDF0E5] border border-[#D3DCC4] py-2.5 rounded-lg">
            ${ICONS.map}
            地図を見る
          </a>
        </div>
      </div>
    </div>
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
    container.innerHTML = `<p class="text-xs text-[#A79C86]">タグを登録するとここに表示されます</p>`;
    return;
  }

  container.innerHTML = allTags
    .map(tag => `<button type="button" class="tag-option text-xs px-2.5 py-1 rounded-full border${activeFilterTags.has(tag) ? " is-selected" : ""}" data-tag="${tag}">${tag}</button>`)
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
  } else {
    panelVisited.classList.remove("hidden");
    panelWant.classList.add("hidden");
    tabVisited.classList.add("tab-active");
    tabVisited.classList.remove("tab-inactive");
    tabWant.classList.add("tab-inactive");
    tabWant.classList.remove("tab-active");
  }
}

// 登録モーダルの状態（編集中の店舗ID、写真データ）
let editingShopId = null;
let formPhotoState = { shopPhoto: null, flowerPhotos: [null, null, null] };
let activeFlowerPhotoIndex = null;

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
  document.getElementById("input-hours").value = shop.hours;
  document.getElementById("input-closed-day").value = shop.closedDay || "";
  document.getElementById("input-instagram").value = shop.instagramUrl === "#" ? "" : shop.instagramUrl;
  document.getElementById("input-comment").value = shop.comment;

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
      btn.className = "tag-option text-xs px-2.5 py-1 rounded-full border";
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
    ? `<div class="relative w-full h-full">
        <img src="${formPhotoState.shopPhoto}" class="w-full h-full object-cover">
        <button type="button" onclick="event.stopPropagation(); removeShopPhoto();" class="absolute top-1 right-1 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white text-sm hover:bg-black/70">×</button>
      </div>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg><span class="text-xs">画像をアップロード</span>`;

  document.querySelectorAll("#flower-photo-grid .photo-dropzone").forEach(zone => {
    const index = Number(zone.dataset.index);
    const src = formPhotoState.flowerPhotos[index];
    zone.innerHTML = src
      ? `<div class="relative w-full h-full">
          <img src="${src}" class="w-full h-full object-cover">
          <button type="button" onclick="event.stopPropagation(); removeFlowerPhoto(${index});" class="absolute top-0.5 right-0.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/50 text-white text-xs hover:bg-black/70">×</button>
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

// 写真アップロード欄のクリック・ファイル選択のイベントを設定
function initPhotoInputs() {
  const shopPhotoInput = document.getElementById("input-shop-photo");
  document.getElementById("shop-photo-dropzone").addEventListener("click", () => shopPhotoInput.click());
  shopPhotoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      formPhotoState.shopPhoto = reader.result;
      renderPhotoPreviews();
    };
    reader.readAsDataURL(file);
  });

  const flowerPhotoInput = document.getElementById("input-flower-photo");
  document.getElementById("flower-photo-grid").addEventListener("click", e => {
    const zone = e.target.closest(".photo-dropzone");
    if (!zone) return;
    activeFlowerPhotoIndex = Number(zone.dataset.index);
    flowerPhotoInput.click();
  });
  flowerPhotoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file || activeFlowerPhotoIndex === null) return;
    const reader = new FileReader();
    reader.onload = () => {
      formPhotoState.flowerPhotos[activeFlowerPhotoIndex] = reader.result;
      renderPhotoPreviews();
    };
    reader.readAsDataURL(file);
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
      btn.className = "tag-option is-selected text-xs px-2.5 py-1 rounded-full border";
      btn.dataset.tag = tag;
      btn.textContent = tag;
      suggestions.appendChild(btn);
    }
    input.value = "";
  });
}

// フォームの入力内容を保存する（新規登録 / 既存店舗の編集の両方を担当）
function saveShop() {
  const nameInput = document.getElementById("input-name");
  const areaInput = document.getElementById("input-area");
  const hoursInput = document.getElementById("input-hours");
  const closedDayInput = document.getElementById("input-closed-day");
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

  const shopData = {
    name,
    area,
    hours: hoursInput.value.trim() || DEFAULT_HOURS_TEXT,
    closedDay: closedDayInput.value.trim() || DEFAULT_CLOSED_DAY_TEXT,
    tags: selectedTags,
    comment: commentInput.value.trim() || DEFAULT_COMMENT_TEXT,
    instagramUrl: instagramInput.value.trim() || "#",
    photo: formPhotoState.shopPhoto,
    flowerPhotos: [...formPhotoState.flowerPhotos]
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
  activeFlowerPhotoIndex = null;
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
}

document.addEventListener("DOMContentLoaded", () => {
  renderShops();
  initFilters();
  initTagSelector();
  initNewTagInput();
  initPhotoInputs();
  renderPhotoPreviews();
});
