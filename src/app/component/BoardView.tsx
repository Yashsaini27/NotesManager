import React from "react";
import TaskCard from "./TaskCard";
import { Task } from './types'; // Import the shared type

interface BoardViewProps {
  tasks: Task[];
}

const BoardView: React.FC<BoardViewProps> = ({ tasks = [] }) => {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:gap-10">
      {tasks.map((task, index) => (
        <TaskCard key={index} task={task} />
      ))}
    </div>
  );
};

export default BoardView;
