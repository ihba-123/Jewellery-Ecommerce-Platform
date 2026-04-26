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
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path></svg>
          </label>
        )}
      </div>
      
      {/* Decorative background ring */}
      <div className="absolute inset-0 -z-10 scale-[1.12] rounded-full border border-amber-200" />
    </div>
  );
};

export default ProfileAvatar;
