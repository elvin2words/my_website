// client/src/pages/ProjectShowcase.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectData from '@/data/projects'; // All projects array
import './ProjectShowcase.css';

const categories = ['electrical', 'design', 'code'];

export default function ProjectShowcase() {
  const [filter, setFilter] = useState<'electrical' | 'design' | 'code'>('code');

  const filtered = projectData.filter(p => p.type === filter);

  return (
    <section className="project-showcase">
      <div className="project-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat as any)}
          >
            {cat === 'electrical' ? '⚡ Electrical' : cat === 'design' ? '🎨 Design' : '💻 Code'}
          </button>
        ))}
      </div>

      <div className="project-grid">
        <AnimatePresence>
          {filtered.map(project => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.image && <img src={project.image} alt={project.title} className="project-img" />}
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>

              <div className="project-actions">
                {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>}
                {project.figma && <a href={project.figma} target="_blank" rel="noreferrer">Figma</a>}
                {project.link && <a href={project.link} target="_blank" rel="noreferrer">View</a>}
                {project.download && <a href={project.download}>Download</a>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
