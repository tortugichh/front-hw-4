import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist, createJSONStorage, devtools, type PersistOptions } from 'zustand/middleware';

export type Category = 'UI' | 'Performance' | 'Feature' | 'Other';


interface FeedbackItem {
  id: string;
  text: string;
  likes: number;
  dislikes: number;
  createdAt: number; 
  category: Category; 
}

type Filter = 'all' | 'popular' | 'recent';
type SortOrder = 'newest' | 'oldest' | 'most_likes';


interface FeedbackState {
  feedbackList: FeedbackItem[];
  filter: Filter;
  sortOrder: SortOrder;
  categoryFilter: Category | 'all'; 
  editingFeedbackId: string | null; 
  addFeedback: (text: string, category: Category) => void;
  deleteFeedback: (id: string) => void;
  likeFeedback: (id: string) => void;
  dislikeFeedback: (id: string) => void;
  setFilter: (filter: Filter) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setCategoryFilter: (category: Category | 'all') => void;
  setEditingFeedbackId: (id: string | null) => void;
  updateFeedback: (id: string, text: string, category: Category) => void;
  theme: 'light' | 'dark'; 
  setTheme: (theme: 'light' | 'dark') => void; 
}


interface PersistedStateSlice {
  feedbackList: FeedbackItem[];
  filter: Filter;
  sortOrder: SortOrder;
  categoryFilter: Category | 'all';
  theme: 'light' | 'dark';
}


const persistOptions: PersistOptions<FeedbackState, PersistedStateSlice> = {
  name: 'feedback-storage', 
  storage: createJSONStorage(() => localStorage), 
  
  partialize: (state) => ({
      feedbackList: state.feedbackList,
      filter: state.filter,
      sortOrder: state.sortOrder,
      categoryFilter: state.categoryFilter,
      theme: state.theme,
  }),
};


export const useFeedbackStore = create<FeedbackState>()(
  devtools(
    persist(
      (set, get) => ({
        
        feedbackList: [],
        filter: 'all', 
        sortOrder: 'newest', 
        categoryFilter: 'all', 
        editingFeedbackId: null, 
        theme: 'light', 

        
        addFeedback: (text: string, category: Category) => {
          set((state) => ({
            feedbackList: [...state.feedbackList, { id: uuidv4(), text, likes: 0, dislikes: 0, createdAt: Date.now(), category }],
          }));
        },
        deleteFeedback: (id: string) => {
          set((state) => ({
            feedbackList: state.feedbackList.filter((feedback) => feedback.id !== id),
          }));
        },
        likeFeedback: (id: string) => {
          set((state) => ({
            feedbackList: state.feedbackList.map((feedback) =>
              feedback.id === id ? { ...feedback, likes: feedback.likes + 1 } : feedback
            ),
          }));
        },
        dislikeFeedback: (id: string) => {
          set((state) => ({
            feedbackList: state.feedbackList.map((feedback) =>
              feedback.id === id ? { ...feedback, dislikes: feedback.dislikes + 1 } : feedback
            ),
          }));
        },
        setFilter: (filter) => set({ filter }),
        setSortOrder: (sortOrder) => set({ sortOrder }),
        setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
        setEditingFeedbackId: (id) => set({ editingFeedbackId: id }),
        updateFeedback: (id: string, text: string, category: Category) => {
          set((state) => ({
            feedbackList: state.feedbackList.map((feedback) =>
              feedback.id === id ? { ...feedback, text, category } : feedback
            ),
            editingFeedbackId: null,
          }));
        },
        setTheme: (theme) => set({ theme }), 
      }),
      persistOptions 
    )
  )
); 