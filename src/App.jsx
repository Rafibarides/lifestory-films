import Nav from "./components/nav/Nav.jsx";
import Hero from "./components/hero/Hero.jsx";
import SlideshowSection from "./components/slideshow/SlideshowSection.jsx";
import TransitionSection from "./components/transition/TransitionSection.jsx";
import PackagesSection from "./components/packages/PackagesSection.jsx";
import DemoBlock from "./components/packages/DemoBlock.jsx";
import ProcessSection from "./components/packages/ProcessSection.jsx";
import FaqSection from "./components/faq/FaqSection.jsx";
import ContactSection from "./components/contact/ContactSection.jsx";
import Footer from "./components/footer/Footer.jsx";

// NOTE: CustomizableBlock is intentionally NOT rendered. Its copy still lives
// in siteContent.json under packagesSection.customizable so it can be
// re-enabled by importing CustomizableBlock and dropping it back into the
// JSX below.

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SlideshowSection />
        <TransitionSection />
        <PackagesSection id="documentaries" />
        <DemoBlock />
        <ProcessSection id="process" />
        <FaqSection id="faq" />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </>
  );
}
