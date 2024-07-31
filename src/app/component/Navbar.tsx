"use client";
import React, { useState } from 'react';
import './navbar.css';
import { FaPlus, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ShareOutlined, SearchOutlined, AutoAwesomeOutlined } from '@mui/icons-material';
import AddTask from './task/AddTask';

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
    // Handle the search functionality here
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <nav className="navbar">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <SearchOutlined className="search-icon" />
        </button>
      </form>

      <div className="navbar-buttons">
        <button className="navbar-button" onClick={toggleCalendar}>
          Calendar view <FaCalendarAlt />
        </button>
        <button className="navbar-button">
          Automation  <AutoAwesomeOutlined/>
        </button>
        <button className="navbar-button">
          Filter <FaFilter />
        </button>
        <button className="navbar-button">
          Share <ShareOutlined />
        </button>
        <button  onClick={() => setOpen(true)} className="create-button">
          Create New <FaPlus />
        </button>
      </div>

      {showCalendar && (
        <div className="calendar-container">
          <Calendar />
        </div>
      )}
       <AddTask open={open} setOpen={setOpen} /> 
    </nav>
  );
};

export default Navbar;
