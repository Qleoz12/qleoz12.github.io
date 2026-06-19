import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { ProjectsData, RoleData } from '../types';

const dataDir = path.join(process.cwd(), 'src/data');
const rolesDir = path.join(dataDir, 'roles');

export function loadRole(slug: string): RoleData {
  const filePath = path.join(rolesDir, `${slug}.yaml`);
  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw) as RoleData;
}

export function loadAllRoles(): RoleData[] {
  const files = fs.readdirSync(rolesDir).filter((f) => f.endsWith('.yaml'));
  return files.map((f) => loadRole(f.replace('.yaml', '')));
}

export function loadPublicRoles(): RoleData[] {
  return loadAllRoles().filter((r) => !r.secret);
}

export function loadProjects(): ProjectsData {
  const filePath = path.join(dataDir, 'projects.yaml');
  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw) as ProjectsData;
}

export function projectsForRole(tags: string[] | undefined, all: ProjectsData) {
  if (!tags?.length) return all.projects;
  return all.projects.filter((p) => p.tags.some((t) => tags.includes(t)));
}
