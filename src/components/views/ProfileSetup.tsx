
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ProfileSetupProps {
  role: string;
  onComplete: (profile: any) => void;
  onBack: () => void;
}

const ProfileSetup = ({ role, onComplete, onBack }: ProfileSetupProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    experience: '',
    specialization: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to complete your profile');
      return;
    }

    setLoading(true);

    try {
      // Update the user's profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: profile.firstName,
          last_name: profile.lastName,
          bio: profile.bio,
          location: profile.location,
          phone: profile.phone
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        toast.error('Failed to update profile. Please try again.');
        return;
      }

      toast.success('Profile updated successfully!');
      onComplete({ ...profile, role });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSpecializationLabel = () => {
    switch (role) {
      case 'player': return 'Position/Sport';
      case 'coach': return 'Coaching Specialty';
      case 'referee': return 'Sports Officiated';
      case 'scout': return 'Scouting Focus';
      default: return 'Specialization';
    }
  };

  const getExperienceLabel = () => {
    switch (role) {
      case 'player': return 'Years Playing';
      case 'coach': return 'Years Coaching';
      case 'referee': return 'Years Officiating';
      case 'scout': return 'Years Scouting';
      default: return 'Years of Experience';
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="text-center space-y-4 mb-12">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-green-600 hover:text-green-700"
        >
          ← Back to Role Selection
        </Button>
        
        <h1 className="text-4xl font-bold text-gray-800">
          Build Your 
          <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span> Profile
        </h1>
        <p className="text-lg text-gray-600">
          Let's create your professional sports profile to connect with the right opportunities.
        </p>
      </div>

      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  required
                  className="border-green-200 focus:border-green-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  required
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="border-green-200 focus:border-green-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, County"
                className="border-green-200 focus:border-green-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="specialization">{getSpecializationLabel()}</Label>
                <Input
                  id="specialization"
                  value={profile.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  placeholder={role === 'player' ? 'e.g., Midfielder, Forward' : 'e.g., Football, Basketball'}
                  className="border-green-200 focus:border-green-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">{getExperienceLabel()}</Label>
                <Input
                  id="experience"
                  value={profile.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 5 years"
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your achievements, and your goals..."
                rows={4}
                className="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:border-green-500 resize-none"
              />
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-lg"
            >
              {loading ? 'Saving...' : 'Continue to Sports Selection'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
