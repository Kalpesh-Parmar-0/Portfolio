import { useState } from "react";
import { WindowControls } from "#components";
import { photosLinks, gallery } from "#constants";
import WindowWraper from "#hoc/WindowWraper";
import clsx from "clsx";
import useWindowStore from "#store/window";

const Photos = () => {
  const [activeAlbum, setActiveAlbum] = useState(photosLinks[0]?.title);

  const { openWindow } = useWindowStore();

  const openItem = (imageUrl) => {
    openWindow("imgfile", {
      name: "Photo",
      imageUrl,
    });
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Photos</h2>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <h2>Albums</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li
                key={id}
                className={clsx(
                  title === activeAlbum ? "active" : "not-active",
                )}
                onClick={() => setActiveAlbum(title)}
              >
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li key={id} onClick={() => openItem(img)}>
                <img src={img} alt={`${activeAlbum}-${id}`} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWraper(Photos, "photos");

export default PhotosWindow;
