'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6e9e9] via-[#fddede] to-[#ffb7b7] flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6 border border-red-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              isLogin ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              !isLogin ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'
            }`}
          >
            Signup
          </button>
        </div>

        <motion.h2
          className="text-3xl font-bold text-center text-red-600 tracking-wide"
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isLogin ? 'Login to Continue' : 'Join AetherCare'}
        </motion.h2>

        <form className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-red-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 bg-red-50 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-2 text-red-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-red-50 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2 text-red-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 bg-red-50 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 shadow-lg transition duration-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-2">
          {isLogin ? "Don't have an account?" : 'Already a user?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-700 font-semibold hover:underline transition"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
