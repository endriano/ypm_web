import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, ArrowRight, MapPin } from "lucide-react";

export default function Projects() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['/api/projects'],
    enabled: true,
  });

  const categories = [
    { value: "all", label: t('projects.allCategories') },
    { value: "marina", label: t('projects.marina') },
    { value: "puerto", label: t('projects.port') },
    { value: "espigon", label: t('projects.breakwater') },
    { value: "astillero", label: t('projects.shipyard') },
    { value: "flotante", label: t('projects.floating') }
  ];

  const locations = [
    { value: "all", label: t('projects.allLocations') },
    { value: "spain", label: t('projects.spain') },
    { value: "france", label: t('projects.france') },
    { value: "portugal", label: t('projects.portugal') },
    { value: "italy", label: t('projects.italy') }
  ];

  // Mock projects data for demonstration
  const mockProjects = [
    {
      id: "1",
      title: "Marina Port Valencia",
      slug: "marina-port-valencia",
      description: t('projects.marinaDescription'),
      category: "marina",
      location: "Valencia, España",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      featured: true
    },
    {
      id: "2",
      title: "Puerto de Bilbao",
      slug: "puerto-bilbao",
      description: t('projects.portDescription'),
      category: "puerto",
      location: "Bilbao, España",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      featured: true
    },
    {
      id: "3",
      title: "Espigón Costa Brava",
      slug: "espigon-costa-brava",
      description: t('projects.breakwaterDescription'),
      category: "espigon",
      location: "Girona, España",
      imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      featured: true
    },
    {
      id: "4",
      title: "Astillero Mediterráneo",
      slug: "astillero-mediterraneo",
      description: t('projects.shipyardDescription'),
      category: "astillero",
      location: "Cartagena, España",
      imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      featured: false
    },
    {
      id: "5",
      title: "Terminal Flotante Lisboa",
      slug: "terminal-flotante-lisboa",
      description: t('projects.floatingDescription'),
      category: "flotante",
      location: "Lisboa, Portugal",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      featured: false
    },
    {
      id: "6",
      title: "Marina Nice Côte d'Azur",
      slug: "marina-nice",
      description: t('projects.marinaNiceDescription'),
      category: "marina",
      location: "Nice, Francia",
      imageUrl: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      featured: false
    }
  ];

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || 
                           project.location.toLowerCase().includes(selectedLocation === "spain" ? "españa" : selectedLocation);
    return matchesSearch && matchesCategory && matchesLocation;
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="projects-title">
              {t('projects.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto" data-testid="projects-subtitle">
              {t('projects.subtitle')}
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
                placeholder={t('projects.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="projects-search"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64" data-testid="projects-category-filter">
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
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-64" data-testid="projects-location-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg" data-testid="no-projects-message">
                {t('projects.noResults')}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                    <CardContent className="p-0">
                      <div className="relative h-64 overflow-hidden rounded-t-lg">
                        <img 
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          data-testid={`project-image-${project.id}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge data-testid={`project-category-${project.id}`}>
                            {categories.find(cat => cat.value === project.category)?.label}
                          </Badge>
                        </div>
                        {project.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="bg-accent text-accent-foreground" data-testid={`project-featured-${project.id}`}>
                              {t('projects.featured')}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`project-title-${project.id}`}>
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4" data-testid={`project-description-${project.id}`}>
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-muted-foreground text-sm" data-testid={`project-location-${project.id}`}>
                            <MapPin className="w-4 h-4 mr-1" />
                            {project.location}
                          </div>
                          <Link 
                            href={`/proyectos/${project.slug}`} 
                            className="text-accent hover:text-accent/80 font-medium inline-flex items-center transition-colors duration-200"
                            data-testid={`project-link-${project.id}`}
                          >
                            {t('common.viewProject')}
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="projects-stats-title">
              {t('projects.statsTitle')}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2" data-testid="total-projects">
                {filteredProjects.length}
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                {t('projects.totalProjects')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2" data-testid="active-projects">
                3
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                {t('projects.activeProjects')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2" data-testid="countries-served">
                4
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                {t('projects.countries')}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2" data-testid="investment-value">
                €250M
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                {t('projects.totalInvestment')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
