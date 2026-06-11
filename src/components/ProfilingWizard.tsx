import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Sparkles, User, Briefcase, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface UserProfile {
  age: number;
  skills: string[];
  hoursPerWeek: number;
  goal: "income" | "learning" | "balanced";
}

interface ProfilingWizardProps {
  onComplete: (profile: UserProfile) => void;
}

const SKILLS_OPTIONS = [
  "Writing", "Research", "Coding", "Video Editing", "Graphic Design",
  "Marketing", "Sales", "Customer Service", "Product Research", "SEO",
  "Social Media", "Data Entry", "Languages", "Project Management"
];

export function ProfilingWizard({ onComplete }: ProfilingWizardProps) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<UserProfile>(({
    age: 18,
    skills: [],
    hoursPerWeek: 10,
    goal: "balanced",
  }));

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!profile.age || profile.age < 13) {
        newErrors.age = "You must be at least 13 years old.";
      } else if (profile.age > 120) {
        newErrors.age = "Please enter a valid age.";
      }
    }
    
    if (currentStep === 2) {
      if (profile.skills.length === 0) {
        newErrors.skills = "Please select at least one skill.";
      }
    }
    
    if (currentStep === 3) {
      if (profile.hoursPerWeek < 1) {
        newErrors.hours = "Please enter at least 1 hour per week.";
      } else if (profile.hoursPerWeek > 168) {
        newErrors.hours = "There are only 168 hours in a week!";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };
  
  const prevStep = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const toggleSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
    if (errors.skills) setErrors((prev) => ({ ...prev, skills: "" }));
  };

  const isLastStep = step === 4;

  const handleComplete = () => {
    if (validateStep(step)) {
      onComplete(profile);
    }
  };

  const steps = [
    {
      title: "Basics",
      description: "Let's start with the essentials.",
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">How old are you?</Label>
            <Input
              id="age"
              type="number"
              value={profile.age}
              min={13}
              max={120}
              onChange={(e) => {
                setProfile({ ...profile, age: parseInt(e.target.value) || 0 });
                if (errors.age) setErrors((prev) => ({ ...prev, age: "" }));
              }}
              className={`max-w-[200px] ${errors.age ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? "age-error" : undefined}
            />
            {errors.age && <p id="age-error" className="text-xs text-red-500">{errors.age}</p>}
            <p className="text-xs text-muted-foreground">Some opportunities have age requirements.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Skills",
      description: "What are you already good at?",
      icon: <Briefcase className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <Label>Select all that apply</Label>
          <div className="flex flex-wrap gap-2">
            {SKILLS_OPTIONS.map((skill) => (
              <Badge
                key={skill}
                role="button"
                tabIndex={0}
                variant={profile.skills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer py-1.5 px-3 transition-colors"
                onClick={() => toggleSkill(skill)}
                onKeyDown={(e) => e.key === "Enter" && toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
          {errors.skills && <p className="text-xs text-red-500">{errors.skills}</p>}
        </div>
      ),
    },
    {
      title: "Availability",
      description: "How much time can you commit?",
      icon: <Clock className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Hours per week</Label>
            <Input
              id="hours"
              type="number"
              value={profile.hoursPerWeek}
              min={1}
              max={168}
              onChange={(e) => {
                setProfile({ ...profile, hoursPerWeek: parseInt(e.target.value) || 0 });
                if (errors.hours) setErrors((prev) => ({ ...prev, hours: "" }));
              }}
              className={`max-w-[200px] ${errors.hours ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              aria-invalid={!!errors.hours}
              aria-describedby={errors.hours ? "hours-error" : undefined}
            />
            {errors.hours && <p id="hours-error" className="text-xs text-red-500">{errors.hours}</p>}
            <p className="text-xs text-muted-foreground">Consistency is key to online income.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Goals",
      description: "What's your primary objective?",
      icon: <Target className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {([ "income", "learning", "balanced" ] as const).map((goal) => (
              <div
                key={goal}
                onClick={() => setProfile({ ...profile, goal })}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  profile.goal === goal ? "bg-primary/5 border-primary shadow-sm" : "hover:bg-accent"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                  profile.goal === goal ? "border-primary bg-primary" : "border-muted-foreground"
                }`}>
                  {profile.goal === goal && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className="font-medium capitalize">{goal}</p>
                  <p className="text-sm text-muted-foreground">
                    {goal === "income" && "Focus on quick earnings and established markets."}
                    {goal === "learning" && "Focus on long-term skill acquisition and growth."}
                    {goal === "balanced" && "Balance between immediate income and skill building."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden">
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(step / steps.length) * 100}%` }}
        />
      </div>
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-primary mb-2">
          {steps[step - 1].icon}
          <span className="text-xs font-semibold uppercase tracking-wider">Step {step} of {steps.length}</span>
        </div>
        <CardTitle className="text-2xl">{steps[step - 1].title}</CardTitle>
        <CardDescription>{steps[step - 1].description}</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="py-4"
          >
            {steps[step - 1].content}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-4 border-t">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          {isLastStep ? (
            <Button onClick={handleComplete} className="gap-2 bg-primary">
              Find Opportunities <Sparkles className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={nextStep} className="gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
