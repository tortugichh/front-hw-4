import { useFeedbackStore } from '../store/feedbackStore';

export function ThemeSwitcher() {
  const theme = useFeedbackStore((state) => state.theme);
  const setTheme = useFeedbackStore((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className="relative inline-flex items-center px-6 py-3 rounded-full bg-theme-surface border-2 border-theme text-theme-primary font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 group"
      onClick={toggleTheme}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
        <span className="text-sm">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </div>
      
      {/* Animated background indicator */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
    </button>
  );
}