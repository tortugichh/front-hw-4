import { useFeedbackStore, type Category } from '../store/feedbackStore';

interface FeedbackItemProps {
  feedback: { id: string; text: string; likes: number; dislikes: number; category: Category };
  onDelete: (id: string) => void;
}

export function FeedbackItem({ feedback, onDelete }: FeedbackItemProps) {
  const likeFeedback = useFeedbackStore((state) => state.likeFeedback);
  const dislikeFeedback = useFeedbackStore((state) => state.dislikeFeedback);
  const setEditingFeedbackId = useFeedbackStore((state) => state.setEditingFeedbackId);

  return (
    <div className="bg-theme-surface border-2 border-theme rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="flex-grow md:mr-6">
          <p className="text-theme-primary text-lg leading-relaxed mb-2">{feedback.text}</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            {feedback.category}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => setEditingFeedbackId(feedback.id)}
          >
            ✏️ Edit
          </button>
          
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={() => likeFeedback(feedback.id)}
          >
            <span>👍</span>
            <span>{feedback.likes}</span>
          </button>
          
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            onClick={() => dislikeFeedback(feedback.id)}
          >
            <span>👎</span>
            <span>{feedback.dislikes}</span>
          </button>
          
          <button
            className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => onDelete(feedback.id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}