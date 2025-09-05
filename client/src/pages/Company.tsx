import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Eye, Award } from "lucide-react";

export default function Company() {
  const { t } = useTranslation();

  const team = [
    {
      name: "Carlos Martínez",
      position: t('company.ceo'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: t('company.ceoDescription')
    },
    {
      name: "Ana González",
      position: t('company.cto'),
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b672?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: t('company.ctoDescription')
    },
    {
      name: "Miguel Rodríguez",
      position: t('company.projectManager'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: t('company.pmDescription')
    }
  ];

  const certifications = [
    { name: "ISO 9001", description: t('company.iso9001') },
    { name: "ISO 14001", description: t('company.iso14001') },
    { name: "OHSAS 18001", description: t('company.ohsas') },
    { name: "CE Marking", description: t('company.ce') }
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="company-title">
              {t('company.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto" data-testid="company-subtitle">
              {t('company.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="about-title">
                {t('company.aboutTitle')}
              </h2>
              <p className="text-lg text-muted-foreground mb-6" data-testid="about-description">
                {t('company.aboutDescription')}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-accent" data-testid="founded-year">1999</div>
                  <div className="text-sm text-muted-foreground">{t('company.founded')}</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-accent" data-testid="team-size">50+</div>
                  <div className="text-sm text-muted-foreground">{t('company.teamSize')}</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="YPMARINAS office and facilities"
                className="rounded-lg shadow-lg"
                data-testid="company-image"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-accent mr-3" />
                    <h3 className="text-2xl font-bold text-foreground" data-testid="mission-title">
                      {t('company.mission')}
                    </h3>
                  </div>
                  <p className="text-muted-foreground" data-testid="mission-description">
                    {t('company.missionDescription')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Eye className="w-8 h-8 text-accent mr-3" />
                    <h3 className="text-2xl font-bold text-foreground" data-testid="vision-title">
                      {t('company.vision')}
                    </h3>
                  </div>
                  <p className="text-muted-foreground" data-testid="vision-description">
                    {t('company.visionDescription')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="team-title">
              {t('company.teamTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="team-subtitle">
              {t('company.teamSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      data-testid={`team-image-${index}`}
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`team-name-${index}`}>
                      {member.name}
                    </h3>
                    <p className="text-accent font-medium mb-3" data-testid={`team-position-${index}`}>
                      {member.position}
                    </p>
                    <p className="text-muted-foreground text-sm" data-testid={`team-description-${index}`}>
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="certifications-title">
              {t('company.certificationsTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="certifications-subtitle">
              {t('company.certificationsSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                    <Badge className="mb-3" data-testid={`cert-name-${index}`}>
                      {cert.name}
                    </Badge>
                    <p className="text-muted-foreground text-sm" data-testid={`cert-description-${index}`}>
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
