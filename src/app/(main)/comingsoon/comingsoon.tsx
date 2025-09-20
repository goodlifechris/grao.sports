// pages/index.js
"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ComingSoon() {
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 18
  });

  const [email, setEmail] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        else if (minutes > 0) return { ...prev, minutes: minutes - 1, seconds: 59 };
        else if (hours > 0) return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        else if (days > 0) return { ...prev, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        else return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
    setEmail('');
  };

  const currentFeatures = [
    "Send messages to other users",
    "Create and share posts",
    "Follow other users",
    "Like and comment on posts"
  ];

  const upcomingFeatures = [
    {
      title: "Tournament Creation",
      description: "Users can create and manage sports tournaments with easy registration and bracket management.",
      icon: "🏆"
    },
    {
      title: "Team Management",
      description: "Coaches can create teams, manage rosters, and coordinate schedules all in one place.",
      icon: "👥"
    },
    {
      title: "Athlete Resumes",
      description: "Players and users can create and update their sports resumes to showcase achievements and skills.",
      icon: "📄"
    },
    {
      title: "School Registration",
      description: "Schools can register their players and manage games, schedules, and stats through the platform.",
      icon: "🎓"
    },
    {
      title: "Academy Integration",
      description: "Academies and institutions can register and manage their programs and athletes.",
      icon: "🏫"
    },
    {
      title: "Team Merchandise",
      description: "Teams can sell merchandise directly through their pages with integrated e-commerce solutions.",
      icon: "🛒"
    }
  ];

  return (
    <>
      <Head>
        <title>SportsConnect - Coming Soon</title>
        <meta name="description" content="The LinkedIn for Sports - Coming Soon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-950 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-800 to-indigo-800 p-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="bg-orange-500 p-3 rounded-full">
                <span className="text-2xl">⚽</span>
              </div>
              <h1 className="text-4xl font-bold">SportsConnect</h1>
            </div>
            <p className="text-blue-100 text-lg">The Professional Network for Sports Enthusiasts</p>
          </header>
          
          {/* Main Content */}
          <div className="p-8">
            {/* Current Features */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                  Currently Available
                </span>
                <div className="h-1 w-16 bg-orange-500 mx-auto mt-2 rounded-full"></div>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentFeatures.map((feature, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 text-center backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-green-400 text-xl">✓</span>
                      </div>
                      <p className="font-medium">{feature}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            {/* Upcoming Features */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  Coming Soon
                </span>
                <div className="h-1 w-16 bg-cyan-500 mx-auto mt-2 rounded-full"></div>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingFeatures.map((feature, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-blue-100">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            {/* Countdown */}
            <section className="mb-12 text-center">
              <h3 className="text-xl font-semibold mb-6">Launching In</h3>
              <div className="flex justify-center space-x-4">
                <div className="bg-white/10 p-4 rounded-lg w-24">
                  <div className="text-3xl font-bold">{countdown.days.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-blue-200">Days</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg w-24">
                  <div className="text-3xl font-bold">{countdown.hours.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-blue-200">Hours</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg w-24">
                  <div className="text-3xl font-bold">{countdown.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-blue-200">Minutes</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg w-24">
                  <div className="text-3xl font-bold">{countdown.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-blue-200">Seconds</div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gradient-to-r from-blue-800 to-indigo-800 p-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Be the first to know when we launch our new features. Subscribe to our newsletter for updates and exclusive early access.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </form>
          </div>
          
          {/* Footer */}
          <footer className="p-6 text-center text-blue-200 text-sm">
            <p>&copy; 2023 SportsConnect. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}