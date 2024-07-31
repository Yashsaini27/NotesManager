"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '../../component/Loader';
import Title from '../../component/Title';
import Button from '../../component/Button';
import { IoMdAdd } from 'react-icons/io';
import Tabs from '../../component/Tabs';
import TaskTitle from '../../component/TaskTitle';
import BoardView from '../../component/BoardView';
import AddTask from '../../component/task/AddTask';
import Sidebar from '../../component/Sidebar';
import axios from 'axios';
import { Task as ImportedTask } from '../../component/types'; // Import the Task type

interface Tab {
  title: string;
  icon: JSX.Element;
}

const TABS: Tab[] = [];

interface TaskType {
  todo: string;
  'in progress': string;
  'under review': string;
  completed: string;
}

const TASK_TYPE: TaskType = {
  todo: 'bg-blue-600',
  'in progress': 'bg-yellow-600',
  'under review': 'bg-purple-600',
  completed: 'bg-green-600',
};

const Tasks: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'Tasks';

  const [selected, setSelected] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ImportedTask[]>([]); // Update type here

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const response = await axios.get('https://managerserver-4.onrender.com/task');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selected]); // Refetch tasks when the selected tab changes

  return (
    <div className="flex">
      <Sidebar />
      <div className="main-content">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <Title title={status} />
            {!searchParams.has('status') && (
              <Button
                onClick={() => setOpen(true)}
                label="Create Task"
                icon={<IoMdAdd className="text-lg" />}
                className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
              />
            )}
          </div>
          <Tabs tabs={TABS} setSelected={setSelected}>
            {!searchParams.has('status') && (
              <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
                <TaskTitle label="To Do" className={TASK_TYPE.todo} />
                <TaskTitle label="In Progress" className={TASK_TYPE['in progress']} />
                <TaskTitle label="Under Review" className={TASK_TYPE['under review']} />
                <TaskTitle label="Completed" className={TASK_TYPE.completed} />
              </div>
            )}
          </Tabs>
          <div className="w-full">
            {loadingTasks ? (
              <Loading /> // Show loading spinner only for tasks
            ) : (
              <BoardView tasks={tasks} />
            )}
          </div>
          <AddTask open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

const TasksPage: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <Tasks />
  </Suspense>
);

export default TasksPage;
