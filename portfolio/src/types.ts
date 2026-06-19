export interface ExperienceItem {
  company: string;
  role: string;
  stack: string;
  bullets: string[];
}

export interface FeaturedPost {
  title: string;
  url: string;
  excerpt?: string;
}

export interface RoleData {
  slug: string;
  title: string;
  tagline: string;
  secret?: boolean;
  showProjects?: boolean;
  showExperience?: boolean;
  skills: string[];
  experience: ExperienceItem[];
  featuredPosts: FeaturedPost[];
  projectTags?: string[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  tags: string[];
}

export interface ProjectsData {
  projects: Project[];
}

export const BLOG_BASE = 'https://qleoz12.github.io';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/leonardo-sanchez-89590b127/';
export const EXPERIENCE_URL = `${BLOG_BASE}/experience/`;
