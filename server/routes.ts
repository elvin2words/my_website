import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // For this portfolio site, we're using static file serving
  // No special API routes are required
  
  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Content management endpoints
  let siteContent = {
    intro: '',
    engineerDescription: '',
    developerDescription: '',
    designerDescription: '',
    technopreneurDescription: '',
    humanDescription: ''
  };

  app.get('/api/content', (_req, res) => {
    res.json(siteContent);
  });

  app.post('/api/content', (req, res) => {
    siteContent = { ...siteContent, ...req.body };
    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
