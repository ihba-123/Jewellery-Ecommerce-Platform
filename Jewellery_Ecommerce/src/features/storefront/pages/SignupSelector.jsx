import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, User, Building, Truck, Factory } from 'lucide-react';

const SignupSelector = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: 'Select your role', value: null, icon: ChevronDown, disabled: true },
    { label: 'Customer', value: 'customer', icon: User, description: 'Shop and order jewelry' },
    { label: 'Business', value: 'business', icon: Building, description: 'Sell jewelry online' },
    { label: 'Rider', value: 'rider', icon: Truck, description: 'Deliver orders & earn' },
    { label: 'Kaligard Factory', value: 'kaligard', icon: Factory, description: 'Factory partner' },
  ];

  const handleSelect = (value) => {
    if (value) {
      navigate(`/signup/${value}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-transparent px-4 py-8 flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundAttachment: 'fixed' }}
    >
      <div className="w-full max-w-2xl rounded-3xl border border-white/12 bg-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl p-5 sm:p-8 text-white">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Create Account</h1>
          <p className="text-white/60 text-lg">Join our platform and start your journey</p>
        </div>

        {/* Dropdown Selector */}
        <div className="relative mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-14 rounded-xl border border-white/20 bg-white/8 px-4 text-left text-white font-semibold flex items-center justify-between hover:bg-white/12 transition-all"
            style={{ cursor: 'pointer' }}
          >
            <span>Select your role to continue</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl z-50 overflow-hidden">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleSelect(option.value);
                    setIsOpen(false);
                  }}
                  disabled={option.disabled}
                  className={`w-full px-4 py-3 text-left transition-all first:border-0 border-t border-white/10 flex items-center gap-3 ${
                    option.disabled
                      ? 'text-white/40 cursor-default'
                      : 'text-white hover:bg-white/20 cursor-pointer'
                  }`}
                  style={{ cursor: option.disabled ? 'default' : 'pointer' }}
                >
                  <option.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-white/60">{option.description}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 mb-8">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-2xl mb-2">🛒</div>
            <h3 className="font-semibold text-white mb-1">Customer</h3>
            <p className="text-xs text-white/60">Browse and buy premium jewelry</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-2xl mb-2">🏪</div>
            <h3 className="font-semibold text-white mb-1">Business</h3>
            <p className="text-xs text-white/60">Sell your products online</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-2xl mb-2">🚚</div>
            <h3 className="font-semibold text-white mb-1">Rider</h3>
            <p className="text-xs text-white/60">Deliver orders & earn income</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-2xl mb-2">🏭</div>
            <h3 className="font-semibold text-white mb-1">Kaligard</h3>
            <p className="text-xs text-white/60">Factory partnership program</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-white/10 pt-6">
          <p className="text-white/70 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-[#f5d97c] font-semibold hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupSelector;
