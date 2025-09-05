import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  CheckCircle, 
  Settings, 
  Wrench, 
  Zap, 
  Ship,
  ArrowRight 
} from "lucide-react";

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Building2,
      title: t('services.designEngineering'),
      description: t('services.designDescription'),
      fullDescription: t('services.designFullDescription'),
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/servicios/diseno-ingenieria",
      features: [
        t('services.designFeature1'),
        t('services.designFeature2'),
        t('services.designFeature3')
      ]
    },
    {
      icon: CheckCircle,
      title: t('services.consulting'),
      description: t('services.consultingDescription'),
      fullDescription: t('services.consultingFullDescription'),
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/servicios/consultoria-viabilidad",
      features: [
        t('services.consultingFeature1'),
        t('services.consultingFeature2'),
        t('services.consultingFeature3')
      ]
    },
    {
      icon: Settings,
      title: t('services.projectManagement'),
      description: t('services.managementDescription'),
      fullDescription: t('services.managementFullDescription'),
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/servicios/gestion-proyectos",
      features: [
        t('services.managementFeature1'),
        t('services.managementFeature2'),
        t('services.managementFeature3')
      ]
    },
    {
      icon: Wrench,
      title: t('services.maintenance'),
      description: t('services.maintenanceDescription'),
      fullDescription: t('services.maintenanceFullDescription'),
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/servicios/mantenimiento",
      features: [
        t('services.maintenanceFeature1'),
        t('services.maintenanceFeature2'),
        t('services.maintenanceFeature3')
      ]
    },
    {
      icon: Zap,
      title: t('services.specialized'),
      description: t('services.specializedDescription'),
      fullDescription: t('services.specializedFullDescription'),
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/servicios/especializados",
      features: [
        t('services.specializedFeature1'),
        t('services.specializedFeature2'),
        t('services.specializedFeature3')
      ]
    },
    {
      icon: Ship,
      title: t('services.machinery'),
      description: t('services.machineryDescription'),
      fullDescription: t('services.machineryFullDescription'),
      image: "https://images.unsplash.com/photo-1572286258217-7d907c95bc1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/servicios/maquinaria",
      features: [
        t('services.machineryFeature1'),
        t('services.machineryFeature2'),
        t('services.machineryFeature3')
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-navy-primary to-navy-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="services-title">
              {t('services.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto" data-testid="services-subtitle">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className="h-full border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 gradient-navy rounded-lg flex items-center justify-center mr-4">
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid={`service-title-${index}`}>
                          {service.title}
                        </h2>
                      </div>
                      
                      <p className="text-muted-foreground text-lg mb-6" data-testid={`service-description-${index}`}>
                        {service.fullDescription}
                      </p>

                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start" data-testid={`service-feature-${index}-${featureIndex}`}>
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link href={service.href}>
                        <Button className="group" data-testid={`service-link-${index}`}>
                          {t('common.learnMore')}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      data-testid={`service-image-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="process-title">
              {t('services.processTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="process-description">
              {t('services.processDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: t('services.step1'), description: t('services.step1Description') },
              { step: "02", title: t('services.step2'), description: t('services.step2Description') },
              { step: "03", title: t('services.step3'), description: t('services.step3Description') },
              { step: "04", title: t('services.step4'), description: t('services.step4Description') }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 gradient-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl" data-testid={`step-number-${index}`}>
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`step-title-${index}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`step-description-${index}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="services-cta-title">
              {t('services.ctaTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="services-cta-description">
              {t('services.ctaDescription')}
            </p>
            <Link href="/contacto">
              <Button className="gradient-orange text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 inline-flex items-center" data-testid="services-cta-button">
                {t('services.ctaButton')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
