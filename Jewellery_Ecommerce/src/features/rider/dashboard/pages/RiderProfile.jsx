import { useState, useRef, useContext } from 'react';
import { RiderOrderContext } from '../../context/RiderOrderContext';
import { Edit2, Save, X, Phone, Mail, MapPin, Truck, Upload, Camera } from 'lucide-react';

const RiderProfile = () => {
  const { riderProfile, updateRiderProfile } = useContext(RiderOrderContext);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const [riderData, setRiderData] = useState({
    fullName: riderProfile.fullName || 'Arjun Singh',
    email: 'arjun.singh@example.com',
    phoneNumber: '+977-9841234567',
    rating: 4.8,
    totalDeliveries: 342,
    totalEarnings: 125000,
    vehicleType: 'Bike',
    vehicleNumber: 'BA-1-PA-2023',
    licenseNumber: 'LIC-123456789',
    accountStatus: 'Active',
    joinedDate: 'March 15, 2024',
    city: 'Kathmandu',
    address: '123 Rider Street, Thamel',
    imageUrl: riderProfile.imageUrl || '',
    bankAccount: '9876543210123456',
    bankName: 'Nepal Bank Limited',
  });

  const [editData, setEditData] = useState(riderData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(riderData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setRiderData(editData);
    updateRiderProfile({ imageUrl: editData.imageUrl, fullName: editData.fullName });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setEditData(prev => ({ ...prev, imageUrl: imageData }));
        // Immediately update context so it shows in topbar
        updateRiderProfile({ imageUrl: imageData, fullName: editData.fullName });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-white/8 to-white/5 p-4 border border-white/10 hover:border-white/20 transition-all">
      <Icon className="h-5 w-5 text-[#f5d97c] mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-medium text-white/60 uppercase tracking-wider">{label}</p>
        <p className="mt-1.5 text-sm font-semibold text-white truncate">{value}</p>
      </div>
    </div>
  );

  const EditableInput = ({ label, name, value, icon: Icon, type = 'text' }) => (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-[#f5d97c]" />}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full h-11 rounded-lg border border-white/15 bg-white/6 px-4 text-white placeholder:text-white/40 focus:border-[#f5d97c] focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#f5d97c]/20 transition-all"
      />
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header Card */}
      <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-md p-6 sm:p-8 mb-6 shadow-xl">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-5">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-white border-2 border-white/20 shadow-lg overflow-hidden">
                {riderData.imageUrl ? (
                  <img src={riderData.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#f5d97c] via-[#d4af37] to-[#a87b12] flex items-center justify-center text-4xl font-bold text-[#231806]">
                    {riderData.fullName.charAt(0)}
                  </div>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={triggerImageUpload}
                  className="absolute -bottom-1 -right-1 bg-[#f5d97c] text-[#231806] rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{riderData.fullName}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg">⭐ {riderData.rating}</span>
                <span className="text-white/60 text-sm">({riderData.totalDeliveries} deliveries)</span>
              </div>
              <p className="text-xs text-white/50 mt-1.5">Joined {riderData.joinedDate}</p>
            </div>
          </div>

          <button
            onClick={isEditing ? handleCancel : handleEdit}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-2"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            {isEditing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 p-3 sm:p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-emerald-300">{riderData.totalDeliveries}</p>
            <p className="text-xs text-white/60 mt-1">Deliveries</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-[#f5d97c]/20 to-[#d4af37]/5 border border-[#d4af37]/20 p-3 sm:p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#f5d97c]">₹{(riderData.totalEarnings / 1000).toFixed(0)}K</p>
            <p className="text-xs text-white/60 mt-1">Earnings</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 p-3 sm:p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-blue-300">{riderData.accountStatus}</p>
            <p className="text-xs text-white/60 mt-1">Status</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      {!isEditing ? (
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-r from-[#f5d97c] to-[#d4af37]"></span>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailItem icon={Phone} label="Phone" value={riderData.phoneNumber} />
              <DetailItem icon={Mail} label="Email" value={riderData.email} />
              <DetailItem icon={MapPin} label="City" value={riderData.city} />
              <DetailItem icon={MapPin} label="Address" value={riderData.address} />
            </div>
          </div>

          {/* Vehicle & License */}
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-r from-[#f5d97c] to-[#d4af37]"></span>
              Vehicle & License
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailItem icon={Truck} label="Vehicle Type" value={riderData.vehicleType} />
              <DetailItem icon={Truck} label="Vehicle Number" value={riderData.vehicleNumber} />
              <DetailItem icon={Truck} label="License Number" value={riderData.licenseNumber} />
            </div>
          </div>

          {/* Bank Details */}
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-r from-[#f5d97c] to-[#d4af37]"></span>
              Bank Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailItem icon={Phone} label="Account Number" value={`****${riderData.bankAccount.slice(-4)}`} />
              <DetailItem icon={Phone} label="Bank Name" value={riderData.bankName} />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-md p-6 sm:p-8 space-y-8 shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Edit Profile</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditableInput label="Full Name" name="fullName" value={editData.fullName} icon={Phone} />
                <EditableInput label="Email" name="email" value={editData.email} type="email" icon={Mail} />
                <EditableInput label="Phone Number" name="phoneNumber" value={editData.phoneNumber} icon={Phone} />
                <EditableInput label="City" name="city" value={editData.city} icon={MapPin} />
              </div>
              <EditableInput label="Address" name="address" value={editData.address} icon={MapPin} />
            </div>
          </div>

          <hr className="border-white/10" />

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Vehicle Information</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditableInput label="Vehicle Type" name="vehicleType" value={editData.vehicleType} icon={Truck} />
                <EditableInput label="Vehicle Number" name="vehicleNumber" value={editData.vehicleNumber} icon={Truck} />
                <EditableInput label="License Number" name="licenseNumber" value={editData.licenseNumber} icon={Truck} />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              onClick={handleSave}
              className="flex-1 h-11 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-bold text-[#231806] hover:shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 h-11 rounded-lg border border-white/20 bg-white/8 hover:bg-white/12 text-sm font-semibold text-white transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderProfile;
