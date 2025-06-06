import { useMemo } from 'react';
import { FeedbackItem } from './FeedbackItem';
import { useFeedbackStore, type Category } from '../store/feedbackStore';

export function FeedbackList() {
  const feedbackList = useFeedbackStore((state) => state.feedbackList);
  const filter = useFeedbackStore((state) => state.filter);
  const sortOrder = useFeedbackStore((state) => state.sortOrder);
  const categoryFilter = useFeedbackStore((state) => state.categoryFilter);
  const deleteFeedback = useFeedbackStore((state) => state.deleteFeedback);

  const filteredAndSortedFeedback = useMemo(() => {
    let filtered = feedbackList;

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Apply filter
    if (filter === 'popular') {
      filtered = filtered.filter(item => item.likes > 0);
    } else if (filter === 'recent') {
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000; // 24 hours ago
      filtered = filtered.filter(item => item.createdAt > oneDayAgo);
    }

    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return b.createdAt - a.createdAt;
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'most_likes':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    return sorted;
  }, [feedbackList, filter, sortOrder, categoryFilter]);

  const handleDelete = (id: string) => {
    deleteFeedback(id);
  };

  return (
    <div>
      {filteredAndSortedFeedback.length === 0 ? (
        <p className="text-gray-500">No feedback items found.</p>
      ) : (
        filteredAndSortedFeedback.map((feedback) => (
          <FeedbackItem
            key={feedback.id}
            feedback={feedback}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}