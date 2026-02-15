import React from "react";
import { ArrowLeft, ArrowRight, GraduationCap, Orbit, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  certifications,
  education,
  experience,
  philosophy,
} from "@/data/engineer";
import { useBackNavigation } from "@/hooks/use-back-navigation";

const EngCircleJourney: React.FC = () => {
  const goBack = useBackNavigation("/");

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

              <Link href="/engineer/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="outline" className="bg-transparent border-accent1/50">
                  Portfolio
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <section className="mb-10">
              <Badge className="mb-4 bg-accent1/20 text-accent1 border border-accent1/40">
                EngCircle Journey
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">From Foundations to Field Execution</h1>
              <p className="text-white/75 max-w-3xl">
                The learning and professional progression across power systems, renewable integration,
                automation design, and practical engineering delivery.
              </p>
            </section>

            <section className="mb-10">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Orbit className="h-5 w-5 text-accent1" />
                    Engineering Philosophy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80 leading-relaxed">{philosophy}</p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Professional Timeline</h2>
              <div className="grid md:grid-cols-2 gap-5">
                {experience.map((item) => (
                  <Card key={`${item.title}-${item.time}`} className="bg-white/5 border-white/10 hover:border-accent1/40 transition-all duration-300">
                    <CardHeader>
                      <p className="text-xs uppercase tracking-[0.12em] text-accent1">{item.time}</p>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <p className="text-sm text-white/70">{item.org}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid lg:grid-cols-2 gap-5">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-accent1" />
                    Academic Foundation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((item) => (
                    <div key={`${item.degree}-${item.school}`}>
                      <p className="font-semibold text-white">{item.degree}</p>
                      <p className="text-sm text-white/75">{item.school}</p>
                      <p className="text-sm text-white/70 mt-1">{item.details}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-accent1" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={`${cert.title}-${cert.date}`} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="font-medium text-white">{cert.title}</p>
                      <p className="text-sm text-white/70">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
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

export default EngCircleJourney;
