import { useState, useEffect } from "react";
import hasi from "../data/assets/hasi.png";

export function useMouseCoordinates() {
  const [coordinates, setCoordinates] = useState({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    function handleMouseMove({ clientX, clientY }) {
      setCoordinates({ clientX, clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return function cleanup() {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return coordinates;
}

export default function MyComponent() {
  const { clientX, clientY } = useMouseCoordinates();

  return (
    <div style={{ cursor: "none", width: "100%", height: "100%" }}>
      <h2>Mouse X: {clientX}</h2>
      <h2>Mouse Y: {clientY}</h2>
      <Cursor x={clientX} y={clientY} />
    </div>
  );
}
