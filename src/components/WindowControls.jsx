import useWindowStore from "#store/window";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, toggleMaximizeWindow } =
    useWindowStore();

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
