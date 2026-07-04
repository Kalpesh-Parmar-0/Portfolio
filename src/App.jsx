import { Navbar, Welcome, Dock, Home, MobileHome } from "#components";
import {
  Contact,
  Finder,
  ImageWindow,
  Photos,
  Resume,
  Safari,
  Terminal,
  Text,
} from "#windows";
import { useIsMobile } from "#hooks";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  const isMobile = useIsMobile();

  return (
    <main>
      {isMobile ? (
        <MobileHome />
      ) : (
        <>
          <Navbar />
          <Welcome />
          <Dock />
          <Home />
        </>
      )}

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <ImageWindow />
      <Contact />
      <Photos />
    </main>
  );
};

export default App;
