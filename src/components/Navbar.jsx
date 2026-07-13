import dayjs from "dayjs";

import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";
import { ThemeToggle } from "#components";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" className="dark:invert" />
        <p className="font-bold text-black dark:text-gray-100">
          Kalpesh's Portfolio
        </p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ThemeToggle />

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
