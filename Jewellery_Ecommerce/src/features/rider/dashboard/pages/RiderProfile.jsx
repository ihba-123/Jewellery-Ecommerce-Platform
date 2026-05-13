import { useState } from 'react';
import { Edit2, Save, X, Phone, Mail, MapPin, Truck } from 'lucide-react';

const RiderProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [riderData, setRiderData] = useState({
    fullName: 'Arjun Singh',
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
    imageUrl: '',
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
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
      <Icon className="h-5 w-5 text-[#f5d97c] mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-medium text-white/60 uppercase tracking-wide">{label}</p>
        <p className="mt-1 text-sm font-medium text-white truncate">{value}</p>
      </div>
    </div>
  );

  const EditableInput = ({ label, name, value, icon: Icon, type = 'text' }) => (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-white/85 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        className="w-full h-10 rounded-lg border border-white/20 bg-white/8 px-3 text-white placeholder:text-white/40 focus:border-[#f5d97c] focus:outline-none focus:ring-2 focus:ring-[#f5d97c]/30 transition-all"
      />
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header Card */}
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] flex items-center justify-center text-3xl font-bold text-[#231806]">
              {riderData.fullName.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{riderData.fullName}</h2>
              <p className="text-sm text-white/60 mt-1">Rating: ⭐ {riderData.rating}</p>
              <p className="text-xs text-white/50 mt-1">Joined {riderData.joinedDate}</p>
            </div>
          </div>
          <button
            onClick={isEditing ? handleCancel : handleEdit}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            style={{ border: "none", cursor: "pointer" }}
          >
            {isEditing ? <X className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg bg-white/8 p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-[#f5d97c]">{riderData.totalDeliveries}</p>
            <p className="text-xs text-white/60 mt-1">Deliveries</p>
          </div>
          <div className="rounded-lg bg-white/8 p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-[#f5d97c]">₹{riderData.totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-white/60 mt-1">Total Earnings</p>
          </div>
          <div className="rounded-lg bg-white/8 p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-emerald-400">{riderData.accountStatus}</p>
            <p className="text-xs text-white/60 mt-1">Status</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      {!isEditing ? (
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem icon={Phone} label="Phone" value={riderData.phoneNumber} />
              <DetailItem icon={Mail} label="Email" value={riderData.email} />
              <DetailItem icon={MapPin} label="City" value={riderData.city} />
              <DetailItem icon={MapPin} label="Address" value={riderData.address} />
            </div>
          </div>

          <hr className="border-white/10" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Vehicle & License</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem icon={Truck} label="Vehicle Type" value={riderData.vehicleType} />
              <DetailItem icon={Truck} label="Vehicle Number" value={riderData.vehicleNumber} />
              <DetailItem icon={Truck} label="License Number" value={riderData.licenseNumber} />
            </div>
          </div>

          <hr className="border-white/10" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Bank Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem icon={Phone} label="Account Number" value={riderData.bankAccount} />
              <DetailItem icon={Phone} label="Bank Name" value={riderData.bankName} />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 space-y-6">
          <h3 className="text-lg font-semibold text-white">Edit Profile</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EditableInput label="Full Name" name="fullName" value={editData.fullName} icon={Phone} />
            <EditableInput label="Email" name="email" value={editData.email} type="email" icon={Mail} />
            <EditableInput label="Phone Number" name="phoneNumber" value={editData.phoneNumber} icon={Phone} />
            <EditableInput label="City" name="city" value={editData.city} icon={MapPin} />
            <EditableInput label="Address" name="address" value={editData.address} icon={MapPin} span="full" />
          </div>

          <hr className="border-white/10" />

          <h4 className="text-sm font-semibold text-white mt-6">Vehicle Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EditableInput label="Vehicle Type" name="vehicleType" value={editData.vehicleType} icon={Truck} />
            <EditableInput label="Vehicle Number" name="vehicleNumber" value={editData.vehicleNumber} icon={Truck} />
            <EditableInput label="License Number" name="licenseNumber" value={editData.licenseNumber} icon={Truck} />
          </div>

          <div className="flex gap-3 pt-6">
            <button
              onClick={handleSave}
              className="flex-1 h-10 rounded-lg bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] hover:brightness-110 transition-all flex items-center justify-center gap-2"
              style={{ border: "none", cursor: "pointer" }}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 h-10 rounded-lg border border-white/20 bg-white/8 text-sm font-semibold text-white hover:bg-white/12 transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}
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
