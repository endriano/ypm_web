import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Mail, Phone } from "lucide-react";

export default function ServiceDetail() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const serviceData = {
    "diseno-ingenieria": {
      title: t('services.designEngineering'),
      description: t('services.designFullDescription'),
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      process: [
        { title: t('services.designProcess1'), description: t('services.designProcess1Desc') },
        { title: t('services.designProcess2'), description: t('services.designProcess2Desc') },
        { title: t('services.designProcess3'), description: t('services.designProcess3Desc') },
        { title: t('services.designProcess4'), description: t('services.designProcess4Desc') }
      ],
      benefits: [
        t('services.designBenefit1'),
        t('services.designBenefit2'),
        t('services.designBenefit3'),
        t('services.designBenefit4')
      ],
      testimonial: {
        text: t('services.designTestimonial'),
        author: "Carlos Mendoza",
        position: t('services.testimonialPosition1'),
        company: "Marina del Sol"
      }
    }
  };

  const currentService = serviceData[slug as keyof typeof serviceData];

  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t('common.notFound')}</h1>
          <Link href="/servicios">
            <Button data-testid="back-to-services">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.backToServices')}
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
          <Link href="/servicios" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="breadcrumb-services">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('nav.services')}
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-navy-primary to-navy-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="service-title">
              {currentService.title}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto" data-testid="service-description">
              {currentService.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.img 
            src={currentService.image}
            alt={currentService.title}
            className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            data-testid="service-main-image"
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="process-title">
              {t('services.processTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="process-subtitle">
              {t('services.processSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentService.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 gradient-orange rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg" data-testid={`process-step-${index}`}>
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3" data-testid={`process-title-${index}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid={`process-description-${index}`}>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="benefits-title">
                {t('services.benefitsTitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8" data-testid="benefits-subtitle">
                {t('services.benefitsSubtitle')}
              </p>
              <div className="space-y-4">
                {currentService.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start" data-testid={`benefit-${index}`}>
                    <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-accent">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="testimonial-title">
                    {t('services.clientTestimonial')}
                  </h3>
                  <blockquote className="text-muted-foreground italic mb-6 text-lg" data-testid="testimonial-text">
                    "{currentService.testimonial.text}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground" data-testid="testimonial-author">
                      {currentService.testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid="testimonial-position">
                      {currentService.testimonial.position}, {currentService.testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="contact-cta-title">
              {t('services.contactTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="contact-cta-description">
              {t('services.contactDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button className="gradient-orange text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 inline-flex items-center" data-testid="contact-form-button">
                  <Mail className="w-5 h-5 mr-2" />
                  {t('services.contactForm')}
                </Button>
              </Link>
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 inline-flex items-center" data-testid="call-button">
                <Phone className="w-5 h-5 mr-2" />
                {t('services.callUs')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
