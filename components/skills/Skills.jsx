import "./Skills.scss";

import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Rendered as a game-style skill tree: a glowing spine with three branches.
// Icons come from Simple Icons' CDN tinted to the branch color; skills
// without a brand icon fall back to a small monogram badge.
const BRANCHES = [
  {
    label: "Languages & Frameworks",
    tint: "cyan",
    color: "7fd1ff",
    skills: [
      { label: "Python", slug: "python" },
      { label: "TypeScript", slug: "typescript" },
      { label: "JavaScript", slug: "javascript" },
      { label: "Java", slug: "openjdk" },
      { label: "C++", slug: "cplusplus" },
      { label: "SQL", mono: "SQL" },
      { label: "HTML/CSS", slug: "html5" },
      { label: "Node.js", slug: "nodedotjs" },
      { label: "React", slug: "react" },
      { label: "Next.js", slug: "nextdotjs" },
      { label: "Three.js", slug: "threedotjs" },
      { label: "Framer Motion", slug: "framer" },
    ],
  },
  {
    label: "AI & LLM",
    tint: "magenta",
    color: "ff8df5",
    skills: [
      { label: "Claude API", slug: "claude" },
      { label: "Prompt Engineering", mono: "PE" },
      { label: "Tool Use / Function Calling", mono: "FN" },
      { label: "AI-Assisted Data Analysis", mono: "DA" },
    ],
  },
  {
    label: "Data, Tools & Practices",
    tint: "teal",
    color: "6ff5e0",
    skills: [
      { label: "SQLite", slug: "sqlite" },
      { label: "ETL & Data Cleaning", mono: "ETL" },
      { label: "Power BI", mono: "BI" },
      { label: "Excel", mono: "XL" },
      { label: "Git", slug: "git" },
      { label: "REST & SOAP APIs", mono: "API" },
      { label: "Postman", slug: "postman" },
      { label: "Agile", mono: "AG" },
      { label: "Trello", slug: "trello" },
    ],
  },
];

const SkillChip = ({ skill, color }) => {
  const [iconFailed, setIconFailed] = useState(false);
  const showIcon = skill.slug && !iconFailed;
  return (
    <li className="skill-chip">
      {showIcon ? (
        <img
          src={`https://cdn.simpleicons.org/${skill.slug}/${color}`}
          alt=""
          loading="lazy"
          onError={() => setIconFailed(true)}
        />
      ) : (
        <b aria-hidden="true">{skill.mono || skill.label.slice(0, 2)}</b>
      )}
      {skill.label}
    </li>
  );
};

const Skills = () => {
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4, once: true }}
        transition={{ duration: 0.5 }}
        className="box"
      >
        <h2>Skills</h2>
      </motion.div>

      <div className="skill-tree">
        <span className="tree-root" aria-hidden="true" />
        {BRANCHES.map((branch, index) => (
          <motion.div
            key={branch.label}
            className={`tree-branch tint-${branch.tint} ${
              index % 2 ? "side-right" : "side-left"
            }`}
            initial={{ opacity: 0, x: index % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="branch-node" aria-hidden="true" />
            <div className="branch-panel">
              <p className="branch-label">{branch.label}</p>
              <ul className="chip-list">
                {branch.skills.map((skill) => (
                  <SkillChip key={skill.label} skill={skill} color={branch.color} />
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
