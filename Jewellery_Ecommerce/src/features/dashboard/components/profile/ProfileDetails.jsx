import { User, MapPin, Briefcase, DollarSign, FileText, CheckCircle, Calendar } from 'lucide-react';

const ProfileDetails = ({ user }) => {
  const details = [
    {
      label: 'Full Name',
      value: user.fullName,
      icon: <User className="w-5 h-5 text-yellow-300" />
    },
    {
      label: 'Address',
      value: user.address,
      icon: <MapPin className="w-5 h-5 text-yellow-300" />
    },
    {
      label: 'Occupation',
      value: user.occupation,
      icon: <Briefcase className="w-5 h-5 text-yellow-300" />
    },
    {
      label: 'Annual Income',
      value: user.annualIncome,
      icon: <DollarSign className="w-5 h-5 text-yellow-300" />
    },
    {
      label: 'ID Proof',
      value: user.idProof,
      icon: <FileText className="w-5 h-5 text-yellow-300" />
    },
    {
      label: 'Account Status',
      value: user.accountStatus,
      icon: <CheckCircle className="w-5 h-5 text-yellow-300" />,
      isValueBadge: true
    },
    {
      label: 'Created At',
      value: user.createdAt,
      icon: <Calendar className="w-5 h-5 text-yellow-300" />
    },
  ];

  return (
    <div className="mt-6 w-full">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/8 p-3 transition-all hover:bg-white/12 sm:p-4">
            <div className="flex shrink-0 items-center justify-center rounded-lg bg-yellow-500/20 p-2">
              {detail.icon}
            </div>
            <div className="flex w-full flex-1 flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-1">{detail.label}</span>
              {detail.isValueBadge ? (
                <span className="inline-flex items-center self-start px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                  {detail.value}
                </span>
              ) : (
                <span className="text-white font-medium whitespace-normal break-words leading-tight">{detail.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;