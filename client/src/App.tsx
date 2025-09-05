import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { queryClient } from "./lib/queryClient";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Company from "@/pages/Company";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import "./lib/i18n";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/empresa" component={Company} />
          <Route path="/productos" component={Products} />
          <Route path="/productos/:slug" component={ProductDetail} />
          <Route path="/servicios" component={Services} />
          <Route path="/servicios/:slug" component={ServiceDetail} />
          <Route path="/proyectos" component={Projects} />
          <Route path="/proyectos/:slug" component={ProjectDetail} />
          <Route path="/noticias" component={News} />
          <Route path="/noticias/:slug" component={NewsDetail} />
          <Route path="/contacto" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ypmarinas-theme">
        <TooltipProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Toaster />
            <Router />
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
