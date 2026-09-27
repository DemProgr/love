import { useState } from "react";
import Photo from "../components/Photo";
import { useLang } from "../i18n";
import type { Page } from "../components/Header";
import "../styles/story.css";
import "../styles/quiz.css";

interface QuizProps {
  onNavigate: (page: Page) => void;
}

export default function Quiz({ onNavigate }: QuizProps) {
  const { t } = useLang();
  const questions = t.quizQuestions;
  const total = questions.length;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[step];
  const picked = answers[step] ?? null;
  const index = String(step + 1).padStart(2, "0");

  const choose = (option: number) => {
    if (picked !== null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = option;
      return next;
    });
  };

  const next = () => {
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
    setFinished(false);
  };

  const score = questions.reduce(
    (acc, item, i) => acc + (answers[i] === item.correct ? 1 : 0),
    0,
  );

  const resultText = score === total ? t.quizResultPerfect : t.quizResultFail;

  const scrollTo = (id: string) => {
    if (id === "home") {
      onNavigate("home");
      return;
    }
    if (id === "story") {
      onNavigate("story");
      return;
    }
    if (id === "music") {
      onNavigate("music");
      return;
    }
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="quiz">
      <section className="story__hero quiz__hero">
        <Photo
          seed={11}
          tone="deep"
          label={t.photoAltHero}
          className="story__hero-photo"
        />
        <div className="story__hero-text">
          <span className="quiz__kicker">{t.quizKicker}</span>
          <h1>
            <span>{t.quizHero1}</span>
            <span>{t.quizHero2}</span>
          </h1>
        </div>
      </section>

      <section className="story__row quiz__row">
        <Photo seed={9} tone="gray" label={t.photoAltGallery} className="story__side" />

        <div className="story__content quiz__panel" key={finished ? "result" : step}>
          {!finished ? (
            <>
              <div className="quiz__head">
                <span className="story__num">{index}.</span>
                <span className="quiz__counter">
                  {index} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <div className="quiz__progress" aria-hidden="true">
                <span style={{ width: `${((step + 1) / total) * 100}%` }} />
              </div>

              <h2 className="story__title quiz__question">{question.q}</h2>
              <p className="quiz__hint">{t.quizHint}</p>

              <div className="quiz__options">
                {question.options.map((option, optionIndex) => {
                  const isPicked = picked === optionIndex;
                  const isCorrect = optionIndex === question.correct;
                  let state = "";

                  if (picked !== null) {
                    if (isPicked && isCorrect) state = " is-correct";
                    else if (isPicked) state = " is-wrong";
                    else if (isCorrect) state = " is-reveal";
                    else state = " is-muted";
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`quiz__option${state}`}
                      onClick={() => choose(optionIndex)}
                      disabled={picked !== null}
                    >
                      <span className="quiz__option-mark" aria-hidden="true">
                        {picked !== null && isCorrect ? "✓" : isPicked ? "✕" : "—"}
                      </span>
                      <span className="quiz__option-text">{option}</span>
                    </button>
                  );
                })}
              </div>

              {picked !== null && (
                <p
                  className={`quiz__feedback ${
                    picked === question.correct ? "is-ok" : "is-no"
                  }`}
                >
                  {picked === question.correct ? t.quizCorrect : t.quizWrong}
                </p>
              )}

              <div className="story__actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={next}
                  disabled={picked === null}
                >
                  {step < total - 1 ? t.quizNext : t.quizFinish}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="quiz__head">
                <span className="story__num">
                  {String(total).padStart(2, "0")}.
                </span>
                <span className="quiz__counter">
                  {String(total).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>

              <div className="story-card quiz__score">
                <Photo
                  seed={5}
                  tone="gray"
                  label={t.photoAltPair}
                  className="story-card__thumb"
                />
                <div className="story-card__body">
                  <span className="story-card__kicker">{t.quizResultKicker}</span>
                  <span className="story-card__title">{t.quizResultTitle}</span>
                  <span className="story-card__link">{t.homeDate}</span>
                </div>
                <span className="story-card__number">
                  {score}/{total}
                </span>
              </div>

              <p className="story__text quiz__result-text">{resultText}</p>

              <div className="story__actions">
                <button type="button" className="btn-outline" onClick={restart}>
                  {t.quizRestart}
                </button>
                <button
                  type="button"
                  className="btn-solid"
                  onClick={() => onNavigate("home")}
                >
                  {t.quizHome}
                </button>
              </div>
            </>
          )}
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
        {t.quizStrip.map((item) => (
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

      <footer className="story__footer">
        <span>{t.footerNote}</span>
        <button
          type="button"
          className="story__footer-link"
          onClick={() => onNavigate("home")}
        >
          {t.navHome}
        </button>
      </footer>
    </div>
  );
}
