import React from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";

const PrivacyPolicyPage: React.FC = () => {
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
                  <Shield className="h-7 w-7 text-accent2" />
                  Privacy Policy
                </CardTitle>
                <p className="text-sm text-white/70">Effective date: February 8, 2026</p>
              </CardHeader>
              <CardContent className="space-y-6 text-sm md:text-base text-white/85 leading-relaxed">
                <section>
                  <h2 className="font-semibold text-white mb-2">1. Information Collected</h2>
                  <p>
                    This site may collect contact form details you submit, including your name, email,
                    and message content.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">2. How Information Is Used</h2>
                  <p>
                    Submitted data is used to respond to inquiries, manage communication, and improve
                    portfolio interactions.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">3. Cookies and Analytics</h2>
                  <p>
                    Basic browser storage and similar technologies may be used for functionality like
                    theme preference and performance insights.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">4. Third-Party Links</h2>
                  <p>
                    External links (for example social platforms) are provided for convenience. Their
                    privacy practices are governed by their own policies.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">5. Data Retention</h2>
                  <p>
                    Contact submissions are retained only as needed for communication and record
                    purposes, and are not sold.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">6. Contact</h2>
                  <p>
                    For privacy-related requests, use the contact section on this website or email:
                    <a href="mailto:elvinmazwimairi@gmail.com" className="ml-1 text-accent2 hover:underline">
                      elvinmazwimairi@gmail.com
                    </a>
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

export default PrivacyPolicyPage;
