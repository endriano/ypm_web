import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  slug: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of one card plus gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Project Cards Container */}
      <div 
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        data-testid="projects-container"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="flex-none w-80 md:w-96 bg-card rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            data-testid={`project-card-${project.id}`}
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                data-testid={`project-image-${project.id}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="bg-accent px-3 py-1 rounded-full text-sm font-medium" data-testid={`project-category-${project.id}`}>
                  {project.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`project-title-${project.id}`}>
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4" data-testid={`project-description-${project.id}`}>
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground" data-testid={`project-location-${project.id}`}>
                  {project.location}
                </span>
                <Link 
                  href={`/proyectos/${project.slug}`} 
                  className="text-accent hover:text-accent/80 font-medium transition-colors duration-200"
                  data-testid={`project-link-${project.id}`}
                >
                  Ver proyecto →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background shadow-lg hover:shadow-xl z-10"
        onClick={() => scroll('left')}
        data-testid="carousel-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background shadow-lg hover:shadow-xl z-10"
        onClick={() => scroll('right')}
        data-testid="carousel-next"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
}
