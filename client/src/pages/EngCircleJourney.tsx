import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Orbit,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { certifications, education, experience, philosophy } from "@/data/engineer";
import { useBackNavigation } from "@/hooks/use-back-navigation";

const accentSurface = {
  backgroundColor: "hsl(var(--accent1) / 0.12)",
  borderColor: "hsl(var(--accent1) / 0.35)",
};

const EngCircleJourney: React.FC = () => {
  const goBack = useBackNavigation("/");

  const stats = useMemo(() => {
    const yearsCovered = new Set(
      experience.flatMap((item) =>
        item.time
          .replace("Present", String(new Date().getFullYear()))
          .split(/[-–]/)
          .map((token) => token.trim())
          .filter(Boolean),
      ),
    );

    return {
      experiences: experience.length,
      certifications: certifications.length,
      education: education.length,
      yearsCovered: yearsCovered.size,
    };
  }, []);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <Button
                onClick={goBack}
                variant="ghost"
                className="text-foreground/85 hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Link
                href="/engineer/portfolio"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Button variant="outline" className="bg-transparent border-border">
                  Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <section className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
              <div
                className="pointer-events-none absolute -right-24 top-[-72px] h-56 w-56 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent1) / 0.24)" }}
              />
              <div
                className="pointer-events-none absolute -left-20 bottom-[-96px] h-60 w-60 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.18)" }}
              />

              <div className="relative z-10">
                <Badge className="mb-4 border border-border bg-background/50 text-foreground">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  EngCircle Journey
                </Badge>
                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Ongoing dev from core electrical theory to applied engineering systems
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  This timeline maps how academic grounding evolved into practical simulation,
                  automation, and deployment-focused engineering work, with emphasis on reliability,
                  standards alignment, and measurable technical outcomes.
                </p>
              </div>
            </section>

            <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Professional Roles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.experiences}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.certifications}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Academic Tracks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.education}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Timeline Span
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.yearsCovered}+</p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-10 grid gap-5 lg:grid-cols-[1.15fr_minmax(0,1fr)]">
              <Card className="border-border bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Orbit className="h-5 w-5" />
                    Engineering Philosophy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground/82">{philosophy}</p>
                </CardContent>
              </Card>

              <div className="space-y-5">
                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <GraduationCap className="h-5 w-5" />
                      Academic Foundation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {education.map((item) => (
                      <div
                        key={`${item.degree}-${item.school}`}
                        className="rounded-xl border border-border bg-background/35 p-3"
                      >
                        <p className="font-semibold text-foreground">{item.degree}</p>
                        <p className="text-sm text-foreground/75">{item.school}</p>
                        <p className="mt-1 text-sm text-foreground/70">{item.details}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <ShieldCheck className="h-5 w-5" />
                      Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {certifications.map((cert) => (
                      <div
                        key={`${cert.title}-${cert.date}`}
                        className="rounded-lg border border-border bg-background/35 px-3 py-2"
                      >
                        <p className="text-sm font-medium text-foreground">{cert.title}</p>
                        <p className="text-xs text-foreground/68">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-sm md:p-7">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                  Professional Timeline
                </h2>
                <p className="mt-1 text-sm text-foreground/72">
                  Role progression and scope expansion across industry environments.
                </p>
              </div>

              <div className="relative">
                <div
                  className="pointer-events-none absolute bottom-0 left-4 top-0 hidden w-px md:block"
                  style={{ backgroundColor: "hsl(var(--border))" }}
                />

                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {experience.map((item, index) => (
                      <motion.article
                        key={`${item.title}-${item.time}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                        className="relative rounded-2xl border border-border bg-background/35 p-4 md:pl-10"
                        style={index === 0 ? accentSurface : undefined}
                      >
                        <div
                          className="absolute left-[13px] top-6 hidden h-2.5 w-2.5 rounded-full md:block"
                          style={{ backgroundColor: "hsl(var(--accent1))" }}
                        />
                        <p className="text-[11px] uppercase tracking-[0.12em] text-foreground/58">
                          {item.time}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-foreground/72">{item.org}</p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/82">{item.desc}</p>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default EngCircleJourney;
