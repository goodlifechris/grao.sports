/* eslint-disable react/no-unescaped-entities */

import { Button } from "@/components/ui/button";
import { Calendar, Users, CheckCircle } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = (
  // { onGetStarted }: HeroSectionProps

) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Grow Sports
              </span>
              <br />
              <span className="text-gray-800">Talent in Kenya</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect players, coaches, scouts, and referees. Showcase achievements, 
              earn certifications, and discover opportunities in Kenya's vibrant sports ecosystem.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg"
            >
              Join the Community
            </Button>
            {/* <Button 
              variant="outline" 
              size="lg"
              className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 text-lg"
            >
              Learn More
            </Button> */}
          </div>
          
          <div className="flex items-center space-x-8 pt-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">1,000+ Athletes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">50+ Tournaments</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">Verified Profiles</span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="bg-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Kevin Baraka</h3>
                  <p className="text-sm text-gray-600">Attacking Midfielder</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Profile Completion</span>
                  <span className="text-sm font-semibold text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-[95%]"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">42</div>
                  <div className="text-xs text-gray-600">Goals Scored</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">200</div>
                  <div className="text-xs text-gray-600">Duels Won</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
