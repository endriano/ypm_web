import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "wouter";

export default function NewsDetail() {
  const { t } = useTranslation();
  const { slug } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ['/api/news', slug],
    enabled: !!slug,
  });

  // Mock article data for demonstration
  const articleData = {
    "nueva-marina-valencia-inauguracion": {
      title: t('news.article1Title'),
      excerpt: t('news.article1Excerpt'),
      content: t('news.article1FullContent'),
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      publishedAt: "2024-01-15",
      readTime: "5 min",
      author: "Carlos Martínez",
      tags: ["Marina", "Valencia", "Inauguración"]
    },
    "expansion-puerto-bilbao-proyecto": {
      title: t('news.article2Title'),
      excerpt: t('news.article2Excerpt'),
      content: t('news.article2FullContent'),
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      publishedAt: "2024-01-10",
      readTime: "7 min",
      author: "Ana González",
      tags: ["Puerto", "Bilbao", "Expansión"]
    }
  };

  const currentArticle = articleData[slug as keyof typeof articleData];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

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

  if (!currentArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t('common.notFound')}</h1>
          <Link href="/noticias">
            <Button data-testid="back-to-news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.backToNews')}
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
          <Link href="/noticias" className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors duration-200" data-testid="breadcrumb-news">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('nav.news')}
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
              <div className="flex items-center" data-testid="article-date">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(currentArticle.publishedAt)}
              </div>
              <div className="flex items-center" data-testid="article-read-time">
                <Clock className="w-4 h-4 mr-1" />
                {currentArticle.readTime}
              </div>
              <div data-testid="article-author">
                {t('news.by')} {currentArticle.author}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="article-title">
              {currentArticle.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="article-excerpt">
              {currentArticle.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Image */}
      <section className="py-8 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.img 
            src={currentArticle.imageUrl}
            alt={currentArticle.title}
            className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            data-testid="article-image"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="text-muted-foreground leading-relaxed text-lg" data-testid="article-content">
                  {currentArticle.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                className="mt-12 pt-8 border-t border-border"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="tags-title">
                  {t('news.tags')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentArticle.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      data-testid={`tag-${index}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Share */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="sticky top-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="share-title">
                      <Share2 className="w-5 h-5 inline mr-2" />
                      {t('news.share')}
                    </h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                        data-testid="share-facebook"
                      >
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(currentArticle.title)}`, '_blank')}
                        data-testid="share-twitter"
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                        data-testid="share-linkedin"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles CTA */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="more-news-title">
              {t('news.moreNews')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="more-news-description">
              {t('news.moreNewsDescription')}
            </p>
            <Link href="/noticias">
              <Button className="gradient-orange text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90" data-testid="view-all-news">
                {t('news.viewAllNews')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
