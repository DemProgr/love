import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ru" | "en";

const ru = {
  navHome: "Главная",
  navStory: "Love Story",
  navMusic: "Музыка",
  navQuiz: "Викторина",
  monogram: "Д&В",
  homeEyebrow: "Люблю",
  homeHero1: "Наша история",
  homeHero2: "Один год вместе",
  homeNames: "Наша история",
  homeSub: "Один год любви",
  homeDate: "28 сентября 2026",
  introTitle: "Дорогая",
  introText:
    "Тебе не передать словами, как я рад, что мы вместе, — каждый день я засыпаю с этой мыслью. Ты правда сделала этот год лучшим для меня, и я очень сильно это ценю. Спасибо тебе, спасибо, что всегда рядом. Люблю тебя.",
  storyCta: "Читать нашу историю",
  statsTitle: "Наш год в цифрах",
  homeLoveText:
    "Переходь на следующую страницу: там небольшая история, а затем даже интерактивчик небольшой.",
  homeNavStrip: [
    { id: "invite", label: "Люблю" },
    { id: "numbers", label: "Цифры" },
    { id: "story", label: "Love Story" },
    { id: "quiz", label: "Викторина" },
    { id: "top", label: "Наверх" },
  ],
  stats: [
    { value: "365", label: "дней вместе" },
    { value: "12", label: "месяцев любви" },
    { value: "52", label: "недели счастья" },
    { value: "∞", label: "воспоминаний" },
  ],
  counterKicker: "Мы вместе уже",
  counterTotal: "и {n} минут вместе",
  counterUnits: {
    days: ["день", "дня", "дней"],
    hours: ["час", "часа", "часов"],
    minutes: ["минута", "минуты", "минут"],
    seconds: ["секунда", "секунды", "секунд"],
  },
  footerNote: "28 сентября 2026",
  photoAltPair: "Фотография пары",
  photoAltHero: "Чёрно-белое фото пары",
  photoAltFrame: "Дизайн-макет сайта Данила и Виктории",
  photoAltGallery: "Фото из нашей истории",
  storyHero1: "Год с тобой",
  storyHero2: "Рядом",
  storyNum1: "01.",
  storyTitle1: "Самые первые дни",
  storyText1:
    "Когда я делал этот сайт, вспомнил первые сообщения тебе, первый разговор, то, какие эмоции возникали. Теперь я понимаю, насколько ценю.",
  storyBtn1: "Так счастливо с тобой",
  storyBtn2: "Мой лучший выбор",
  storyNum2: "02.",
  storyTitle2: "Ты — всё, что мне нужно для счастья",
  storyText2:
    "С тобой я всегда был счастлив, даже когда грустил. Спасибо тебе за это.",
  storyNum3: "03.",
  storyTitle3: "После зимы",
  storyText3:
    "Для меня мы после зимы сильно поменялись, а после мая уже совсем стали близки, а лето очень укрепило, потому что мы крутые съездили в Питер погулять и не только.",
  cardKicker: "Наша история",
  cardTitle: "Год с тобой",
  cardLink: "О нас",
  cardNumber: "365",
  dateLine: "Воскресенье, 28 сентября 2026",
  madeBy: "Сделано с любовью",
  navStrip: [
    { id: "story", label: "История" },
    { id: "gallery", label: "Галерея" },
    { id: "quiz", label: "Викторина" },
    { id: "top", label: "Наверх" },
    { id: "home", label: "Главная" },
  ],
  galleryTitle: "SWEETLOVE",
  galleryText:
    "Sometimes I like to be alone, but alone with you — does that make any sense? I did not go too far to give you my heart: I have never been so good, I see stars.",
  galleryPhoto1: "Мы",
  galleryPhoto2: "Ты и я",
  galleryPhoto3: "Счастье",
  photoAltVinyl: "Виниловая пластинка",
  musicTitle: "Проигрыватель",
  musicLead:
    "Тут собраны 6 основных песен, которые каким-либо образом связаны с тобой и напоминают определённое время вместе.",
  musicNow: "Сейчас играет",
  musicNoTrack: "Ничего не играет",
  musicQueueTitle: "Наш плейлист",
  musicQueueCount: "6 треков",
  musicQueueHint: "Нажми на трек, чтобы послушать",
  musicNoResults: "Ничего не найдено",
  musicSearch: "Поиск по плейлисту",
  musicHint: "Нажми play — пластинка закрутится",
  musicPlay: "Играть",
  musicPause: "Пауза",
  musicPrev: "Предыдущая",
  musicNext: "Следующая",
  musicSeek: "Позиция трека",
  trackNotes: {
    castle: "Слушал её, когда только познакомились, когда всё было как будто не по-настоящему",
    sonique: "Октябрь – декабрь",
    dontcry: "Запахло весной",
    breath: "Тут не нужно объяснять",
    purplerain: "Пик",
    bewithyou: "Прямо сейчас, вот так вот",
  },
  musicNavStrip: [
    { id: "queue", label: "Плейлист" },
    { id: "quiz", label: "Викторина" },
    { id: "top", label: "Наверх" },
    { id: "home", label: "Главная" },
  ],
  quizKicker: "5 вопросов о нас",
  quizHero1: "Проверь себя",
  quizHero2: "Наша викторина",
  quizHint: "Выбери один вариант",
  quizCorrect: "Верно!",
  quizWrong: "Опааа",
  quizNext: "Дальше",
  quizFinish: "Показать результат",
  quizResultKicker: "Викторина",
  quizResultTitle: "Твой результат",
  quizResultPerfect:
    "Идеально! Ты знаешь нас наизусть — даже время нашей первой встречи вдвоём.",
  quizResultFail: "Дома поговорим...",
  quizRestart: "Пройти снова",
  quizHome: "На главную",
  quizStrip: [
    { id: "top", label: "Наверх" },
    { id: "story", label: "Love Story" },
    { id: "music", label: "Музыка" },
    { id: "home", label: "Главная" },
  ],
  quizQuestions: [
    {
      q: "Во сколько времени была наша первая встреча вдвоём?",
      options: ["17:00", "17:30", "16:40"],
      correct: 2,
    },
    {
      q: "Какой день мы поцеловались?",
      options: ["Суббота", "Четверг", "Вторник"],
      correct: 1,
    },
    {
      q: "На какой лавочке впервые обнялись?",
      options: ["В парке Челюскинцев", "Жёлтая лавочка", "В Лошицком парке"],
      correct: 1,
    },
    {
      q: "Какую книгу обсуждали при первой прогулке?",
      options: ["«Мастер и Маргарита»", "Булгаков", "Пушкин"],
      correct: 0,
    },
    {
      q: "В чём ты была, когда мы впервые встретились?",
      options: ["Бордовая кофта", "Зелёный топ", "Светлый свитер"],
      correct: 0,
    },
  ],
};

export type Dict = typeof ru;

const en: Dict = {
  navHome: "Home",
  navStory: "Love Story",
  navMusic: "Music",
  navQuiz: "Quiz",
  monogram: "D&V",
  homeEyebrow: "I love you",
  homeHero1: "Our story",
  homeHero2: "One year together",
  homeNames: "Our story",
  homeSub: "One year of love",
  homeDate: "September 28, 2026",
  introTitle: "Dear,",
  introText:
    "I cannot put into words how happy I am that we are together — every night I fall asleep with that thought. You truly made this year the best one for me, and I value it more than you know. Thank you, thank you for always being by my side. I love you.",
  storyCta: "Read our story",
  statsTitle: "Our year in numbers",
  homeLoveText:
    "Move on to the next page: there is a little story there, and then even a small interactive extra.",
  homeNavStrip: [
    { id: "invite", label: "I love you" },
    { id: "numbers", label: "Numbers" },
    { id: "story", label: "Love Story" },
    { id: "quiz", label: "Quiz" },
    { id: "top", label: "Top" },
  ],
  stats: [
    { value: "365", label: "days together" },
    { value: "12", label: "months of love" },
    { value: "52", label: "weeks of happiness" },
    { value: "∞", label: "memories" },
  ],
  counterKicker: "Together for",
  counterTotal: "and {n} minutes together",
  counterUnits: {
    days: ["day", "days", "days"],
    hours: ["hour", "hours", "hours"],
    minutes: ["minute", "minutes", "minutes"],
    seconds: ["second", "seconds", "seconds"],
  },
  footerNote: "September 28, 2026",
  photoAltPair: "Photo of the couple",
  photoAltHero: "Black and white photo of the couple",
  photoAltFrame: "Site design mockup of Danila and Victoria",
  photoAltGallery: "Photo from our story",
  storyHero1: "A year with you",
  storyHero2: "By my side",
  storyNum1: "01.",
  storyTitle1: "The very first days",
  storyText1:
    "While I was making this site, I remembered the first messages I sent you, our very first conversation, the feelings it all brought. Now I realize how much I cherish it.",
  storyBtn1: "So happy with you",
  storyBtn2: "My best choice",
  storyNum2: "02.",
  storyTitle2: "You are all I need to be happy",
  storyText2:
    "With you I have always been happy, even when I was sad. Thank you for that.",
  storyNum3: "03.",
  storyTitle3: "After winter",
  storyText3:
    "For me, we changed a lot after winter, after May we became truly close, and summer really sealed it — we took an awesome trip to St. Petersburg to walk around, and not only that.",
  cardKicker: "Our archive",
  cardTitle: "A year with u",
  cardLink: "About us",
  cardNumber: "365",
  dateLine: "Sunday, September 28, 2026",
  madeBy: "Made with love",
  navStrip: [
    { id: "story", label: "Story" },
    { id: "gallery", label: "Gallery" },
    { id: "quiz", label: "Quiz" },
    { id: "top", label: "Top" },
    { id: "home", label: "Home" },
  ],
  galleryTitle: "SWEETLOVE",
  galleryText:
    "Sometimes I like to be alone, but alone with you — does that make any sense? I did not go too far to give you my heart: I have never been so good, I see stars.",
  galleryPhoto1: "Us",
  galleryPhoto2: "You & me",
  galleryPhoto3: "Happiness",
  photoAltVinyl: "Vinyl record",
  musicTitle: "The Player",
  musicLead:
    "Here are the 6 core songs that are somehow connected to you and bring back a certain time together.",
  musicNow: "Now playing",
  musicNoTrack: "Nothing is playing",
  musicQueueTitle: "Our playlist",
  musicQueueCount: "6 tracks",
  musicQueueHint: "Tap a track to listen",
  musicNoResults: "Nothing found",
  musicSearch: "Search the playlist",
  musicHint: "Hit play — the record starts spinning",
  musicPlay: "Play",
  musicPause: "Pause",
  musicPrev: "Previous",
  musicNext: "Next",
  musicSeek: "Track position",
  trackNotes: {
    castle: "I listened to it when we had just met, when everything felt almost unreal",
    sonique: "October – December",
    dontcry: "Spring was in the air",
    breath: "No explanation needed",
    purplerain: "The peak",
    bewithyou: "Right now, just like this",
  },
  musicNavStrip: [
    { id: "queue", label: "Playlist" },
    { id: "quiz", label: "Quiz" },
    { id: "top", label: "Top" },
    { id: "home", label: "Home" },
  ],
  quizKicker: "5 questions about us",
  quizHero1: "Test yourself",
  quizHero2: "Our quiz",
  quizHint: "Pick one option",
  quizCorrect: "Correct!",
  quizWrong: "Oops",
  quizNext: "Next",
  quizFinish: "Show the result",
  quizResultKicker: "Quiz",
  quizResultTitle: "Your result",
  quizResultPerfect:
    "Perfect! You know us by heart — even the time of our very first date just the two of us.",
  quizResultFail: "We'll talk at home...",
  quizRestart: "Try again",
  quizHome: "Back home",
  quizStrip: [
    { id: "top", label: "Top" },
    { id: "story", label: "Love Story" },
    { id: "music", label: "Music" },
    { id: "home", label: "Home" },
  ],
  quizQuestions: [
    {
      q: "What time was our first date just the two of us?",
      options: ["17:00", "17:30", "16:40"],
      correct: 2,
    },
    {
      q: "What day did we kiss for the first time?",
      options: ["Saturday", "Thursday", "Tuesday"],
      correct: 1,
    },
    {
      q: "Which bench did we first hug on?",
      options: ["In Chelyuskintsev Park", "The yellow bench", "In Loshytsky Park"],
      correct: 1,
    },
    {
      q: "Which book did we talk about on our first walk?",
      options: ["The Master and Margarita", "Bulgakov", "Pushkin"],
      correct: 0,
    },
    {
      q: "What were you wearing when we first met?",
      options: ["A burgundy cardigan", "A green top", "A light sweater"],
      correct: 0,
    },
  ],
};

const strings: Record<Lang, Dict> = { ru, en };

const STORAGE_KEY = "one-year-lang";

interface LangValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: Dict;
}

const LangContext = createContext<LangValue | null>(null);

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "ru";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "ru";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${strings[lang].homeNames} · ${strings[lang].homeSub}`;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const value = useMemo<LangValue>(
    () => ({ lang, setLang, t: strings[lang] }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
