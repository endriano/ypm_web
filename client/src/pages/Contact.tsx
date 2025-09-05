import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('contact.successTitle'),
        description: t('contact.successMessage'),
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: () => {
      toast({
        title: t('contact.errorTitle'),
        description: t('contact.errorMessage'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      details: ["Carrer de la Marina, 16", "08005 Barcelona, España"],
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      details: ["+34 934 567 890", "+34 934 567 891"],
    },
    {
      icon: Mail,
      title: t('contact.email'),
      details: ["info@ypmarinas.com", "proyectos@ypmarinas.com"],
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      details: [t('contact.weekdays'), t('contact.weekend')],
    },
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="contact-title">
              {t('contact.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto" data-testid="contact-subtitle">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 gradient-navy rounded-lg flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3" data-testid={`contact-info-title-${index}`}>
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-muted-foreground text-sm" data-testid={`contact-info-detail-${index}-${detailIndex}`}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="contact-form-title">
                    {t('contact.formTitle')}
                  </h2>
                  <p className="text-muted-foreground mb-8" data-testid="contact-form-description">
                    {t('contact.formDescription')}
                  </p>

                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" data-testid="name-label">
                          {t('contact.name')} *
                        </Label>
                        <Input
                          id="name"
                          {...form.register("name")}
                          placeholder={t('contact.namePlaceholder')}
                          data-testid="name-input"
                        />
                        {form.formState.errors.name && (
                          <p className="text-destructive text-sm mt-1" data-testid="name-error">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" data-testid="email-label">
                          {t('contact.email')} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          placeholder={t('contact.emailPlaceholder')}
                          data-testid="email-input"
                        />
                        {form.formState.errors.email && (
                          <p className="text-destructive text-sm mt-1" data-testid="email-error">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" data-testid="phone-label">
                        {t('contact.phone')}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        placeholder={t('contact.phonePlaceholder')}
                        data-testid="phone-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" data-testid="message-label">
                        {t('contact.message')} *
                      </Label>
                      <Textarea
                        id="message"
                        {...form.register("message")}
                        placeholder={t('contact.messagePlaceholder')}
                        rows={6}
                        data-testid="message-input"
                      />
                      {form.formState.errors.message && (
                        <p className="text-destructive text-sm mt-1" data-testid="message-error">
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full gradient-orange text-white py-3 font-semibold hover:opacity-90"
                      disabled={contactMutation.isPending}
                      data-testid="submit-button"
                    >
                      {contactMutation.isPending ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t('contact.sending')}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-5 h-5 mr-2" />
                          {t('contact.send')}
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl h-full">
                <CardContent className="p-0 h-full">
                  <div className="relative h-full min-h-[500px] rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.5!2d2.1734!3d41.3851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f6b5f5b5b5%3A0x5f5f5f5f5f5f5f5f!2sBarcelona%2C%20Spain!5e0!3m2!1sen!2sus!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="YPMARINAS Location"
                      data-testid="contact-map"
                    ></iframe>
                    <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <h3 className="font-semibold text-foreground mb-2" data-testid="map-office-title">
                        {t('contact.officeLocation')}
                      </h3>
                      <p className="text-muted-foreground text-sm" data-testid="map-office-address">
                        Carrer de la Marina, 16<br />
                        08005 Barcelona, España
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="faq-title">
              {t('contact.faqTitle')}
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="faq-subtitle">
              {t('contact.faqSubtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: t('contact.faq1Question'),
                answer: t('contact.faq1Answer')
              },
              {
                question: t('contact.faq2Question'),
                answer: t('contact.faq2Answer')
              },
              {
                question: t('contact.faq3Question'),
                answer: t('contact.faq3Answer')
              },
              {
                question: t('contact.faq4Question'),
                answer: t('contact.faq4Answer')
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3" data-testid={`faq-question-${index}`}>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`faq-answer-${index}`}>
                      {faq.answer}
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
