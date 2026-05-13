import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { PortfolioContent } from "@/types/content";

const contentPath = path.join(process.cwd(), "src", "data", "content.json");

const defaultContent: PortfolioContent = {
  projects: [],
  stack: [],
  cursus: [],
  feedback: [],
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isValidContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as PortfolioContent;
  const projectsValid =
    Array.isArray(candidate.projects) &&
    candidate.projects.every(
      (item) =>
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        isStringArray(item.stack) &&
        typeof item.link === "string",
    );
  const stackValid = isStringArray(candidate.stack);
  const cursusValid =
    Array.isArray(candidate.cursus) &&
    candidate.cursus.every(
      (item) =>
        typeof item.period === "string" &&
        typeof item.title === "string" &&
        typeof item.description === "string",
    );
  const feedbackValid =
    Array.isArray(candidate.feedback) &&
    candidate.feedback.every(
      (item) =>
        typeof item.quote === "string" &&
        typeof item.name === "string" &&
        typeof item.role === "string",
    );

  return projectsValid && stackValid && cursusValid && feedbackValid;
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const raw = await fs.readFile(contentPath, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    return isValidContent(parsed) ? parsed : defaultContent;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.writeFile(contentPath, JSON.stringify(defaultContent, null, 2), "utf-8");
      return defaultContent;
    }

    return defaultContent;
  }
}

export async function savePortfolioContent(content: PortfolioContent): Promise<void> {
  if (!isValidContent(content)) {
    throw new Error("Invalid portfolio content format.");
  }

  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), "utf-8");
}
