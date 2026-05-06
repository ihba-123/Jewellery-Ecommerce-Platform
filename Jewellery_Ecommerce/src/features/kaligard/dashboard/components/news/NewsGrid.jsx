import NewsCard from './NewsCard';

const NewsGrid = ({ items, onDelete, onView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {items.map((item) => (
        <NewsCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default NewsGrid;
