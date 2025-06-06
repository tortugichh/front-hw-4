import { useState, useEffect } from 'react';
import { useFeedbackStore, type Category } from '../store/feedbackStore';
import { Modal } from './Modal';

export function EditFeedbackModal() {
  const editingFeedbackId = useFeedbackStore((state) => state.editingFeedbackId);
  const feedbackList = useFeedbackStore((state) => state.feedbackList);
  const setEditingFeedbackId = useFeedbackStore((state) => state.setEditingFeedbackId);
  const updateFeedback = useFeedbackStore((state) => state.updateFeedback);

  const editingFeedback = feedbackList.find(item => item.id === editingFeedbackId);

  const [editText, setEditText] = useState('');
  const [editCategory, setEditCategory] = useState<Category>('Feature');

  useEffect(() => {
    if (editingFeedback) {
      setEditText(editingFeedback.text);
      setEditCategory(editingFeedback.category);
    }
  }, [editingFeedback]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFeedbackId && editText.trim()) {
      updateFeedback(editingFeedbackId, editText, editCategory);
    }
  };

  const handleClose = () => {
    setEditingFeedbackId(null);
  };

  const categories: Category[] = ['UI', 'Performance', 'Feature', 'Other'];

  return (
    <Modal isOpen={!!editingFeedbackId} onClose={handleClose}>
      <h2 className="text-2xl font-bold mb-6 text-theme-primary">Edit Feedback</h2>
      {editingFeedback && (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="editText" className="block text-theme-muted text-sm font-medium mb-2">
              Feedback Text:
            </label>
            <textarea
              id="editText"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-theme bg-theme-surface text-theme-primary placeholder-theme-muted focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 h-24 resize-none"
              placeholder="Enter your feedback..."
            />
          </div>
          
          <div>
            <label htmlFor="editCategory" className="block text-theme-muted text-sm font-medium mb-2">
              Category:
            </label>
            <select
              id="editCategory"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value as Category)}
              className="w-full px-4 py-3 rounded-lg border-2 border-theme bg-theme-surface text-theme-primary focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-theme-surface text-theme-primary">
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}