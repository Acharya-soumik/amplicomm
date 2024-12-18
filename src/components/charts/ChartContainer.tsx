import React from "react";

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
}) => (
  <div className="card transition-all duration-300 ease-in-out">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="h-[400px] w-full">{children}</div>
  </div>
);
