import React, { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { formatDate, PRIORITY_STYLES } from "../utils";
import clsx from "clsx";
import { CiClock2 } from "react-icons/ci";
import TaskDialog from '../component/task/TaskDialog';
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { Task, Priority } from "./types"; // Import the shared type

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const ICONS: Record<Priority, JSX.Element> = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardDoubleArrowUp />,
    low: <MdKeyboardDoubleArrowDown />,
    normal: <MdKeyboardDoubleArrowDown />,
  };

  const timeAgoSaved = formatDistanceToNow(new Date(task.deadline), { addSuffix: true });

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://managerserver-4.onrender.com/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = () => {
    fetchTasks(); // Re-fetch tasks to update the list
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-full h-fit bg-white shadow-md p-4 rounded">
      <div className="w-full flex justify-between">
        <div
          className={clsx(
            "flex flex-1 gap-1 items-center text-sm font-medium",
            PRIORITY_STYLES[task.priority]
          )}
        >
          <span className="text-lg">{ICONS[task.priority]}</span>
          <span className="uppercase">{task.priority} Priority</span>
        </div>

        <TaskDialog task={task} onDelete={handleDeleteTask} onEdit={fetchTasks} />
      </div>

      <h4 className="line-clamp-1 text-black mb-3">{task.title}</h4>
      <p className="text-gray-600 mb-3">{task.description}</p>
      <div className="text-sm mb-3 text-gray-500">
        <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium mb-3 inline-block">
          {task.tag}
        </span>
        <p className="mb-4 flex items-center">
          <CiClock2 className="inline-block text-lg mr-2" />
          {formatDate(new Date(task.deadline))}
        </p>
        {timeAgoSaved}
      </div>
    </div>
  );
};

export default TaskCard;
