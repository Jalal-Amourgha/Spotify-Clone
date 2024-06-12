"use client";

interface BackgroundProps {
  color?: string;
}

const Background = ({ color }: BackgroundProps) => {
  return (
    <div
      className={`h-[800px] w-full absolute top-0 left-0`}
      style={{
        background: `linear-gradient(${color}  ,#171717)`,
      }}
    ></div>
  );
};

export default Background;
