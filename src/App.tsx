import React, { useState, useMemo, useEffect } from "react";
import { ProfilingWizard, UserProfile } from "./components/ProfilingWizard";
import { OpportunityCard } from "./components/OpportunityCard";
import { incomePaths } from "./data/opportunities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, RefreshCcw, Sparkles, TrendingUp, Globe, Rocket } from "lucide-react";
import { Toaster, toast } from "sonner";

function App() {
  // Initialize state from localStorage
  const [view, setView] = useState<"landing" | "wizard" | "results">(() => {
    const savedView = localStorage.getItem("incomeflow_view");
    return (savedView as "landing" | "wizard" | "results") || "landing";
  });
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const savedProfile = localStorage.getItem("incomeflow_profile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem("incomeflow_view", view);
  }, [view]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem("incomeflow_profile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("incomeflow_profile");
    }
  }, [profile]);

  const handleStartWizard = () => setView("wizard");

  const handleWizardComplete = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setView("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setProfile(null);
    setView("landing");
  };

  const recommendedPaths = useMemo(() => {
    if (!profile) return [];

    return incomePaths
      .map((path) => {
        let score = 0;

        // Age check
        if (profile.age >= path.minAge) score += 20;

        // Skills match
        const matchingSkills = path.requiredSkills.filter((s) => profile.skills.includes(s));
        score += (matchingSkills.length / path.requiredSkills.length) * 40;

        // Time match
        if (profile.hoursPerWeek >= path.minHoursPerWeek) {
          score += 20;
        } else {
          score += (profile.hoursPerWeek / path.minHoursPerWeek) * 15;
        }

        // Goal alignment
        if (profile.goal === "income" && path.incomePotential === "High") score += 20;
        else if (profile.goal === "learning" && path.learningCurve === "Steep") score += 20;
        else if (profile.goal === "balanced") score += 15;
        else score += 10;

        return { path, score: Math.round(score) };
      })
      .sort((a, b) => b.score - a.score);
  }, [profile]);

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing! Check your email for a welcome gift.");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="bg-primary p-1.5 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">IncomeFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#" className="hover:text-primary transition-colors">Success Stories</a>
            <a href="#" className="hover:text-primary transition-colors">Resources</a>
          </nav>
          <Button variant="default" size="sm" onClick={handleStartWizard}>Get Started</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16">
        {view === "landing" && (
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-1 text-primary bg-primary/10 border-primary/20 animate-pulse">
                New: AI-Powered Matches for 2024
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Find Your Perfect <span className="text-primary">Online Income</span> Path Today
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4 sm:px-0">
                Stop guessing. Get personalized recommendations for freelancing, content creation, coding, and e-commerce based on your profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 px-4 sm:px-0">
                <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-lg shadow-primary/20" onClick={handleStartWizard}>
                  Start My Assessment <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
                  Browse Paths
                </Button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/aacbdcdc-bb90-4cc4-96b0-8a4b25b4ae41/hero-banner-690c5b13-1781129607735.webp"
                alt="Platform Preview"
                className="w-full object-cover aspect-video sm:aspect-[16/9] md:aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 sm:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full text-white">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-xs text-white/70 uppercase tracking-widest">Income Paths</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">12k</div>
                    <div className="text-xs text-white/70 uppercase tracking-widest">Active Users</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-xs text-white/70 uppercase tracking-widest">Match Accuracy</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">Free</div>
                    <div className="text-xs text-white/70 uppercase tracking-widest">Assessment</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 space-y-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Global Opportunities</h3>
                <p className="text-sm text-slate-500">Access income streams that work from anywhere in the world, no matter your location.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 space-y-3">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Actionable Roadmaps</h3>
                <p className="text-sm text-slate-500">Every suggestion comes with a step-by-step guide on how to get started today.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 space-y-3">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Personalized Matching</h3>
                <p className="text-sm text-slate-500">Our algorithm considers your unique constraints to find the path with the least resistance.</p>
              </div>
            </div>
          </div>
        )}

        {view === "wizard" && (
          <div className="max-w-4xl mx-auto py-8">
            <ProfilingWizard onComplete={handleWizardComplete} />
          </div>
        )}

        {view === "results" && profile && (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold">Your Best Matches</h2>
                <p className="text-sm sm:text-base text-slate-500">Based on your age ({profile.age}), skills, and {profile.hoursPerWeek}h/week availability.</p>
              </div>
              <Button variant="outline" onClick={() => setView("wizard")} className="w-full sm:w-auto gap-2">
                <RefreshCcw className="w-4 h-4" /> Retake Assessment
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedPaths.map(({ path, score }) => (
                <OpportunityCard key={path.id} path={path} matchScore={score} />
              ))}
            </div>

            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center space-y-4">
              <h3 className="text-xl font-bold">Don't see what you're looking for?</h3>
              <p className="text-slate-600 max-w-xl mx-auto text-sm">Our catalog is constantly expanding. Subscribe to our newsletter to get notified about new income paths and trends.</p>
              <form onSubmit={handleNewsletterSignup} className="flex max-w-sm mx-auto gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <Button type="submit">Notify Me</Button>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <TrendingUp className="w-6 h-6" />
              <span className="font-bold text-xl">IncomeFlow</span>
            </div>
            <p className="max-w-xs text-sm">
              Helping people navigate the digital economy and find sustainable online income opportunities.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Resources</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Career Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Skill Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Platform Reviews</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Company</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-xs text-center">
          © {new Date().getFullYear()} IncomeFlow Platform. All rights reserved.
        </div>
      </footer>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
