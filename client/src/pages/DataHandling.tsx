import React from "react";
import { ArrowLeft, Database } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";

const DataHandlingPage: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-5xl w-full">
            <div className="mb-8">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent2 hover:text-accent2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back Home
                </Button>
              </Link>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl flex items-center gap-3">
                  <Database className="h-7 w-7 text-accent2" />
                  Data Handling
                </CardTitle>
                <p className="text-sm text-white/70">Effective date: February 18, 2026</p>
              </CardHeader>
              <CardContent className="space-y-6 text-sm md:text-base text-white/85 leading-relaxed">
                <section>
                  <h2 className="font-semibold text-white mb-2">1. Scope</h2>
                  <p>
                    This document explains what data may be processed through this website and how it
                    is managed operationally.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">2. Data Inputs</h2>
                  <p>
                    The site may receive your name, email, and message when you submit the contact
                    form. Technical logs may include request metadata needed for security and service
                    reliability.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">3. Processing Purpose</h2>
                  <p>
                    Data is processed to respond to inquiries, maintain communication records, and
                    monitor service performance. It is not sold or brokered.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">4. Storage and Retention</h2>
                  <p>
                    Contact submissions are stored only as long as needed for communication, support,
                    and lawful obligations. Records are periodically reviewed and removed when no longer
                    needed.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">5. Access Controls</h2>
                  <p>
                    Administrative access is restricted to authorized maintainers. Security controls are
                    applied at application and hosting layers to reduce unauthorized access risk.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">6. Third-Party Processors</h2>
                  <p>
                    Infrastructure and communication providers (for example hosting, email delivery, and
                    analytics tooling if enabled) may process data strictly to deliver platform
                    functionality.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">7. Data Subject Requests</h2>
                  <p>
                    You can request access, correction, deletion, or restriction of your submitted data
                    by emailing
                    <a href="mailto:elvinmazwimairi@gmail.com" className="ml-1 text-accent2 hover:underline">
                      elvinmazwimairi@gmail.com
                    </a>
                    .
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DataHandlingPage;
