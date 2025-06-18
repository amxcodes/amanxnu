import React from "react";
import ProfileCardComponent from "./profile-card";

const ProfileSection = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center w-full gap-8 lg:gap-12 px-4 sm:px-6 lg:px-0">
      {/* Profile Card */}
      <div className="flex-shrink-0 mb-12 lg:mb-0 lg:mr-24">
        <ProfileCardComponent 
          avatarUrl="/profile-avatar.jpg"
          name="Aman Anu"
          title="Developer & Designer"
          handle="amanxnu"
          status="Available for Projects"
          contactText="Let's Connect"
          showUserInfo={true}
          enableTilt={true}
          onContactClick={() => window.location.href = 'mailto:amananuworks@gmail.com'}
        />
      </div>

      {/* Stats Circles */}
      <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-8 sm:gap-6 lg:gap-16">
        {/* Projects Circle */}
        <div className="relative flex items-center justify-center w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] group">
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl group-hover:blur-2xl transition-all duration-500" />
          
          {/* Gradient border */}
          <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" style={{ padding: '1px' }}>
            <div className="w-full h-full rounded-full bg-black" />
          </div>
          
          {/* Inner border with animation */}
          <div className="absolute w-[95%] h-[95%] rounded-full border border-zinc-800 group-hover:border-zinc-700 transition-colors duration-300" />
          
          {/* Content */}
          <div className="flex flex-col items-center justify-center text-center z-10">
            <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">7+</span>
            <span className="text-sm text-zinc-400 mt-2 tracking-wider font-light">Projects</span>
          </div>
        </div>

        {/* Songs Circle */}
        <div className="relative flex items-center justify-center w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] group">
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl group-hover:blur-2xl transition-all duration-500" />
          
          {/* Gradient border */}
          <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20" style={{ padding: '1px' }}>
            <div className="w-full h-full rounded-full bg-black" />
          </div>
          
          {/* Inner border with animation */}
          <div className="absolute w-[95%] h-[95%] rounded-full border border-zinc-800 group-hover:border-zinc-700 transition-colors duration-300" />
          
          {/* Content */}
          <div className="flex flex-col items-center justify-center text-center z-10">
            <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">15+</span>
            <span className="text-sm text-zinc-400 mt-2 tracking-wider font-light">Songs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection; 