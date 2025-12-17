---
layout: splash
permalink: /experience
title: "Code Languages and Tools used through experience"
last_modified_at: 2025-08-31
toc: true



# ====== DATA (edita aquí tus años) ===========================================

# ============================================================================

# Mapea nombres -> iconos (usa devicon o vectorlogo). Añade/edita si quieres.
icons:
  Angular: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg"
  React: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
  Vue: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg"
  JavaScript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
  TypeScript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
  HTML: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
  CSS: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
  Bootstrap: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg"
  Java: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
  Python: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
  Node.js: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
  Express: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg"
  Docker: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"
  Jenkins: "https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg"
  Kubernetes: "https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg"
  MySQL: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
  PostgreSQL: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg"
  MongoDB: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"
---

<style>
/* Mini estilos para barras y grid (no rompe el theme) */
.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin:8px 0 22px}
.skill-card{border:1px solid var(--border-color,#e5e7eb);border-radius:14px;padding:12px 14px;background:#fff}
.skill-header{display:flex;align-items:center;gap:10px;justify-content:space-between}
.skill-title{display:flex;align-items:center;gap:10px;font-weight:600}
.skill-title img{width:20px;height:20px;object-fit:contain}
.skill-years{font-variant-numeric:tabular-nums;color:#6b7280;font-size:.9rem}
.bar{height:8px;background:#f1f5f9;border-radius:999px;overflow:hidden;margin-top:8px}
.fill{height:8px;background:#64748b;border-radius:999px}
.section-title{margin:28px 0 8px}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}
.badge{display:inline-block;font-size:.75rem;padding:.15rem .5rem;border-radius:999px;background:#f1f5f9;color:#334155;margin-left:.4rem}
.icon-row img{margin:2px}
</style>



{% assign max_years = 10 %}

<!-- Helper para pintar una sección -->
{% capture render_section %}
  {% for section in include.data %}
    {% assign pct = section.years | times: 100 | divided_by: max_years %}
    <div class="skill-card">
      <div class="skill-header">
        <div class="skill-title">
          {% assign icon = page.icons[section.name] %}
          {% if icon %}<img src="{{ icon }}" alt="{{ section.name }}"/>{% endif %}
          <span>{{ section.name }}</span>
        </div>
        <div class="skill-years">{{ section.years }} yrs</div>
      </div>
      <div class="bar"><div class="fill" style="width: {{ pct | at_least: 0 | at_most: 100 }}%"></div></div>
    </div>
  {% endfor %}
{% endcapture %}

## 🖥️ Frontend <span class="badge">{{ page.frontend | size }}</span>
<div class="skills-grid">
  {{ render_section | replace: 'include.data', 'page.frontend' }}
</div>

## ⚙️ Backend <span class="badge">{{ page.backend | size }}</span>
<div class="skills-grid">
  {{ render_section | replace: 'include.data', 'page.backend' }}
</div>

## 💻 Programming Languages <span class="badge">{{ page.languages | size }}</span>
<div class="skills-grid">
  {{ render_section | replace: 'include.data', 'page.languages' }}
</div>

## 🗄️ Databases <span class="badge">{{ page.databases | size }}</span>
<div class="skills-grid">
  {{ render_section | replace: 'include.data', 'page.databases' }}
</div>

## 🚀 DevOps / CI-CD / VC <span class="badge">{{ page.devops | size }}</span>
<div class="skills-grid">
  {{ render_section | replace: 'include.data', 'page.devops' }}
</div>

## 🌐 Servers <span class="badge">{{ page.servers | size }}</span>
<div class="skills-grid">
  {{ render_section | replace: 'include.data', 'page.servers' }}
</div>

## 🛠️ Other Tools <span class="badge">{{ page.tools | size }}</span>
<div class="skills-grid">
  {{ render_section | replace: 'include.data', 'page.tools' }}
</div>

<hr>

### Quick copy (plain text)
<pre class="mono">
{% for s in page.frontend %}{{ s.name }}: {{ s.years }} yrs
{% endfor %}{% for s in page.backend %}{{ s.name }}: {{ s.years }} yrs
{% endfor %}{% for s in page.languages %}{{ s.name }}: {{ s.years }} yrs
{% endfor %}{% for s in page.databases %}{{ s.name }}: {{ s.years }} yrs
{% endfor %}{% for s in page.devops %}{{ s.name }}: {{ s.years }} yrs
{% endfor %}{% for s in page.servers %}{{ s.name }}: {{ s.years }} yrs
{% endfor %}{% for s in page.tools %}{{ s.name }}: {{ s.years }} yrs
{% endfor %}
</pre>
