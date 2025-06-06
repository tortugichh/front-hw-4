import { useState } from 'react';
import { useFeedbackStore, type Category } from '../store/feedbackStore';

export function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Feature'); 
  const addFeedback = useFeedbackStore((state) => state.addFeedback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      addFeedback(feedbackText, selectedCategory); 
      setFeedbackText('');
      setSelectedCategory('Feature'); 
    }
  };

  const categories: Category[] = ['UI', 'Performance', 'Feature', 'Other'];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
      <input
        type="text"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Enter your feedback here..."
        className="flex-grow w-full md:w-auto px-4 py-3 rounded-lg border-2 border-theme bg-theme-surface text-theme-primary placeholder-theme-muted focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value as Category)}
        className="w-full md:w-auto px-4 py-3 rounded-lg border-2 border-theme bg-theme-surface text-theme-primary focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
      >
        {categories.map((category) => (
          <option key={category} value={category} className="bg-theme-surface text-theme-primary">
            {category}
          </option>
        ))}
      </select>
      <button 
        type="submit" 
        className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Add Feedback
      </button>
    </form>
  );
}