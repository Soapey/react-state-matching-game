import { useEffect, useRef, useState } from "react";

export default function useHover() {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  function enter() {
    setHovered(true);
  }

  function leave() {
    setHovered(false);
  }

  useEffect(() => {
    const refCopy = ref;
    refCopy.current.addEventListener("mouseenter", () => {});
    refCopy.current.addEventListener("mouseleave", () => {});

    return () => {
      refCopy.current.removeEventListener("mouseenter", enter());
      refCopy.current.removeEventListener("mouseleave", leave());
    };
  });

  return [ref, hovered];
}
