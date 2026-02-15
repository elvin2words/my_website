import React from "react";
import { ArrowLeft, ArrowRight, Compass, Layers, Target } from "lucide-react";
import { Link } from "wouter";

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { bizMilestones, bizOperatingPrinciples } from "@/data/bizcircle";

const BizCircleJourney: React.FC = () => {
  const goBack = useBackNavigation("/");

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Button onClick={goBack} variant="ghost" className="text-accent4 hover:text-accent4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Link href="/biz/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="outline" className="bg-transparent border-accent4/50">
                  Portfolio
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <section className="mb-10">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">BizCircle Journey</h1>
              <p className="text-white/75 max-w-3xl">
                The operating timeline behind the startup portfolio, from experimentation to execution
                readiness.
              </p>
            </section>

            <section className="mb-10 grid md:grid-cols-2 gap-5">
              {bizMilestones.map((milestone) => (
                <Card
                  key={milestone.title}
                  className="bg-white/5 border-white/10 hover:border-accent4/40 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="text-xs uppercase tracking-[0.12em] text-accent4 mb-1">
                      {milestone.period}
                    </div>
                    <CardTitle className="text-xl">{milestone.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/80 leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="grid lg:grid-cols-3 gap-5">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Compass className="h-5 w-5 text-accent4" />
                  <CardTitle className="text-lg">Direction</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-white/80">
                  Venture decisions are guided by practical impact, systems quality, and adoption potential.
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Layers className="h-5 w-5 text-accent4" />
                  <CardTitle className="text-lg">Execution Model</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-white/80">
                  Shared technical building blocks are reused across ventures to accelerate learning and delivery.
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center gap-2">
                  <Target className="h-5 w-5 text-accent4" />
                  <CardTitle className="text-lg">Operating Principles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {bizOperatingPrinciples.map((principle) => (
                    <p key={principle} className="text-sm text-white/80 leading-relaxed">
                      • {principle}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default BizCircleJourney;
