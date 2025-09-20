import { BarChart, Star, Target, Trophy, Users } from "lucide-react";

const PlayerProfileSection = () => {
  const player = {
    name: "Brian Otieno",
    position: "Forward",
    team: "Nairobi City Stars",
    bio: "Explosive winger with a keen eye for goal. Currently top scorer in the Nairobi Premier League.",
    image: "images/otieno.jpg", // Replace with real player image
    stats: [
      { label: "Matches", value: 32, icon: Users },
      { label: "Goals", value: 18, icon: Target },
      { label: "Assists", value: 12, icon: Star },
      { label: "Trophies", value: 3, icon: Trophy },
      { label: "Pass Accuracy", value: "86%", icon: BarChart },
    ],
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-sm bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Player Image */}
        <div className="w-full h-full">
          <img
            src={player.image}
            alt={player.name}
            className="rounded-3xl w-full h-full object-cover shadow-lg"
          />
        </div>

        {/* Player Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{player.name}</h2>
          <p className="text-green-700 font-medium">{player.position} · {player.team}</p>
          <p className="text-gray-600">{player.bio}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            {player.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-green-100 rounded-xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition"
              >
                <div className="bg-green-100 text-green-700 p-2 rounded-xl">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerProfileSection;
