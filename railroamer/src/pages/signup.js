"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  User,
  Building2,
  Mail,
  Lock,
  Phone,
  Calendar,
  CreditCard,
  Train,
  Hash,
  MapPin,
} from "lucide-react";

export default function Signup() {
  const [role, setRole] = useState("USER");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    dob: "",
    aadhar_card: "",
    provider_type: "TRAIN_SERVICE",
    contact_number: "",
    gst_number: "",
    train_name: "",
    train_number: "",
    station_name: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        role === "USER"
          ? "http://localhost:5000/api/auth/user/signup"
          : "http://localhost:5000/api/auth/provider/signup";

      const payload =
        role === "USER"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              phone_no: formData.phone_no,
              dob: formData.dob,
              aadhar_card: formData.aadhar_card,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              provider_type: formData.provider_type,
              contact_number: formData.contact_number,
              gst_number: formData.gst_number,
              train_name: formData.train_name,
              train_number: formData.train_number,
              station_name: formData.station_name,
            };

      const res = await axios.post(endpoint, payload);
      localStorage.setItem("token", res.data.token);
      router.push(role === "USER" ? "/profile/user" : "/profile/provider");
    } catch (err) {
      alert(
        "Signup failed: " + (err.response?.data?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-24 flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
              Join our platform to access personalized services and features
              tailored to your needs.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100">
            {/* Role Selection */}
            <div className="flex border-b border-slate-200">
              <div
                className={`flex-1 cursor-pointer transition-all ${
                  role === "USER"
                    ? "bg-blue-50 border-b-2 border-blue-600"
                    : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setRole("USER")}
              >
                <div className="flex items-center p-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      role === "USER"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <User size={22} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg text-slate-800">
                      Passenger
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      Book tickets, order food, and more
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`flex-1 cursor-pointer transition-all ${
                  role === "PROVIDER"
                    ? "bg-blue-50 border-b-2 border-blue-600"
                    : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setRole("PROVIDER")}
              >
                <div className="flex items-center p-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      role === "PROVIDER"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Building2 size={22} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg text-slate-800">
                      Service Provider
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">
                      Offer train services or station vending
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="p-8 md:p-12">
              {/* Progress Steps */}
              {role === "PROVIDER" && (
                <div className="flex justify-center mb-12">
                  <div className="flex items-center w-full max-w-xs">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= 1
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      1
                    </div>
                    <div
                      className={`w-full h-1.5 mx-3 ${
                        step >= 2 ? "bg-blue-600" : "bg-slate-200"
                      }`}
                    ></div>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= 2
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      2
                    </div>
                  </div>
                </div>
              )}

              <form
                onSubmit={
                  role === "PROVIDER" && step === 1
                    ? handleNextStep
                    : handleSignup
                }
              >
                {/* Step 1: Basic Information */}
                {(role === "USER" || (role === "PROVIDER" && step === 1)) && (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                        <User size={20} />
                      </div>
                      <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        required
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                        <Mail size={20} />
                      </div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        required
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                        <Lock size={20} />
                      </div>
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        required
                      />
                    </div>

                    {role === "USER" && (
                      <>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                            <Phone size={20} />
                          </div>
                          <input
                            name="phone_no"
                            type="text"
                            placeholder="Phone Number"
                            value={formData.phone_no}
                            onChange={handleChange}
                            className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                          />
                        </div>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                            <Calendar size={20} />
                          </div>
                          <input
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                          />
                        </div>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                            <CreditCard size={20} />
                          </div>
                          <input
                            name="aadhar_card"
                            type="text"
                            placeholder="Aadhar Card Number"
                            value={formData.aadhar_card}
                            onChange={handleChange}
                            className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                          />
                        </div>
                      </>
                    )}

                    {role === "PROVIDER" && (
                      <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Provider Type
                        </label>
                        <select
                          name="provider_type"
                          value={formData.provider_type}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base appearance-none"
                          required
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `right 1rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1.5em 1.5em`,
                            paddingRight: `3rem`,
                          }}
                        >
                          <option value="TRAIN_SERVICE">Train Service</option>
                          <option value="STATION_VENDOR">Station Vendor</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Provider Details */}
                {role === "PROVIDER" && step === 2 && (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                        <Phone size={20} />
                      </div>
                      <input
                        name="contact_number"
                        type="text"
                        placeholder="Contact Number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        required
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                        <Hash size={20} />
                      </div>
                      <input
                        name="gst_number"
                        type="text"
                        placeholder="GST Number"
                        value={formData.gst_number}
                        onChange={handleChange}
                        className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                        required
                      />
                    </div>

                    {formData.provider_type === "TRAIN_SERVICE" && (
                      <>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                            <Train size={20} />
                          </div>
                          <input
                            name="train_name"
                            type="text"
                            placeholder="Train Name"
                            value={formData.train_name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                          />
                        </div>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                            <Hash size={20} />
                          </div>
                          <input
                            name="train_number"
                            type="text"
                            placeholder="Train Number"
                            value={formData.train_number}
                            onChange={handleChange}
                            className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                            required
                          />
                        </div>
                      </>
                    )}

                    {formData.provider_type === "STATION_VENDOR" && (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                          <MapPin size={20} />
                        </div>
                        <input
                          name="station_name"
                          type="text"
                          placeholder="Station Name"
                          value={formData.station_name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                          required
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Form Actions */}
                <div
                  className={`mt-10 flex ${
                    role === "PROVIDER" && step === 2
                      ? "justify-between"
                      : "justify-center"
                  } gap-4`}
                >
                  {role === "PROVIDER" && step === 2 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-base"
                    >
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-sm text-base ${
                      role === "PROVIDER" && step === 2
                        ? "min-w-[150px]"
                        : "w-full max-w-sm"
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {role === "PROVIDER" && step === 1
                      ? "Continue"
                      : "Create Account"}
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center mt-8">
                <p className="text-slate-600 text-base">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
