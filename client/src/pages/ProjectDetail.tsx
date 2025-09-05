import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Calendar, Users, Euro } from "lucide-react";
import { Link } from "wouter";

export default function ProjectDetail() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['/api/projects', slug],
    enabled: !!slug,
  });

  // Mock data for demonstration
  const projectData = {
    "marina-port-valencia": {
      title: "Marina Port Valencia",
      category: "marina",
      location: "Valencia, España",
      description: t('projects.marinaDescription'),
      challenge: t('projects.marinaChallenge'),
      solution: t('projects.marinaSolution'),
      result: t('projects.marinaResult'),
      images: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      ],
      technicalData: {
        area: "15,000 m²",
        capacity: "350 embarcaciones",
        depth: "3-6 metros",
        duration: "18 meses",
        investment: "€12M",
        team: "45 profesionales"
      },
      timeline: [
        { phase: t('projects.phase1'), duration: "3 meses", status: "completed" },
        { phase: t('projects.phase2'), duration: "8 meses", status: "completed" },
        { phase: t('projects.phase3'), duration: "5 meses", status: "completed" },
        { phase: t('projects.phase4'), duration: "2 meses", status: "completed" }
      ]
    },
    "puerto-bilbao": {
      title: "Puerto de Bilbao",
      category: "puerto",
      location: "Bilbao, España",
      description: t('projects.portDescription'),
      challenge: t('projects.portChallenge'),
      solution: t('projects.portSolution'),
      result: t('projects.portResult'),
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      ],
      technicalData: {
        area: "45,000 m²",
        capacity: "2,500 TEU",
        depth: "12-15 metros",
        duration: "24 meses",
        investment: "€35M",
        team: "120 profesionales"
      },
      timeline: [
        { phase: t('projects.phase1'), duration: "4 meses", status: "completed" },
        { phase: t('projects.phase2'), duration: "12 meses", status: "completed" },
        { phase: t('projects.phase3'), duration: "6 meses", status: "completed" },
        { phase: t('projects.phase4'), duration: "2 meses", status: "completed" }
      ]
    }
  };

  const currentProject = projectData[slug as keyof typeof projectData];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t('common.notFound')}</h1>
          <Link href="/proyectos">
            <Button data-testid="back-to-projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.backToProjects')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <section className="py-6 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/proyectos" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="breadcrumb-projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('nav.projects')}
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Badge data-testid="project-category">
                {currentProject.category}
              </Badge>
              <div className="flex items-center text-muted-foreground" data-testid="project-location">
                <MapPin className="w-4 h-4 mr-1" />
                {currentProject.location}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="project-title">
              {currentProject.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl" data-testid="project-description">
              {currentProject.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.img 
            src={currentProject.images[0]}
            alt={currentProject.title}
            className="w-full h-96 lg:h-[600px] object-cover rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            data-testid="project-main-image"
          />
        </div>
      </section>

      {/* Project Story */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Story Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="challenge-title">
                  {t('projects.challenge')}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed" data-testid="challenge-description">
                  {currentProject.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="solution-title">
                  {t('projects.solution')}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed" data-testid="solution-description">
                  {currentProject.solution}
                </p>
              </motion.div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="result-title">
                  {t('projects.result')}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed" data-testid="result-description">
                  {currentProject.result}
                </p>
              </motion.div>

              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="gallery-title">
                  {t('projects.gallery')}
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {currentProject.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${currentProject.title} ${index + 2}`}
                      className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      data-testid={`gallery-image-${index}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technical Data */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="technical-data-title">
                      {t('projects.technicalData')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center" data-testid="project-area">
                        <span className="text-muted-foreground text-sm">{t('projects.area')}</span>
                        <span className="font-medium text-foreground">{currentProject.technicalData.area}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center" data-testid="project-capacity">
                        <span className="text-muted-foreground text-sm">{t('projects.capacity')}</span>
                        <span className="font-medium text-foreground">{currentProject.technicalData.capacity}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center" data-testid="project-depth">
                        <span className="text-muted-foreground text-sm">{t('projects.depth')}</span>
                        <span className="font-medium text-foreground">{currentProject.technicalData.depth}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center" data-testid="project-duration">
                        <span className="text-muted-foreground text-sm">{t('projects.duration')}</span>
                        <span className="font-medium text-foreground">{currentProject.technicalData.duration}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center" data-testid="project-investment">
                        <span className="text-muted-foreground text-sm">{t('projects.investment')}</span>
                        <span className="font-medium text-foreground">{currentProject.technicalData.investment}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center" data-testid="project-team">
                        <span className="text-muted-foreground text-sm">{t('projects.team')}</span>
                        <span className="font-medium text-foreground">{currentProject.technicalData.team}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="timeline-title">
                      {t('projects.timeline')}
                    </h3>
                    <div className="space-y-4">
                      {currentProject.timeline.map((phase, index) => (
                        <div key={index} className="flex items-start" data-testid={`timeline-phase-${index}`}>
                          <div className="w-3 h-3 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium text-foreground">{phase.phase}</p>
                            <p className="text-sm text-muted-foreground">{phase.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="border-accent">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="contact-cta-title">
                      {t('projects.interestedTitle')}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6" data-testid="contact-cta-description">
                      {t('projects.interestedDescription')}
                    </p>
                    <Link href="/contacto">
                      <Button className="w-full" data-testid="contact-cta-button">
                        {t('projects.contactUs')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
