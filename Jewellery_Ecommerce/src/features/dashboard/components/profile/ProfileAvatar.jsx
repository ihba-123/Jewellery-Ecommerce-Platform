import { Camera } from 'lucide-react';

const ProfileAvatar = ({ name, imageUrl, isEditing, onPhotoUpdate }) => {
  const getInitials = (name) => {
    return name
      ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      : 'U';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onPhotoUpdate) {
      // Create a temporary object URL to preview the image
      const newImageUrl = URL.createObjectURL(file);
      onPhotoUpdate(newImageUrl);
    }
  };

  return (
    <div className="relative animate-in zoom-in duration-300">
      <div className="relative z-10 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-amber-200 to-amber-500 shadow-xl shadow-amber-500/20 group sm:h-28 sm:w-28">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl font-bold tracking-wider text-amber-900 sm:text-3xl">
            {getInitials(name)}
          </span>
        )}
        
        {isEditing && (
          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            <Camera className="w-8 h-8 text-white" />
          </label>
        )}
      </div>
      
      {/* Decorative background ring */}
      <div className="absolute inset-0 -z-10 scale-[1.12] rounded-full border border-amber-200" />
    </div>
  );
};

export default ProfileAvatar;
