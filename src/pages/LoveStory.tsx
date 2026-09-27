import Photo from "../components/Photo";
import { useLang } from "../i18n";
import type { Page } from "../components/Header";
import "../styles/story.css";

interface LoveStoryProps {
  onNavigate: (page: Page) => void;
}

export default function LoveStory({ onNavigate }: LoveStoryProps) {
  const { t } = useLang();

  const scrollTo = (id: string) => {
    if (id === "home") {
      onNavigate("home");
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
    <div className="story">
      <section className="story__hero">
        <Photo
          seed={3}
          tone="deep"
          label={t.photoAltHero}
          className="story__hero-photo"
          src="/photos/p08.jpg"
          eager
        />
        <div className="story__hero-text">
          <h1>
            <span>{t.storyHero1}</span>
            <span>{t.storyHero2}</span>
          </h1>
        </div>
      </section>

      <section id="story" className="story__row">
        <Photo
          seed={1}
          tone="gray"
          label={t.photoAltGallery}
          className="story__side"
          src="/photos/p09.jpg"
        />
        <div className="story__content">
          <span className="story__num">{t.storyNum1}</span>
          <h2 className="story__title">{t.storyTitle1}</h2>
          <p className="story__text">{t.storyText1}</p>
          <div className="story__actions">
            <span className="btn-outline">{t.storyBtn1}</span>
            <span className="btn-solid">{t.storyBtn2}</span>
          </div>
        </div>
      </section>

      <section className="story__row story__row--split">
        <Photo seed={6} tone="gray" label={t.photoAltGallery} className="story__side" />
        <div className="story__content">
          <span className="story__num">{t.storyNum2}</span>
          <h2 className="story__title">{t.storyTitle2}</h2>
          <div className="story-card">
            <Photo
              seed={4}
              tone="gray"
              label={t.photoAltPair}
              className="story-card__thumb"
            />
            <div className="story-card__body">
              <span className="story-card__kicker">{t.cardKicker}</span>
              <span className="story-card__title">{t.cardTitle}</span>
              <span className="story-card__link">{t.cardLink}</span>
            </div>
            <span className="story-card__number">{t.cardNumber}</span>
          </div>
          <p className="story__text">{t.storyText2}</p>
        </div>
        <Photo seed={7} tone="gray" label={t.photoAltGallery} className="story__side" />
      </section>

      <section className="story__row">
        <Photo
          seed={9}
          tone="gray"
          label={t.photoAltGallery}
          className="story__side"
          src="/photos/p03.jpg"
        />
        <div className="story__content">
          <span className="story__num">{t.storyNum3}</span>
          <h2 className="story__title">{t.storyTitle3}</h2>
          <p className="story__text">{t.storyText3}</p>
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
        {t.navStrip.map((item) => (
          <button
            key={item.id}
            type="button"
            className="story__strip-link"
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section id="gallery" className="gallery">
        <Photo
          seed={2}
          tone="gray"
          label={t.galleryPhoto1}
          className="gallery__photo"
          src="/photos/p05.jpg"
        />
        <div className="gallery__text">
          <h2>{t.galleryTitle}</h2>
          <p>{t.galleryText}</p>
        </div>
        <Photo
          seed={5}
          tone="gray"
          label={t.galleryPhoto2}
          className="gallery__photo"
          src="/photos/p06.jpg"
        />
        <Photo
          seed={8}
          tone="gray"
          label={t.galleryPhoto3}
          className="gallery__photo"
          src="/photos/p11.jpg"
        />
      </section>

      <footer className="story__footer">
        <span>{t.footerNote}</span>
        <button type="button" className="story__footer-link" onClick={() => onNavigate("home")}>
          {t.navHome}
        </button>
      </footer>
    </div>
  );
}
