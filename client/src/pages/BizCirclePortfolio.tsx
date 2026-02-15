import React, { useMemo } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Rocket, Sparkles } from "lucide-react";
import { Link } from "wouter";

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { bizCircleVentures } from "@/data/bizcircle";

const BizCirclePortfolio: React.FC = () => {
  const goBack = useBackNavigation("/");

  const summary = useMemo(() => {
    const sectors = new Set(bizCircleVentures.map((venture) => venture.sector)).size;
    const scalingCount = bizCircleVentures.filter((venture) => venture.stage === "Scaling").length;
    return {
      ventures: bizCircleVentures.length,
      sectors,
      scalingCount,
    };
  }, []);

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

              <Link href="/biz/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="outline" className="bg-transparent border-accent4/50">
                  Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <section className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent4/40 mb-4">
                <Sparkles className="h-4 w-4 text-accent4" />
                <span className="text-sm text-white/90">BizCircle Portfolio</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Startups and Venture Systems</h1>
              <p className="text-white/75 max-w-3xl">
                A structured look at current startup work across energy, automation, AI, connectivity,
                and experience-tech products.
              </p>
            </section>

            <section className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Ventures</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{summary.ventures}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Sectors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent4">{summary.sectors}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Scaling Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent4">{summary.scalingCount}</p>
                </CardContent>
              </Card>
            </section>

            <section className="grid lg:grid-cols-2 gap-5">
              {bizCircleVentures.map((venture) => (
                <Card
                  key={venture.name}
                  className="bg-white/5 border-white/10 hover:border-accent4/40 transition-all duration-300"
                >
                  <CardHeader className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-accent4/25 text-accent4 border border-accent4/40">
                        <Rocket className="h-3.5 w-3.5 mr-1.5" />
                        {venture.stage}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/10 text-white/85">
                        {venture.sector}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{venture.name}</CardTitle>
                    <p className="text-white/80 text-sm leading-relaxed">{venture.oneLiner}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {venture.highlights.map((highlight) => (
                        <p key={highlight} className="text-sm text-white/75 flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent4" />
                          <span>{highlight}</span>
                        </p>
                      ))}
                    </div>
                    {venture.website && (
                      <a
                        href={venture.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200"
                      >
                        Visit website
                        <ExternalLink className="h-4 w-4 ml-1.5" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default BizCirclePortfolio;
