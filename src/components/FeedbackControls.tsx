import { useFeedbackStore, type Category } from '../store/feedbackStore';

export function FeedbackControls() {
  const filter = useFeedbackStore((state) => state.filter);
  const setFilter = useFeedbackStore((state) => state.setFilter);
  const sortOrder = useFeedbackStore((state) => state.sortOrder);
  const setSortOrder = useFeedbackStore((state) => state.setSortOrder);
  const categoryFilter = useFeedbackStore((state) => state.categoryFilter);
  const setCategoryFilter = useFeedbackStore((state) => state.setCategoryFilter);

  const categories: (Category | 'all')[] = ['all', 'UI', 'Performance', 'Feature', 'Other'];

  return (
    <div className="mb-6 p-4 bg-theme-surface rounded-lg border-2 border-theme">
      <h3 className="text-lg font-semibold text-theme-primary mb-4">Filter & Sort</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="categoryFilter" className="block text-theme-muted text-sm font-medium mb-2">
            Category:
          </label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as Category | 'all')}
            className="w-full px-3 py-2 rounded-lg border-2 border-theme bg-theme-surface text-theme-primary focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-theme-surface text-theme-primary">
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="filter" className="block text-theme-muted text-sm font-medium mb-2">
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'popular' | 'recent')}
            className="w-full px-3 py-2 rounded-lg border-2 border-theme bg-theme-surface text-theme-primary focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            <option value="all" className="bg-theme-surface text-theme-primary">All</option>
            <option value="popular" className="bg-theme-surface text-theme-primary">Popular</option>
            <option value="recent" className="bg-theme-surface text-theme-primary">Recent</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="block text-theme-muted text-sm font-medium mb-2">
            Sort:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest' | 'most_likes')}
            className="w-full px-3 py-2 rounded-lg border-2 border-theme bg-theme-surface text-theme-primary focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            <option value="newest" className="bg-theme-surface text-theme-primary">Newest First</option>
            <option value="oldest" className="bg-theme-surface text-theme-primary">Oldest First</option>
            <option value="most_likes" className="bg-theme-surface text-theme-primary">Most Likes</option>
          </select>
        </div>
      </div>
    </div>
  );
}