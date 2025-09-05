import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="gradient-navy text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl w-fit">
              YPMARINAS
            </div>
            <p className="text-muted-foreground" data-testid="company-description">
              {t('footer.companyDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="social-twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="social-facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="social-linkedin">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="footer-quicklinks-title">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/empresa" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-link-company">
                  {t('nav.company')}
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-link-products">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-link-services">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-link-projects">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-link-news">
                  {t('nav.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="footer-services-title">
              {t('nav.services')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios/diseno-ingenieria" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-service-design">
                  {t('services.designEngineering')}
                </Link>
              </li>
              <li>
                <Link href="/servicios/consultoria" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-service-consulting">
                  {t('services.consulting')}
                </Link>
              </li>
              <li>
                <Link href="/servicios/gestion-proyectos" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-service-management">
                  {t('services.projectManagement')}
                </Link>
              </li>
              <li>
                <Link href="/servicios/mantenimiento" className="text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="footer-service-maintenance">
                  {t('services.maintenance')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="footer-contact-title">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-muted-foreground" data-testid="footer-location">
                <MapPin className="w-5 h-5 mr-2" />
                Barcelona, España
              </li>
              <li className="flex items-center text-muted-foreground" data-testid="footer-phone">
                <Phone className="w-5 h-5 mr-2" />
                +34 934 567 890
              </li>
              <li className="flex items-center text-muted-foreground" data-testid="footer-email">
                <Mail className="w-5 h-5 mr-2" />
                info@ypmarinas.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm" data-testid="footer-copyright">
            © 2024 YPMARINAS. {t('footer.allRightsReserved')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200" data-testid="footer-privacy">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200" data-testid="footer-terms">
              {t('footer.terms')}
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-accent text-sm transition-colors duration-200" data-testid="footer-cookies">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
