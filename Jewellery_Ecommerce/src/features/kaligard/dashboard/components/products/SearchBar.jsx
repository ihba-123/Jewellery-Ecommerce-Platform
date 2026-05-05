import { Search } from "lucide-react";

const SearchBar = ({ query, onQueryChange }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-yellow-400/0 via-yellow-300/0 to-amber-400/0 opacity-0 blur-lg transition-opacity duration-300 group-focus-within:opacity-20 pointer-events-none" />
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50 transition-colors duration-200 group-focus-within:text-white/70" />
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search products..."
        className="relative w-full h-14 rounded-2xl border border-white/20 bg-white/8 pl-12 pr-4 text-base text-white placeholder:text-white/40 outline-none backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-200 focus:border-white/40 focus:bg-white/12 focus:shadow-[0_12px_48px_rgba(139,92,246,0.15)] sm:h-16 sm:text-lg"
      />
    </div>
  );
};

export default SearchBar;
