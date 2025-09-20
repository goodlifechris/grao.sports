import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, CheckCircle, Heart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Fan Engagement",
      description:
        "Fans can follow favorite teams, cheer on players, join fan clubs, and stay updated with match highlights.",
      roles: ["Follow Teams", "Join Fan Clubs", "Live Reactions", "Exclusive Content"],
    },
    {
      icon: Users,
      title: "Role-Based Profiles",
      description:
        "Tailored profiles for players, coaches, referees, and scouts with relevant stats and achievements.",
      roles: ["Players", "Coaches", "Referees", "Scouts"],
    },
    {
      icon: CheckCircle,
      title: "Certification Courses",
      description:
        "Earn verified badges and certifications through our comprehensive online training programs.",
      roles: ["Coaching Licenses", "Referee Levels", "Skills Badges", "Safety Certs"],
    },
    {
      icon: Calendar,
      title: "Tournament Management",
      description:
        "Create and manage tournaments with fixture scheduling, score tracking, and performance analytics.",
      roles: ["League Creation", "Fixture Management", "Live Scoring", "Analytics"],
    },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20 bg-white">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl font-bold text-gray-800">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            Grow
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From profile building to tournament management, Grao.sports provides all the tools
          you need to advance your sports career in Kenya.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group flex flex-col h-full hover:shadow-xl transition-all duration-300 border-green-100 hover:border-green-200 bg-white"
          >
            <CardContent className="p-8 flex flex-col gap-6 flex-grow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {feature.roles.map((role, roleIndex) => (
                  <span
                    key={roleIndex}
                    className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
