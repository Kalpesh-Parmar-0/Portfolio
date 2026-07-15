import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// default sizes for title and subtitle
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map(
    (
      char,
      i, // returns array of each character without wite space and apply styles and baseweight
    ) => (
      <span
        key={i}
        className={className}
        style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ),
  );
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span"); // select all letters from span
  const { min, max, default: base } = FONT_WEIGHTS[type]; // based on type as title of subtitle apply min, max and default

  // animate each letter
  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect(); // finds left side of container
    const mouseX = e.clientX - left; // find left side of each character

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect(); // find left and width of letters
      const distance = Math.abs(mouseX - (l - left + w / 2)); // find distance between letters
      const intensity = Math.exp(-(distance ** 2) / 2000); // scale for each letter

      animateLetter(letter, min + (max - min) * intensity); // animate each letter as per mouse distance
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3)); // make letters to default scale
  };
  container.addEventListener("mousemove", handleMouseMove); // add mousemove event listener of container
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null); // title ref
  const subtitleRef = useRef(null); // subtitle ref

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title"); // this function animate letters
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Kalpesh! Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>
    </section>
  );
};

export default Welcome;
