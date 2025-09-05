import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function ProductDetail() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ['/api/products', slug],
    enabled: !!slug,
  });

  // Mock data for demonstration
  const productData = {
    "marinas-puertos": {
      title: t('products.marinasTitle'),
      category: "marinas",
      description: t('products.marinasDescription'),
      fullDescription: t('products.marinasFullDescription'),
      images: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
      ],
      technicalSpecs: [
        { name: t('products.capacity'), value: "200-500 " + t('products.boats') },
        { name: t('products.maxLength'), value: "50m" },
        { name: t('products.depth'), value: "3-8m" },
        { name: t('products.materials'), value: t('products.reinforcedConcrete') }
      ],
      keyFeatures: [
        t('products.feature1'),
        t('products.feature2'),
        t('products.feature3'),
        t('products.feature4')
      ]
    }
  };

  const currentProduct = productData[slug as keyof typeof productData];

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

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t('common.notFound')}</h1>
          <Link href="/productos">
            <Button data-testid="back-to-products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.backToProducts')}
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
          <Link href="/productos" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="breadcrumb-products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('nav.products')}
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
            <Badge className="mb-4" data-testid="product-category">
              {currentProduct.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="product-title">
              {currentProduct.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl" data-testid="product-description">
              {currentProduct.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src={currentProduct.images[0]}
                alt={currentProduct.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
                data-testid="main-product-image"
              />
            </motion.div>
            <div className="space-y-4">
              {currentProduct.images.slice(1).map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${currentProduct.title} ${index + 2}`}
                  className="w-full h-44 lg:h-60 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`gallery-image-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="description-title">
                  {t('common.description')}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed" data-testid="full-description">
                  {currentProduct.fullDescription}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6" data-testid="features-title">
                  {t('products.keyFeatures')}
                </h2>
                <ul className="space-y-3">
                  {currentProduct.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start" data-testid={`feature-${index}`}>
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technical Specifications */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="specs-title">
                      {t('products.technicalSpecs')}
                    </h3>
                    <div className="space-y-3">
                      {currentProduct.technicalSpecs.map((spec, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center" data-testid={`spec-${index}`}>
                            <span className="text-muted-foreground text-sm">{spec.name}</span>
                            <span className="font-medium text-foreground">{spec.value}</span>
                          </div>
                          {index < currentProduct.technicalSpecs.length - 1 && (
                            <Separator className="mt-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quote Request */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-accent">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="quote-title">
                      {t('products.requestQuote')}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6" data-testid="quote-description">
                      {t('products.quoteDescription')}
                    </p>
                    <div className="space-y-3">
                      <Link href="/contacto">
                        <Button className="w-full" data-testid="quote-button">
                          <Mail className="w-4 h-4 mr-2" />
                          {t('products.sendRequest')}
                        </Button>
                      </Link>
                      <div className="flex items-center justify-center text-muted-foreground text-sm">
                        <Phone className="w-4 h-4 mr-2" />
                        <span data-testid="contact-phone">+34 934 567 890</span>
                      </div>
                    </div>
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
