import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../../../shared/projects";

export default function ProjectDetail() {
  const [, params] = useRoute("/codecircle/portfolio/project/:id");
  const [, setLocation] = useLocation();
  
  const project = projects.find(p => p.id === params?.id);

  if (!project) {
    return (
      <div className="min-h-screen bg-accent1/5 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Button onClick={() => setLocation("/")} data-testid="button-back-home">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent1/5">
      <div className="sticky top-0 z-50 bg-accent1/5/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.badges?.map((badge) => (
              <Badge key={badge} className="bg-primary/90">
                {badge}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-project-title">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-4">
            {project.liveDemo && (
              <Button size="lg" data-testid="button-live-demo">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="lg" data-testid="button-github">
                <Github className="h-4 w-4 mr-2" />
                View Code
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover rounded-lg mb-8"
            />

            {project.fullDescription && (
              <Card className="mb-8 border-card-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {project.fullDescription}
                  </p>
                </CardContent>
              </Card>
            )}

            {project.features && (
              <Card className="mb-8 border-card-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {project.challenges && (
              <Card className="mb-8 border-card-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {project.challenges}
                  </p>
                </CardContent>
              </Card>
            )}

            {project.outcome && (
              <Card className="mb-8 border-card-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Outcome & Impact</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {project.outcome}
                  </p>
                </CardContent>
              </Card>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      className="w-full aspect-video object-cover rounded-lg hover-elevate"
                      data-testid={`img-gallery-${index}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <Card className="sticky top-24 border-card-border">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-bold mb-4">Category</h3>
                  <Badge variant="outline" className="capitalize">
                    {project.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
