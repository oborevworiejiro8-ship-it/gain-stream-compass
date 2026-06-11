import React, { useState } from "react";
import { ExternalLink, CheckCircle2, Star, Clock, Trophy, BookOpen, ArrowRight, Rocket } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { IncomePath } from "@/data/opportunities";

interface OpportunityCardProps {
  path: IncomePath;
  matchScore: number;
}

export function OpportunityCard({ path, matchScore }: OpportunityCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case "High": return "text-green-600 bg-green-50";
      case "Medium": return "text-blue-600 bg-blue-50";
      case "Low": return "text-orange-600 bg-orange-50";
      default: return "";
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-xl card-hover-transition border-primary/10 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={path.image}
          alt={path.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-white/90 text-primary hover:bg-white shadow-sm backdrop-blur-sm border-none">
            {matchScore}% Match
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="capitalize">{path.category.replace("-", " ")}</Badge>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className={getPotentialColor(path.incomePotential) + " px-2 py-0.5 rounded text-xs font-bold uppercase tracking-tighter"}>
              {path.incomePotential} Income
            </span>
          </div>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{path.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {path.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{path.minHoursPerWeek}h/week min</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Star className="w-3.5 h-3.5" />
            <span>{path.learningCurve} learning</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Top Skills Needed:</p>
          <div className="flex flex-wrap gap-1.5">
            {path.requiredSkills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-[10px] px-2 py-0">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t bg-muted/30">
        <div className="w-full space-y-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground">Getting Started:</p>
            <ul className="space-y-1">
              {path.steps.slice(0, 2).map((step, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full gap-2" variant="default">
                View Roadmap <BookOpen className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">{path.category.replace("-", " ")}</Badge>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{matchScore}% Match</Badge>
                </div>
                <DialogTitle className="text-3xl font-bold">{path.title}</DialogTitle>
                <DialogDescription className="text-lg pt-2">
                  {path.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-8 py-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold flex items-center gap-2 mb-4 text-primary">
                      <Rocket className="w-5 h-5" /> Step-by-Step Roadmap
                    </h4>
                    <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/10">
                      {path.steps.map((step, index) => (
                        <div key={index} className="relative pl-8">
                          <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
                            <span className="text-[10px] text-white font-bold">{index + 1}</span>
                          </div>
                          <p className="text-sm font-medium leading-tight">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-xl space-y-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.requiredSkills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    <div className="pt-2 text-sm space-y-1">
                      <p>• Minimum Age: <span className="font-bold">{path.minAge}+</span></p>
                      <p>• Weekly Commitment: <span className="font-bold">{path.minHoursPerWeek}h+</span></p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Recommended Platforms</h4>
                    <div className="grid gap-2">
                      {path.platforms.map(platform => (
                        <Button key={platform.name} variant="outline" className="justify-between" asChild>
                          <a href={platform.url} target="_blank" rel="noopener noreferrer">
                            {platform.name} <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsOpen(false)} variant="secondary" className="w-full sm:w-auto">
                  Close Roadmap
                </Button>
                <Button className="w-full sm:w-auto gap-2">
                  Start This Path <ArrowRight className="w-4 h-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
