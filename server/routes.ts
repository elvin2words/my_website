import type { Express } from "express";
import { createServer, type Server } from "http";
import { userStorage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactEmail } from "./email";


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


  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      const contactSubmission = await userStorage.createContactSubmission(validatedData);
      
      await sendContactEmail(validatedData);
      
      res.json({ success: true, data: contactSubmission });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ 
          success: false, 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to submit contact form" 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
