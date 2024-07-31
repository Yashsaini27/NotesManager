// src/app/page.tsx
"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import Sidebar from '../../component/Sidebar';
import Navbar from '../../component/Navbar';
import BoardView from '../../component/BoardView';
import TaskTitle from '../../component/TaskTitle';
import Tabs from '../../component/Tabs';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Loading from '../../component/Loader';
import { Task } from '../../component/types'; // Import the Task type
import { useSearchParams } from 'next/navigation';

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

const DashboardContent: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState<string>('');

  const searchParams = useSearchParams();

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

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken);
        const fullName = decodedToken.user.name;
        const firstName = fullName.split(' ')[0];
        setUserName(firstName);
      } else {
        console.error('No token found in local storage');
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUserName();
  }, [selected]);

  return (
    <div className="main-content">
      <h2 style={{ fontWeight: 'bold', fontSize: '52px' }}>Good morning, {userName}!</h2>
      <header>
        <div className="intro">
          <div className="intro-item">
            <Image 
              src="/assets/Task1.png"
              alt="Introducing Tags"
              width={150}
              height={130}
            />
            <div className="intro-text">
              <h2>Introducing tags</h2>
              <p>Tags help you categorize your tasks. You can add multiple tags to any task for better organization.</p>
            </div>
          </div>
          <div className="intro-item">
            <Image 
              src="/assets/Task2.png"
              alt="Share Notes Instantly"
              width={160}
              height={130}
            />
            <div className="intro-text">
              <h2>Share Notes Instantly</h2>
              <p>Share your notes with your team instantly. Collaboration has never been easier with our real-time sharing feature.</p>
            </div>
          </div>
          <div className="intro-item">
            <Image 
              src="/assets/Task3.png"
              alt="Access Anywhere"
              width={150}
              height={130}
            />
            <div className="intro-text">
              <h2>Access Anywhere</h2>
              <p>Access your tasks and notes from anywhere, anytime. Stay productive on the go with our mobile-friendly design.</p>
            </div>
          </div>
        </div>
      </header>
      <Navbar />
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

      {loadingTasks ? (
        <Loading />
      ) : (
        <BoardView tasks={tasks} />
      )}
    </div>
  );
};

const DashboardPage: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <div className="container">
      <Head>
        <title>Task Manager</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Sidebar />
      <main>
        <DashboardContent />
      </main>
    </div>
  </Suspense>
);

export default DashboardPage;
