import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useLang } from "../i18n";
import type { Page } from "../components/Header";
import "../styles/story.css";
import "../styles/music.css";

interface MusicProps {
  onNavigate: (page: Page) => void;
}

type TrackId = "castle" | "sonique" | "dontcry" | "breath" | "purplerain" | "bewithyou";

interface Track {
  id: TrackId;
  src: string;
  title: string;
  artist: string;
}

const TRACKS: Track[] = [
  { id: "castle", src: "/music/Castle.mp3", title: "Castle in the Snow", artist: "" },
  { id: "sonique", src: "/music/sonique.mp3", title: "It Feels So Good", artist: "Sonique" },
  {
    id: "dontcry",
    src: "/music/dontcry.mp3",
    title: "Don't Cry",
    artist: "Guns N' Roses",
  },
  {
    id: "breath",
    src: "/music/The Police Every Breath You Take.mp3",
    title: "Every Breath You Take",
    artist: "The Police",
  },
  { id: "purplerain", src: "/music/purplerain.mp3", title: "Purple Rain", artist: "Prince" },
  {
    id: "bewithyou",
    src: "/music/bewithyou.mp3",
    title: "Be With You",
    artist: "Enrique Iglesias",
  },
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${String(sec).padStart(2, "0")}`;
}

export default function Music({ onNavigate }: MusicProps) {
  const { t } = useLang();
  const [currentId, setCurrentId] = useState<TrackId | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [query, setQuery] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const term = query.trim().toLowerCase();

  const visible = useMemo(() => {
    if (!term) return TRACKS;
    return TRACKS.filter((track) =>
      `${track.title} ${track.artist} ${t.trackNotes[track.id]}`.toLowerCase().includes(term),
    );
  }, [term, t]);

  const currentIndex = currentId ? TRACKS.findIndex((track) => track.id === currentId) : -1;
  const currentTrack = currentIndex >= 0 ? TRACKS[currentIndex] : null;
  const total = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const percent = total > 0 ? Math.min(100, (progress / total) * 100) : 0;

  const playTrack = (id: TrackId) => {
    if (id === currentId) {
      setPlaying((value) => !value);
      return;
    }
    setCurrentId(id);
    setProgress(0);
    setDuration(0);
    setPlaying(true);
  };

  const stepTrack = (dir: number) => {
    const list = visible.length > 0 ? visible : TRACKS;
    const index = list.findIndex((track) => track.id === currentId);
    const from = index === -1 ? (dir > 0 ? 0 : list.length - 1) : index;
    const next = (from + dir + list.length) % list.length;
    playTrack(list[next].id);
  };

  const togglePlay = () => {
    if (!currentId) {
      playTrack(TRACKS[0].id);
      return;
    }
    setPlaying((value) => !value);
  };

  const seek = (value: number) => {
    setProgress(value);
    const audio = audioRef.current;
    if (audio) audio.currentTime = value;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing && currentId) {
      const attempt = audio.play();
      if (attempt) attempt.catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, currentId]);

  const scrollTo = (id: string) => {
    if (id === "home") {
      onNavigate("home");
      return;
    }
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`music ${playing ? "is-playing" : ""} ${currentId ? "is-loaded" : ""}`}>
      <section className="music__head">
        <h1 className="music__title">{t.musicTitle}</h1>
        <span className="music__rule" aria-hidden="true" />
        <p className="music__lead">{t.musicLead}</p>
      </section>

      <section className="music__stage">
        <div className="music__deck">
          <div className="music__platter">
            <span className="music__arc" aria-hidden="true">
              <span className="music__arc-ring" />
              <span className="music__arc-dot" />
            </span>

            <div className="music__disc" role="img" aria-label={t.photoAltVinyl}>
              <span className="music__disc-grooves" aria-hidden="true" />
              <span className="music__disc-sheen" aria-hidden="true" />
              <span className="music__disc-scratch" aria-hidden="true" />
              <span className="music__disc-label">
                <span className="music__disc-label-text">{t.monogram}</span>
                <span className="music__disc-hole" aria-hidden="true" />
              </span>
            </div>

            <div className="music__arm" aria-hidden="true">
              <span className="music__arm-bar" />
              <span className="music__arm-head" />
              <span className="music__arm-pivot" />
            </div>

            <span className="music__note music__note--a" aria-hidden="true">
              ♪
            </span>
            <span className="music__note music__note--b" aria-hidden="true">
              ♫
            </span>
          </div>

          <div className="music__controls">
            <button
              type="button"
              className="music__btn music__btn--small"
              onClick={() => stepTrack(-1)}
              aria-label={t.musicPrev}
            >
              <span className="music__btn-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17 6.4 8.6 12 17 17.6z" fill="currentColor" />
                  <path d="M7 6.4v11.2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              className={`music__btn ${playing ? "" : "is-active"}`}
              onClick={() => setPlaying(false)}
              aria-label={t.musicPause}
            >
              <span className="music__btn-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.5 6h2.6v12H8.5zM12.9 6h2.6v12h-2.6z" fill="currentColor" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              className={`music__btn ${playing ? "is-active" : ""}`}
              onClick={togglePlay}
              aria-label={t.musicPlay}
            >
              <span className="music__btn-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 6.4 18.2 12 9 17.6z" fill="currentColor" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              className="music__btn music__btn--small"
              onClick={() => stepTrack(1)}
              aria-label={t.musicNext}
            >
              <span className="music__btn-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 6.4 15.4 12 7 17.6z" fill="currentColor" />
                  <path d="M17 6.4v11.2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </button>
          </div>

          <span className="music__hint">
            <span className="music__hint-dot" aria-hidden="true" />
            {t.musicHint}
          </span>

          <label className="music__search">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.4" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="m16 16 4.4 4.4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              value={query}
              placeholder={t.musicSearch}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button
              type="button"
              className={`music__search-clear ${query ? "is-on" : ""}`}
              onClick={() => setQuery("")}
              aria-label={t.musicSearch}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </label>
        </div>

        <div className="music__panel">
          <div className="music__np">
            <span className="music__np-cover">
              {currentTrack ? (
                <span className="music__np-num">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M9 18.2V6.4l9-1.8v11.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="7" cy="18.2" r="2.4" fill="currentColor" />
                  <circle cx="16" cy="16" r="2.4" fill="currentColor" />
                </svg>
              )}
            </span>
            <div className="music__np-body">
              <span className="music__np-kicker">
                {t.musicNow}
                <span className="music__eq" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </span>
              <span className="music__np-title">
                {currentTrack ? currentTrack.title : t.musicNoTrack}
              </span>
              <span className="music__np-sub">
                {currentTrack
                  ? currentTrack.artist || t.trackNotes[currentTrack.id]
                  : "—"}
              </span>
            </div>
          </div>

          <div className="music__progress">
            <span>{formatTime(progress)}</span>
            <input
              className="music__range"
              type="range"
              min={0}
              max={total > 0 ? total : 1}
              step={0.1}
              value={total > 0 ? Math.min(progress, total) : 0}
              disabled={!currentTrack}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label={t.musicSeek}
              style={{ "--p": `${percent}%` } as CSSProperties}
            />
            <span>{formatTime(total)}</span>
          </div>

          <div className="music__queue-head" id="queue">
            <span className="music__queue-title">{t.musicQueueTitle}</span>
            <span className="music__queue-count">{t.musicQueueCount}</span>
          </div>

          <ol className="music__tracks">
            {visible.map((track) => {
              const active = track.id === currentId;
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    className={`music__track ${active ? "is-active" : ""}`}
                    onClick={() => playTrack(track.id)}
                  >
                    <span className="music__track-cover" aria-hidden="true">
                      {String(TRACKS.findIndex((item) => item.id === track.id) + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                    <span className="music__track-body">
                      <span className="music__track-title">{track.title}</span>
                      {track.artist && (
                        <span className="music__track-artist">{track.artist}</span>
                      )}
                      <span className="music__track-note">{t.trackNotes[track.id]}</span>
                    </span>
                    <span className="music__track-state" aria-hidden="true">
                      {active && playing ? (
                        <span className="music__eq">
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                      ) : (
                        <svg viewBox="0 0 24 24">
                          <path d="M9 6.4 18.2 12 9 17.6z" fill="currentColor" />
                        </svg>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <span className="music__empty">
            {visible.length > 0 ? t.musicQueueHint : t.musicNoResults}
          </span>
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
        {t.musicNavStrip.map((item) => (
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
          onClick={() => onNavigate("story")}
        >
          {t.navStory}
        </button>
      </footer>

      <audio
        ref={audioRef}
        src={currentTrack ? currentTrack.src : undefined}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
        onEnded={() => stepTrack(1)}
      />
    </div>
  );
}
