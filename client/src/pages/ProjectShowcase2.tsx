// // client/src/pages/ProjectShowcase.tsx

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import projectData from '@/data/projects'; // All projects array
// import './ProjectShowcase.css';

// const categories = ['electrical', 'design', 'code'];

// export default function ProjectShowcase() {
//   const [filter, setFilter] = useState<'electrical' | 'design' | 'code'>('code');

//   const filtered = projectData.filter(p => p.type === filter);

//   return (
//     <section className="project-showcase">
//       <div className="project-tabs">
//         {categories.map(cat => (
//           <button
//             key={cat}
//             className={`tab-btn ${filter === cat ? 'active' : ''}`}
//             onClick={() => setFilter(cat as any)}
//           >
//             {cat === 'electrical' ? '⚡ Electrical' : cat === 'design' ? '🎨 Design' : '💻 Code'}
//           </button>
//         ))}
//       </div>

//       <div className="project-grid">
//         <AnimatePresence>
//           {filtered.map(project => (
//             <motion.div
//               key={project.id}
//               className="project-card"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {project.image && <img src={project.image} alt={project.title} className="project-img" />}
//               <h3>{project.title}</h3>
//               <p>{project.description}</p>

//               <div className="project-tags">
//                 {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
//               </div>

//               <div className="project-actions">
//                 {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>}
//                 {project.figma && <a href={project.figma} target="_blank" rel="noreferrer">Figma</a>}
//                 {project.link && <a href={project.link} target="_blank" rel="noreferrer">View</a>}
//                 {project.download && <a href={project.download}>Download</a>}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

// import React, { useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { motion } from "framer-motion";

// const projects = [
//   { id: 1, title: "Solar Microgrid", identity: "Engineer", thumbnail: "/images/microgrid.jpg", video: "/videos/microgrid.mp4", tools: ["MATLAB", "DIgSILENT"] },
//   { id: 2, title: "IoT Smart Meter", identity: "Developer", thumbnail: "/images/iot.jpg", video: "/videos/iot.mp4", tools: ["C/C++", "FreeRTOS"] },
//   { id: 3, title: "Portfolio Web App", identity: "Technopreneur", thumbnail: "/images/webapp.jpg", video: "/videos/webapp.mp4", tools: ["React", "Node.js"] },
//   // more projects...
// ];

// const ProjectCard3D = ({ project, position }) => {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <mesh
//       position={position}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//     >
//       <planeBufferGeometry args={[2.5, 3]} />
//       <meshStandardMaterial color={hovered ? "#ffcc00" : "#ffffff"} />
//       {/* Add thumbnail texture or video material */}
//     </mesh>
//   );
// };

// const ProjectsShowcase: React.FC = () => {
//   const [filter, setFilter] = useState<string | null>(null);

//   const filteredProjects = filter
//     ? projects.filter((p) => p.identity === filter)
//     : projects;

//   return (
//     <div className="relative w-full h-screen bg-black text-white overflow-hidden">
//       {/* Identity Filters */}
//       <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
//         {["Engineer", "Developer", "Technopreneur", "Creative Technologist"].map((id) => (
//           <button
//             key={id}
//             className={`px-4 py-2 rounded-full border ${filter === id ? "bg-accent2" : "border-white/30"}`}
//             onClick={() => setFilter(filter === id ? null : id)}
//           >
//             {id}
//           </button>
//         ))}
//       </div>

//       {/* 3D Canvas */}
//       <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <OrbitControls enableZoom={true} enablePan={false} />
        
//         {filteredProjects.map((proj, i) => {
//           const angle = (i / filteredProjects.length) * Math.PI * 2;
//           return <ProjectCard3D key={proj.id} project={proj} position={[Math.cos(angle) * 6, Math.sin(angle) * 2, Math.sin(angle) * 6]} />;
//         })}
//       </Canvas>

//       {/* Floating Contact CTA */}
//       <motion.div className="fixed bottom-8 right-8 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//         <Link to="/contact">
//           <button className="px-6 py-3 rounded-full bg-accent2 text-black shadow-lg hover:shadow-2xl transition-all">
//             Contact Me
//           </button>
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default ProjectsShowcase;



// import React, { useState, useRef, useMemo, Suspense } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls, Html, useTexture } from "@react-three/drei";
// import { motion } from "framer-motion";
// import { Link } from "wouter";
// import * as THREE from "three";

// // Sample projects
// const projects = [
//   {
//     id: 1,
//     title: "Solar Microgrid",
//     identity: "Engineer",
//     thumbnail: "/images/microgrid.jpg",
//     video: "/videos/microgrid.mp4",
//     tools: ["MATLAB", "DIgSILENT"],
//   },
//   {
//     id: 2,
//     title: "IoT Smart Meter",
//     identity: "Developer",
//     thumbnail: "/images/iot.jpg",
//     video: "/videos/iot.mp4",
//     tools: ["C/C++", "FreeRTOS"],
//   },
//   {
//     id: 3,
//     title: "Portfolio Web App",
//     identity: "Technopreneur",
//     thumbnail: "/images/webapp.jpg",
//     video: "/videos/webapp.mp4",
//     tools: ["React", "Node.js"],
//   },
//   {
//     id: 4,
//     title: "EVSE Charging Station",
//     identity: "Creative Technologist",
//     thumbnail: "/images/evse.jpg",
//     video: "/videos/evse.mp4",
//     tools: ["STM32", "Python", "IoT"],
//   },
// ];

// // 3D Particle Background
// const ParticleBackground = () => {
//   const particles = useMemo(() => {
//     const temp = [];
//     for (let i = 0; i < 120; i++) {
//       temp.push([Math.random() * 60 - 30, Math.random() * 40 - 20, Math.random() * 60 - 30]);
//     }
//     return temp;
//   }, []);
//   return (
//     <>
//       {particles.map((pos, idx) => (
//         <mesh key={idx} position={pos}>
//           <sphereBufferGeometry args={[0.1, 8, 8]} />
//           <meshStandardMaterial color="#00ffff" />
//         </mesh>
//       ))}
//     </>
//   );
// };

// // 3D Project Card with Flip Effect
// const ProjectCard3D = ({ project, position }) => {
//   const [hovered, setHovered] = useState(false);
//   const texture = useTexture(project.thumbnail);

//   // Simple rotation animation
//   useFrame((state, delta) => {
//     // rotate slowly on idle
//   });

//   return (
//     <group position={position}>
//       <mesh
//         onPointerOver={() => setHovered(true)}
//         onPointerOut={() => setHovered(false)}
//         rotation-y={hovered ? Math.PI : 0}
//       >
//         <planeBufferGeometry args={[3, 4]} />
//         <meshStandardMaterial map={texture} />
//       </mesh>

//       {/* HTML overlay for flip side */}
//       {hovered && (
//         <Html position={[0, 0, 0.1]} center>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-black bg-opacity-80 p-4 rounded-lg w-64 text-white text-center shadow-lg"
//           >
//             <h3 className="font-bold text-lg mb-2">{project.title}</h3>
//             <p className="text-sm mb-2">Identity: {project.identity}</p>
//             <div className="flex flex-wrap justify-center gap-1">
//               {project.tools.map((t, i) => (
//                 <span key={i} className="px-2 py-1 text-xs border rounded-full bg-accent2 text-black">
//                   {t}
//                 </span>
//               ))}
//             </div>
//           </motion.div>
//         </Html>
//       )}
//     </group>
//   );
// };

// // Main Page
// const ProjectsShowcase: React.FC = () => {
//   const [filter, setFilter] = useState<string | null>(null);

//   const filteredProjects = filter
//     ? projects.filter((p) => p.identity === filter)
//     : projects;

//   return (
//     <div className="relative w-full h-screen bg-black text-white overflow-hidden">
//       {/* Identity Filters */}
//       <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
//         {["Engineer", "Developer", "Technopreneur", "Creative Technologist"].map((id) => (
//           <button
//             key={id}
//             className={`px-4 py-2 rounded-full border ${
//               filter === id ? "bg-accent2 text-black" : "border-white/30"
//             }`}
//             onClick={() => setFilter(filter === id ? null : id)}
//           >
//             {id}
//           </button>
//         ))}
//       </div>

//       {/* 3D Canvas */}
//       <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <Suspense fallback={null}>
//           <ParticleBackground />

//           {filteredProjects.map((proj, i) => {
//             const angle = (i / filteredProjects.length) * Math.PI * 2;
//             const radius = 7;
//             return (
//               <ProjectCard3D
//                 key={proj.id}
//                 project={proj}
//                 position={[Math.cos(angle) * radius, Math.sin(angle) * 2, Math.sin(angle) * radius]}
//               />
//             );
//           })}
//         </Suspense>

//         <OrbitControls enableZoom={true} enablePan={false} />
//       </Canvas>

//       {/* Floating Contact CTA */}
//       <motion.div
//         className="fixed bottom-8 right-8 z-50"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Link to="/contact">
//           <button className="px-6 py-3 rounded-full bg-accent2 text-black shadow-lg hover:shadow-2xl transition-all">
//             Contact Me
//           </button>
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default ProjectsShowcase;


import React, { useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "wouter";
import * as THREE from "three";

// Identity Data
import { role as designerRole, portfolioHighlights as designerPortfolio, tools as designerTools } from "@/data/designer";
import { skills as developerSkills, projects as developerProjects } from "@/data/developer";
import { education, projects as engineerProjects } from "@/data/engineer";
import { role as technopRole, notableProjects as technopProjects } from "@/data/technop";
import { role as humanRole, introNarrative } from "@/data/elvinbeyond";

// Merge all projects for showcase
const allProjects = [
  ...designerPortfolio.map(p => ({ ...p, identity: "Creative Technologist" })),
  ...developerProjects.map(p => ({ ...p, identity: "Developer" })),
  ...engineerProjects.map(p => ({ ...p, identity: "Engineer" })),
  ...technopProjects.map(p => ({ ...p, identity: "Technopreneur" })),
];

// Particle background
const ParticleBackground = () => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 120; i++) {
      temp.push([Math.random() * 60 - 30, Math.random() * 40 - 20, Math.random() * 60 - 30]);
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereBufferGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#00ffff" />
        </mesh>
      ))}
    </>
  );
};

// Project Card 3D
const ProjectCard3D = ({ project, position }) => {
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(project.thumbnail || "/images/default.png");

  useFrame(() => {
    // subtle rotation animation
  });

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        rotation-y={hovered ? Math.PI : 0}
      >
        <planeBufferGeometry args={[3, 4]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {hovered && (
        <Html position={[0, 0, 0.1]} center>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black bg-opacity-80 p-4 rounded-lg w-64 text-white text-center shadow-lg"
          >
            <h3 className="font-bold text-lg mb-2">{project.title}</h3>
            <p className="text-sm mb-2">{project.identity}</p>
            {project.description && <p className="text-xs mb-2">{project.description}</p>}
            {project.tools && (
              <div className="flex flex-wrap justify-center gap-1">
                {project.tools.map((t, i) => (
                  <span key={i} className="px-2 py-1 text-xs border rounded-full bg-accent2 text-black">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </Html>
      )}
    </group>
  );
};

// Mega Showcase Page
const MegaProjectsShowcase: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredProjects = filter
    ? allProjects.filter((p) => p.identity === filter)
    : allProjects;

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Identity Filters */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {["Engineer", "Developer", "Technopreneur", "Creative Technologist"].map((id) => (
          <button
            key={id}
            className={`px-4 py-2 rounded-full border ${
              filter === id ? "bg-accent2 text-black" : "border-white/30"
            }`}
            onClick={() => setFilter(filter === id ? null : id)}
          >
            {id}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <ParticleBackground />

          {filteredProjects.map((proj, i) => {
            const angle = (i / filteredProjects.length) * Math.PI * 2;
            const radius = 7;
            return (
              <ProjectCard3D
                key={proj.title + i}
                project={proj}
                position={[Math.cos(angle) * radius, Math.sin(angle) * 2, Math.sin(angle) * radius]}
              />
            );
          })}
        </Suspense>

        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>

      {/* Floating Contact CTA */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/contact">
          <button className="px-6 py-3 rounded-full bg-accent2 text-black shadow-lg hover:shadow-2xl transition-all">
            Contact Me
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default MegaProjectsShowcase;
