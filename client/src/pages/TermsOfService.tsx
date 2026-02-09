import React from "react";
import { ArrowLeft, FileCheck2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";

const TermsOfServicePage: React.FC = () => {
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
                  <FileCheck2 className="h-7 w-7 text-accent2" />
                  Terms of Service
                </CardTitle>
                <p className="text-sm text-white/70">Effective date: February 8, 2026</p>
              </CardHeader>
              <CardContent className="space-y-6 text-sm md:text-base text-white/85 leading-relaxed">
                <section>
                  <h2 className="font-semibold text-white mb-2">1. Acceptance of Terms</h2>
                  <p>
                    By using this website, you agree to these terms and to use the site lawfully and
                    respectfully.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">2. Portfolio Content</h2>
                  <p>
                    Website content is provided for professional showcase and informational purposes.
                    Content may be updated without prior notice.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">3. Intellectual Property</h2>
                  <p>
                    Unless otherwise stated, portfolio materials, branding, and authored content remain
                    the property of their respective owner and may not be reused without permission.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">4. External Services</h2>
                  <p>
                    Links to third-party websites are provided as references. This site is not
                    responsible for third-party content or availability.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">5. Limitation of Liability</h2>
                  <p>
                    This website is provided "as is" without warranties of uninterrupted availability.
                    To the maximum extent permitted by law, liability is limited.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">6. Changes to Terms</h2>
                  <p>
                    Terms may be revised over time. Continued use of the site after changes indicates
                    acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h2 className="font-semibold text-white mb-2">7. Contact</h2>
                  <p>
                    For questions about these terms, use the contact section on this site or email:
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

export default TermsOfServicePage;
