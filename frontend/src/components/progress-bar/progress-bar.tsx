import React from "react";

const CircleProgressBar = ({
  percentage,
  border,
}: {
  percentage: number;
  border: string;
}) => {
  return (
    <div className="relative w-32 h-32 flex justify-center items-center">
      {/* Background Circle */}
      <div className="absolute w-[50px] h-[50px] rounded-full border-4 border-white opacity-30"></div>

      {/* Progress Circle */}
      <div
        className={`absolute w-[50px] h-[50px] rounded-full border-4 border-t-transparent ${border}`}
        style={{
          transform: `rotate(${(percentage / 100) * 360}deg)`,
          transition: "transform 0.5s linear",
        }}
      ></div>

      {/* Percentage in the middle */}
      <div className="text-white text-ssm font-semibold">{percentage}%</div>
    </div>
  );
};

export default CircleProgressBar;
