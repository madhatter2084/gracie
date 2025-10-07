import { useState, useEffect } from 'react';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Get saved theme preference or default to system
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
    setTheme(savedTheme);
    
    // Function to get system theme
    const getSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Function to apply theme
    const applyTheme = (themeToApply: 'light' | 'dark' | 'system') => {
      let finalTheme: 'light' | 'dark';
      
      if (themeToApply === 'system') {
        finalTheme = getSystemTheme();
      } else {
        finalTheme = themeToApply;
      }
      
      setActualTheme(finalTheme);
      
      if (finalTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Apply initial theme
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    let finalTheme: 'light' | 'dark';
    
    if (newTheme === 'system') {
      finalTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      finalTheme = newTheme;
    }
    
    setActualTheme(finalTheme);
    
    if (finalTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return 'bi-sun-fill';
      case 'dark': return 'bi-moon-fill';
      case 'system': return 'bi-circle-half';
      default: return 'bi-circle-half';
    }
  };

  const getNextTheme = () => {
    switch (theme) {
      case 'light': return 'dark';
      case 'dark': return 'system';
      case 'system': return 'light';
      default: return 'light';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return `System (${actualTheme})`;
      default: return 'System';
    }
  };

  return (
    <div className="position-fixed d-flex align-items-center justify-content-center theme-switcher">
      <button
        onClick={() => handleThemeChange(getNextTheme())}
        className="btn border-0 rounded-circle d-flex align-items-center justify-content-center theme-toggle-btn"
        title={`Theme: ${getThemeLabel()}`}
      >
        <i className={`bi ${getThemeIcon()} theme-toggle-icon`}></i>
      </button>
    </div>
  );
}