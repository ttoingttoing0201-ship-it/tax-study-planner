const defaultSubjects = {
  "국어": { color: "#e98f70", detail: "문법" },
  "영어": { color: "#87a9bd", detail: "독해" },
  "회계학": { color: "#a89ab8", detail: "재무회계" },
  "세법": { color: "#edc76a", detail: "국세기본법" }
};
const seriesPresets = {
  "세무직": ["국어", "영어", "한국사", "세법", "회계학"],
  "일반행정직": ["국어", "영어", "한국사", "행정법", "행정학"],
  "교육행정직": ["국어", "영어", "한국사", "교육학", "행정법"],
  "검찰직": ["국어", "영어", "한국사", "형법", "형사소송법"],
  "교정직": ["국어", "영어", "한국사", "교정학", "형사소송법"],
  "관세직": ["국어", "영어", "한국사", "관세법", "회계원리"]
};
const subjectPalette = ["#e98f70", "#87a9bd", "#a89ab8", "#edc76a", "#5fa68d", "#d7869a", "#7786b3", "#b88b62"];
const themePresets = {
  forest: { primary:"#164b40", accent:"#e98f70", background:"#f5f3ed", timer:"#164b40" },
  navy: { primary:"#263d5a", accent:"#dd8a68", background:"#f2f4f7", timer:"#263d5a" },
  purple: { primary:"#654d7c", accent:"#d98979", background:"#f5f1f6", timer:"#654d7c" },
  rose: { primary:"#985d69", accent:"#d99662", background:"#f8f2f1", timer:"#985d69" },
  brown: { primary:"#6f553f", accent:"#c77b61", background:"#f6f1e9", timer:"#6f553f" }
};
const types = ["이론", "기출", "오답", "모의고사", "암기", "단어", "복습", "강의"];
const curriculumUnits = ["강", "문제", "DAY", "페이지", "회차", "단원"];
const priorities = ["높음", "보통", "낮음"];
const storeKey = "taxPlannerDataV1";
const pad = n => String(n).padStart(2, "0");
const dateKey = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const today = new Date();
const todayKey = dateKey(today);
const offsetDate = offset => { const d = new Date(); d.setDate(d.getDate() + offset); return dateKey(d); };

const seedData = {
  settings: {
    examDate: "2027-04-03", dailyGoal: 480, jobSeries: "세무직",
    examTitle: "2027 세무직 9급 필기시험", subjects: defaultSubjects,
    theme: { primary:"#164b40", accent:"#e98f70", background:"#f5f3ed", timer:"#164b40" },
    backgroundPhoto: ""
  },
  study: [
    { id: 1, date: todayKey, subject: "국어", detail: "문법 - 형태론", type: "기출", studyMin: 100, netMin: 85, solved: 35, wrong: 6, rounds: 2, memo: "조사와 어미 구분" },
    { id: 2, date: todayKey, subject: "영어", detail: "독해 - 빈칸 추론", type: "기출", studyMin: 90, netMin: 74, solved: 25, wrong: 5, rounds: 3, memo: "" },
    { id: 3, date: todayKey, subject: "회계학", detail: "재무회계 - 재고자산", type: "강의", studyMin: 120, netMin: 98, solved: 18, wrong: 4, rounds: 1, memo: "저가법 다시 보기" },
    { id: 4, date: offsetDate(-1), subject: "세법", detail: "부가가치세법", type: "이론", studyMin: 155, netMin: 130, solved: 40, wrong: 9, rounds: 2, memo: "" },
    { id: 5, date: offsetDate(-2), subject: "국어", detail: "독해 - 비문학", type: "모의고사", studyMin: 145, netMin: 119, solved: 50, wrong: 8, rounds: 1, memo: "" },
    { id: 6, date: offsetDate(-2), subject: "영어", detail: "문법 - 관계사", type: "오답", studyMin: 85, netMin: 70, solved: 20, wrong: 3, rounds: 2, memo: "" },
    { id: 7, date: offsetDate(-3), subject: "회계학", detail: "원가회계", type: "기출", studyMin: 180, netMin: 151, solved: 45, wrong: 11, rounds: 2, memo: "" },
    { id: 8, date: offsetDate(-4), subject: "세법", detail: "소득세법", type: "암기", studyMin: 130, netMin: 108, solved: 30, wrong: 7, rounds: 3, memo: "" },
    { id: 9, date: offsetDate(-5), subject: "영어", detail: "어휘", type: "단어", studyMin: 70, netMin: 61, solved: 0, wrong: 0, rounds: 4, memo: "" }
  ],
  reviews: [
    { id: 11, date: todayKey, subject: "회계학", detail: "재고자산 평가", source: "2024 국가직 기출 14번", reason: "저가법 적용 순서 혼동", importance: 3, revisit: todayKey, done: false, memo: "" },
    { id: 12, date: todayKey, subject: "영어", detail: "관계대명사 what", source: "이동기 기출 300제", reason: "선행사 유무 확인 누락", importance: 2, revisit: todayKey, done: false, memo: "" },
    { id: 13, date: offsetDate(-3), subject: "세법", detail: "납세의무 성립", source: "2023 지방직 기출", reason: "성립시기 암기 부족", importance: 3, revisit: offsetDate(1), done: false, memo: "" },
    { id: 14, date: offsetDate(-5), subject: "국어", detail: "사동 표현", source: "선재국어 모의고사", reason: "이중피동과 혼동", importance: 1, revisit: offsetDate(-1), done: true, memo: "" }
  ],
  words: [
    { id: 21, day: 1, done: true, reviews: 3, confused: 3, confusedWords: "revenue = 세입, 수익\ndeduct = 공제하다\nlevy = 부과하다", revisit: offsetDate(-4), memo: "" },
    { id: 22, day: 2, done: true, reviews: 2, confused: 3, confusedWords: "exempt = 면제하다\nliable = 책임이 있는\narrears = 체납액", revisit: offsetDate(-2), memo: "" },
    { id: 23, day: 3, done: true, reviews: 2, confused: 3, confusedWords: "assessment = 부과, 평가\nstatute = 법령\nwithhold = 원천징수하다", revisit: todayKey, memo: "" },
    { id: 24, day: 4, done: false, reviews: 0, confused: 0, revisit: offsetDate(1), memo: "" },
    { id: 25, day: 5, done: false, reviews: 0, confused: 0, revisit: offsetDate(2), memo: "" }
  ],
  curriculum: [
    { id: 31, subject: "영어", detail: "어휘", name: "영어 단어 DAY 1~50", type: "단어", total: 50, completed: 3, unit: "DAY", targetRounds: 1, currentRounds: 0, startDate: todayKey, deadline: offsetDate(30), priority: "높음", estimatedMin: 25, memo: "매일 꾸준히" },
    { id: 32, subject: "세법", detail: "기출", name: "세법 기출 800문제", type: "기출", total: 800, completed: 120, unit: "문제", targetRounds: 1, currentRounds: 0, startDate: todayKey, deadline: offsetDate(45), priority: "높음", estimatedMin: 2, memo: "오답은 복습으로 연결" },
    { id: 33, subject: "회계학", detail: "재무회계", name: "재무회계 강의 80강", type: "강의", total: 80, completed: 10, unit: "강", targetRounds: 1, currentRounds: 0, startDate: todayKey, deadline: offsetDate(35), priority: "보통", estimatedMin: 45, memo: "" }
  ],
  studyPlans: []
};

let data = JSON.parse(localStorage.getItem(storeKey) || "null") || seedData;
let subjects = {};
let currentStudyFilter = "전체";
let timerTicker = null;
let activeTimer = JSON.parse(localStorage.getItem("taxPlannerActiveTimerV1") || "null");
let deferredInstallPrompt = null;
let cameraStream = null;
let editingWordId = null;
let editingStudyId = null;
let editingReviewId = null;
let editingTodoId = null;
let editingCurriculumId = null;
let editingPlannerId = null;
let wordQuiz = null;
let reviewQuiz = null;
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
const save = () => localStorage.setItem(storeKey, JSON.stringify(data));
const minutesText = min => `${Math.floor(min / 60)}시간 ${min % 60}분`;
const shortTime = min => min >= 60 ? `${Math.floor(min/60)}h ${min%60 ? `${min%60}m` : ""}` : `${min}m`;
const sum = (arr, key) => arr.reduce((acc, item) => acc + (+item[key] || 0), 0);
const weekStart = (date = new Date()) => {
  const d = new Date(date); const day = d.getDay() || 7;
  d.setHours(0,0,0,0); d.setDate(d.getDate() - day + 1); return d;
};
const inCurrentWeek = date => {
  const d = new Date(`${date}T00:00:00`), start = weekStart(), end = new Date(start);
  end.setDate(end.getDate() + 7); return d >= start && d < end;
};

function init() {
  normalizeSettings();
  applyAppearance();
  $("#todayLabel").textContent = new Intl.DateTimeFormat("ko-KR", { year:"numeric", month:"long", day:"numeric", weekday:"long" }).format(today);
  bindNavigation();
  bindModal();
  bindTimer();
  bindSettings();
  bindQuizFeatures();
  bindTodos();
  bindCurriculumPlanner();
  bindDataSync();
  bindTrash();
  setupMobileApp();
  renderDynamicSubjectControls();
  renderAll();
  restoreTimer();
}

function normalizeSettings() {
  data.settings ||= {};
  data.settings.examDate ||= "2027-04-03";
  data.settings.dailyGoal ||= 480;
  data.settings.jobSeries ||= "세무직";
  data.settings.examTitle ||= `2027 ${data.settings.jobSeries} 9급 필기시험`;
  data.settings.theme ||= { ...themePresets.forest };
  data.settings.theme.timer ||= data.settings.theme.primary;
  data.settings.subjects ||= { ...defaultSubjects };
  data.settings.backgroundPhoto ||= "";
  data.settings.plannerStart ||= "09:00";
  data.settings.plannerBreak ||= 10;
  data.words ||= [];
  data.words.forEach(word => {
    word.confusedWords ||= "";
    word.quizCorrect ||= 0;
    word.quizWrong ||= 0;
  });
  data.reviews ||= [];
  data.reviews.forEach(review => {
    review.quizAgain ||= 0;
    review.quizKnown ||= 0;
  });
  data.todos ||= [];
  data.curriculum ||= [];
  data.curriculum.forEach(item => {
    item.total = +item.total || 0;
    item.completed = +item.completed || 0;
    item.targetRounds = +item.targetRounds || 1;
    item.currentRounds = +item.currentRounds || 0;
    item.estimatedMin = +item.estimatedMin || 0;
    item.priority ||= "보통";
  });
  data.studyPlans ||= [];
  data.trash ||= [];
  subjects = { ...data.settings.subjects };
  save();
}

function subjectInfo(name) {
  return subjects[name] || { color:"#9ba8a3", detail:"" };
}

function bindNavigation() {
  $$(".nav-item").forEach(btn => btn.addEventListener("click", () => showPage(btn.dataset.page)));
  $$("[data-page-link]").forEach(btn => btn.addEventListener("click", () => showPage(btn.dataset.pageLink)));
  $("#mobileMenu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
  $("#themeButton").addEventListener("click", () => document.body.classList.toggle("dark"));
  $("#editExamDate").addEventListener("click", () => {
    const value = prompt("필기시험 날짜를 입력하세요. (YYYY-MM-DD)", data.settings.examDate);
    if (value && !Number.isNaN(new Date(value).getTime())) { data.settings.examDate = value; save(); renderHome(); }
  });
}

function applyAppearance() {
  const theme = data.settings.theme;
  document.documentElement.style.setProperty("--green", theme.primary);
  document.documentElement.style.setProperty("--green-2", mixColor(theme.primary, "#ffffff", .22));
  document.documentElement.style.setProperty("--coral", theme.accent);
  document.documentElement.style.setProperty("--bg", theme.background);
  document.documentElement.style.setProperty("--timer-color", theme.timer || theme.primary);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme.primary);
  document.body.classList.toggle("custom-photo", !!data.settings.backgroundPhoto);
  document.body.style.setProperty("--custom-photo", data.settings.backgroundPhoto ? `url("${data.settings.backgroundPhoto}")` : "none");
  $("#brandTitle").textContent = `${data.settings.jobSeries === "직접 설정" ? "나의" : data.settings.jobSeries} 합격 플래너`;
}

function mixColor(first, second, ratio) {
  const parse = value => value.match(/\w\w/g).map(hex => parseInt(hex,16));
  const a=parse(first), b=parse(second);
  return `#${a.map((value,index)=>Math.round(value*(1-ratio)+b[index]*ratio).toString(16).padStart(2,"0")).join("")}`;
}

function renderDynamicSubjectControls() {
  const names = Object.keys(subjects);
  const timerValue = $("#timerSubject")?.value;
  $("#timerSubject").innerHTML = options(names, names.includes(timerValue) ? timerValue : names[0]);
  const todoValue = $("#todoSubject")?.value;
  $("#todoSubject").innerHTML = `<option value="">공통</option>${options(names, names.includes(todoValue) ? todoValue : "")}`;
  $("#studyFilters").innerHTML = `<button class="${currentStudyFilter === "전체" ? "active" : ""}" data-filter="전체">전체</button>` +
    names.map(name => `<button class="${currentStudyFilter === name ? "active" : ""}" data-filter="${escapeHtml(name)}">${escapeHtml(name)}</button>`).join("");
  $$("#studyFilters button").forEach(btn => btn.addEventListener("click", () => {
    currentStudyFilter = btn.dataset.filter;
    $$("#studyFilters button").forEach(button => button.classList.toggle("active", button === btn));
    renderStudy();
  }));
}

function bindSettings() {
  $("#themePresets").addEventListener("click", event => {
    const button = event.target.closest("[data-theme]");
    if (!button) return;
    const theme = themePresets[button.dataset.theme];
    $("#primaryColor").value = theme.primary;
    $("#accentColor").value = theme.accent;
    $("#backgroundColor").value = theme.background;
    $("#timerColor").value = theme.timer;
    $$("#themePresets button").forEach(item => item.classList.toggle("active", item === button));
    previewAppearance();
  });
  ["primaryColor","accentColor","backgroundColor","timerColor"].forEach(id => $(`#${id}`).addEventListener("input", previewAppearance));
  $("#jobSeries").addEventListener("change", event => {
    if (event.target.value === "custom") return;
    renderSubjectEditor(buildPresetSubjects(event.target.value));
    $("#examTitle").value = `${new Date(data.settings.examDate).getFullYear()} ${event.target.value} 9급 필기시험`;
  });
  $("#addSubject").addEventListener("click", () => {
    const rows = readSubjectEditor(false);
    const index = rows.length;
    rows.push({ name:`새 과목 ${index+1}`, color:subjectPalette[index % subjectPalette.length] });
    renderSubjectEditor(rows);
  });
  $("#subjectEditor").addEventListener("click", event => {
    const button = event.target.closest("[data-remove-subject]");
    if (!button) return;
    const rows = readSubjectEditor(false);
    rows.splice(+button.dataset.removeSubject, 1);
    renderSubjectEditor(rows);
  });
  $("#saveSettings").addEventListener("click", saveSettings);
  $("#resetSettings").addEventListener("click", resetSettings);
  $("#photoInput").addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) processPhotoFile(file);
  });
  $("#requestCamera").addEventListener("click", requestCameraPermission);
  $("#capturePhoto").addEventListener("click", captureCameraPhoto);
  $("#removePhoto").addEventListener("click", () => {
    data.settings.backgroundPhoto = "";
    stopCamera();
    save();
    updatePhotoPreview();
    applyAppearance();
    showToast("배경 사진을 제거했어요.");
  });
}

function previewAppearance() {
  document.documentElement.style.setProperty("--green", $("#primaryColor").value);
  document.documentElement.style.setProperty("--green-2", mixColor($("#primaryColor").value, "#ffffff", .22));
  document.documentElement.style.setProperty("--coral", $("#accentColor").value);
  document.documentElement.style.setProperty("--bg", $("#backgroundColor").value);
  document.documentElement.style.setProperty("--timer-color", $("#timerColor").value);
}

function buildPresetSubjects(series) {
  return seriesPresets[series].map((name,index) => ({
    name,
    color: subjects[name]?.color || subjectPalette[index % subjectPalette.length]
  }));
}

function renderSettings() {
  const theme = data.settings.theme;
  $("#primaryColor").value = theme.primary;
  $("#accentColor").value = theme.accent;
  $("#backgroundColor").value = theme.background;
  $("#timerColor").value = theme.timer || theme.primary;
  $("#jobSeries").value = seriesPresets[data.settings.jobSeries] ? data.settings.jobSeries : "custom";
  $("#examTitle").value = data.settings.examTitle;
  renderSubjectEditor(Object.entries(subjects).map(([name,info]) => ({ name, color:info.color })));
  updatePhotoPreview();
}

function renderSubjectEditor(rows) {
  $("#subjectEditor").innerHTML = rows.map((row,index) => `
    <div class="subject-edit-row">
      <input type="color" value="${escapeHtml(row.color)}" aria-label="${escapeHtml(row.name)} 색상">
      <input type="text" value="${escapeHtml(row.name)}" maxlength="20" aria-label="과목 이름">
      <button class="subject-remove" data-remove-subject="${index}" aria-label="과목 삭제">×</button>
    </div>`).join("");
}

function readSubjectEditor(validate=true) {
  const rows = $$("#subjectEditor .subject-edit-row").map(row => ({
    color: row.querySelector('input[type="color"]').value,
    name: row.querySelector('input[type="text"]').value.trim()
  })).filter(row => row.name);
  if (validate && rows.length < 1) throw new Error("과목을 한 개 이상 추가해 주세요.");
  if (validate && new Set(rows.map(row=>row.name)).size !== rows.length) throw new Error("같은 과목 이름이 중복되어 있어요.");
  return rows;
}

function saveSettings() {
  try {
    const rows = readSubjectEditor();
    data.settings.jobSeries = $("#jobSeries").value === "custom" ? "직접 설정" : $("#jobSeries").value;
    data.settings.examTitle = $("#examTitle").value.trim() || `${data.settings.jobSeries} 시험`;
    data.settings.theme = {
      primary:$("#primaryColor").value,
      accent:$("#accentColor").value,
      background:$("#backgroundColor").value,
      timer:$("#timerColor").value
    };
    data.settings.subjects = Object.fromEntries(rows.map(row => [row.name,{ color:row.color, detail:"" }]));
    subjects = { ...data.settings.subjects };
    if (!subjects[currentStudyFilter]) currentStudyFilter = "전체";
    save();
    applyAppearance();
    renderDynamicSubjectControls();
    renderAll();
    showToast("디자인과 시험 설정을 저장했어요!");
  } catch (error) {
    showToast(error.message);
  }
}

function resetSettings() {
  data.settings.jobSeries = "세무직";
  data.settings.examTitle = "2027 세무직 9급 필기시험";
  data.settings.theme = { ...themePresets.forest };
  data.settings.subjects = JSON.parse(JSON.stringify(defaultSubjects));
  data.settings.backgroundPhoto = "";
  subjects = { ...data.settings.subjects };
  stopCamera();
  save();
  applyAppearance();
  renderDynamicSubjectControls();
  renderAll();
  showToast("기본 설정으로 되돌렸어요.");
}

async function requestCameraPermission() {
  if (!navigator.mediaDevices?.getUserMedia) {
    $("#permissionStatus").textContent = "이 환경에서는 카메라를 사용할 수 없어요. 사진 선택을 이용해 주세요.";
    return;
  }
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:"environment" }, audio:false });
    $("#cameraPreview").srcObject = cameraStream;
    $("#photoPreview").classList.add("camera-on");
    $("#capturePhoto").hidden = false;
    $("#requestCamera").textContent = "카메라 허용됨";
    $("#permissionStatus").textContent = "카메라 사용이 허용됐어요. 촬영하기를 눌러 배경으로 적용하세요.";
  } catch {
    $("#permissionStatus").textContent = "카메라 권한이 허용되지 않았어요. 기기 설정에서 허용하거나 사진 선택을 이용해 주세요.";
  }
}

function captureCameraPhoto() {
  const video = $("#cameraPreview"), canvas = $("#cameraCanvas");
  canvas.width = video.videoWidth || 1280;
  canvas.height = video.videoHeight || 720;
  canvas.getContext("2d").drawImage(video,0,0,canvas.width,canvas.height);
  setBackgroundPhoto(canvas.toDataURL("image/jpeg",.78));
  stopCamera();
}

function processPhotoFile(file) {
  if (!file.type.startsWith("image/")) return showToast("이미지 파일을 선택해 주세요.");
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const max=1600, scale=Math.min(1,max/Math.max(image.width,image.height));
      const canvas=document.createElement("canvas");
      canvas.width=Math.round(image.width*scale); canvas.height=Math.round(image.height*scale);
      canvas.getContext("2d").drawImage(image,0,0,canvas.width,canvas.height);
      setBackgroundPhoto(canvas.toDataURL("image/jpeg",.78));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function setBackgroundPhoto(dataUrl) {
  data.settings.backgroundPhoto = dataUrl;
  save();
  updatePhotoPreview();
  applyAppearance();
  showToast("배경 사진을 적용했어요.");
}

function updatePhotoPreview() {
  const preview=$("#photoPreview"), photo=data.settings.backgroundPhoto;
  preview.classList.toggle("has-photo",!!photo);
  preview.style.backgroundImage=photo ? `url("${photo}")` : "none";
}

function stopCamera() {
  cameraStream?.getTracks().forEach(track=>track.stop());
  cameraStream=null;
  $("#cameraPreview").srcObject=null;
  $("#photoPreview").classList.remove("camera-on");
  $("#capturePhoto").hidden=true;
  $("#requestCamera").textContent="📷 카메라 권한 요청";
}

function showPage(page) {
  $$(".page").forEach(el => el.classList.remove("active"));
  $(`#${page}Page`).classList.add("active");
  $$(".nav-item").forEach(el => el.classList.toggle("active", el.dataset.page === page));
  $(".sidebar").classList.remove("open");
  const titles = {
    home: '좋은 아침이에요! <span>오늘도 한 걸음 👋</span>',
    study: '공부 기록 <span>쌓인 시간이 실력이 됩니다</span>',
    curriculum: '커리큘럼 관리 <span>끝낼 분량을 먼저 정리해요</span>',
    auto: '오늘의 자동 계획 <span>무엇을 얼마나 할지 계산했어요</span>',
    planner: '스터디 플래너 <span>오늘 공부를 시간표로 배치하세요</span>',
    review: '오답 · 복습 <span>틀린 이유를 기억하세요</span>',
    words: '영어 단어 <span>매일 한 DAY씩</span>',
    stats: '학습 통계 <span>성장을 숫자로 확인하세요</span>',
    settings: '꾸미기 · 설정 <span>내 방식대로 바꾸세요</span>',
    trash: '휴지통 <span>삭제한 기록을 관리하세요</span>'
  };
  $("#pageTitle").innerHTML = titles[page];
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  renderHome(); renderStudy(); renderCurriculum(); renderAutoPlan(); renderStudyPlanner(); renderReviews(); renderWords(); renderStats(); renderSettings(); renderTodos(); renderTrash();
  $("#reviewBadge").textContent = data.reviews.filter(r => !r.done && r.revisit <= todayKey).length;
  $("#trashBadge").textContent = data.trash.length;
}

function renderHome() {
  const todayStudy = data.study.filter(s => s.date === todayKey);
  const total = sum(todayStudy, "studyMin"), net = sum(todayStudy, "netMin"), goal = data.settings.dailyGoal;
  const rate = Math.min(100, Math.round(net / goal * 100)) || 0;
  const exam = new Date(`${data.settings.examDate}T00:00:00`);
  const dday = Math.ceil((exam - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
  $("#examTitleHome").textContent = data.settings.examTitle;
  $("#ddayNumber").textContent = dday >= 0 ? `D-${dday}` : `D+${Math.abs(dday)}`;
  $("#goalRing").style.setProperty("--percent", rate);
  $("#goalPercent").textContent = `${rate}%`;
  $("#todayNet").textContent = Math.floor(net / 60);
  $("#todayNetMin").textContent = net % 60;
  $("#netProgress").style.width = `${rate}%`;
  $("#dailyGoalLabel").textContent = minutesText(goal);
  $("#remainingTime").textContent = net >= goal ? "목표를 달성했어요!" : `${minutesText(goal-net)} 남았어요`;
  $("#todayTotal").textContent = minutesText(total);
  $("#todayRecordCount").textContent = `${todayStudy.length}개 기록`;
  $("#goalRate").textContent = `${rate}%`;
  $("#goalComparison").textContent = rate >= 100 ? "오늘 목표 달성!" : rate >= 60 ? "좋은 흐름이에요" : "조금만 더 힘내요";

  const weekly = data.study.filter(s => inCurrentWeek(s.date));
  $("#weeklyTotal").textContent = minutesText(sum(weekly, "studyMin"));
  $("#weeklyComparison").textContent = `${weekly.length}개 학습 기록`;
  const nextWord = data.words.find(w => !w.done) || data.words[data.words.length - 1];
  $("#todayWordDay").textContent = `DAY ${pad(nextWord?.day || 1)}`;
  $("#wordStatus").textContent = nextWord?.done ? "학습 완료" : "학습 전";

  const subjectTotals = Object.keys(subjects).map(name => ({
    name, min: sum(todayStudy.filter(s => s.subject === name), "studyMin"), color: subjectInfo(name).color
  }));
  const max = Math.max(...subjectTotals.map(s => s.min), 1);
  $("#subjectBars").innerHTML = subjectTotals.map(s => `
    <div class="subject-row">
      <div class="subject-name"><i class="subject-dot" style="background:${s.color}"></i>${s.name}</div>
      <div class="progress-track" style="--bar-color:${s.color}"><i style="width:${s.min/max*100}%"></i></div>
      <div class="subject-time">${shortTime(s.min)}</div>
    </div>`).join("");
  renderTodayReviews();
  renderWeeklyChart("#weeklyChart");
  renderDayPlanner();
  renderHomeAutoPlan();
}

function bindTimer() {
  $("#timerStart").addEventListener("click", startOrResumeTimer);
  $("#timerPause").addEventListener("click", pauseTimer);
  $("#timerFinish").addEventListener("click", finishTimer);
}

function timerElapsedMs() {
  if (!activeTimer) return 0;
  return (activeTimer.elapsedMs || 0) + (activeTimer.running ? Date.now() - activeTimer.startedAt : 0);
}

function formatTimer(ms) {
  const total = Math.floor(ms / 1000);
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor(total % 3600 / 60))}:${pad(total % 60)}`;
}

function persistTimer() {
  if (activeTimer) localStorage.setItem("taxPlannerActiveTimerV1", JSON.stringify(activeTimer));
  else localStorage.removeItem("taxPlannerActiveTimerV1");
}

function startOrResumeTimer() {
  if (!activeTimer) {
    const detail = $("#timerDetail").value.trim();
    if (!detail) {
      $("#timerDetail").focus();
      showToast("세부영역을 먼저 입력해 주세요.");
      return;
    }
    activeTimer = {
      subject: $("#timerSubject").value,
      detail,
      type: $("#timerType").value,
      firstStartedAt: Date.now(),
      startedAt: Date.now(),
      elapsedMs: 0,
      running: true
    };
  } else if (!activeTimer.running) {
    activeTimer.startedAt = Date.now();
    activeTimer.running = true;
  }
  persistTimer();
  restoreTimer();
  showToast("집중 타이머를 시작했어요!");
}

function pauseTimer() {
  if (!activeTimer?.running) return;
  activeTimer.elapsedMs = timerElapsedMs();
  activeTimer.running = false;
  delete activeTimer.startedAt;
  persistTimer();
  restoreTimer();
  showToast("잠시 멈췄어요. 쉰 시간은 순공시간에 포함되지 않아요.");
}

function finishTimer() {
  if (!activeTimer) return;
  const elapsed = timerElapsedMs();
  if (elapsed < 1000) {
    showToast("1초 이상 공부한 뒤 종료해 주세요.");
    return;
  }
  const start = new Date(activeTimer.firstStartedAt);
  const end = new Date();
  const minutes = Math.max(1, Math.round(elapsed / 60000));
  data.study.push({
    id: Date.now(),
    date: dateKey(start),
    subject: activeTimer.subject,
    detail: activeTimer.detail,
    type: activeTimer.type,
    studyMin: minutes,
    netMin: minutes,
    solved: 0,
    wrong: 0,
    rounds: 0,
    memo: "집중 타이머로 기록",
    startTime: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
    endTime: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
    timerRecord: true
  });
  activeTimer = null;
  persistTimer();
  save();
  restoreTimer();
  renderAll();
  showToast(`${minutesText(minutes)} 공부 기록을 저장했어요!`);
}

function restoreTimer() {
  clearInterval(timerTicker);
  const hasTimer = !!activeTimer;
  $("#timerSubject").disabled = hasTimer;
  $("#timerDetail").disabled = hasTimer;
  $("#timerType").disabled = hasTimer;
  $("#timerPause").disabled = !activeTimer?.running;
  $("#timerFinish").disabled = !hasTimer;
  $("#timerStart").disabled = !!activeTimer?.running;
  $("#timerStart").textContent = hasTimer ? "▶ 다시 시작" : "▶ 공부 시작";
  $("#timerState").textContent = activeTimer?.running ? "집중 중" : hasTimer ? "일시정지" : "준비";
  $("#timerCard").classList.toggle("running", !!activeTimer?.running);
  if (hasTimer) {
    $("#timerSubject").value = activeTimer.subject;
    $("#timerDetail").value = activeTimer.detail;
    $("#timerType").value = activeTimer.type;
    $("#timerCurrent").textContent = `${activeTimer.subject} · ${activeTimer.detail} · ${activeTimer.type}`;
  } else {
    $("#timerDisplay").textContent = "00:00:00";
    $("#timerCurrent").textContent = "과목과 세부영역을 고르고 시작해 보세요.";
  }
  const tick = () => {
    $("#timerDisplay").textContent = formatTimer(timerElapsedMs());
    if ($("#homePage").classList.contains("active")) renderDayPlanner();
  };
  if (hasTimer) tick();
  if (activeTimer?.running) timerTicker = setInterval(tick, 1000);
}

function renderDayPlanner() {
  const todayRows = data.study.filter(s => s.date === todayKey);
  const timed = todayRows
    .filter(s => s.startTime)
    .slice().sort((a,b) => a.startTime.localeCompare(b.startTime));
  const plannerRows = timed.map(s => ({
    ...s, live: false, duration: shortTime(s.netMin), time: `${s.startTime}–${s.endTime}`
  }));
  todayRows.filter(s => !s.startTime).forEach(s => plannerRows.push({
    ...s, live: false, duration: shortTime(s.netMin), time: "시간 미지정"
  }));
  if (activeTimer && dateKey(new Date(activeTimer.firstStartedAt)) === todayKey) {
    const start = new Date(activeTimer.firstStartedAt);
    plannerRows.push({
      subject: activeTimer.subject,
      detail: activeTimer.detail,
      type: activeTimer.type,
      live: true,
      duration: formatTimer(timerElapsedMs()),
      time: `${pad(start.getHours())}:${pad(start.getMinutes())}–진행 중`
    });
  }
  $("#plannerTotal").textContent = minutesText(sum(todayRows, "netMin"));
  $("#plannerLegend").innerHTML = Object.entries(subjects).map(([name, info]) =>
    `<span><i style="background:${info.color}"></i>${name}</span>`).join("");
  $("#plannerTimeline").innerHTML = plannerRows.length ? plannerRows.map(s => `
    <div class="plan-item ${s.live ? "live" : ""}" style="--plan-color:${subjectInfo(s.subject).color}">
      <span class="plan-time">${s.time}</span>
      <i class="plan-color"></i>
      <div class="plan-copy"><strong>${s.detail}</strong><span>${s.subject} · ${s.type}</span></div>
      <span class="plan-duration">${s.duration}</span>
    </div>`).join("") : `<div class="empty-state">타이머로 공부를 시작하면<br>과목별 색상으로 오늘의 일정이 쌓여요.</div>`;
}

function bindTodos() {
  $("#todoAddForm").addEventListener("submit", event => {
    event.preventDefault();
    const text=$("#todoText").value.trim();
    if (!text) return;
    const existing=data.todos.find(todo=>todo.id===editingTodoId);
    const values={ text, subject:$("#todoSubject").value, time:$("#todoTime").value, date:todayKey };
    if (existing) Object.assign(existing,values);
    else data.todos.push({ id:Date.now(), ...values, done:false });
    editingTodoId=null;
    event.target.reset();
    save(); renderAll();
    event.target.querySelector("button").textContent="＋ 추가";
    showToast(existing ? "할 일을 수정했어요." : "오늘 할 일을 추가했어요.");
  });
  $("#todoList").addEventListener("change", event => {
    const input=event.target.closest("[data-todo-check]");
    if (!input) return;
    const todo=data.todos.find(item=>item.id===+input.dataset.todoCheck);
    if (todo) { todo.done=input.checked; save(); renderAll(); }
  });
  $("#todoList").addEventListener("click", event => {
    const edit=event.target.closest("[data-todo-edit]");
    const remove=event.target.closest("[data-todo-delete]");
    if (edit) editTodo(+edit.dataset.todoEdit);
    if (remove) moveToTrash("todos",+remove.dataset.todoDelete);
  });
}

function renderTodos() {
  const rows=data.todos.filter(todo=>todo.date===todayKey).sort((a,b)=>(a.done-b.done)||(a.time||"99:99").localeCompare(b.time||"99:99"));
  const completed=rows.filter(todo=>todo.done).length;
  $("#todoProgress").textContent=`${completed} / ${rows.length} 완료`;
  $("#todoList").innerHTML=rows.length ? rows.map(todo=>`
    <div class="todo-item ${todo.done?"done":""}" style="--todo-color:${todo.subject ? subjectInfo(todo.subject).color : "var(--green)"}">
      <input type="checkbox" data-todo-check="${todo.id}" ${todo.done?"checked":""} aria-label="완료">
      <i class="todo-color"></i>
      <div class="todo-copy"><strong>${escapeHtml(todo.text)}</strong><span>${escapeHtml(todo.subject||"공통")}${todo.time?` · ${todo.time}`:""}</span></div>
      <div class="todo-actions"><button class="mini-action" data-todo-edit="${todo.id}" title="수정">✎</button><button class="mini-action danger" data-todo-delete="${todo.id}" title="휴지통">🗑</button></div>
    </div>`).join("") : `<div class="empty-state">오늘 해야 할 일을 추가해 보세요.</div>`;
}

function editTodo(id) {
  const todo=data.todos.find(item=>item.id===id);
  if (!todo) return;
  editingTodoId=id;
  $("#todoSubject").value=todo.subject||"";
  $("#todoText").value=todo.text;
  $("#todoTime").value=todo.time||"";
  $("#todoAddForm button").textContent="수정 저장";
  $("#todoText").focus();
}

function bindCurriculumPlanner() {
  $("#refreshAutoPlan")?.addEventListener("click", () => { renderAutoPlan(); renderHomeAutoPlan(); showToast("오늘 계획을 다시 계산했어요."); });
  $("#buildPlannerFromAuto")?.addEventListener("click", buildPlannerFromAuto);
  $("#createPlannerFromAuto")?.addEventListener("click", buildPlannerFromAuto);
  $("#homeBuildPlanner")?.addEventListener("click", buildPlannerFromAuto);
  $("#carryOverToToday")?.addEventListener("click", carryOverToToday);
  $("#curriculumList")?.addEventListener("click", event => {
    const edit=event.target.closest("[data-edit-curriculum]");
    const remove=event.target.closest("[data-delete-curriculum]");
    if (edit) { editingCurriculumId=+edit.dataset.editCurriculum; openModal("curriculum"); }
    if (remove) moveToTrash("curriculum",+remove.dataset.deleteCurriculum);
  });
  $("#studyPlannerTable")?.addEventListener("change", event => {
    const input=event.target.closest("[data-plan-check]");
    if (!input) return;
    toggleStudyPlanDone(+input.dataset.planCheck,input.checked);
  });
  $("#studyPlannerTable")?.addEventListener("click", event => {
    const edit=event.target.closest("[data-edit-plan]");
    const remove=event.target.closest("[data-delete-plan]");
    if (edit) { editingPlannerId=+edit.dataset.editPlan; openModal("planner"); }
    if (remove) moveToTrash("studyPlans",+remove.dataset.deletePlan);
  });
}

function inclusiveDaysUntil(date) {
  const end=new Date(`${date}T00:00:00`);
  const start=new Date(`${todayKey}T00:00:00`);
  return Math.max(1,Math.ceil((end-start)/86400000)+1);
}

function completedTotal(item) {
  return Math.min((+item.total||0)*(+item.targetRounds||1), (+item.currentRounds||0)*(+item.total||0)+(+item.completed||0));
}

function curriculumProgress(item) {
  const target=(+item.total||0)*(+item.targetRounds||1);
  const done=completedTotal(item);
  const remaining=Math.max(0,target-done);
  const rate=target ? Math.round(done/target*100) : 0;
  return { target, done, remaining, rate, daysLeft:inclusiveDaysUntil(item.deadline||todayKey) };
}

function priorityWeight(priority) {
  return priority==="높음" ? 1.18 : priority==="낮음" ? .82 : 1;
}

function priorityScore(priority) {
  return priority==="높음" ? 0 : priority==="낮음" ? 2 : 1;
}

function formatQty(qty, unit) {
  const rounded=Math.max(0,Math.ceil(qty));
  return `${rounded}${unit}`;
}

function formatPlanRange(item, qty) {
  const unit=item.unit||"개";
  const rounded=Math.max(0,Math.ceil(qty));
  if (unit==="DAY") {
    const start=(+item.completed||0)+1;
    const end=start+rounded-1;
    return start===end ? `DAY ${start}` : `DAY ${start}~${end}`;
  }
  return formatQty(rounded,unit);
}

function getAutoPlan() {
  const active=data.curriculum.filter(item => curriculumProgress(item).remaining > 0);
  const items=active.map(item => {
    const progress=curriculumProgress(item);
    const average=progress.remaining/progress.daysLeft;
    const recommended=Math.min(progress.remaining,Math.max(1,Math.ceil(average*priorityWeight(item.priority))));
    const minimum=Math.min(progress.remaining,Math.max(1,Math.ceil(recommended*.5)));
    const stretch=Math.min(progress.remaining,Math.max(recommended,Math.ceil(recommended*1.3)));
    const estimatedMin=+item.estimatedMin||0;
    return {
      curriculumId:item.id, subject:item.subject, detail:item.detail, name:item.name, type:item.type,
      unit:item.unit, priority:item.priority, deadline:item.deadline, remaining:progress.remaining,
      daysLeft:progress.daysLeft, average, minimum, recommended, stretch, estimatedMin,
      minText:formatPlanRange(item,minimum), recommendedText:formatPlanRange(item,recommended), stretchText:formatPlanRange(item,stretch),
      recommendedTime:Math.round(recommended*estimatedMin), minTime:Math.round(minimum*estimatedMin), stretchTime:Math.round(stretch*estimatedMin)
    };
  }).sort((a,b)=>priorityScore(a.priority)-priorityScore(b.priority) || a.deadline.localeCompare(b.deadline));
  const carryovers=getCarryovers();
  const totalTime=sum(items,"recommendedTime")+sum(carryovers,"estimatedMinutes");
  const warnings=[];
  if (totalTime > data.settings.dailyGoal) warnings.push(`현재 남은 커리큘럼을 마감일까지 끝내려면 오늘 약 ${minutesText(totalTime)}이 필요합니다. 설정한 하루 공부 가능 시간은 ${minutesText(data.settings.dailyGoal)}입니다. 마감일을 늦추거나, 목표 회독 수를 줄이거나, 우선순위가 낮은 커리큘럼을 조정해 보세요.`);
  items.filter(item=>item.daysLeft<=3 && item.remaining>item.recommended).forEach(item=>warnings.push(`${item.name} 마감이 ${item.daysLeft}일 남았어요. 오늘 권장량은 ${formatQty(item.recommended,item.unit)}입니다.`));
  return { items, carryovers, totalTime, warnings };
}

function getCarryovers() {
  return data.studyPlans
    .filter(plan=>plan.date < todayKey && !plan.done)
    .map(plan=>({
      ...plan,
      displayAmount:plan.amountText || `${plan.amountValue||""}${plan.unit||""}`,
      estimatedMinutes:diffMinutes(plan.startTime,plan.endTime) || Math.round((+plan.amountValue||1)*(+plan.estimatedMin||30))
    }))
    .sort((a,b)=>a.date.localeCompare(b.date)||(a.startTime||"").localeCompare(b.startTime||""));
}

function renderHomeAutoPlan() {
  const plan=getAutoPlan();
  const recommended=plan.items.slice(0,4);
  $("#homeAutoPlan").innerHTML=recommended.length ? recommended.map(item=>compactAutoItem(item,item.recommendedText,item.recommendedTime)).join("") : `<div class="empty-state">커리큘럼을 추가하면 오늘 계획이 자동으로 보여요.</div>`;
  $("#homeMinPlan").innerHTML=plan.items.slice(0,3).map(item=>compactAutoItem(item,item.minText,item.minTime)).join("") || `<div class="empty-state">최소 목표가 없어요.</div>`;
  $("#homeCarryover").innerHTML=plan.carryovers.length ? `미완료 이월 ${plan.carryovers.length}개가 있어요.` : `이월된 공부가 없어요. 산뜻하네요.`;
  $("#curriculumProgressHome").innerHTML=data.curriculum.slice(0,4).map(item=>{
    const p=curriculumProgress(item);
    return `<div class="compact-progress"><span>${escapeHtml(item.name)}</span><div class="progress-track"><i style="width:${p.rate}%"></i></div><b>${p.rate}%</b></div>`;
  }).join("") || `<div class="empty-state">등록된 커리큘럼이 없어요.</div>`;
  $("#overloadHome").innerHTML=plan.warnings[0] ? `⚠ ${escapeHtml(plan.warnings[0])}` : "";
  $("#overloadHome").classList.toggle("show",!!plan.warnings[0]);
}

function compactAutoItem(item, amount, minutes) {
  return `<div class="compact-plan" style="--plan-color:${subjectInfo(item.subject).color}"><i></i><span>${escapeHtml(item.subject)} · ${escapeHtml(item.detail)}</span><b>${escapeHtml(amount)}</b><small>${minutes?minutesText(minutes):"시간 미정"}</small></div>`;
}

function renderCurriculum() {
  const rows=data.curriculum.slice().sort((a,b)=>a.deadline.localeCompare(b.deadline));
  const totalRemaining=rows.reduce((acc,item)=>acc+curriculumProgress(item).remaining,0);
  const completed=rows.filter(item=>curriculumProgress(item).remaining<=0).length;
  $("#curriculumSummary").innerHTML=[
    ["등록 커리큘럼",`${rows.length}개`],["완료",`${completed}개`],["남은 분량",`${Math.ceil(totalRemaining)}단위`],["하루 가능 시간",minutesText(data.settings.dailyGoal)]
  ].map(x=>`<div class="summary-card"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  $("#curriculumList").innerHTML=rows.length ? rows.map(item=>{
    const p=curriculumProgress(item);
    const need=Math.ceil(p.remaining/p.daysLeft);
    return `<article class="curriculum-card" style="--subject-color:${subjectInfo(item.subject).color}">
      <div class="curriculum-card-head"><span>${escapeHtml(item.subject)} · ${escapeHtml(item.type)}</span><b>${escapeHtml(item.priority)}</b></div>
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.detail||"세부영역 없음")} · 마감 ${escapeHtml(item.deadline)} · ${p.daysLeft}일 남음</p>
      <div class="progress-track"><i style="width:${p.rate}%"></i></div>
      <div class="curriculum-meta"><span>${p.rate}% 완료</span><span>남은 분량 ${Math.ceil(p.remaining)}${escapeHtml(item.unit)}</span><span>하루 평균 ${need}${escapeHtml(item.unit)}</span></div>
      <div class="curriculum-actions"><button class="secondary-button" data-edit-curriculum="${item.id}">수정</button><button class="mini-action danger" data-delete-curriculum="${item.id}" title="휴지통">🗑</button></div>
    </article>`;
  }).join("") : `<div class="empty-state">아직 커리큘럼이 없어요. 영어 단어 DAY, 세법 기출처럼 하나씩 추가해 보세요.</div>`;
}

function autoPlanRow(item, target, amount, minutes) {
  return `<div class="auto-plan-row" style="--subject-color:${subjectInfo(item.subject).color}">
    <i></i><div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.subject)} · ${escapeHtml(item.detail)} · 남은 ${Math.ceil(item.remaining)}${escapeHtml(item.unit)} · ${item.daysLeft}일</span></div>
    <b>${escapeHtml(amount)}</b><small>${minutes?minutesText(minutes):"시간 미정"}</small>
  </div>`;
}

function renderAutoPlan() {
  const plan=getAutoPlan();
  $("#autoWarnings").innerHTML=plan.warnings.map(w=>`<div class="warning-box">⚠ ${escapeHtml(w)}</div>`).join("");
  $("#minimumPlan").innerHTML=plan.items.length ? plan.items.map(item=>autoPlanRow(item,"minimum",item.minText,item.minTime)).join("") : `<div class="empty-state">진행 중인 커리큘럼이 없어요.</div>`;
  $("#recommendedPlan").innerHTML=plan.items.length ? plan.items.map(item=>autoPlanRow(item,"recommended",item.recommendedText,item.recommendedTime)).join("") : `<div class="empty-state">커리큘럼을 추가하면 권장 목표를 계산해요.</div>`;
  $("#stretchPlan").innerHTML=plan.items.length ? plan.items.map(item=>autoPlanRow(item,"stretch",item.stretchText,item.stretchTime)).join("") : `<div class="empty-state">초과 목표가 없어요.</div>`;
  $("#carryoverList").innerHTML=plan.carryovers.length ? plan.carryovers.map(item=>`
    <div class="auto-plan-row carry" style="--subject-color:${subjectInfo(item.subject).color}">
      <i></i><div><strong>${escapeHtml(item.subject)} · ${escapeHtml(item.detail)}</strong><span>${escapeHtml(item.date)} 미완료</span></div>
      <b>${escapeHtml(item.displayAmount)}</b><small>${item.estimatedMinutes?minutesText(item.estimatedMinutes):"시간 미정"}</small>
    </div>`).join("") : `<div class="empty-state">미완료 이월 항목이 없습니다.</div>`;
}

function timeToMinutes(value) {
  const [h,m]=String(value||"09:00").split(":").map(Number);
  return h*60+m;
}

function minutesToTime(min) {
  min=((min%1440)+1440)%1440;
  return `${pad(Math.floor(min/60))}:${pad(min%60)}`;
}

function diffMinutes(start,end) {
  if(!start||!end) return 0;
  return Math.max(0,timeToMinutes(end)-timeToMinutes(start));
}

function buildPlannerFromAuto() {
  const auto=getAutoPlan();
  if(!auto.items.length && !auto.carryovers.length) return showToast("시간표로 만들 자동 계획이 없어요.");
  const existing=data.studyPlans.filter(plan=>plan.date===todayKey && plan.generatedAuto);
  if(existing.length && !confirm("오늘 자동 생성된 시간표를 새로 만들까요? 기존 자동 시간표는 교체됩니다.")) return;
  data.studyPlans=data.studyPlans.filter(plan=>!(plan.date===todayKey && plan.generatedAuto));
  let cursor=timeToMinutes(data.settings.plannerStart||"09:00");
  const breakMin=+data.settings.plannerBreak||10;
  const rows=[
    ...auto.carryovers.map(item=>({
      subject:item.subject, detail:item.detail, type:item.type, amountValue:+item.amountValue||1,
      amountText:item.displayAmount, unit:item.unit, curriculumId:item.curriculumId, estimatedMin:item.estimatedMin,
      memo:`${item.date} 미완료 이월`
    })),
    ...auto.items.map(item=>({
      subject:item.subject, detail:item.detail, type:item.type, amountValue:item.recommended,
      amountText:item.recommendedText, unit:item.unit, curriculumId:item.curriculumId, estimatedMin:item.estimatedMin,
      memo:"자동 분배 권장 목표"
    }))
  ];
  rows.forEach(row=>{
    const duration=Math.max(25,Math.round((+row.amountValue||1)*(+row.estimatedMin||30)));
    const start=minutesToTime(cursor), end=minutesToTime(cursor+duration);
    data.studyPlans.push({ id:Date.now()+Math.random(), date:todayKey, startTime:start, endTime:end, done:false, generatedAuto:true, ...row });
    cursor+=duration+breakMin;
  });
  save(); renderAll(); showPage("planner"); showToast("오늘 스터디 플래너를 자동으로 만들었어요.");
}

function carryOverToToday() {
  const carryovers=getCarryovers();
  if(!carryovers.length) return showToast("이월할 미완료 항목이 없어요.");
  let cursor=timeToMinutes(data.settings.plannerStart||"09:00");
  data.studyPlans.filter(plan=>plan.date===todayKey).forEach(plan=>{ cursor=Math.max(cursor,timeToMinutes(plan.endTime||plan.startTime||"09:00")+10); });
  carryovers.forEach(item=>{
    const duration=item.estimatedMinutes||Math.round((+item.amountValue||1)*(+item.estimatedMin||30));
    const start=minutesToTime(cursor), end=minutesToTime(cursor+duration);
    data.studyPlans.push({ ...item, id:Date.now()+Math.random(), date:todayKey, startTime:start, endTime:end, done:false, generatedAuto:true, memo:`${item.date} 미완료 이월` });
    cursor+=duration+(+data.settings.plannerBreak||10);
  });
  save(); renderAll(); showPage("planner"); showToast("미완료 항목을 오늘 시간표에 추가했어요.");
}

function renderStudyPlanner() {
  const rows=data.studyPlans.filter(plan=>plan.date===todayKey).sort((a,b)=>(a.startTime||"").localeCompare(b.startTime||""));
  const done=rows.filter(row=>row.done).length;
  const totalMin=rows.reduce((acc,row)=>acc+diffMinutes(row.startTime,row.endTime),0);
  $("#plannerSummary").innerHTML=[
    ["오늘 시간표",`${rows.length}개`],["완료",`${done}개`],["예정 시간",minutesText(totalMin)],["달성률",`${rows.length?Math.round(done/rows.length*100):0}%`]
  ].map(x=>`<div class="summary-card"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  $("#studyPlannerTable").innerHTML=rows.length ? rows.map(row=>`
    <tr class="${row.done?"done-row":""}">
      <td>${escapeHtml(row.startTime||"")}~${escapeHtml(row.endTime||"")}</td>
      <td><strong>${escapeHtml(row.subject)}</strong><br><span>${escapeHtml(row.detail||"")}</span></td>
      <td>${escapeHtml(row.type||"")}</td>
      <td>${escapeHtml(row.amountText || `${row.amountValue||""}${row.unit||""}`)}</td>
      <td><label class="mini-check"><input type="checkbox" data-plan-check="${row.id}" ${row.done?"checked":""}> 완료</label></td>
      <td>${escapeHtml(row.memo||"")}</td>
      <td><button class="mini-action" data-edit-plan="${row.id}" title="수정">✎</button><button class="mini-action danger" data-delete-plan="${row.id}" title="휴지통">🗑</button></td>
    </tr>`).join("") : `<tr><td colspan="7"><div class="empty-state">자동 계획을 시간표로 배치하거나 직접 일정을 추가해 보세요.</div></td></tr>`;
}

function toggleStudyPlanDone(id,done) {
  const plan=data.studyPlans.find(row=>row.id===id);
  if(!plan) return;
  if(plan.done===done) return;
  plan.done=done;
  adjustCurriculumProgress(plan,done ? 1 : -1);
  save(); renderAll(); showToast(done ? "완료 처리했어요. 커리큘럼 진행률도 반영됐어요." : "완료를 해제했어요.");
}

function adjustCurriculumProgress(plan,direction) {
  if(!plan.curriculumId) return;
  const item=data.curriculum.find(row=>row.id===plan.curriculumId);
  if(!item) return;
  item.completed=Math.max(0,(+item.completed||0)+direction*(+plan.amountValue||0));
  while(item.completed >= item.total && item.total > 0 && item.currentRounds < item.targetRounds) {
    item.completed-=item.total;
    item.currentRounds++;
  }
  if(direction<0 && item.completed===0 && item.currentRounds>0) {
    item.currentRounds--;
    item.completed=Math.max(0,item.total-(+plan.amountValue||0));
  }
}

function renderTodayReviews() {
  const items = data.reviews.filter(r => !r.done && r.revisit <= todayKey).slice(0, 4);
  $("#todayReviews").innerHTML = items.length ? items.map(r => `
    <label class="review-item">
      <input type="checkbox" data-review-check="${r.id}">
      <div><strong>${r.detail}</strong><span>${r.subject} · ${r.source}</span></div>
      <span class="importance">중요 ${r.importance}</span>
    </label>`).join("") : `<div class="empty-state">오늘 예정된 복습을 모두 끝냈어요 🎉</div>`;
  $$("[data-review-check]").forEach(input => input.addEventListener("change", () => completeReview(+input.dataset.reviewCheck)));
}

function getWeekDays() {
  const start = weekStart();
  return Array.from({length:7}, (_, i) => { const d = new Date(start); d.setDate(d.getDate()+i); return d; });
}
function renderWeeklyChart(selector) {
  const days = getWeekDays(), labels = ["월","화","수","목","금","토","일"];
  const values = days.map(d => {
    const rows = data.study.filter(s => s.date === dateKey(d));
    return { total: sum(rows,"studyMin"), net: sum(rows,"netMin") };
  });
  const max = Math.max(...values.map(v => v.total), data.settings.dailyGoal, 1);
  $(selector).innerHTML = values.map((v,i) => `
    <div class="chart-day ${dateKey(days[i]) === todayKey ? "today" : ""}">
      <div class="chart-bars">
        <i class="chart-bar" title="총 ${minutesText(v.total)}" style="height:${v.total/max*100}%"></i>
        <i class="chart-bar net" title="순공 ${minutesText(v.net)}" style="height:${v.net/max*100}%"></i>
      </div><label>${labels[i]}</label>
    </div>`).join("");
}

function renderStudy() {
  const rows = (currentStudyFilter === "전체" ? data.study : data.study.filter(s => s.subject === currentStudyFilter))
    .slice().sort((a,b) => b.date.localeCompare(a.date) || b.id-a.id);
  const total = sum(rows,"studyMin"), net = sum(rows,"netMin"), solved = sum(rows,"solved"), wrong = sum(rows,"wrong");
  const accuracy = solved ? Math.round((solved-wrong)/solved*100) : 0;
  $("#studySummary").innerHTML = [
    ["총 공부시간", minutesText(total)], ["순공시간", minutesText(net)],
    ["푼 문제", `${solved}문제`], ["평균 정답률", `${accuracy}%`]
  ].map(x => `<div class="summary-box"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  $("#studyTable").innerHTML = rows.length ? rows.map(s => {
    const acc = s.solved ? Math.round((s.solved-s.wrong)/s.solved*100) : "-";
    return `<tr>
      <td>${s.date.slice(5).replace("-",".")}</td><td><strong>${s.subject}</strong><small>${s.detail}</small></td>
      <td><span class="type-tag">${s.type}</span></td><td>${shortTime(s.studyMin)}</td><td>${shortTime(s.netMin)}</td>
      <td>${s.solved ? `${s.solved} / <span style="color:var(--coral)">${s.wrong}</span>` : "-"}</td><td>${acc}${acc !== "-" ? "%" : ""}</td>
      <td>${s.rounds}회독</td><td><button class="mini-action" data-edit-study="${s.id}" title="수정">✎</button> <button class="mini-action danger" data-delete-study="${s.id}" title="휴지통">🗑</button></td>
    </tr>`;
  }).join("") : `<tr><td colspan="9" class="empty-state">아직 기록이 없어요.</td></tr>`;
  $$("[data-edit-study]").forEach(btn => btn.addEventListener("click", () => { editingStudyId=+btn.dataset.editStudy; openModal("study"); }));
  $$("[data-delete-study]").forEach(btn => btn.addEventListener("click", () => moveToTrash("study", +btn.dataset.deleteStudy)));
}

function reviewCard(r) {
  return `<article class="review-card ${r.done ? "done" : ""}">
    <div class="review-card-top"><span class="subject-chip">${r.subject}</span><span class="importance-stars">${"★".repeat(r.importance)}${"☆".repeat(3-r.importance)}</span></div>
    <h4>${r.detail}</h4><p>${r.source}<br>${r.reason}</p>
    <div class="review-meta"><span>다시 보기 ${r.revisit.slice(5).replace("-",".")}</span>
      <span><button class="complete-button" data-review-edit="${r.id}">수정</button> · <button class="complete-button" data-review-delete="${r.id}">휴지통</button> · ${r.done ? `<button class="complete-button" data-review-toggle="${r.id}">되돌리기</button>` : `<button class="complete-button" data-review-toggle="${r.id}">✓ 복습 완료</button>`}</span>
    </div>
  </article>`;
}
function renderReviews() {
  const pending = data.reviews.filter(r => !r.done).sort((a,b) => a.revisit.localeCompare(b.revisit));
  const done = data.reviews.filter(r => r.done).sort((a,b) => b.revisit.localeCompare(a.revisit));
  $("#pendingCount").textContent = pending.length; $("#doneCount").textContent = done.length;
  $("#pendingReviews").innerHTML = pending.length ? pending.map(reviewCard).join("") : `<div class="empty-state">예정된 복습이 없어요.</div>`;
  $("#doneReviews").innerHTML = done.length ? done.map(reviewCard).join("") : `<div class="empty-state">완료한 복습이 여기에 쌓여요.</div>`;
  $$("[data-review-toggle]").forEach(btn => btn.addEventListener("click", () => completeReview(+btn.dataset.reviewToggle)));
  $$("[data-review-edit]").forEach(btn => btn.addEventListener("click", () => { editingReviewId=+btn.dataset.reviewEdit; openModal("review"); }));
  $$("[data-review-delete]").forEach(btn => btn.addEventListener("click", () => moveToTrash("reviews",+btn.dataset.reviewDelete)));
}
function completeReview(id) {
  const item = data.reviews.find(r => r.id === id);
  if (item) { item.done = !item.done; save(); renderAll(); showToast(item.done ? "복습을 완료했어요!" : "복습 예정으로 돌렸어요."); }
}

function bindQuizFeatures() {
  $("#startWordQuiz").addEventListener("click", startWordQuiz);
  $("#startReviewQuiz").addEventListener("click", startReviewQuiz);
  $("#wordQuizStage").addEventListener("click", handleWordQuizClick);
  $("#reviewQuizStage").addEventListener("click", handleReviewQuizClick);
  $("#wordQuizStage").addEventListener("keydown", event => {
    if (event.key === "Enter" && event.target.id === "wordQuizAnswer") checkWordQuizAnswer();
  });
}

function renderWords() {
  const completed = data.words.filter(w => w.done), reviewCount = sum(data.words,"reviews");
  const confused = getVocabularyBank().length;
  const maxDay = Math.max(...data.words.map(w => w.day), 0);
  $("#wordStats").innerHTML = [
    ["완료한 DAY", `${completed.length} DAY`], ["진행률", `${maxDay ? Math.round(completed.length/maxDay*100) : 0}%`],
    ["누적 복습", `${reviewCount}회`], ["헷갈린 단어", `${confused}개`]
  ].map(x => `<div class="word-stat"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  const rows = data.words.slice().sort((a,b)=>a.day-b.day);
  $("#wordGrid").innerHTML = rows.map(w => {
    const count = parseConfusedWords(w.confusedWords).length || +w.confused || 0;
    return `<article class="word-card ${w.done ? "done":""}">
      <div class="word-day"><strong>DAY ${pad(w.day)}</strong><span class="word-check">${w.done ? "✓" : ""}</span></div>
      <p>복습 <b>${w.reviews}회</b> · 시험 단어 <b>${count}개</b></p>
      <small>다시 보기 ${w.revisit ? w.revisit.slice(5).replace("-",".") : "미정"}</small>
      <div class="word-card-actions">
        <label class="word-complete-label"><input type="checkbox" data-word-complete="${w.id}" ${w.done ? "checked":""}> 완료</label>
        <button class="mini-action" data-word-edit="${w.id}" title="수정">✎</button>
        <button class="mini-action danger" data-word-delete="${w.id}" title="휴지통">🗑</button>
      </div>
    </article>`;
  }).join("") + `<button class="word-card add-day" data-add-word-day>＋ 새 DAY 추가</button>`;
  $$("[data-word-complete]").forEach(input => input.addEventListener("change", () => toggleWordComplete(+input.dataset.wordComplete)));
  $$("[data-word-edit]").forEach(button => button.addEventListener("click", () => openWordEditor(+button.dataset.wordEdit)));
  $$("[data-word-delete]").forEach(button => button.addEventListener("click", () => deleteWordDay(+button.dataset.wordDelete)));
  $("[data-add-word-day]").addEventListener("click", () => openModal("words"));
}

function toggleWordComplete(id) {
  const word = data.words.find(item => item.id === id);
  if (!word) return;
  word.done = !word.done;
  if (word.done) word.reviews = Math.max(1,+word.reviews||0);
  save();
  renderAll();
  showToast(word.done ? `DAY ${word.day} 완료!` : `DAY ${word.day} 완료를 취소했어요.`);
}

function openWordEditor(id) {
  editingWordId = id;
  openModal("words");
}

function deleteWordDay(id) {
  const word = data.words.find(item => item.id === id);
  if (!word) return;
  moveToTrash("words",id);
}

function parseConfusedWords(text="") {
  return text.split(/\r?\n|,/).map(line => line.trim()).filter(Boolean).map(line => {
    const parts = line.split(/\s*(?:=|:|\-|→)\s*/);
    return { word:(parts.shift() || "").trim(), meaning:parts.join(" - ").trim() };
  }).filter(item => item.word && item.meaning);
}

function getVocabularyBank() {
  return data.words.flatMap(day => parseConfusedWords(day.confusedWords).map(item => ({ ...item, day:day.day, recordId:day.id })));
}

function shuffled(items) {
  return items.slice().sort(() => Math.random() - .5);
}

function startWordQuiz() {
  const bank = getVocabularyBank();
  if (!bank.length) {
    $("#wordQuizStage").innerHTML = `<div class="empty-state">DAY 수정에서 헷갈린 단어를<br><b>영단어 = 뜻</b> 형식으로 먼저 입력해 주세요.</div>`;
    return;
  }
  const direction = $("#wordQuizDirection").value;
  wordQuiz = { items:shuffled(bank).slice(0,Math.min(20,bank.length)), index:0, correct:0, wrong:0, direction, answered:false };
  renderWordQuizQuestion();
}

function currentWordQuizDirection(item) {
  return wordQuiz.direction === "mixed" ? (wordQuiz.index % 2 ? "meaning" : "word") : wordQuiz.direction;
}

function renderWordQuizQuestion() {
  if (wordQuiz.index >= wordQuiz.items.length) return renderWordQuizResult();
  const item=wordQuiz.items[wordQuiz.index], direction=currentWordQuizDirection(item);
  const question=direction==="word" ? item.word : item.meaning;
  const label=direction==="word" ? "이 단어의 뜻은?" : "이 뜻에 맞는 영단어는?";
  $("#wordQuizStage").innerHTML = `
    <div class="quiz-progress"><span>${wordQuiz.index+1} / ${wordQuiz.items.length}</span><div class="progress-track"><i style="width:${wordQuiz.index/wordQuiz.items.length*100}%"></i></div><span>정답 ${wordQuiz.correct}</span></div>
    <div class="quiz-question"><span>${label}</span><strong>${escapeHtml(question)}</strong></div>
    <div class="quiz-answer-input"><input id="wordQuizAnswer" autocomplete="off" placeholder="정답을 입력하세요"><button class="primary-button" data-check-word>정답 확인</button></div>
    <div id="wordQuizFeedback"></div>
    <div class="quiz-source">DAY ${pad(item.day)}에서 출제</div>`;
  $("#wordQuizAnswer").focus();
}

function handleWordQuizClick(event) {
  if (event.target.closest("[data-check-word]")) checkWordQuizAnswer();
  if (event.target.closest("[data-next-word]")) { wordQuiz.index++; wordQuiz.answered=false; renderWordQuizQuestion(); }
  if (event.target.closest("[data-restart-word]")) startWordQuiz();
}

function normalizeAnswer(value) {
  return value.toLowerCase().replace(/[\s.,!?()[\]{}]/g,"");
}

function checkWordQuizAnswer() {
  if (!wordQuiz || wordQuiz.answered) return;
  const item=wordQuiz.items[wordQuiz.index], direction=currentWordQuizDirection(item);
  const expected=direction==="word" ? item.meaning : item.word;
  const entered=$("#wordQuizAnswer").value.trim();
  if (!entered) return showToast("정답을 입력해 주세요.");
  const acceptable=expected.split(/[\/;,]/).map(normalizeAnswer);
  const normalized=normalizeAnswer(entered);
  const correct=acceptable.some(answer => answer===normalized || (answer.length>2 && (answer.includes(normalized)||normalized.includes(answer))));
  wordQuiz.answered=true;
  if (correct) wordQuiz.correct++; else wordQuiz.wrong++;
  const record=data.words.find(day=>day.id===item.recordId);
  if (record) correct ? record.quizCorrect++ : record.quizWrong++;
  save();
  $("#wordQuizFeedback").innerHTML = `<div class="quiz-feedback ${correct?"correct":"wrong"}"><strong>${correct?"정답이에요!":"한 번 더 기억해요"}</strong>${escapeHtml(item.word)} = ${escapeHtml(item.meaning)}</div>
    <div class="quiz-controls"><button class="primary-button" data-next-word>${wordQuiz.index+1===wordQuiz.items.length?"결과 보기":"다음 문제"} →</button></div>`;
  $("#wordQuizAnswer").disabled=true;
}

function renderWordQuizResult() {
  const total=wordQuiz.items.length, rate=Math.round(wordQuiz.correct/total*100);
  $("#wordQuizStage").innerHTML = `<div class="quiz-result"><span class="section-kicker">TEST COMPLETE</span><strong>${rate}점</strong><p>${total}문제 중 ${wordQuiz.correct}개를 맞혔어요.<br>틀린 단어는 다음 시험에 다시 출제됩니다.</p><button class="primary-button" data-restart-word>다시 시험 보기</button></div>`;
}

function buildReviewQuestions() {
  return data.reviews.map(review => {
    const templates = [
      { question:`${review.detail}에서 가장 먼저 확인해야 할 핵심은 무엇인가요?`, answer:review.reason },
      { question:`${review.source} 문제를 다시 푼다면 어떤 실수를 피해야 하나요?`, answer:review.reason },
      { question:`${review.detail}의 풀이 원칙을 자신의 말로 설명해 보세요.`, answer:review.memo || `${review.reason}을(를) 점검하고 관련 개념을 다시 적용합니다.` }
    ];
    const chosen=templates[(review.id + review.quizAgain) % templates.length];
    return { ...chosen, reviewId:review.id, subject:review.subject, detail:review.detail, source:review.source };
  });
}

function startReviewQuiz() {
  const questions=shuffled(buildReviewQuestions());
  if (!questions.length) {
    $("#reviewQuizStage").innerHTML=`<div class="empty-state">오답을 먼저 등록하면 자동으로 문제를 만들 수 있어요.</div>`;
    return;
  }
  reviewQuiz={ items:questions.slice(0,Math.min(10,questions.length)), index:0, known:0, again:0, revealed:false };
  renderReviewQuizQuestion();
}

function renderReviewQuizQuestion() {
  if (reviewQuiz.index>=reviewQuiz.items.length) return renderReviewQuizResult();
  const item=reviewQuiz.items[reviewQuiz.index];
  $("#reviewQuizStage").innerHTML=`
    <div class="review-recall-box">
      <div class="quiz-progress"><span>${reviewQuiz.index+1} / ${reviewQuiz.items.length}</span><span>${escapeHtml(item.subject)} · ${escapeHtml(item.detail)}</span></div>
      <div class="quiz-question"><span>AI 회상 문제</span><strong>${escapeHtml(item.question)}</strong></div>
      <textarea id="reviewRecallAnswer" placeholder="기억나는 내용을 먼저 적어보세요."></textarea>
      <div class="quiz-controls"><button class="primary-button" data-reveal-review>모범 답안 확인</button></div>
      <div class="quiz-source">${escapeHtml(item.source)}</div>
    </div>`;
}

function handleReviewQuizClick(event) {
  if (event.target.closest("[data-reveal-review]")) revealReviewAnswer();
  const rating=event.target.closest("[data-review-rating]");
  if (rating) rateReviewAnswer(rating.dataset.reviewRating);
  if (event.target.closest("[data-restart-review]")) startReviewQuiz();
}

function revealReviewAnswer() {
  if (!reviewQuiz || reviewQuiz.revealed) return;
  const item=reviewQuiz.items[reviewQuiz.index];
  reviewQuiz.revealed=true;
  $("#reviewQuizStage .review-recall-box").insertAdjacentHTML("beforeend", `
    <div class="answer-reveal"><b>복습 포인트</b><br>${escapeHtml(item.answer)}</div>
    <div class="quiz-controls"><button class="secondary-button" data-review-rating="again">다시 복습</button><button class="primary-button" data-review-rating="known">기억했어요</button></div>`);
}

function rateReviewAnswer(rating) {
  const item=reviewQuiz.items[reviewQuiz.index], review=data.reviews.find(row=>row.id===item.reviewId);
  if (rating==="known") {
    reviewQuiz.known++;
    if (review) { review.quizKnown++; review.done=true; }
  } else {
    reviewQuiz.again++;
    if (review) { review.quizAgain++; review.done=false; review.revisit=offsetDate(1); }
  }
  save();
  reviewQuiz.index++; reviewQuiz.revealed=false;
  renderAll();
  renderReviewQuizQuestion();
}

function renderReviewQuizResult() {
  $("#reviewQuizStage").innerHTML=`<div class="quiz-result"><span class="section-kicker coral">REVIEW COMPLETE</span><strong>${reviewQuiz.known}개 기억</strong><p>다시 복습할 ${reviewQuiz.again}개 오답은 내일 복습 일정에 넣었어요.</p><button class="primary-button" data-restart-review>새 문제 만들기</button></div>`;
}

function renderStats() {
  const weekly = data.study.filter(s => inCurrentWeek(s.date));
  const total = sum(weekly,"studyMin"), net = sum(weekly,"netMin"), solved = sum(weekly,"solved"), wrong = sum(weekly,"wrong");
  const avgRate = solved ? Math.round((solved-wrong)/solved*100) : 0;
  const achievedDays = getWeekDays().filter(d => sum(data.study.filter(s => s.date === dateKey(d)),"netMin") >= data.settings.dailyGoal).length;
  $("#statsTop").innerHTML = [
    ["이번 주 공부", minutesText(total)], ["이번 주 순공", minutesText(net)],
    ["평균 정답률", `${avgRate}%`], ["목표 달성", `${achievedDays}일 / 7일`]
  ].map(x => `<div class="stats-card"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  renderWeeklyChart("#statsWeeklyChart");

  const totals = Object.keys(subjects).map(name => ({ name, min:sum(weekly.filter(s=>s.subject===name),"studyMin"), color:subjectInfo(name).color }));
  const full = Math.max(sum(totals,"min"),1); let current = 0;
  const stops = totals.map(s => { const start=current; current += s.min/full*100; return `${s.color} ${start}% ${current}%`; });
  $("#subjectDonut").style.background = `conic-gradient(${stops.join(",")})`;
  $("#subjectDonut").innerHTML = `<span>${Math.round(full/60)}h</span>`;
  $("#donutLegend").innerHTML = totals.map(s => `<div class="donut-legend-row"><i style="background:${s.color}"></i><span>${s.name}</span><b>${Math.round(s.min/full*100)}%</b></div>`).join("");

  $("#accuracyList").innerHTML = Object.keys(subjects).map(name => {
    const rows = data.study.filter(s=>s.subject===name), q=sum(rows,"solved"), w=sum(rows,"wrong"), rate=q?Math.round((q-w)/q*100):0;
    return `<div class="accuracy-row" style="--bar-color:${subjectInfo(name).color}"><span>${name}</span><div class="progress-track"><i style="width:${rate}%"></i></div><b>${rate}%</b></div>`;
  }).join("");
  const rounds = {};
  Object.keys(subjects).forEach(name => rounds[name] = Math.max(...data.study.filter(s=>s.subject===name).map(s=>s.rounds),0));
  $("#progressMatrix").innerHTML = Object.keys(subjects).map(name => {
    const errors = data.reviews.filter(r=>r.subject===name&&!r.done).length;
    return `<div class="matrix-card"><span>${name}</span><strong>${rounds[name]}회독</strong><span>남은 오답 ${errors}개</span></div>`;
  }).join("");
  renderCurriculumStats();
}

function renderCurriculumStats() {
  const rows=data.curriculum || [];
  $("#curriculumStats").innerHTML=rows.length ? rows.map(item=>{
    const p=curriculumProgress(item);
    return `<div class="curriculum-stat-row" style="--subject-color:${subjectInfo(item.subject).color}">
      <div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.subject)} · 마감까지 ${p.daysLeft}일 · 남은 ${Math.ceil(p.remaining)}${escapeHtml(item.unit)}</span></div>
      <div class="progress-track"><i style="width:${p.rate}%"></i></div><b>${p.rate}%</b>
    </div>`;
  }).join("") : `<div class="empty-state">커리큘럼 통계가 아직 없어요.</div>`;
  const weekPlans=data.studyPlans.filter(plan=>inCurrentWeek(plan.date));
  const done=weekPlans.filter(plan=>plan.done).length;
  const overdue=data.studyPlans.filter(plan=>plan.date<todayKey&&!plan.done).length;
  const subjectCompletion=Object.keys(subjects).map(name=>{
    const subjectRows=rows.filter(item=>item.subject===name);
    const avg=subjectRows.length ? Math.round(subjectRows.reduce((acc,item)=>acc+curriculumProgress(item).rate,0)/subjectRows.length) : 0;
    return `<div class="matrix-card"><span>${escapeHtml(name)}</span><strong>${avg}%</strong><span>커리큘럼 완료율</span></div>`;
  }).join("");
  $("#planStats").innerHTML=`
    <div class="matrix-card"><span>이번 주 계획 달성률</span><strong>${weekPlans.length?Math.round(done/weekPlans.length*100):0}%</strong><span>${done} / ${weekPlans.length}개 완료</span></div>
    <div class="matrix-card"><span>밀린 분량</span><strong>${overdue}개</strong><span>자동 이월 대상</span></div>
    ${subjectCompletion}`;
}

function bindModal() {
  $$("[data-open-modal]").forEach(btn => btn.addEventListener("click", () => {
    if (btn.dataset.openModal === "words") editingWordId = null;
    if (btn.dataset.openModal === "study") editingStudyId = null;
    if (btn.dataset.openModal === "review") editingReviewId = null;
    if (btn.dataset.openModal === "curriculum") editingCurriculumId = null;
    if (btn.dataset.openModal === "planner") editingPlannerId = null;
    openModal(btn.dataset.openModal);
  }));
  $("#closeModal").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", e => { if (e.target === $("#modalBackdrop")) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}
function options(list, selected="") { return list.map(v => `<option ${v===selected?"selected":""}>${escapeHtml(v)}</option>`).join(""); }
function openModal(type) {
  const editingWord = type === "words" && editingWordId ? data.words.find(word=>word.id===editingWordId) : null;
  const editingStudy = type === "study" && editingStudyId ? data.study.find(item=>item.id===editingStudyId) : null;
  const editingReview = type === "review" && editingReviewId ? data.reviews.find(item=>item.id===editingReviewId) : null;
  const editingCurriculum = type === "curriculum" && editingCurriculumId ? data.curriculum.find(item=>item.id===editingCurriculumId) : null;
  const editingPlan = type === "planner" && editingPlannerId ? data.studyPlans.find(item=>item.id===editingPlannerId) : null;
  const configs = {
    study: { title:editingStudy?"공부 기록 수정":"공부 기록 추가", kicker:"STUDY LOG", body: studyForm(editingStudy), handler: submitStudy },
    review: { title:editingReview?"오답 · 복습 수정":"오답 · 복습 추가", kicker:"REVIEW NOTE", body: reviewForm(editingReview), handler: submitReview },
    words: { title:editingWord ? `DAY ${editingWord.day} 수정` : "영어 단어 DAY 기록", kicker:"VOCABULARY", body:wordForm(editingWord), handler:submitWord },
    curriculum: { title:editingCurriculum?"커리큘럼 수정":"커리큘럼 추가", kicker:"CURRICULUM", body:curriculumForm(editingCurriculum), handler:submitCurriculum },
    planner: { title:editingPlan?"스터디 플래너 수정":"스터디 플래너 추가", kicker:"STUDY PLANNER", body:plannerForm(editingPlan), handler:submitPlanner }
  };
  const config = configs[type];
  $("#modalTitle").textContent = config.title; $("#modalKicker").textContent = config.kicker;
  $("#recordForm").innerHTML = config.body;
  $("#recordForm").onsubmit = e => { e.preventDefault(); config.handler(new FormData(e.target)); };
  $("#modalBackdrop").classList.add("show");
}
function closeModal() { $("#modalBackdrop").classList.remove("show"); editingWordId=null; editingStudyId=null; editingReviewId=null; editingCurriculumId=null; editingPlannerId=null; }
function formActions() { return `<div class="form-actions field full"><button type="button" class="secondary-button" onclick="closeModal()">취소</button><button class="primary-button" type="submit">저장하기</button></div>`; }
function studyForm(existing=null) {
  return `<div class="form-grid">
    <div class="field"><label>날짜</label><input name="date" type="date" value="${existing?.date||todayKey}" required></div>
    <div class="field"><label>과목</label><select name="subject">${options(Object.keys(subjects),existing?.subject)}</select></div>
    <div class="field"><label>세부영역</label><input name="detail" value="${escapeHtml(existing?.detail||"")}" placeholder="예: 재무회계 - 재고자산" required></div>
    <div class="field"><label>공부유형</label><select name="type">${options(types,existing?.type)}</select></div>
    <div class="field"><label>공부시간 (분)</label><input name="studyMin" type="number" min="1" value="${existing?.studyMin||""}" placeholder="120" required></div>
    <div class="field"><label>순공시간 (분)</label><input name="netMin" type="number" min="1" value="${existing?.netMin||""}" placeholder="100" required></div>
    <div class="field"><label>푼 문제 수</label><input name="solved" type="number" min="0" value="${existing?.solved||0}"></div>
    <div class="field"><label>틀린 문제 수</label><input name="wrong" type="number" min="0" value="${existing?.wrong||0}"></div>
    <div class="field"><label>회독 수</label><input name="rounds" type="number" min="0" value="${existing?.rounds??1}"></div>
    <div class="field full"><label>메모</label><textarea name="memo" placeholder="오늘 공부하며 기억할 내용을 적어보세요.">${escapeHtml(existing?.memo||"")}</textarea></div>
    ${formActions()}</div>`;
}
function reviewForm(existing=null) {
  return `<div class="form-grid">
    <div class="field"><label>날짜</label><input name="date" type="date" value="${existing?.date||todayKey}" required></div>
    <div class="field"><label>과목</label><select name="subject">${options(Object.keys(subjects),existing?.subject)}</select></div>
    <div class="field"><label>세부영역</label><input name="detail" value="${escapeHtml(existing?.detail||"")}" placeholder="예: 부가가치세 매입세액" required></div>
    <div class="field"><label>문제 출처</label><input name="source" value="${escapeHtml(existing?.source||"")}" placeholder="교재명 / 연도 / 문제번호" required></div>
    <div class="field full"><label>틀린 이유</label><input name="reason" value="${escapeHtml(existing?.reason||"")}" placeholder="개념 부족, 계산 실수, 시간 부족 등" required></div>
    <div class="field"><label>중요도</label><select name="importance">${[1,2,3].map(n=>`<option value="${n}" ${n===(existing?.importance||3)?"selected":""}>${"★".repeat(n)}</option>`).join("")}</select></div>
    <div class="field"><label>다시 볼 날짜</label><input name="revisit" type="date" value="${existing?.revisit||offsetDate(3)}" required></div>
    <label class="checkbox-field"><input name="done" type="checkbox" ${existing?.done?"checked":""}> 복습 완료</label>
    <div class="field full"><label>메모</label><textarea name="memo" placeholder="다음에는 어떻게 풀지 적어보세요.">${escapeHtml(existing?.memo||"")}</textarea></div>
    ${formActions()}</div>`;
}
function wordForm(existing=null) {
  const next = existing?.day || Math.max(...data.words.map(w=>w.day),0)+1;
  return `<div class="form-grid">
    <div class="field"><label>DAY 번호</label><input name="day" type="number" min="1" value="${next}" required></div>
    <label class="checkbox-field"><input name="done" type="checkbox" ${existing?.done?"checked":""}> 학습 완료</label>
    <div class="field"><label>복습 횟수</label><input name="reviews" type="number" min="0" value="${existing?.reviews || 0}"></div>
    <div class="field"><label>다시 볼 날짜</label><input name="revisit" type="date" value="${existing?.revisit || offsetDate(2)}" required></div>
    <div class="field full"><label>헷갈린 단어 목록</label><textarea name="confusedWords" placeholder="한 줄에 하나씩 영단어 = 뜻 형식으로 입력하세요.&#10;예: revenue = 세입, 수익&#10;deduct = 공제하다">${escapeHtml(existing?.confusedWords || "")}</textarea></div>
    <div class="field full"><label>메모</label><textarea name="memo" placeholder="암기 팁이나 학습 메모를 적어보세요.">${escapeHtml(existing?.memo || "")}</textarea></div>
    ${formActions()}</div>`;
}
function curriculumForm(existing=null) {
  return `<div class="form-grid">
    <div class="field"><label>과목</label><select name="subject">${options(Object.keys(subjects),existing?.subject)}</select></div>
    <div class="field"><label>세부영역</label><input name="detail" value="${escapeHtml(existing?.detail||"")}" placeholder="예: 재무회계 / 문법 / 지방세법" required></div>
    <div class="field full"><label>커리큘럼 이름</label><input name="name" value="${escapeHtml(existing?.name||"")}" placeholder="예: 세법 기출 800문제" required></div>
    <div class="field"><label>공부유형</label><select name="type">${options(types,existing?.type||"기출")}</select></div>
    <div class="field"><label>전체 분량</label><input name="total" type="number" min="1" step="1" value="${existing?.total||""}" placeholder="800" required></div>
    <div class="field"><label>완료한 분량</label><input name="completed" type="number" min="0" step="1" value="${existing?.completed||0}"></div>
    <div class="field"><label>분량 단위</label><select name="unit">${options(curriculumUnits,existing?.unit||"문제")}</select></div>
    <div class="field"><label>목표 회독 수</label><input name="targetRounds" type="number" min="1" value="${existing?.targetRounds||1}"></div>
    <div class="field"><label>현재 회독 수</label><input name="currentRounds" type="number" min="0" value="${existing?.currentRounds||0}"></div>
    <div class="field"><label>시작일</label><input name="startDate" type="date" value="${existing?.startDate||todayKey}" required></div>
    <div class="field"><label>마감일</label><input name="deadline" type="date" value="${existing?.deadline||data.settings.examDate}" required></div>
    <div class="field"><label>우선순위</label><select name="priority">${options(priorities,existing?.priority||"보통")}</select></div>
    <div class="field"><label>예상 소요시간</label><input name="estimatedMin" type="number" min="0" value="${existing?.estimatedMin||""}" placeholder="1단위당 분"></div>
    <div class="field full"><label>메모</label><textarea name="memo" placeholder="강사명, 교재명, 주의할 점 등을 적어보세요.">${escapeHtml(existing?.memo||"")}</textarea></div>
    ${formActions()}</div>`;
}
function plannerForm(existing=null) {
  return `<div class="form-grid">
    <div class="field"><label>날짜</label><input name="date" type="date" value="${existing?.date||todayKey}" required></div>
    <div class="field"><label>시작 시간</label><input name="startTime" type="time" value="${existing?.startTime||"09:00"}" required></div>
    <div class="field"><label>종료 시간</label><input name="endTime" type="time" value="${existing?.endTime||"10:00"}" required></div>
    <div class="field"><label>과목</label><select name="subject">${options(Object.keys(subjects),existing?.subject)}</select></div>
    <div class="field"><label>세부영역</label><input name="detail" value="${escapeHtml(existing?.detail||"")}" required></div>
    <div class="field"><label>공부유형</label><select name="type">${options(types,existing?.type||"기출")}</select></div>
    <div class="field"><label>해야 할 분량</label><input name="amountText" value="${escapeHtml(existing?.amountText||"")}" placeholder="예: 세법 기출 40문제" required></div>
    <label class="checkbox-field"><input name="done" type="checkbox" ${existing?.done?"checked":""}> 완료</label>
    <div class="field full"><label>메모</label><textarea name="memo" placeholder="시간표 메모를 적어보세요.">${escapeHtml(existing?.memo||"")}</textarea></div>
    ${formActions()}</div>`;
}
function obj(form) { return Object.fromEntries(form.entries()); }
function submitStudy(form) {
  const v=obj(form), existing=data.study.find(item=>item.id===editingStudyId);
  const entry={ id:existing?.id||Date.now(), ...existing, ...v, studyMin:+v.studyMin, netMin:+v.netMin, solved:+v.solved, wrong:+v.wrong, rounds:+v.rounds };
  if(existing) Object.assign(existing,entry); else data.study.push(entry);
  finishSubmit("공부 기록을 저장했어요!");
}
function submitReview(form) {
  const v=obj(form), existing=data.reviews.find(item=>item.id===editingReviewId);
  const entry={ id:existing?.id||Date.now(), ...existing, ...v, importance:+v.importance, done:v.done==="on" };
  if(existing) Object.assign(existing,entry); else data.reviews.push(entry);
  finishSubmit("오답 노트를 저장했어요!");
}
function submitWord(form) {
  const v=obj(form), editing=data.words.find(w=>w.id===editingWordId);
  const duplicate=data.words.find(w=>w.day===+v.day && w.id!==editingWordId);
  if (duplicate) return showToast(`DAY ${v.day} 기록이 이미 있어요. 해당 DAY를 수정해 주세요.`);
  const wordList=parseConfusedWords(v.confusedWords);
  const entry={
    id:editing?.id||Date.now(), ...v, day:+v.day, reviews:+v.reviews,
    confused:wordList.length, done:v.done==="on",
    quizCorrect:editing?.quizCorrect||0, quizWrong:editing?.quizWrong||0
  };
  if(editing) Object.assign(editing,entry); else data.words.push(entry);
  data.words.sort((a,b)=>a.day-b.day); finishSubmit("영어 단어 기록을 저장했어요!");
}
function submitCurriculum(form) {
  const v=obj(form), existing=data.curriculum.find(item=>item.id===editingCurriculumId);
  const entry={ id:existing?.id||Date.now(), ...existing, ...v, total:+v.total, completed:+v.completed, targetRounds:+v.targetRounds, currentRounds:+v.currentRounds, estimatedMin:+v.estimatedMin||0 };
  if(existing) Object.assign(existing,entry); else data.curriculum.push(entry);
  finishSubmit("커리큘럼을 저장했어요!");
}
function submitPlanner(form) {
  const v=obj(form), existing=data.studyPlans.find(item=>item.id===editingPlannerId);
  const wasDone=!!existing?.done;
  const done=v.done==="on";
  const entry={ id:existing?.id||Date.now(), ...existing, ...v, done, generatedAuto:existing?.generatedAuto||false };
  if(existing) {
    Object.assign(existing,entry);
    if(wasDone!==done) adjustCurriculumProgress(existing,done ? 1 : -1);
  } else {
    data.studyPlans.push(entry);
  }
  finishSubmit("스터디 플래너를 저장했어요!");
}
function finishSubmit(message) { save(); closeModal(); renderAll(); showToast(message); }
function deleteItem(collection,id) {
  moveToTrash(collection,id);
}

const trashLabels={ study:"공부 기록", reviews:"오답 · 복습", words:"영어 단어 DAY", todos:"오늘 할 일", curriculum:"커리큘럼", studyPlans:"스터디 플래너" };

function bindTrash() {
  $("#trashGrid").addEventListener("click",event=>{
    const restore=event.target.closest("[data-trash-restore]");
    const remove=event.target.closest("[data-trash-remove]");
    if(restore) restoreTrashItem(+restore.dataset.trashRestore);
    if(remove) permanentlyDeleteTrashItem(+remove.dataset.trashRemove);
  });
  $("#emptyTrash").addEventListener("click",()=>{
    if(!data.trash.length) return showToast("휴지통이 비어 있어요.");
    if(!confirm("휴지통의 모든 기록을 완전히 삭제할까요? 이 작업은 되돌릴 수 없습니다.")) return;
    data.trash=[]; save(); renderAll(); showToast("휴지통을 비웠어요.");
  });
}

function moveToTrash(collection,id) {
  const item=data[collection]?.find(row=>row.id===id);
  if(!item || !confirm(`${trashLabels[collection]||"기록"}을(를) 휴지통으로 보낼까요?`)) return;
  data.trash.push({ id:Date.now()+Math.random(), collection, item:JSON.parse(JSON.stringify(item)), deletedAt:new Date().toISOString() });
  data[collection]=data[collection].filter(row=>row.id!==id);
  save(); renderAll(); showToast("휴지통으로 이동했어요.");
}

function trashItemTitle(entry) {
  const item=entry.item;
  if(entry.collection==="study") return `${item.subject} · ${item.detail}`;
  if(entry.collection==="reviews") return `${item.subject} · ${item.detail}`;
  if(entry.collection==="words") return `DAY ${pad(item.day)}`;
  if(entry.collection==="curriculum") return item.name;
  if(entry.collection==="studyPlans") return `${item.startTime||""} ${item.subject} · ${item.detail}`;
  return item.text||"삭제된 기록";
}

function trashItemDescription(entry) {
  const item=entry.item;
  if(entry.collection==="study") return `${item.date} · ${minutesText(item.netMin||0)}`;
  if(entry.collection==="reviews") return `${item.source||""} · ${item.reason||""}`;
  if(entry.collection==="words") return `${parseConfusedWords(item.confusedWords).length}개 시험 단어`;
  if(entry.collection==="curriculum") return `남은 ${Math.ceil(curriculumProgress(item).remaining)}${item.unit||""} · 마감 ${item.deadline||""}`;
  if(entry.collection==="studyPlans") return `${item.date||""} · ${item.amountText||""}`;
  return `${item.subject||"공통"}${item.time?` · ${item.time}`:""}`;
}

function renderTrash() {
  const rows=data.trash.slice().sort((a,b)=>b.deletedAt.localeCompare(a.deletedAt));
  $("#trashGrid").innerHTML=rows.length ? rows.map(entry=>`
    <article class="trash-card">
      <div class="trash-card-head"><span class="trash-type">${trashLabels[entry.collection]||entry.collection}</span><time>${new Date(entry.deletedAt).toLocaleDateString("ko-KR")}</time></div>
      <h3>${escapeHtml(trashItemTitle(entry))}</h3><p>${escapeHtml(trashItemDescription(entry))}</p>
      <div class="trash-actions"><button class="secondary-button" data-trash-restore="${entry.id}">복원</button><button class="mini-action danger" data-trash-remove="${entry.id}" title="완전 삭제">🗑</button></div>
    </article>`).join("") : `<div class="empty-state">휴지통이 비어 있어요.</div>`;
}

function restoreTrashItem(id) {
  const entry=data.trash.find(row=>row.id===id);
  if(!entry) return;
  if(data[entry.collection].some(row=>row.id===entry.item.id)) entry.item.id=Date.now();
  data[entry.collection].push(entry.item);
  data.trash=data.trash.filter(row=>row.id!==id);
  save(); renderAll(); showToast("기록을 복원했어요.");
}

function permanentlyDeleteTrashItem(id) {
  if(!confirm("이 기록을 완전히 삭제할까요?")) return;
  data.trash=data.trash.filter(row=>row.id!==id);
  save(); renderAll(); showToast("기록을 완전히 삭제했어요.");
}

function bindDataSync() {
  $("#exportData").addEventListener("click",downloadDataBackup);
  $("#importData").addEventListener("change",event=>{
    const file=event.target.files[0];
    if(file) importDataBackup(file);
    event.target.value="";
  });
}

function downloadDataBackup() {
  const payload={ app:"tax-study-planner", version:2, exportedAt:new Date().toISOString(), data };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const link=document.createElement("a");
  link.href=URL.createObjectURL(blob);
  link.download=`합격플래너-백업-${todayKey}.json`;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(()=>URL.revokeObjectURL(link.href),1000);
  showToast("백업 파일을 저장했어요.");
}

function importDataBackup(file) {
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const payload=JSON.parse(reader.result);
      const imported=payload.data||payload;
      if(!imported.settings || !Array.isArray(imported.study) || !Array.isArray(imported.reviews) || !Array.isArray(imported.words)) throw new Error();
      if(!confirm("이 기기의 현재 기록을 백업 파일 내용으로 교체할까요?")) return;
      localStorage.setItem(`${storeKey}BeforeImport`,JSON.stringify(data));
      data=imported;
      normalizeSettings();
      applyAppearance();
      renderDynamicSubjectControls();
      renderAll();
      restoreTimer();
      showToast("PC·모바일 데이터를 불러왔어요.");
    }catch{
      showToast("올바른 합격 플래너 백업 파일이 아니에요.");
    }
  };
  reader.readAsText(file);
}
function showToast(message) {
  $("#toast").textContent=message; $("#toast").classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>$("#toast").classList.remove("show"),2200);
}

function setupMobileApp() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }

  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  if (standalone) document.body.classList.add("standalone-app");

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (!localStorage.getItem("taxPlannerInstallDismissed")) showInstallSheet();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    hideInstallSheet();
    showToast("휴대폰에 앱을 설치했어요!");
  });

  $("#installApp").addEventListener("click", installMobileApp);
  $("#installClose").addEventListener("click", () => {
    localStorage.setItem("taxPlannerInstallDismissed", "1");
    hideInstallSheet();
  });

  const mobileBrowser = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (mobileBrowser && !standalone && !localStorage.getItem("taxPlannerInstallDismissed")) {
    setTimeout(showInstallSheet, 1800);
  }

  const launchParams = new URLSearchParams(location.search);
  if (launchParams.get("page")) setTimeout(() => showPage(launchParams.get("page")), 0);
  if (launchParams.get("action") === "timer") {
    setTimeout(() => {
      showPage("home");
      $("#timerDetail").focus();
      $("#timerCard").scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
}

function showInstallSheet() {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  $("#installGuide").textContent = isIOS
    ? "Safari 아래의 공유 버튼을 누른 뒤 ‘홈 화면에 추가’를 선택하세요."
    : "홈 화면에 추가하면 일반 앱처럼 바로 실행하고 오프라인에서도 사용할 수 있어요.";
  $("#installApp").textContent = isIOS ? "설치 방법 확인" : "설치";
  $("#installSheet").classList.add("show");
  $("#installSheet").setAttribute("aria-hidden", "false");
}

function hideInstallSheet() {
  $("#installSheet").classList.remove("show");
  $("#installSheet").setAttribute("aria-hidden", "true");
}

async function installMobileApp() {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    hideInstallSheet();
  } else if (isIOS) {
    $("#installGuide").textContent = "Safari의 공유(□↑) 버튼 → ‘홈 화면에 추가’ → ‘추가’를 눌러 주세요.";
  } else {
    $("#installGuide").textContent = "브라우저 메뉴에서 ‘앱 설치’ 또는 ‘홈 화면에 추가’를 선택해 주세요.";
  }
}
init();
