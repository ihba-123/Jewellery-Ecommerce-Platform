import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Truck,
  FileText,
  DollarSign,
  MapPin,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const inputBase =
  "w-full h-11 rounded-xl border bg-white px-4 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 focus:ring-4";
const labelBase = "text-sm font-medium text-white/85";

const riderFields = {
  personal: [
    { name: "fullName", label: "Full Name", type: "text", icon: User },
    { name: "email", label: "Email Address", type: "email", icon: Mail },
    { name: "phoneNumber", label: "Phone Number", type: "tel", icon: Phone },
    { name: "password", label: "Password", type: "password", icon: Lock },
    { name: "confirmPassword", label: "Confirm Password", type: "password", icon: Lock },
  ],
  address: [
    { name: "addressLine1", label: "Address Line 1", type: "text", icon: MapPin },
    { name: "city", label: "City", type: "text", icon: MapPin },
    { name: "state", label: "State", type: "text", icon: MapPin },
    { name: "pincode", label: "Pincode", type: "text", icon: MapPin },
    { name: "country", label: "Country", type: "text", icon: MapPin },
  ],
  vehicle: [
    { name: "vehicleType", label: "Vehicle Type", type: "select", options: ["Bike", "Scooter", "Car"], icon: Truck },
    { name: "vehicleNumber", label: "Vehicle Registration Number", type: "text", icon: Truck },
    { name: "insuranceNumber", label: "Insurance Policy Number", type: "text", icon: FileText },
    { name: "licenseNumber", label: "Driving License Number", type: "text", icon: FileText },
  ],
  bank: [
    { name: "accountNumber", label: "Bank Account Number", type: "text", icon: DollarSign },
    { name: "ifscCode", label: "IFSC Code", type: "text", icon: DollarSign },
    { name: "accountHolder", label: "Account Holder Name", type: "text", icon: DollarSign },
    { name: "bankName", label: "Bank Name", type: "text", icon: DollarSign },
  ],
};

const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

export default function SignupRiderExperience() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Personal Info", "Address", "Vehicle Details", "Bank Account"];
  const [formValues, setFormValues] = useState(
    Object.keys(riderFields).reduce((acc, section) => {
      riderFields[section].forEach((field) => {
        acc[field.name] = "";
      });
      return acc;
    }, {})
  );
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentFields = useMemo(() => {
    const sectionKeys = Object.keys(riderFields);
    return riderFields[sectionKeys[currentStep]] || [];
  }, [currentStep]);

  const errors = useMemo(() => {
    const e = {};
    currentFields.forEach((f) => {
      if (!formValues[f.name]?.trim()) e[f.name] = `${f.label} is required`;
    });

    if (formValues.email && !isValidEmail(formValues.email)) {
      e.email = "Invalid email";
    }
    if (formValues.password && formValues.password.length < 6) {
      e.password = "Minimum 6 characters";
    }
    if (
      formValues.confirmPassword &&
      formValues.password !== formValues.confirmPassword
    ) {
      e.confirmPassword = "Passwords do not match";
    }
    if (formValues.phoneNumber && !/^\d{10}$/.test(formValues.phoneNumber.replace(/\D/g, ""))) {
      e.phoneNumber = "Invalid phone number";
    }
    if (formValues.pincode && !/^\d{6}$/.test(formValues.pincode)) {
      e.pincode = "Invalid pincode";
    }
    if (formValues.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formValues.ifscCode)) {
      e.ifscCode = "Invalid IFSC code";
    }

    return e;
  }, [currentFields, formValues]);

  const onChange = (e) =>
    setFormValues((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onBlur = (e) => setTouched((p) => ({ ...p, [e.target.name]: true }));

  const canProceedToNext = Object.keys(errors).length === 0;

  const handleNext = () => {
    const allTouched = currentFields.reduce(
      (acc, f) => ({ ...acc, [f.name]: true }),
      {}
    );
    setTouched((p) => ({ ...p, ...allTouched }));

    if (canProceedToNext && currentStep < steps.length - 1) {
      setCurrentStep((p) => p + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = Object.keys(formValues).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/otp-verification", {
        state: {
          signupData: formValues,
          mode: "rider",
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClass = (name) => {
    if (touched[name] && errors[name])
      return `${inputBase} border-rose-400/70 bg-white/6 text-white placeholder:text-white/35 focus:border-rose-400 focus:ring-rose-500/10`;
    if (touched[name] && !errors[name])
      return `${inputBase} border-emerald-400/70 bg-white/6 text-white placeholder:text-white/35 focus:border-emerald-400 focus:ring-emerald-500/10`;
    return `${inputBase} border-white/10 bg-white/6 text-white placeholder:text-white/35 focus:border-violet-400 focus:ring-violet-500/10`;
  };

  return (
    <section className="min-h-screen bg-transparent px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-3xl border border-white/12 bg-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl p-5 sm:p-8 text-white">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-200">
            Join as Rider
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
            Become a Delivery Partner
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Fast earnings, flexible hours, unlimited opportunities
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                    idx <= currentStep
                      ? "bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-[#231806]"
                      : "bg-white/10 text-white/50 border border-white/20"
                  }`}
                >
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      idx < currentStep
                        ? "bg-gradient-to-r from-[#f5d97c] to-[#d4af37]"
                        : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/60 text-center">
            {steps[currentStep]} — Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : (e) => e.preventDefault()} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {currentFields.map((field) => (
              <label
                key={field.name}
                className={`grid gap-2 ${field.span === "full" ? "sm:col-span-2" : ""}`}
              >
                <span className={labelBase}>{field.label}</span>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formValues[field.name]}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={getInputClass(field.name)}
                    disabled={isSubmitting}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formValues[field.name]}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={getInputClass(field.name)}
                    disabled={isSubmitting}
                  />
                )}
                {touched[field.name] && errors[field.name] && (
                  <span className="text-xs text-rose-500">{errors[field.name]}</span>
                )}
              </label>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex gap-3">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 h-11 rounded-xl border border-white/20 bg-white/6 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/30 active:scale-95 flex items-center justify-center gap-2"
              >
                <ChevronLeft size={18} /> Back
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={!canProceedToNext}
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#f5d97c] via-[#d4af37] to-[#a87b12] text-sm font-semibold text-[#231806] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Complete Signup"}
              </button>
            )}
          </div>

          <p className="text-center text-sm text-white/70 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#f5d97c] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
