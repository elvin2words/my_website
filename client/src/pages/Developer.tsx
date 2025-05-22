import React from 'react';
import { ArrowLeft, Code, Server, Database, Globe } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Developer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main className="pt-24 pb-16 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <Link href="/">
                <Button variant="ghost" className="flex items-center text-accent2 hover:text-accent2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-accent2">
                Systems Developer
              </h1>
              <p className="text-xl opacity-80 mb-8">
                Software & Systems Design
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Code className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Frontend Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>React & Next.js</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Vue.js</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>TypeScript</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Tailwind CSS</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Animation Libraries</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Server className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Backend Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Node.js & Express</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Python & Django</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>RESTful API Design</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>GraphQL</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Serverless Architecture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Database className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Database & Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>PostgreSQL</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>MongoDB</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Redis</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Firebase</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>AWS S3 & DynamoDB</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Globe className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>DevOps & Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Docker & Kubernetes</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>CI/CD Pipelines</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>AWS & Azure</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Terraform</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div>
                      <span>Monitoring & Logging</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Featured Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    <li>
                      <h3 className="font-semibold text-accent2">Interactive Data Visualization Platform</h3>
                      <p className="text-sm mt-1">
                        Built a real-time data visualization dashboard using React, D3.js, and WebSockets to display
                        complex metrics and analytics for enterprise customers.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent2">Microservices Architecture Implementation</h3>
                      <p className="text-sm mt-1">
                        Refactored a monolithic application into a scalable microservices architecture using 
                        Node.js, Docker, and Kubernetes, resulting in improved performance and maintainability.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent2">Automated CI/CD Pipeline</h3>
                      <p className="text-sm mt-1">
                        Designed and implemented an end-to-end CI/CD pipeline using GitHub Actions, Jest, and 
                        automated deployment to cloud infrastructure, reducing deployment time by 80%.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Developer;
