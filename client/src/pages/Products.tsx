import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";

export default function Products() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
    enabled: true,
  });

  const categories = [
    { value: "all", label: t('products.allCategories') },
    { value: "marinas", label: t('products.marinas') },
    { value: "shipyards", label: t('products.shipyards') },
    { value: "beaches", label: t('products.beaches') },
    { value: "floating", label: t('products.floating') },
    { value: "promenades", label: t('products.promenades') },
    { value: "aquaculture", label: t('products.aquaculture') },
    { value: "machinery", label: t('products.machinery') }
  ];

  const featuredProducts = [
    {
      id: "1",
      title: t('products.marinasTitle'),
      category: "marinas",
      description: t('products.marinasDescription'),
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "marinas-puertos"
    },
    {
      id: "2", 
      title: t('products.shipyardsTitle'),
      category: "shipyards",
      description: t('products.shipyardsDescription'),
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "varaderos-astilleros"
    },
    {
      id: "3",
      title: t('products.beachesTitle'), 
      category: "beaches",
      description: t('products.beachesDescription'),
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "playas-espigones"
    },
    {
      id: "4",
      title: t('products.floatingTitle'),
      category: "floating", 
      description: t('products.floatingDescription'),
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "construcciones-flotantes"
    },
    {
      id: "5",
      title: t('products.promenadesTitle'),
      category: "promenades",
      description: t('products.promenadesDescription'), 
      image: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "paseos-maritimos"
    },
    {
      id: "6",
      title: t('products.aquacultureTitle'),
      category: "aquaculture",
      description: t('products.aquacultureDescription'),
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
      slug: "acuicultura"
    },
    {
      id: "7",
      title: t('products.machineryTitle'),
      category: "machinery",
      description: t('products.machineryDescription'),
      image: "https://images.unsplash.com/photo-1572286258217-7d907c95bc1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      slug: "maquinaria-usada"
    }
  ];

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="products-title">
              {t('products.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto" data-testid="products-subtitle">
              {t('products.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('products.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="products-search"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64" data-testid="products-category-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg" data-testid="no-products-message">
                {t('products.noResults')}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <CardContent className="p-0">
                      <div className="relative h-64 overflow-hidden rounded-t-lg">
                        <img 
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          data-testid={`product-image-${product.id}`}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge data-testid={`product-category-${product.id}`}>
                            {categories.find(cat => cat.value === product.category)?.label}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`product-title-${product.id}`}>
                          {product.title}
                        </h3>
                        <p className="text-muted-foreground mb-4" data-testid={`product-description-${product.id}`}>
                          {product.description}
                        </p>
                        <Link 
                          href={`/productos/${product.slug}`} 
                          className="text-accent hover:text-accent/80 font-medium inline-flex items-center transition-colors duration-200"
                          data-testid={`product-link-${product.id}`}
                        >
                          {t('common.learnMore')}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
