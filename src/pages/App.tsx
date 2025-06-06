import { useEffect } from 'react';

import { useFeedbackStore } from '../store/feedbackStore';
import { FeedbackForm } from '../components/FeedbackForm';
import { FeedbackList } from '../components/FeedbackList';
import { FeedbackControls } from '../components/FeedbackControls';
import { EditFeedbackModal } from '../components/EditFeedbackModal';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export function App() {
  const feedbackListCount = useFeedbackStore((state) => state.feedbackList.length);
  const theme = useFeedbackStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-theme-primary">Product Feedback Board</h1>
          <ThemeSwitcher />
        </div>
        
        <div className="bg-theme-surface rounded-lg p-6 mb-6 border border-theme shadow-sm">
          <p className="text-theme-muted mb-4">Total Feedback: <span className="font-semibold text-theme-primary">{feedbackListCount}</span></p>
          <FeedbackForm />
        </div>
        
        <div className="bg-theme-surface rounded-lg p-6 border border-theme shadow-sm">
          <FeedbackControls />
          <FeedbackList />
        </div>
        
        <EditFeedbackModal />
      </div>
    </div>
  );
}