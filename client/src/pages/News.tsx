import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, ArrowRight, Calendar, Clock } from "lucide-react";

export default function News() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: news = [], isLoading } = useQuery({
    queryKey: ['/api/news'],
    enabled: true,
  });

  // Mock news data for demonstration
  const mockNews = [
    {
      id: "1",
      title: t('news.article1Title'),
      slug: "nueva-marina-valencia-inauguracion",
      excerpt: t('news.article1Excerpt'),
      content: t('news.article1Content'),
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: "2024-01-15",
      readTime: "5 min"
    },
    {
      id: "2",
      title: t('news.article2Title'),
      slug: "expansion-puerto-bilbao-proyecto",
      excerpt: t('news.article2Excerpt'),
      content: t('news.article2Content'),
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: "2024-01-10",
      readTime: "7 min"
    },
    {
      id: "3",
      title: t('news.article3Title'),
      slug: "tecnologia-sostenible-construccion-maritima",
      excerpt: t('news.article3Excerpt'),
      content: t('news.article3Content'),
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: "2024-01-05",
      readTime: "6 min"
    },
    {
      id: "4",
      title: t('news.article4Title'),
      slug: "premio-innovacion-ypmarinas-2024",
      excerpt: t('news.article4Excerpt'),
      content: t('news.article4Content'),
      imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: "2023-12-20",
      readTime: "4 min"
    },
    {
      id: "5",
      title: t('news.article5Title'),
      slug: "expansion-internacional-francia-italia",
      excerpt: t('news.article5Excerpt'),
      content: t('news.article5Content'),
      imageUrl: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: "2023-12-15",
      readTime: "8 min"
    },
    {
      id: "6",
      title: t('news.article6Title'),
      slug: "certificacion-iso-14001-medioambiente",
      excerpt: t('news.article6Excerpt'),
      content: t('news.article6Content'),
      imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      publishedAt: "2023-12-01",
      readTime: "5 min"
    }
  ];

  const filteredNews = mockNews.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="news-title">
              {t('news.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto" data-testid="news-subtitle">
              {t('news.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('news.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="news-search"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredNews.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="featured-title">
                {t('news.featured')}
              </h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <img 
                      src={filteredNews[0].imageUrl}
                      alt={filteredNews[0].title}
                      className="w-full h-full object-cover"
                      data-testid="featured-image"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground" data-testid="featured-badge">
                        {t('news.featured')}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                      <div className="flex items-center" data-testid="featured-date">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(filteredNews[0].publishedAt)}
                      </div>
                      <div className="flex items-center" data-testid="featured-read-time">
                        <Clock className="w-4 h-4 mr-1" />
                        {filteredNews[0].readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid="featured-article-title">
                      {filteredNews[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-lg" data-testid="featured-excerpt">
                      {filteredNews[0].excerpt}
                    </p>
                    <Link href={`/noticias/${filteredNews[0].slug}`} className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors duration-200" data-testid="featured-link">
                      {t('common.readMore')}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="latest-news-title">
              {t('news.latestNews')}
            </h2>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg" data-testid="no-news-message">
                {t('news.noResults')}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.slice(1).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img 
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          data-testid={`news-image-${article.id}`}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                          <div className="flex items-center" data-testid={`news-date-${article.id}`}>
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(article.publishedAt)}
                          </div>
                          <div className="flex items-center" data-testid={`news-read-time-${article.id}`}>
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`news-title-${article.id}`}>
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground mb-4" data-testid={`news-excerpt-${article.id}`}>
                          {article.excerpt}
                        </p>
                        <Link 
                          href={`/noticias/${article.slug}`} 
                          className="text-accent hover:text-accent/80 font-medium inline-flex items-center transition-colors duration-200"
                          data-testid={`news-link-${article.id}`}
                        >
                          {t('common.readMore')}
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

      {/* Newsletter CTA */}
      <section className="py-16 gradient-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="newsletter-title">
              {t('news.newsletterTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="newsletter-description">
              {t('news.newsletterDescription')}
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input 
                  placeholder={t('news.emailPlaceholder')}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                  data-testid="newsletter-email"
                />
                <motion.button className="gradient-orange text-white px-6 hover:opacity-90" data-testid="newsletter-submit">
                  {t('news.subscribe')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
