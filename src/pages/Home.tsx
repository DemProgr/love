import Photo from "../components/Photo";
import Counter from "../components/Counter";
import { useLang } from "../i18n";
import type { Page } from "../components/Header";
import "../styles/story.css";
import "../styles/home.css";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { t } = useLang();

  const handle = (id: string) => {
    if (id === "story") {
      onNavigate("story");
      return;
    }
    if (id === "quiz") {
      onNavigate("quiz");
      return;
    }
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="home">
      <section className="story__hero home__hero">
        <figure className="home__hero-frame">
          <img
            src="/photo/Frame%201.png"
            alt={t.photoAltFrame}
            className="home__hero-photo"
          />
        </figure>
        <div className="story__hero-text">
          <span className="home__hero-kicker">{t.homeEyebrow}</span>
          <h1>
            <span>{t.homeHero1}</span>
            <span>{t.homeHero2}</span>
          </h1>
        </div>
      </section>

      <Counter />

      <section id="invite" className="story__row">
        <Photo
          seed={1}
          tone="gray"
          label={t.photoAltPair}
          className="story__side"
          src="/photos/p04.jpg"
        />
        <div className="story__content">
          <span className="story__num">01.</span>
          <h2 className="story__title">{t.introTitle}</h2>
          <p className="story__text">{t.introText}</p>
        </div>
      </section>

      <section id="numbers" className="story__row story__row--split">
        <Photo
          seed={6}
          tone="gray"
          label={t.photoAltGallery}
          className="story__side"
          src="/photos/p10.jpg"
        />
        <div className="story__content">
          <span className="story__num">02.</span>
          <h2 className="story__title">{t.statsTitle}</h2>
          <ul className="stats">
            {t.stats.map((item) => (
              <li className="stats__item" key={item.label}>
                <span className="stats__value">{item.value}</span>
                <span className="stats__label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <Photo
          seed={7}
          tone="gray"
          label={t.photoAltGallery}
          className="story__side"
          src="/photos/p12.jpg"
        />
      </section>

      <section id="love" className="story__row">
        <Photo
          seed={4}
          tone="gray"
          label={t.photoAltGallery}
          className="story__side"
          src="/photos/p13.jpg"
        />
        <div className="story__content">
          <span className="story__num">03.</span>
          <h2 className="story__title">{t.navStory}</h2>
          <p className="story__text">{t.homeLoveText}</p>
          <div className="story__actions">
            <button
              type="button"
              className="btn-outline"
              onClick={() => onNavigate("story")}
            >
              {t.storyCta}
            </button>
            <span className="btn-solid">{t.homeDate}</span>
          </div>
        </div>
      </section>

      <div className="story__datebar">
        <span className="story__date">{t.dateLine}</span>
        <span className="story__rule" aria-hidden="true" />
        <span className="story__made">{t.madeBy}</span>
      </div>

      <nav className="story__strip">
        <span className="story__strip-mark" aria-hidden="true">
          ✦
        </span>
        {t.homeNavStrip.map((item) => (
          <button
            key={item.id}
            type="button"
            className="story__strip-link"
            onClick={() => handle(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <footer className="story__footer">
        <span>{t.footerNote}</span>
        <button
          type="button"
          className="story__footer-link"
          onClick={() => onNavigate("story")}
        >
          {t.navStory}
        </button>
      </footer>
    </div>
  );
}
