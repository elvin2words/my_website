import React, { useMemo } from "react";
import { ArrowLeft, ArrowRight, CircuitBoard, Cpu, Zap } from "lucide-react";
import { Link } from "wouter";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  coreIdentity1,
  coreIdentity2,
  projects,
  skills,
} from "@/data/engineer";
import { useBackNavigation } from "@/hooks/use-back-navigation";

function splitSkillLabel(value: string) {
  const [left, ...right] = value.split(":");
  const details = right.join(":").trim();
  return {
    title: left.trim(),
    details: details.length > 0 ? details : value.trim(),
  };
}

const EngCirclePortfolio: React.FC = () => {
  const goBack = useBackNavigation("/");

  const mappedSkills = useMemo(() => skills.map(splitSkillLabel), []);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Button onClick={goBack} variant="ghost" className="text-accent1 hover:text-accent1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Link href="/engineer/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="outline" className="bg-transparent border-accent1/50">
                  Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <section className="mb-10">
              <Badge className="mb-4 bg-accent1/20 text-accent1 border border-accent1/40">
                EngCircle Portfolio
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Electrical Systems x Applied Intelligence</h1>
              <p className="text-white/75 max-w-3xl">
                A focused engineering portfolio across power systems, embedded control, renewable integration,
                and resilient system design.
              </p>
            </section>

            <section className="grid lg:grid-cols-2 gap-5 mb-10">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CircuitBoard className="h-5 w-5 text-accent1" />
                    Core Identity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-white/80 leading-relaxed">
                  <p>{coreIdentity1}</p>
                  <p>{coreIdentity2}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent1" />
                    Engineering Lens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-white/80">
                  <p>Design for field realities, not ideal lab assumptions.</p>
                  <p>Balance technical rigor with operational practicality.</p>
                  <p>Integrate software, controls, and power systems into one coherent architecture.</p>
                  <p>Ship solutions that scale and remain maintainable.</p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Technical Capability Stack</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {mappedSkills.map((skill) => (
                  <Card key={skill.title} className="bg-white/5 border-white/10 hover:border-accent1/40 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{skill.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/75 leading-relaxed">{skill.details}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Selected Engineering Projects</h2>
              <div className="grid lg:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <Card key={project.title} className="bg-white/5 border-white/10 hover:border-accent1/40 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-start gap-2">
                        <Cpu className="h-5 w-5 mt-0.5 text-accent1" />
                        <span>{project.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-white/80 leading-relaxed">{project.description}</p>
                      <p className="text-xs text-accent1/90">{project.extra}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default EngCirclePortfolio;
