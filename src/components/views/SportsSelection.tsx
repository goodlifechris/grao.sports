
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SportsSelectionProps {
  onComplete: () => void;
  onBack: () => void;
}

const SportsSelection = ({ onComplete, onBack }: SportsSelectionProps) => {
  const { user } = useAuth();
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [availableSports, setAvailableSports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const { data: sports, error } = await supabase
        .from('sports')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching sports:', error);
        toast.error('Failed to load sports');
        return;
      }

      setAvailableSports(sports || []);
    } catch (error) {
      console.error('Error fetching sports:', error);
      toast.error('Failed to load sports');
    }
  };

  const popularSportNames = ['Football', 'Basketball', 'Tennis', 'Swimming'];
  const popularSports = availableSports.filter(sport => 
    popularSportNames.includes(sport.name)
  );
  const otherSports = availableSports.filter(sport => 
    !popularSportNames.includes(sport.name)
  );

  const toggleSport = (sportId: string) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  const handleComplete = async () => {
    if (selectedSports.length === 0) {
      toast.error('Please select at least one sport');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to save your sports preferences');
      return;
    }

    setLoading(true);

    try {
      // Delete existing user sports to prevent duplicates
      await supabase
        .from('user_sports')
        .delete()
        .eq('user_id', user.id);

      // Insert new user sports
      const userSportsData = selectedSports.map(sportId => ({
        user_id: user.id,
        sport_id: sportId,
        experience_level: 'intermediate' // Default level
      }));

      const { error } = await supabase
        .from('user_sports')
        .insert(userSportsData);

      if (error) {
        console.error('Error saving sports:', error);
        toast.error('Failed to save your sports preferences. Please try again.');
        return;
      }

      toast.success('Your sports preferences have been saved!');
      onComplete();
    } catch (error) {
      console.error('Error saving sports:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center space-y-4 mb-12">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-green-600 hover:text-green-700"
        >
          ← Back to Profile Setup
        </Button>
        
        <h1 className="text-4xl font-bold text-gray-800">
          Select Your 
          <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Sports</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the sports you're involved in. You can select multiple sports and update this anytime.
        </p>
        <p className="text-sm text-green-600">
          {selectedSports.length} sport{selectedSports.length !== 1 ? 's' : ''} selected
        </p>
      </div>

      <div className="space-y-8">
        {popularSports.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Sports in Kenya</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularSports.map((sport) => (
                <Card 
                  key={sport.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedSports.includes(sport.id) 
                      ? 'bg-green-50 border-green-300 shadow-lg' 
                      : 'border-green-100 hover:border-green-200'
                  }`}
                  onClick={() => toggleSport(sport.id)}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                      selectedSports.includes(sport.id) 
                        ? 'bg-green-500' 
                        : 'bg-gray-200'
                    }`}>
                      {selectedSports.includes(sport.id) ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <h3 className={`font-semibold ${
                      selectedSports.includes(sport.id) ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {sport.name}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {otherSports.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Other Sports</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherSports.map((sport) => (
                <Card 
                  key={sport.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedSports.includes(sport.id) 
                      ? 'bg-green-50 border-green-300 shadow-lg' 
                      : 'border-green-100 hover:border-green-200'
                  }`}
                  onClick={() => toggleSport(sport.id)}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                      selectedSports.includes(sport.id) 
                        ? 'bg-green-500' 
                        : 'bg-gray-200'
                    }`}>
                      {selectedSports.includes(sport.id) ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <h3 className={`font-semibold ${
                      selectedSports.includes(sport.id) ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {sport.name}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Button 
          onClick={handleComplete}
          disabled={selectedSports.length === 0 || loading}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Complete Registration'}
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          You can always add or remove sports from your profile later
        </p>
      </div>
    </div>
  );
};

export default SportsSelection;
