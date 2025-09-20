/* eslint-disable react/no-unescaped-entities */
import { Calendar, MapPin, Users, Trophy } from "lucide-react";

const KothbiroTournamentSection = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header & Image */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ⚽ Kothbiro Football Tournament
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The legendary Kothbiro Tournament is where grassroots dreams come alive. Held annually in Ziwani, Nairobi, it unites communities through football, showcasing raw talent and fierce competition. From dusty pitches to national pride, this is more than a game—it's culture.
            </p>
            <div className="mt-6 space-x-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
                View Fixtures
              </button>
              <button className="text-green-700 font-semibold hover:underline">
                Learn More
              </button>
            </div>
          </div>

          <div>
            <img
              src="/images/kothbiro.jpg"
              alt="Kothbiro Tournament"
              className="w-full rounded-3xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Tournament Highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl shadow border border-green-100">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-gray-700">20+ Teams</h4>
            <p className="text-sm text-gray-500">Top teams from Nairobi and beyond</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-green-100">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-gray-700">Thousands of Fans</h4>
            <p className="text-sm text-gray-500">Packed crowds every matchday</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-green-100">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-gray-700">Historic Grounds</h4>
            <p className="text-sm text-gray-500">Played at the iconic Ziwani Grounds</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-green-100">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-gray-700">Dec – Jan</h4>
            <p className="text-sm text-gray-500">A festive season football tradition</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KothbiroTournamentSection;
