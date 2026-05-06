import { Megaphone } from 'lucide-react';

const EmptyNewsState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-white/20 flex items-center justify-center mb-4 sm:mb-6">
        <Megaphone className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white/40" />
      </div>
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 text-center">
        NO NEWS POSTED
      </h3>
      <p className="text-sm sm:text-base lg:text-lg text-white/60 text-center max-w-md">
        Post updates and promotional videos to engage your customers.
      </p>
    </div>
  );
};

export default EmptyNewsState;
