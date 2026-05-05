import { Plus } from 'lucide-react';

const PageHeader = ({ onAdd, title = 'MY PRODUCTS', subtitle = 'Create and manage your jewellery product catalog.', buttonLabel = 'ADD PRODUCT', showAddButton = true }) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white">{title}</h1>
        <p className="text-white/70 text-lg mt-2">{subtitle}</p>
      </div>
      {showAddButton && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#6f6bdb] font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
