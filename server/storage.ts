import { 
  type User, 
  type InsertUser, 
  type Project, 
  type InsertProject,
  type Product,
  type InsertProduct,
  type Service,
  type InsertService,
  type News,
  type InsertNews,
  type Contact,
  type InsertContact
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // News methods
  getAllNews(): Promise<News[]>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  
  // Contact methods
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private products: Map<string, Product>;
  private services: Map<string, Service>;
  private news: Map<string, News>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.products = new Map();
    this.services = new Map();
    this.news = new Map();
    this.contacts = new Map();

    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample featured projects
    const sampleProjects: Project[] = [
      {
        id: randomUUID(),
        title: "Marina Port Valencia",
        slug: "marina-port-valencia",
        description: "Construcción de marina de lujo con capacidad para 200 embarcaciones y servicios premium.",
        category: "marina",
        location: "Valencia, España",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Puerto de Bilbao",
        slug: "puerto-bilbao",
        description: "Expansión y modernización de terminal de contenedores con nueva infraestructura.",
        category: "puerto",
        location: "Bilbao, España",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Espigón Costa Brava",
        slug: "espigon-costa-brava",
        description: "Construcción de espigón de protección costera con diseño sostenible e innovador.",
        category: "espigon",
        location: "Girona, España",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        title: "Astillero Mediterráneo",
        slug: "astillero-mediterraneo",
        description: "Modernización integral de astillero con tecnología de vanguardia para construcción naval.",
        category: "astillero",
        location: "Cartagena, España",
        imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        featured: false,
        createdAt: new Date()
      }
    ];

    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(project => project.slug === slug);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.slug === slug);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(service => service.slug === slug);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id, 
      createdAt: new Date()
    };
    this.services.set(id, service);
    return service;
  }

  // News methods
  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values())
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    return Array.from(this.news.values()).find(article => article.slug === slug);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = randomUUID();
    const article: News = { 
      ...insertNews, 
      id, 
      publishedAt: new Date()
    };
    this.news.set(id, article);
    return article;
  }

  // Contact methods
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
