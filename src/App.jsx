import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import BootSequence from "./components/BootSequence";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import GitHubActivity from "./components/GitHubActivity";
import NotFound from "./pages/NotFound";

function Portfolio() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);

  // Simple path-based routing
  const path = window.location.pathname;
  const is404 = path !== "/" && path !== "";

  if (is404) return <NotFound />;

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <BootSequence onComplete={() => setBooted(true)} />
      <div style={{
        opacity: booted || sessionStorage.getItem("boot_done") === "1" ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}>
        <Portfolio />
      </div>
    </>
  );
}
