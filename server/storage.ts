import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  users,
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContact
} from "@shared/schema";
import { randomUUID } from "crypto";


export interface IUserStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export interface IContactStorage {
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class DatabaseUserStorage implements IUserStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user ?? undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user ?? undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
}


export class MemoryContactStorage implements IContactStorage {
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.contactSubmissions = new Map();
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const id = randomUUID();
    const contactSubmission: ContactSubmission = {
      ...insertContact,
      id,
      submittedAt: new Date(),
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export const userStorage: IUserStorage = new DatabaseUserStorage();
export const contactStorage: IContactStorage = new MemoryContactStorage();
