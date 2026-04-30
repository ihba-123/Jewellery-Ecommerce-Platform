import { useState } from 'react';
import ProfileAvatar from '../components/profile/ProfileAvatar';
import ProfileDetails from '../components/profile/ProfileDetails';
import ProfileActions from '../components/profile/ProfileActions';
import EditProfileForm from '../components/profile/EditProfileForm';
import ChangePasswordForm from '../components/profile/ChangePasswordForm';

const MyProfile = () => {
  const [viewMode, setViewMode] = useState('view'); // 'view', 'edit', 'password'
  
  // Dummy data representing the logged-in user profile
  const [dummyUser, setDummyUser] = useState({
    fullName: "John Doe",
    imageUrl: "",
    address: "123 Main Street, Kathmandu, Nepal",
    occupation: "Software Engineer",
    annualIncome: "NPR 1,200,000",
    idProof: "Citizenship (Verified)",
    accountStatus: "Active",
    createdAt: "January 15, 2024"
  });

  const handleSaveProfile = (updatedData) => {
    setDummyUser(prev => ({ ...prev, ...updatedData }));
    setViewMode('view');
  };

  const handlePhotoUpdate = (newImageUrl) => {
    setDummyUser(prev => ({ ...prev, imageUrl: newImageUrl }));
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex min-h-[26rem] flex-col items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-4 shadow-lg sm:p-6 lg:p-8">
        
        {/* Top Centered User Picture */}
        <ProfileAvatar 
          name={dummyUser.fullName} 
          imageUrl={dummyUser.imageUrl}
          isEditing={viewMode === 'edit'} 
          onPhotoUpdate={handlePhotoUpdate}
        />
        
        {viewMode === 'view' && (
          <div className="flex w-full flex-col items-center animate-in fade-in duration-500">
            {/* Name and Basic Role */}
            <h2 className="mt-5 text-h3 font-bold tracking-tight text-white">{dummyUser.fullName}</h2>
            <p className="mt-2 rounded-full border border-amber-200/50 bg-amber-50 px-3 py-1 text-small font-medium text-amber-600">
              Customer Account
            </p>
            
            {/* User Details Grid */}
            <ProfileDetails user={dummyUser} />
            
            <div className="my-6 h-px w-full bg-white/10" />
            
            {/* Action Buttons */}
            <ProfileActions 
              onEditClick={() => setViewMode('edit')} 
              onPasswordClick={() => setViewMode('password')} 
            />
          </div>
        )}

        {viewMode === 'edit' && (
          <EditProfileForm 
            user={dummyUser} 
            onCancel={() => setViewMode('view')} 
            onSave={handleSaveProfile} 
          />
        )}

        {viewMode === 'password' && (
          <ChangePasswordForm 
            onCancel={() => setViewMode('view')} 
            onSave={() => setViewMode('view')} 
          />
        )}
        
      </div>
    </div>
  );
};

export default MyProfile;
