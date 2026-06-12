import "./Skills.scss";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SKILL_ROWS = [
  {
    label: "Languages & Frameworks",
    direction: "left",
    duration: 30,
    tint: "cyan",
    repeat: 1,
    chips: [
      { glyph: "Py", label: "Python" },
      { glyph: "TS", label: "TypeScript" },
      { glyph: "JS", label: "JavaScript" },
      { glyph: "☕", label: "Java" },
      { glyph: "++", label: "C++" },
      { glyph: "◫", label: "SQL" },
      { glyph: "<>", label: "HTML/CSS" },
      { glyph: "⬢", label: "Node.js" },
      { glyph: "⚛", label: "React" },
      { glyph: "▲", label: "Next.js" },
      { glyph: "▣", label: "Three.js" },
      { glyph: "～", label: "Framer Motion" },
    ],
  },
  {
    label: "AI & LLM",
    direction: "right",
    duration: 26,
    tint: "magenta",
    // few chips: repeat the set so one copy always spans the container
    repeat: 2,
    chips: [
      { glyph: "✦", label: "LLM APIs (Anthropic Claude)" },
      { glyph: "⌁", label: "Prompt Engineering" },
      { glyph: "⚙", label: "Structured Tool-Use / Function Calling" },
      { glyph: "𝍢", label: "AI-Assisted Data Analysis" },
      { glyph: "✓", label: "Schema Validation (Zod)" },
    ],
  },
  {
    label: "Data · Tools & Practices",
    direction: "left",
    duration: 28,
    tint: "cyan",
    repeat: 1,
    chips: [
      { glyph: "◫", label: "SQLite" },
      { glyph: "⇄", label: "ETL & Data Cleaning" },
      { glyph: "𝍢", label: "Power BI" },
      { glyph: "▤", label: "Excel" },
      { glyph: "⎇", label: "Git" },
      { glyph: "↻", label: "Agile" },
      { glyph: "⚑", label: "Release Management" },
      { glyph: "⇌", label: "REST & SOAP APIs" },
      { glyph: "⊳", label: "Postman" },
      { glyph: "☰", label: "Trello" },
    ],
  },
];

const ChipGroup = ({ row, hidden }) => {
  const chips = Array.from({ length: row.repeat }, () => row.chips).flat();
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {chips.map((chip, i) => (
        <span className="skill-chip" key={`${chip.label}-${i}`}>
          <b aria-hidden="true">{chip.glyph}</b>
          {chip.label}
        </span>
      ))}
    </div>
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

      <div className="skills-marquee">
        {SKILL_ROWS.map((row, index) => (
          <motion.div
            key={row.label}
            className={`marquee-section tint-${row.tint}`}
            // slide in from the direction the row travels toward
            initial={{ opacity: 0, x: row.direction === "left" ? 80 : -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.5, once: true }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          >
            <p className="marquee-label">{row.label}</p>
            <div className="marquee-row">
              <div
                className={`marquee-track ${row.direction}`}
                style={{ animationDuration: `${row.duration}s` }}
              >
                <ChipGroup row={row} />
                <ChipGroup row={row} hidden />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
