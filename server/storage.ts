import { desc, eq } from "drizzle-orm";
import {
  users,
  contactSubmissions,
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContact
} from "../shared/schema";
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

type DatabaseModule = typeof import("./db");

let dbModulePromise: Promise<DatabaseModule> | null = null;
let hasWarnedAboutContactFallback = false;

function hasDatabaseUrl() {
  return typeof process.env.DATABASE_URL === "string" && process.env.DATABASE_URL.trim().length > 0;
}

async function getDatabaseModule(): Promise<DatabaseModule> {
  if (!hasDatabaseUrl()) {
    throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
  }

  dbModulePromise ??= import("./db");
  return dbModulePromise;
}

function warnAboutContactFallback(reason: string) {
  if (hasWarnedAboutContactFallback) {
    return;
  }

  console.warn(`Contact storage falling back to in-memory mode: ${reason}`);
  hasWarnedAboutContactFallback = true;
}

export class DatabaseUserStorage implements IUserStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { db } = await getDatabaseModule();
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user ?? undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await getDatabaseModule();
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user ?? undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await getDatabaseModule();
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
}

export class DatabaseContactStorage implements IContactStorage {
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const { db } = await getDatabaseModule();
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();

    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    const { db } = await getDatabaseModule();
    return db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.submittedAt));
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

class ResilientContactStorage implements IContactStorage {
  private readonly databaseStorage = new DatabaseContactStorage();
  private readonly memoryStorage = new MemoryContactStorage();

  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    if (!hasDatabaseUrl()) {
      warnAboutContactFallback("DATABASE_URL is not configured.");
      return this.memoryStorage.createContactSubmission(contact);
    }

    try {
      return await this.databaseStorage.createContactSubmission(contact);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown database error.";
      warnAboutContactFallback(reason);
      return this.memoryStorage.createContactSubmission(contact);
    }
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    if (!hasDatabaseUrl()) {
      warnAboutContactFallback("DATABASE_URL is not configured.");
      return this.memoryStorage.getAllContactSubmissions();
    }

    try {
      return await this.databaseStorage.getAllContactSubmissions();
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown database error.";
      warnAboutContactFallback(reason);
      return this.memoryStorage.getAllContactSubmissions();
    }
  }
}

export const userStorage: IUserStorage = new DatabaseUserStorage();
export const contactStorage: IContactStorage = new ResilientContactStorage();
