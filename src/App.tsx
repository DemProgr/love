import { useEffect, useState } from "react";
import Header, { type Page } from "./components/Header";
import { LangProvider } from "./i18n";
import Home from "./pages/Home";
import LoveStory from "./pages/LoveStory";
import Music from "./pages/Music";
import Quiz from "./pages/Quiz";

function readInitialPage(): Page {
  if (typeof window === "undefined") return "home";
  const param = new URLSearchParams(window.location.search).get("page");
  return param === "story" || param === "music" || param === "quiz" ? param : "home";
}

export default function App() {
  const [page, setPage] = useState<Page>(readInitialPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const url = new URL(window.location.href);
    if (page === "home") {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", page);
    }
    window.history.replaceState({}, "", url);
  }, [page]);


  return (
    <LangProvider>
      <Header page={page} onNavigate={setPage} />
      <main id="top" className={`site site--${page}`}>
        {page === "home" && <Home onNavigate={setPage} />}
        {page === "story" && <LoveStory onNavigate={setPage} />}
        {page === "music" && <Music onNavigate={setPage} />}
        {page === "quiz" && <Quiz onNavigate={setPage} />}
      </main>
    </LangProvider>
  );
}
