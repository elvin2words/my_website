import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import BackgroundEffect from "@/components/home/BackgroundEffect";

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";


export default function NotFound() {
  return (
    <>
      <BackgroundEffect />

      <Header />

      {/* <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4"> */}
      <div className="min-h-screen w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* <Card className="shadow-xl border-0 rounded-2xl bg-white dark:bg-gray-800"> */}
          <Card className="shadow-xl border-0 rounded-2xl">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-10 w-10 text-red-500" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Page Not Found
                </h1>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Looks like you've wandered off the map. The page you're looking for
                doesn’t exist or might have been moved.
              </p>

              <div className="mt-6 flex justify-end">
                <Button asChild className="rounded-xl px-6 py-2 font-medium">
                  <Link to="/">Go Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer />

    </>
  );
}
