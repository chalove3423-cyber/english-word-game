// เกมเรียงตัวอักษรภาษาอังกฤษ ป.1: HTML + CSS + JavaScript ล้วน
(() => {
  'use strict';

  // ข้อมูลสำรองทำให้เกมเปิดได้ทันทีด้วย file:// แม้ fetch JSON จะถูกบล็อก
  // หากแก้คำศัพท์ ควรแก้ทั้ง data/words.json และ FALLBACK_WORDS ชุดนี้ให้ตรงกัน
const FALLBACK_WORDS = [
  {
    "word": "cat",
    "emoji": "🐱",
    "category": "animals"
  },
  {
    "word": "dog",
    "emoji": "🐶",
    "category": "animals"
  },
  {
    "word": "pig",
    "emoji": "🐷",
    "category": "animals"
  },
  {
    "word": "cow",
    "emoji": "🐮",
    "category": "animals"
  },
  {
    "word": "bird",
    "emoji": "🐦",
    "category": "animals"
  },
  {
    "word": "fish",
    "emoji": "🐟",
    "category": "animals"
  },
  {
    "word": "duck",
    "emoji": "🦆",
    "category": "animals"
  },
  {
    "word": "frog",
    "emoji": "🐸",
    "category": "animals"
  },
  {
    "word": "ant",
    "emoji": "🐜",
    "category": "animals"
  },
  {
    "word": "bee",
    "emoji": "🐝",
    "category": "animals"
  },
  {
    "word": "apple",
    "emoji": "🍎",
    "category": "fruits"
  },
  {
    "word": "banana",
    "emoji": "🍌",
    "category": "fruits"
  },
  {
    "word": "mango",
    "emoji": "🥭",
    "category": "fruits"
  },
  {
    "word": "grape",
    "emoji": "🍇",
    "category": "fruits"
  },
  {
    "word": "orange",
    "emoji": "🍊",
    "category": "fruits"
  },
  {
    "word": "pear",
    "emoji": "🍐",
    "category": "fruits"
  },
  {
    "word": "lime",
    "emoji": "🍋‍🟩",
    "category": "fruits"
  },
  {
    "word": "kiwi",
    "emoji": "🥝",
    "category": "fruits"
  },
  {
    "word": "melon",
    "emoji": "🍈",
    "category": "fruits"
  },
  {
    "word": "peach",
    "emoji": "🍑",
    "category": "fruits"
  },
  {
    "word": "egg",
    "emoji": "🥚",
    "category": "food"
  },
  {
    "word": "rice",
    "emoji": "🍚",
    "category": "food"
  },
  {
    "word": "milk",
    "emoji": "🥛",
    "category": "food"
  },
  {
    "word": "cake",
    "emoji": "🍰",
    "category": "food"
  },
  {
    "word": "bread",
    "emoji": "🍞",
    "category": "food"
  },
  {
    "word": "jam",
    "emoji": "🍓",
    "category": "food"
  },
  {
    "word": "corn",
    "emoji": "🌽",
    "category": "food"
  },
  {
    "word": "soup",
    "emoji": "🍲",
    "category": "food"
  },
  {
    "word": "meat",
    "emoji": "🥩",
    "category": "food"
  },
  {
    "word": "juice",
    "emoji": "🧃",
    "category": "food"
  },
  {
    "word": "pen",
    "emoji": "🖊️",
    "category": "school"
  },
  {
    "word": "book",
    "emoji": "📚",
    "category": "school"
  },
  {
    "word": "bag",
    "emoji": "🎒",
    "category": "school"
  },
  {
    "word": "desk",
    "emoji": "🪑",
    "category": "school"
  },
  {
    "word": "ruler",
    "emoji": "📏",
    "category": "school"
  },
  {
    "word": "pencil",
    "emoji": "✏️",
    "category": "school"
  },
  {
    "word": "eraser",
    "emoji": "🧽",
    "category": "school"
  },
  {
    "word": "chair",
    "emoji": "🪑",
    "category": "school"
  },
  {
    "word": "glue",
    "emoji": "🧴",
    "category": "school"
  },
  {
    "word": "box",
    "emoji": "📦",
    "category": "school"
  },
  {
    "word": "ball",
    "emoji": "⚽",
    "category": "toys"
  },
  {
    "word": "doll",
    "emoji": "🪆",
    "category": "toys"
  },
  {
    "word": "kite",
    "emoji": "🪁",
    "category": "toys"
  },
  {
    "word": "car",
    "emoji": "🚗",
    "category": "toys"
  },
  {
    "word": "robot",
    "emoji": "🤖",
    "category": "toys"
  },
  {
    "word": "bike",
    "emoji": "🚲",
    "category": "toys"
  },
  {
    "word": "drum",
    "emoji": "🥁",
    "category": "toys"
  },
  {
    "word": "blocks",
    "emoji": "🧱",
    "category": "toys"
  },
  {
    "word": "yo-yo",
    "emoji": "🪀",
    "category": "toys"
  },
  {
    "word": "teddy bear",
    "emoji": "🧸",
    "category": "toys"
  },
  {
    "word": "hat",
    "emoji": "🎩",
    "category": "clothes"
  },
  {
    "word": "cap",
    "emoji": "🧢",
    "category": "clothes"
  },
  {
    "word": "shirt",
    "emoji": "👕",
    "category": "clothes"
  },
  {
    "word": "dress",
    "emoji": "👗",
    "category": "clothes"
  },
  {
    "word": "skirt",
    "emoji": "🩱",
    "category": "clothes"
  },
  {
    "word": "socks",
    "emoji": "🧦",
    "category": "clothes"
  },
  {
    "word": "shoes",
    "emoji": "👟",
    "category": "clothes"
  },
  {
    "word": "shorts",
    "emoji": "🩳",
    "category": "clothes"
  },
  {
    "word": "pants",
    "emoji": "👖",
    "category": "clothes"
  },
  {
    "word": "coat",
    "emoji": "🧥",
    "category": "clothes"
  },
  {
    "word": "eye",
    "emoji": "👁️",
    "category": "body"
  },
  {
    "word": "ear",
    "emoji": "👂",
    "category": "body"
  },
  {
    "word": "nose",
    "emoji": "👃",
    "category": "body"
  },
  {
    "word": "mouth",
    "emoji": "👄",
    "category": "body"
  },
  {
    "word": "hand",
    "emoji": "✋",
    "category": "body"
  },
  {
    "word": "arm",
    "emoji": "💪",
    "category": "body"
  },
  {
    "word": "leg",
    "emoji": "🦵",
    "category": "body"
  },
  {
    "word": "foot",
    "emoji": "🦶",
    "category": "body"
  },
  {
    "word": "head",
    "emoji": "🙂",
    "category": "body"
  },
  {
    "word": "hair",
    "emoji": "💇",
    "category": "body"
  },
  {
    "word": "bed",
    "emoji": "🛏️",
    "category": "home"
  },
  {
    "word": "door",
    "emoji": "🚪",
    "category": "home"
  },
  {
    "word": "fan",
    "emoji": "🌀",
    "category": "home"
  },
  {
    "word": "lamp",
    "emoji": "💡",
    "category": "home"
  },
  {
    "word": "clock",
    "emoji": "🕒",
    "category": "home"
  },
  {
    "word": "table",
    "emoji": "🪑",
    "category": "home"
  },
  {
    "word": "chair",
    "emoji": "🪑",
    "category": "home"
  },
  {
    "word": "cup",
    "emoji": "☕",
    "category": "home"
  },
  {
    "word": "TV",
    "emoji": "📺",
    "category": "home"
  },
  {
    "word": "sofa",
    "emoji": "🛋️",
    "category": "home"
  },
  {
    "word": "sun",
    "emoji": "☀️",
    "category": "nature"
  },
  {
    "word": "moon",
    "emoji": "🌙",
    "category": "nature"
  },
  {
    "word": "star",
    "emoji": "⭐",
    "category": "nature"
  },
  {
    "word": "tree",
    "emoji": "🌳",
    "category": "nature"
  },
  {
    "word": "flower",
    "emoji": "🌸",
    "category": "nature"
  },
  {
    "word": "cloud",
    "emoji": "☁️",
    "category": "nature"
  },
  {
    "word": "rain",
    "emoji": "🌧️",
    "category": "nature"
  },
  {
    "word": "sky",
    "emoji": "🌈",
    "category": "nature"
  },
  {
    "word": "leaf",
    "emoji": "🍃",
    "category": "nature"
  },
  {
    "word": "grass",
    "emoji": "🌱",
    "category": "nature"
  },
  {
    "word": "one",
    "emoji": "1️⃣",
    "category": "numbers"
  },
  {
    "word": "two",
    "emoji": "2️⃣",
    "category": "numbers"
  },
  {
    "word": "three",
    "emoji": "3️⃣",
    "category": "numbers"
  },
  {
    "word": "four",
    "emoji": "4️⃣",
    "category": "numbers"
  },
  {
    "word": "five",
    "emoji": "5️⃣",
    "category": "numbers"
  },
  {
    "word": "six",
    "emoji": "6️⃣",
    "category": "numbers"
  },
  {
    "word": "seven",
    "emoji": "7️⃣",
    "category": "numbers"
  },
  {
    "word": "eight",
    "emoji": "8️⃣",
    "category": "numbers"
  },
  {
    "word": "nine",
    "emoji": "9️⃣",
    "category": "numbers"
  },
  {
    "word": "ten",
    "emoji": "🔟",
    "category": "numbers"
  }
];

  const CATEGORIES = [
    { id: 'animals', title: 'Animals', th: 'สัตว์', emoji: '🐾', color: 'peach' },
    { id: 'fruits', title: 'Fruits', th: 'ผลไม้', emoji: '🍎', color: 'pink' },
    { id: 'food', title: 'Food & Drinks', th: 'อาหารและเครื่องดื่ม', emoji: '🍚', color: 'butter' },
    { id: 'school', title: 'School Things', th: 'ของใช้ในโรงเรียน', emoji: '✏️', color: 'lavender' },
    { id: 'toys', title: 'My Toys', th: 'ของเล่น', emoji: '🧸', color: 'mint' },
    { id: 'clothes', title: 'My Clothes', th: 'เสื้อผ้า', emoji: '👕', color: 'sky' },
    { id: 'body', title: 'My Body', th: 'ร่างกาย', emoji: '👁️', color: 'pink' },
    { id: 'home', title: 'My Home', th: 'บ้านของฉัน', emoji: '🏠', color: 'butter' },
    { id: 'nature', title: 'Nature', th: 'ธรรมชาติ', emoji: '🌳', color: 'mint' },
    { id: 'numbers', title: 'Numbers', th: 'ตัวเลข', emoji: '🔢', color: 'lavender' }
  ];
  const STORE_KEY = 'kru-gg-unscramble-stars-v1';
  const $ = id => document.getElementById(id);
  const screens = { home: $('home-screen'), game: $('game-screen'), result: $('result-screen') };
  const state = {
    words: FALLBACK_WORDS,
    mode: 'animals',
    questions: [],
    index: 0,
    shuffledTiles: [],
    pickedTileIds: [],
    hintUsed: false,
    hintTileId: null,
    busy: false,
    roundStars: 0,
    timer: null,
    generation: 0,
    store: loadStore()
  };

  function loadStore() {
    // เบราว์เซอร์บางโหมดปิดการเก็บข้อมูล จึงต้องเล่นต่อได้แม้ localStorage ใช้ไม่ได้
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
    } catch (_error) { /* เล่นต่อโดยไม่บันทึกดาวถาวร */ }
    return {};
  }
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state.store)); }
    catch (_error) { /* ไม่ขัดขวางเกมหากพื้นที่เก็บข้อมูลไม่พร้อม */ }
  }
  function categoryStars(id) { return Number(state.store[id]?.stars || 0); }
  function totalStars() { return CATEGORIES.reduce((sum, c) => sum + categoryStars(c.id), 0); }
  function addStars(id, amount) {
    const current = state.store[id] || { stars: 0, solved: 0 };
    current.stars = (Number(current.stars) || 0) + amount;
    current.solved = (Number(current.solved) || 0) + 1;
    state.store[id] = current;
    saveStore();
    updateHeaderStars();
  }
  function updateHeaderStars() { $('global-stars').textContent = totalStars().toLocaleString('th-TH'); }
  function showScreen(name) {
    Object.entries(screens).forEach(([id, section]) => { section.hidden = id !== name; });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function shuffleArray(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function lettersOf(word) { return [...word.toUpperCase()].filter(ch => /[A-Z]/.test(ch)); }
  function wordSignature(word) { return word.toLocaleLowerCase('en-US').trim(); }
  function shuffledLetters(word) {
    const original = lettersOf(word);
    if (original.length < 2) return [...original];
    let result = [...original];
    // ลองสลับใหม่ให้ต่างจากคำตอบเสมอ รวมคำที่มีตัวอักษรซ้ำ
    for (let tryCount = 0; tryCount < 40; tryCount++) {
      result = shuffleArray(original);
      if (result.join('') !== original.join('')) return result;
    }
    // กันกรณีสุ่มซ้ำหลายครั้ง: แลกตำแหน่งตัวอักษรที่ไม่เหมือนกัน
    const differentAt = original.findIndex(char => char !== original[0]);
    if (differentAt !== -1) {
      result = [...original];
      [result[0], result[differentAt]] = [result[differentAt], result[0]];
    }
    return result;
  }

  function validWords(data) {
    if (!Array.isArray(data) || data.length !== 100) return false;
    return CATEGORIES.every(cat => data.filter(item => item && item.category === cat.id && typeof item.word === 'string' && item.word.length > 0 && typeof item.emoji === 'string').length === 10);
  }
  async function loadWords() {
    // เปิดผ่าน file:// เลือกข้อมูลสำรองโดยตรง ไม่เรียก fetch ซึ่งอาจผิดพลาด
    if (location.protocol === 'file:') return FALLBACK_WORDS;
    try {
      const response = await fetch('data/words.json', { cache: 'no-store' });
      if (!response.ok) return FALLBACK_WORDS;
      const data = await response.json();
      return validWords(data) ? data : FALLBACK_WORDS;
    } catch (_error) { return FALLBACK_WORDS; }
  }

  function renderCategories() {
    const grid = $('category-grid');
    grid.replaceChildren();
    CATEGORIES.forEach(category => {
      const btn = document.createElement('button');
      btn.className = `category-card theme-${category.color}`;
      btn.type = 'button';
      btn.setAttribute('aria-label', `${category.title} หมวด${category.th} ดาวสะสม ${categoryStars(category.id)} ดวง`);
      const icon = document.createElement('span');
      icon.className = 'category-icon'; icon.textContent = category.emoji;
      icon.setAttribute('aria-hidden', 'true');
      const title = document.createElement('strong');
      title.className = 'category-name'; title.textContent = category.title;
      const thai = document.createElement('span');
      thai.className = 'category-th'; thai.textContent = category.th;
      const bottom = document.createElement('span');
      bottom.className = 'category-bottom';
      const count = document.createElement('span'); count.textContent = '10 คำศัพท์';
      const stars = document.createElement('span'); stars.textContent = `⭐ ${categoryStars(category.id).toLocaleString('th-TH')}`;
      bottom.append(count, stars);
      btn.append(icon, title, thai, bottom);
      btn.addEventListener('click', () => startRound(category.id));
      grid.append(btn);
    });
    updateHeaderStars();
  }
  function roundQuestions(mode) {
    if (mode !== 'random') return shuffleArray(state.words.filter(w => w.category === mode));
    const unique = new Map();
    shuffleArray(state.words).forEach(word => {
      const key = wordSignature(word.word);
      if (!unique.has(key)) unique.set(key, word);
    });
    return shuffleArray([...unique.values()]).slice(0, 10);
  }
  function stopPending() {
    state.generation++;
    if (state.timer !== null) clearTimeout(state.timer);
    state.timer = null;
    window.GameAudio.stopSpeech();
  }
  function startRound(mode) {
    if (mode !== 'random' && !CATEGORIES.some(c => c.id === mode)) return;
    stopPending();
    state.mode = mode;
    state.questions = roundQuestions(mode);
    state.index = 0;
    state.roundStars = 0;
    state.busy = false;
    $('round-stars').textContent = '0';
    showScreen('game');
    prepareQuestion();
  }
  function prepareQuestion() {
    stopPending();
    state.pickedTileIds = [];
    state.hintUsed = false;
    state.hintTileId = null;
    state.busy = false;
    const word = state.questions[state.index];
    if (!word) { showResult(); return; }
    const cat = CATEGORIES.find(c => c.id === word.category);
    state.shuffledTiles = shuffledLetters(word.word);
    $('game-category-pill').textContent = state.mode === 'random' ? '🎲 รวมทุกหมวด' : `${cat.emoji} ${cat.title}`;
    $('game-category-title').textContent = state.mode === 'random' ? 'ทายคำศัพท์จากทุกหมวด!' : `${cat.title} · ${cat.th}`;
    $('question-label').textContent = `ข้อ ${state.index + 1} จาก 10`;
    $('progress-fill').style.width = `${state.index * 10}%`;
    $('progress-track').setAttribute('aria-valuenow', String(state.index));
    $('game-card').classList.remove('wrong', 'correct');
    $('hint-message').textContent = '';
    $('feedback').textContent = '';
    $('feedback').className = 'feedback';
    $('hint-btn').disabled = false;
    $('hint-btn').textContent = '💡 ใบ้';
    $('speak-btn').hidden = !window.GameAudio.supportsSpeech;
    $('star-burst').replaceChildren();
    renderIllustration(word);
    renderSlots();
    renderTiles();
    syncActionButtons();
  }
  function renderIllustration(word) {
    const area = $('word-illustration');
    area.replaceChildren();
    if (typeof word.image === 'string' && word.image.trim()) {
      // เมื่อเปลี่ยน emoji เป็นภาพจริง ให้ใส่ image: "assets/cat.png" ในข้อมูล
      const img = document.createElement('img');
      img.src = word.image;
      img.alt = 'ภาพประกอบคำศัพท์';
      img.onerror = () => { area.textContent = word.emoji; };
      area.append(img);
    } else {
      area.textContent = word.emoji;
    }
  }
  function renderSlots() {
    const container = $('answer-slots');
    container.replaceChildren();
    const word = state.questions[state.index].word;
    let letterIndex = 0;
    for (const ch of word) {
      if (/[A-Za-z]/.test(ch)) {
        const index = letterIndex++;
        const tileId = state.pickedTileIds[index];
        const slot = document.createElement('button');
        slot.type = 'button';
        slot.className = `answer-slot${tileId === undefined ? '' : ' filled'}${state.hintUsed && index === 0 ? ' locked' : ''}`;
        slot.textContent = tileId === undefined ? '' : state.shuffledTiles[tileId];
        slot.setAttribute('aria-label', tileId === undefined ? `ช่องตัวอักษรที่ ${index + 1} ยังว่าง` : `ช่องที่ ${index + 1} ตัว ${state.shuffledTiles[tileId]}${index === 0 && state.hintUsed ? ' ตัวอักษรใบ้' : ' แตะเพื่อนำกลับ'}`);
        slot.disabled = state.busy || (state.hintUsed && index === 0) || tileId === undefined;
        slot.addEventListener('click', () => removeLetter(index));
        container.append(slot);
      } else {
        const separator = document.createElement('span');
        separator.className = ch === ' ' ? 'word-space' : 'fixed-separator';
        separator.textContent = ch === ' ' ? '' : ch;
        separator.setAttribute('aria-hidden', 'true');
        container.append(separator);
      }
    }
  }
  function renderTiles() {
    const tiles = $('letter-tiles');
    tiles.replaceChildren();
    state.shuffledTiles.forEach((letter, id) => {
      const selected = state.pickedTileIds.includes(id);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `letter-tile${selected ? ' tile-picked' : ''}`;
      btn.textContent = letter;
      btn.disabled = selected || state.busy;
      btn.setAttribute('aria-label', selected ? `ตัว ${letter} ถูกเลือกแล้ว` : `เลือกตัว ${letter}`);
      btn.addEventListener('click', () => chooseLetter(id));
      tiles.append(btn);
    });
  }
  function syncActionButtons() {
    $('clear-btn').disabled = state.busy || (state.pickedTileIds.length === 0) || (state.hintUsed && state.pickedTileIds.length === 1);
    $('hint-btn').disabled = state.busy || state.hintUsed;
    $('speak-btn').disabled = state.busy;
  }
  function chooseLetter(id) {
    if (state.busy || state.pickedTileIds.includes(id)) return;
    if (state.pickedTileIds.length >= lettersOf(state.questions[state.index].word).length) return;
    window.GameAudio.tap();
    state.pickedTileIds.push(id);
    renderSlots(); renderTiles(); syncActionButtons();
    if (state.pickedTileIds.length === lettersOf(state.questions[state.index].word).length) checkAnswer();
  }
  function removeLetter(index) {
    if (state.busy || (state.hintUsed && index === 0)) return;
    if (index < 0 || index >= state.pickedTileIds.length) return;
    window.GameAudio.tap();
    state.pickedTileIds.splice(index, 1);
    renderSlots(); renderTiles(); syncActionButtons();
  }
  function clearAnswer() {
    if (state.busy) return;
    state.pickedTileIds = state.hintUsed ? [state.hintTileId] : [];
    $('hint-message').textContent = state.hintUsed ? '💡 ตัวแรกเป็นตัวช่วยแล้วนะ ลองเรียงต่อได้เลย' : '';
    $('feedback').textContent = '';
    renderSlots(); renderTiles(); syncActionButtons();
  }
  function useHint() {
    if (state.busy || state.hintUsed) return;
    state.hintUsed = true;
    const firstLetter = lettersOf(state.questions[state.index].word)[0];
    state.hintTileId = state.shuffledTiles.findIndex(letter => letter === firstLetter);
    state.pickedTileIds = [state.hintTileId];
    $('hint-message').textContent = `💡 เยี่ยมเลย! ตัวแรกคือ ${firstLetter} ช่วยเรียงต่อได้เลย`;
    $('hint-btn').textContent = '💡 ใช้ใบ้แล้ว';
    window.GameAudio.tap();
    renderSlots(); renderTiles(); syncActionButtons();
  }
  function starBurst() {
    const host = $('star-burst');
    host.replaceChildren();
    for (let i = 0; i < 18; i++) {
      const element = document.createElement('span');
      element.textContent = i % 3 === 0 ? '💛' : '⭐';
      element.style.setProperty('--dx', `${Math.cos((i / 18) * Math.PI * 2) * (100 + Math.random() * 95)}px`);
      element.style.setProperty('--dy', `${Math.sin((i / 18) * Math.PI * 2) * (80 + Math.random() * 75)}px`);
      element.style.animationDelay = `${(i % 4) * 0.04}s`;
      host.append(element);
    }
  }
  function checkAnswer() {
    const word = state.questions[state.index];
    const correct = lettersOf(word.word).join('');
    const entered = state.pickedTileIds.map(id => state.shuffledTiles[id]).join('');
    state.busy = true;
    const thisGeneration = state.generation;
    if (entered === correct) {
      const awarded = state.hintUsed ? 2 : 3;
      state.roundStars += awarded;
      addStars(word.category, awarded);
      $('round-stars').textContent = String(state.roundStars);
      $('progress-fill').style.width = `${(state.index + 1) * 10}%`;
      $('progress-track').setAttribute('aria-valuenow', String(state.index + 1));
      $('feedback').className = 'feedback feedback-success';
      $('feedback').textContent = `เยี่ยมมาก! ${word.word} 🎉 +${awarded} ⭐`;
      $('game-card').classList.add('correct');
      starBurst();
      window.GameAudio.celebrateAndSpeak(word.word);
      renderSlots(); renderTiles(); syncActionButtons();
      state.timer = setTimeout(() => {
        if (thisGeneration !== state.generation) return;
        state.index++;
        prepareQuestion();
      }, 2700);
    } else {
      $('feedback').className = 'feedback feedback-retry';
      $('feedback').textContent = 'เกือบแล้ว! ลองอีกครั้งนะ 💕';
      $('game-card').classList.remove('wrong');
      // รีเฟรชแอนิเมชันการสั่นเบา ๆ ทุกครั้งที่ตอบผิด
      void $('game-card').offsetWidth;
      $('game-card').classList.add('wrong');
      window.GameAudio.retry();
      renderSlots(); renderTiles(); syncActionButtons();
      state.timer = setTimeout(() => {
        if (thisGeneration !== state.generation) return;
        state.busy = false;
        state.pickedTileIds = state.hintUsed ? [state.hintTileId] : [];
        $('game-card').classList.remove('wrong');
        $('feedback').textContent = '';
        renderSlots(); renderTiles(); syncActionButtons();
      }, 900);
    }
  }
  function showResult() {
    state.busy = false;
    const hasHintPenalty = state.roundStars < 30;
    $('result-stars').textContent = String(state.roundStars);
    $('result-title').textContent = state.roundStars === 30 ? 'สุดยอดไปเลย!' : 'เก่งมากเลย!';
    $('result-message').textContent = state.roundStars === 30 ? 'ได้ดาวเต็มทุกข้อเลย! หนูเก่งมาก ๆ 🌟' : hasHintPenalty ? 'หนูตั้งใจฝึกสะกดคำศัพท์ได้ดีมาก ลองเล่นอีกนะ 💕' : 'เยี่ยมมากเลย!';
    const cat = CATEGORIES.find(c => c.id === state.mode);
    $('result-category').textContent = state.mode === 'random' ? '🎲 โหมดสุ่มทุกหมวด · 10 คำ' : `${cat.emoji} ${cat.title} · 10 คำ`;
    showScreen('result');
  }
  function returnHome() {
    stopPending();
    state.busy = false;
    renderCategories();
    showScreen('home');
  }
  function setupEvents() {
    $('random-btn').addEventListener('click', () => startRound('random'));
    $('back-home-btn').addEventListener('click', returnHome);
    $('clear-btn').addEventListener('click', clearAnswer);
    $('hint-btn').addEventListener('click', useHint);
    $('speak-btn').addEventListener('click', () => {
      if (!state.busy) window.GameAudio.speak(state.questions[state.index].word);
    });
    $('replay-btn').addEventListener('click', () => startRound(state.mode));
    $('choose-category-btn').addEventListener('click', returnHome);
  }
  async function initialize() {
    setupEvents();
    renderCategories();
    state.words = await loadWords();
  }

  // ฟังก์ชันตรวจสอบเกม (ไม่เกี่ยวกับการแสดงหน้าจอหรือคะแนนของเด็ก)
  window.UnscrambleDiagnostics = Object.freeze({
    lettersOf,
    shuffledLetters,
    validWords,
    getWords: () => state.words.map(word => ({ ...word })),
    getRandomRound: () => roundQuestions('random').map(word => ({ ...word })),
    getCurrentWord: () => state.questions[state.index]?.word || null,
    getRoundWords: () => state.questions.map(word => ({ ...word })),
    getStars: () => structuredClone(state.store),
    startRound
  });
  initialize();
})();
