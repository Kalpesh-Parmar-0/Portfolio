import useWindowStore from "#store/window";
import { useIsMobile } from "#hooks";
import { ChevronLeft } from "lucide-react";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, toggleMaximizeWindow } =
    useWindowStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <button
        type="button"
        className="mobile-back"
        aria-label="Back to Home Screen"
        onClick={() => closeWindow(target)}
      >
        <ChevronLeft className="size-4" strokeWidth={2.5} />
        <span>Back</span>
      </button>
    );
  }

  return (
    <div id="window-controls">
      <div
        className="close"
        role="button"
        aria-label="Close window"
        onClick={() => closeWindow(target)}
      />
      <div
        className="minimize"
        role="button"
        aria-label="Minimize window"
        onClick={() => minimizeWindow(target)}
      />
      <div
        className="maximize"
        role="button"
        aria-label="Maximize window"
        onClick={() => toggleMaximizeWindow(target)}
      />
    </div>
  );
};

export default WindowControls;
