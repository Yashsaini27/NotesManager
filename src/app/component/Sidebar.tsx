"use client";
import React, { useEffect, useState } from 'react';
import { KeyboardDoubleArrowRightOutlined, LightModeOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';
import { FaHome, FaColumns, FaCog, FaUsers, FaChartLine, FaPlus, FaRegBell } from 'react-icons/fa';
import Link from 'next/link';
import AddTask from './task/AddTask';
import { useRouter } from 'next/navigation';
import './sidebar.css';
import {jwtDecode} from 'jwt-decode';

interface SidebarProps {
  // userName: string; // Add this prop for user's name
  // profileImageUrl: string; // Add this prop for profile image URL
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>(''); // Track the active button
  const [userName, setUserName] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const router = useRouter();

  const handleLogout = () => {
    // Remove token from localStorage or wherever it is stored
    localStorage.removeItem('authToken');
    
    // Redirect to login page
    router.push('/');
  };

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Decode the token
        const decodedToken: any = jwtDecode(token); // Add appropriate type if using TypeScript
        console.log(decodedToken); // Inspect the decoded token structure
        const fullName = decodedToken.user.name; // Adjust according to the token structure
        setUserName(fullName);
        setProfileImageUrl(decodedToken.user.profileImageUrl || null); // Adjust according to the token structure
      } else {
        console.error('No token found in local storage');
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const handleProfileImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Handle the file upload (e.g., upload to a server or set the image URL directly)
        const imageUrl = URL.createObjectURL(file);
        setProfileImageUrl(imageUrl);
        // Optionally, save the image URL to the server or local storage
      }
    };
    input.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="sidebar">
      <div className="profile" onClick={handleProfileImageClick}>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt="Profile Picture" width={80} height={80} className="profile-pic" />
        ) : (
          <div className="profile-pic-placeholder">
            {getInitials(userName)}
          </div>
        )}
        <div className="profile-info">
          <span className="profile-name">{userName}</span>
        </div>
      </div>
      <div className="notify">
        <FaRegBell />
        <LightModeOutlined />
        <KeyboardDoubleArrowRightOutlined />
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <nav>
        <ul>
          <li
            className={activeButton === 'home' ? 'active' : ''}
            onClick={() => handleButtonClick('home')}
          >
            <FaHome />
            <Link href="/pages/dashboard" passHref><span>Home</span></Link>
          </li>
          <li
            className={activeButton === 'boards' ? 'active' : ''}
            onClick={() => handleButtonClick('boards')}
          >
            <FaColumns />
            <Link href="/pages/Task1" passHref><span>Boards</span></Link>
          </li>
          <li
            className={activeButton === 'settings' ? 'active' : ''}
            onClick={() => handleButtonClick('settings')}
          >
            <FaCog />
            <span>Settings</span>
          </li>
          <li
            className={activeButton === 'teams' ? 'active' : ''}
            onClick={() => handleButtonClick('teams')}
          >
            <FaUsers />
            <span>Teams</span>
          </li>
          <li
            className={activeButton === 'analytics' ? 'active' : ''}
            onClick={() => handleButtonClick('analytics')}
          >
            <FaChartLine />
            <span>Analytics</span>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => setOpen(true)}
        className="create-task-button" // Add your desired class names here
      >
        Create new task <FaPlus />
      </button>
      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Sidebar;
