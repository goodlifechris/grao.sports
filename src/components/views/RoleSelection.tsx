
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void;
  onBack: () => void;
}

const RoleSelection = ({ onRoleSelect, onBack }: RoleSelectionProps) => {
  const roles = [
    {
      id: 'player',
      title: 'Player',
      description: 'Showcase your skills, achievements, and connect with scouts and teams',
      features: ['Performance Stats', 'Highlight Videos', 'Scout Visibility', 'Team Connections']
    },
    {
      id: 'coach',
      title: 'Coach',
      description: 'Develop talent, earn certifications, and build your coaching reputation',
      features: ['Coaching Licenses', 'Team Management', 'Player Development', 'Course Creation']
    },
    {
      id: 'referee',
      title: 'Referee',
      description: 'Track your officiating journey and advance through certification levels',
      features: ['Match History', 'Certification Levels', 'Performance Ratings', 'Assignment Tools']
    },
    {
      id: 'scout',
      title: 'Scout',
      description: 'Discover and evaluate talent with comprehensive player analytics',
      features: ['Player Search', 'Performance Analytics', 'Talent Reports', 'Club Connections']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center space-y-6 mb-16">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-green-600 hover:text-green-700"
        >
          ← Back to Home
        </Button>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Choose Your 
          <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"> Role</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select your primary role in the sports ecosystem. You can always add more roles later.
        </p>
        
        <div className="flex justify-center mt-8">
          <ArrowDown className="w-6 h-6 text-green-500 animate-bounce" />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {roles.map((role) => (
          <Card 
            key={role.id} 
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-green-100 hover:border-green-300 hover:scale-105"
            onClick={() => onRoleSelect(role.id)}
          >
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                  {role.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{role.description}</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Key Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {role.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white group-hover:shadow-lg transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onRoleSelect(role.id);
                }}
              >
                Continue as {role.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
