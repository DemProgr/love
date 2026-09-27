import { useLang, type Lang } from "../i18n";

export type Page = "home" | "story" | "music" | "quiz";

interface HeaderProps {
  page: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ page, onNavigate }: HeaderProps) {
  const { lang, setLang, t } = useLang();

  const langs: Lang[] = ["ru", "en"];

  return (
    <header className="header header--dark">
      <div className="header__inner">
        <button
          type="button"
          className="header__logo"
          onClick={() => onNavigate("home")}
        >
          {t.monogram}
        </button>

        <nav className="header__nav">
          <button
            type="button"
            className={`header__link ${page === "home" ? "is-active" : ""}`}
            onClick={() => onNavigate("home")}
          >
            {t.navHome}
          </button>
          <button
            type="button"
            className={`header__link ${page === "story" ? "is-active" : ""}`}
            onClick={() => onNavigate("story")}
          >
            {t.navStory}
          </button>
          <button
            type="button"
            className={`header__link ${page === "music" ? "is-active" : ""}`}
            onClick={() => onNavigate("music")}
          >
            {t.navMusic}
          </button>
          <button
            type="button"
            className={`header__link ${page === "quiz" ? "is-active" : ""}`}
            onClick={() => onNavigate("quiz")}
          >
            {t.navQuiz}
          </button>
        </nav>

        <div className="header__lang" role="group" aria-label="Language">
          {langs.map((item) => (
            <button
              key={item}
              type="button"
              className={`header__lang-btn ${lang === item ? "is-active" : ""}`}
              onClick={() => setLang(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
