"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    ArrowRight,
    ShoppingCart,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

// Types
interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface Errors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
}

export default function ModernAuthPage() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});
    const [particles, setParticles] = useState<Particle[]>([]);

    // Floating particles effect
    useEffect(() => {
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 3,
            duration: Math.random() * 15 + 10,
        }));
        setParticles(newParticles);
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof Errors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = (): Errors => {
        const newErrors: Errors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!isLogin) {
            if (!formData.firstName) newErrors.firstName = "First name is required";
            if (!formData.lastName) newErrors.lastName = "Last name is required";
            if (!formData.phone) newErrors.phone = "Phone number is required";
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        return newErrors;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);

        alert(isLogin ? "Login successful!" : "Account created successfully!");
    };

    const socialLogins = [
        {
            name: "Google",
            icon: <FcGoogle className="w-5 h-5" />,
            title: "Continue with Google",
        },
    ];

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {particles.map((p) => (
                    <span
                        key={p.id}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            animation: `float ${p.duration}s ease-in-out infinite`,
                        }}
                        className="absolute bg-red-500 rounded-full opacity-30"
                    />
                ))}
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <ShoppingCart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">
                        Price<span className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent">Peek</span>
                    </h1>
                    <p className="text-gray-400">
                        {isLogin
                            ? "Welcome back! Sign in to continue"
                            : "Register to get started with us"}
                    </p>
                </div>

                {/* Card */}
                <div
                    className="rounded-3xl shadow-2xl border border-gray-700 p-8 relative overflow-hidden"
                    style={{ background: "linear-gradient(145deg, #1a1a1a, #0a0a0a)" }}
                >
                    {/* <button className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] 
  bg-[length:200%_auto] text-white text-sm font-semibold uppercase 
  px-12 py-4 m-2 rounded-lg shadow-lg 
  transition-all duration-500 ease-in-out 
  hover:bg-right hover:text-white"></button> */}
                    <div className="relative">
                        {/* Toggle Buttons */}
                        <div className="flex bg-gray-700 rounded-2xl p-1 mb-8">
                            <button
                                type="button"
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${isLogin
                                    ? "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-[length:200%_auto] text-white text-sm font-semibold uppercase  rounded-lg shadow-lg transition-all duration-500 ease-in-out   hover:bg-right hover:text-white"/*  "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] text-white shadow-lg transform scale-105" */
                                    : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${!isLogin
                                    ? "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-[length:200%_auto] text-white text-sm font-semibold uppercase  rounded-lg shadow-lg transition-all duration-500 ease-in-out   hover:bg-right hover:text-white"/*  "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] text-white shadow-lg transform scale-105" */
                                    : "text-gray-300 hover:text-white"
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                                    {/* First Name */}
                                    <div>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="First Name"
                                                className={`w-full pl-12 pr-4 py-4 bg-gray-700 border-2 rounded-xl text-white ${errors.firstName ? "border-red-500" : "border-gray-600"
                                                    }`}
                                            />
                                        </div>
                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.firstName}
                                            </p>
                                        )}
                                    </div>
                                    {/* Last Name */}
                                    <div>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Last Name"
                                                className={`w-full pl-12 pr-4 py-4 bg-gray-700 border-2 rounded-xl text-white ${errors.lastName ? "border-red-500" : "border-gray-600"
                                                    }`}
                                            />
                                        </div>
                                        {errors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.lastName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className={`w-full pl-12 pr-4 py-4 bg-gray-700 border-2 rounded-xl text-white ${errors.email ? "border-red-500" : "border-gray-600"
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className={`w-full pl-12 pr-12 py-4 bg-gray-700 border-2 rounded-xl text-white ${errors.password ? "border-red-500" : "border-gray-600"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            {!isLogin && (
                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm Password"
                                            className={`w-full pl-12 pr-12 py-4 bg-gray-700 border-2 rounded-xl text-white ${errors.confirmPassword
                                                ? "border-red-500"
                                                : "border-gray-600"
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Phone Number */}
                            {!isLogin && (
                                <div>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Phone Number"
                                            className={`w-full pl-12 pr-4 py-4 bg-gray-700 border-2 rounded-xl text-white ${errors.phone ? "border-red-500" : "border-gray-600"
                                                }`}
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}

                                className="w-full bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27]  bg-[length:200%_auto] text-sm font-semibold uppercase px-12 py-4  rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:bg-right hover:text-white   flex justify-center items-center space-x-2 text-white"
                            >
                                {isLoading ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <span>{isLogin ? "Sign In" : "Create Account"}</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-8">
                            <div className="flex-1 border-t border-gray-600"></div>
                            <div className="px-4 text-gray-400 text-sm bg-gray-800 rounded-full">
                                or continue with
                            </div>
                            <div className="flex-1 border-t border-gray-600"></div>
                        </div>

                        {/* Social */}
                        <div className="grid gap-3">
                            {socialLogins.map((social) => (
                                <button
                                    key={social.name}
                                    type="button"
                                    className="flex items-center justify-center py-3 px-4 border-2 border-gray-600 bg-gray-700 rounded-xl"
                                >
                                    {social.icon}
                                    <span className="ml-2">{social.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-8px) rotate(1deg);
          }
          66% {
            transform: translateY(4px) rotate(-1deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
