"use client";

import { useEffect, useRef, useState } from "react";

interface BackgroundProps {
  imgUrl?: any;
  bgColor?: string;
}

const Background = ({ bgColor = "", imgUrl }: BackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    const image = new window.Image();
    image.crossOrigin = "Anonymous";
    image.src = imgUrl;

    image.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          // Get the middle top pixel color
          const x = Math.floor(canvas.width / 2);
          const y = 0;
          const pixelData = ctx.getImageData(x, y, 1, 1).data;

          const rgba = `rgba(${pixelData[0]}, ${pixelData[1]}, ${
            pixelData[2]
          }, ${pixelData[3] / 255})`;
          setColor(rgba);
        }
      }
    };
  }, [imgUrl]);
  return (
    <>
      {/* Selected The Color of the Image */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      <div
        className={`h-[800px] w-full absolute top-0 left-0`}
        style={{
          background: `linear-gradient(${bgColor ? bgColor : color}  ,#171717)`,
        }}
      ></div>
    </>
  );
};

export default Background;
