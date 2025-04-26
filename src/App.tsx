import { useLayoutEffect, useRef, useState } from "react";

export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const onPointerEnter = () => {
    setIsHovered(true);
  };
  const onPointerLeave = () => {
    setIsHovered(false);
  };

  return { isHovered, onPointerEnter, onPointerLeave };
};

export const useAlignToNode = (
  refContainer: { ref: React.RefObject<HTMLElement | null> },
  hoverRef: React.RefObject<HTMLElement | null>,
) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    if (!refContainer.ref.current || !hoverRef.current) {
      setLeft(200);
      setTop(0);
      return;
    }

    setLeft(0);
    setTop(100);
  }, [refContainer, hoverRef]);

  return { left, top };
};

const App = () => {
  // "use no memo";
  const { isHovered, onPointerEnter, onPointerLeave } = useHover();
  const ref = useRef(null);
  const hoverRef = useRef(null);
  const { left, top } = useAlignToNode({ ref }, hoverRef);

  return (
    <>
      <span
        ref={ref}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        Hover me
      </span>
      {isHovered && (
        <div style={{ left, top, position: "absolute" }} ref={hoverRef}>
          (this hover text should be below the text)
        </div>
      )}
    </>
  );
};

export default App;
