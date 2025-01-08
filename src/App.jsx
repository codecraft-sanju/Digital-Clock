import React, { useEffect, useState } from 'react';
import './App.css';
import { FaSun, FaMoon } from 'react-icons/fa';

const App = () => {
  const [time, setTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState('Local');
  const [format24Hour, setFormat24Hour] = useState(true);
  const [theme, setTheme] = useState('dark');

  const timeZones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
    'America/Los_Angeles',
    'Europe/Paris',
    'Asia/Dubai',
    'Africa/Cairo',
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedTime = (date) => {
    const options = { timeZone: timeZone === 'Local' ? undefined : timeZone };
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      timeZone: options.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !format24Hour,
    }).format(date);

    const [hours, minutes, seconds] = formattedDate.split(':');
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = getFormattedTime(time);

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const backgroundStyle =
    theme === 'dark'
      ? 'background-dark'
      : time.getHours() >= 6 && time.getHours() < 18
      ? 'background-day'
      : 'background-night';

  return (
    <div className={`app ${theme} ${backgroundStyle}`}>
      <div className="header">
        <h1>🌍 Ultra Digital Clock</h1>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="date">{formattedDate}</div>
      <div className="clock">
        <div className="digit-container">
          <div className="digit">{hours[0]}</div>
          <div className="digit">{hours[1]}</div>
        </div>
        <div className="separator">:</div>
        <div className="digit-container">
          <div className="digit">{minutes[0]}</div>
          <div className="digit">{minutes[1]}</div>
        </div>
        <div className="separator">:</div>
        <div className="digit-container">
          <div className="digit">{seconds[0]}</div>
          <div className="digit">{seconds[1]}</div>
        </div>
      </div>
      <div className="controls">
        <label htmlFor="timezone">Time Zone:</label>
        <select
          id="timezone"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        >
          <option value="Local">Local</option>
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace('_', ' ')}
            </option>
          ))}
        </select>
        <label htmlFor="format">24-Hour Format:</label>
        <input
          id="format"
          type="checkbox"
          checked={format24Hour}
          onChange={() => setFormat24Hour(!format24Hour)}
        />
      </div>
    </div>
  );
};

export default App;
