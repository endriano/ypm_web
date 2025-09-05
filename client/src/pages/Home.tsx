import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  CheckCircle, 
  Settings, 
  Wrench, 
  Zap, 
  Ship,
  ArrowDown,
  ArrowRight 
} from "lucide-react";

export default function Home() {
  const { t } = useTranslation();

  const { data: featuredProjects = [] } = useQuery({
    queryKey: ['/api/projects', 'featured'],
    enabled: true,
  });

  const services = [
    {
      icon: Building2,
      title: t('services.designEngineering'),
      description: t('services.designDescription'),
      href: "/servicios/diseno-ingenieria"
    },
    {
      icon: CheckCircle,
      title: t('services.consulting'),
      description: t('services.consultingDescription'),
      href: "/servicios/consultoria-viabilidad"
    },
    {
      icon: Settings,
      title: t('services.projectManagement'),
      description: t('services.managementDescription'),
      href: "/servicios/gestion-proyectos"
    },
    {
      icon: Wrench,
      title: t('services.maintenance'),
      description: t('services.maintenanceDescription'),
      href: "/servicios/mantenimiento"
    },
    {
      icon: Zap,
      title: t('services.specialized'),
      description: t('services.specializedDescription'),
      href: "/servicios/especializados"
    },
    {
      icon: Ship,
      title: t('services.machinery'),
      description: t('services.machineryDescription'),
      href: "/servicios/maquinaria"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-video">
          <img 
            src="https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Marina construction site with cranes and vessels" 
            className="w-full h-full object-cover"
            data-testid="hero-image"
          />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            data-testid="hero-title"
          >
            {t('hero.title')} <span className="text-accent">{t('hero.subtitle')}</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="hero-description"
          >
            {t('hero.description')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/proyectos">
              <Button className="gradient-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90" data-testid="hero-cta-projects">
                {t('hero.viewProjects')}
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20" data-testid="hero-cta-contact">
                {t('hero.contact')}
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          data-testid="scroll-indicator"
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </motion.div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="stats-title">
              {t('stats.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="stats-description">
              {t('stats.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter target={25} label={t('stats.experience')} />
            <AnimatedCounter target={150} label={t('stats.projects')} delay={0.1} />
            <AnimatedCounter target={50} label={t('stats.clients')} delay={0.2} />
            <AnimatedCounter target={12} label={t('stats.countries')} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="services-title">
              {t('services.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="services-description">
              {t('services.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 gradient-navy rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`service-title-${index}`}>
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4" data-testid={`service-description-${index}`}>
                      {service.description}
                    </p>
                    <Link href={service.href} className="text-accent hover:text-accent/80 font-medium inline-flex items-center transition-colors duration-200" data-testid={`service-link-${index}`}>
                      {t('common.learnMore')}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="projects-title">
              {t('projects.featured')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="projects-description">
              {t('projects.description')}
            </p>
          </div>
          
          <ProjectCarousel projects={featuredProjects} />

          <div className="text-center mt-12">
            <Link href="/proyectos">
              <Button className="gradient-orange text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 inline-flex items-center" data-testid="view-all-projects">
                {t('projects.viewAll')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="certifications-title">
              {t('certifications.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="certifications-description">
              {t('certifications.description')}
            </p>
          </div>
          
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-center mb-6 text-foreground" data-testid="certifications-subtitle">
              {t('certifications.certifications')}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {['ISO 9001', 'ISO 14001', 'OHSAS', 'CE'].map((cert, index) => (
                <motion.div
                  key={cert}
                  className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`certification-${cert.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="w-24 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{cert}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-center mb-6 text-foreground" data-testid="clients-subtitle">
              {t('certifications.clients')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="w-32 h-20 bg-card rounded-lg shadow-md flex items-center justify-center" data-testid={`client-logo-${i}`}>
                  <span className="text-muted-foreground font-medium text-sm">Cliente Logo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="cta-title">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="cta-description">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button className="gradient-orange text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 inline-flex items-center" data-testid="cta-quote">
                {t('cta.getQuote')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/proyectos">
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20" data-testid="cta-cases">
                {t('cta.viewCases')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
