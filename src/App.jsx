import { Navbar, Welcome, Dock, Home } from "#components";
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
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <ImageWindow />
      <Contact />
      <Photos />
      <Home />
    </main>
  );
};

export default App;
