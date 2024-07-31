import clsx from "clsx";
import React from "react";

interface TitleProps {
  title: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, className }) => {
  return (
    <h2 className={clsx("text-2xl font-semibold capitalize", className)}>
      {title}
    </h2>
  );
};

export default Title;
