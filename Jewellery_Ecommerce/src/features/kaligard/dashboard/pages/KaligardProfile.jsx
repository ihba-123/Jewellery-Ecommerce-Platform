import { useState } from 'react';
import ProfileAvatar from '../../../dashboard/components/profile/ProfileAvatar';
import EditProfileForm from '../../../dashboard/components/profile/EditProfileForm';
import ChangePasswordForm from '../../../dashboard/components/profile/ChangePasswordForm';

const KaligardProfile = () => {
  const [viewMode, setViewMode] = useState('view'); // 'view', 'edit', 'password'

  const [factoryData, setFactoryData] = useState({
    factoryName: "Golden Designs Manufacturing",
    contactPerson: "Raj Kumar",
    email: "info@goldendesigns.com",
    phoneNumber: "+977-1-4123456",
    registrationNumber: "GST123456789",
    specialization: "Gold Designing & Manufacturing",
    website: "www.goldendesigns.com",
    addressLine1: "123 Factory Road, Industrial Area",
    city: "Kathmandu",
    country: "Nepal",
    imageUrl: "",
    accountStatus: "Active",
    createdAt: "January 15, 2024"
  });

  const handleSaveProfile = (updatedData) => {
    setFactoryData(prev => ({ ...prev, ...updatedData }));
    setViewMode('view');
  };

  const handlePhotoUpdate = (newImageUrl) => {
    setFactoryData(prev => ({ ...prev, imageUrl: newImageUrl }));
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex min-h-[30rem] flex-col items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-lg">

        <ProfileAvatar
          name={factoryData.factoryName}
          imageUrl={factoryData.imageUrl}
          isEditing={viewMode === 'edit'}
          onPhotoUpdate={handlePhotoUpdate}
        />

        {viewMode === 'view' && (
          <div className="flex w-full flex-col items-center animate-in fade-in duration-500">
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-white">{factoryData.factoryName}</h2>
            <p className="mt-2 rounded-full border border-yellow-300/50 bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-200">
              Kaligard Account
            </p>

            {/* Factory Details Grid */}
            <div className="my-6 w-full space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem label="Contact Person" value={factoryData.contactPerson} />
                <DetailItem label="Email" value={factoryData.email} />
                <DetailItem label="Phone" value={factoryData.phoneNumber} />
                <DetailItem label="Registration Number" value={factoryData.registrationNumber} />
                <DetailItem label="Specialization" value={factoryData.specialization} />
                <DetailItem label="Website" value={factoryData.website} />
                <DetailItem label="City" value={factoryData.city} />
                <DetailItem label="Country" value={factoryData.country} />
              </div>
              <DetailItem label="Address" value={factoryData.addressLine1} />
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Account Status" value={factoryData.accountStatus} />
                <DetailItem label="Member Since" value={factoryData.createdAt} />
              </div>
            </div>

            <div className="my-6 h-px w-full bg-white/10" />

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setViewMode('edit')}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] hover:brightness-110 active:scale-95 transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setViewMode('password')}
                className="px-6 py-2.5 rounded-lg border border-white/30 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition-all"
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {viewMode === 'edit' && (
          <EditProfileForm
            user={factoryData}
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

const DetailItem = ({ label, value, editable = false, mask = false }) => (
  <div className="rounded-lg border border-white/15 bg-white/8 p-4">
    <p className="text-white/60 text-sm font-medium">{label}</p>
    <p className="text-white mt-1 font-medium">
      {mask ? value.replace(/\d(?=\d{4})/g, '*') : value}
    </p>
  </div>
);

export default KaligardProfile;
