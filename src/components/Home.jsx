import { locations } from "#constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import clsx from "clsx";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

const projects = locations.work?.children ?? [];
const Home = () => {
  const { setActiveLocation } = useLocationStore(); // set location of project in finder
  const { openWindow } = useWindowStore();

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project); // open's my project in finder
    openWindow("finder");
  };
  useGSAP(() => {
    Draggable.create(".folder"); // makes each folder draggable
  }, []);
  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
