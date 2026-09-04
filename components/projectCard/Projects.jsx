import "./Projects.scss";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import TutorVoiceButton from "./TutorVoice";

const LiveIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
    <path
      d="M14 5h5v5M19 5l-8 8M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Card = ({ title, description, image, link, linkLabel, tags, voiceDemo, index }) => {
  return (
    <motion.article
      className="card-container"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3, once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
    >
      {image && (
        <div className="picture-container">
          <img className="picture-of-card" src={image} alt={title} />
        </div>
      )}
      <div className="card-body">
        <h3 className="title-of-card">{title}</h3>
        {tags && (
          <ul className="tech-tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        <p>{description}</p>
        <div className="card-actions">
          {link && linkLabel && (
            <a className="repo-link" href={link} target="_blank" rel="noreferrer">
              <LiveIcon />
              {linkLabel}
            </a>
          )}
          {link && !linkLabel && (
            <a className="repo-link" href={link} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
              View on GitHub
            </a>
          )}
          {voiceDemo && <TutorVoiceButton />}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const cardInformation = [
    {
      id: 3,
      title: "Pattern Learn",
      tags: ["React", "Vite", "Algorithms"],
      image: `${import.meta.env.BASE_URL}patternlearn.jpg`,
      description:
        "A live trainer for coding-interview patterns: hash maps, sliding window, two pointers, heaps, dynamic programming, and more. Each pattern comes with step-by-step visualizations, curated problem ladders with Big-O notes, and progress tracking.",
      link: "https://patternlearn.com/#/",
      linkLabel: "Try it live",
    },
    {
      id: 0,
      title: "Pixel Agents",
      tags: ["Node.js", "WebSocket", "Canvas"],
      description:
        "Turns Claude Code agents into pixel-art characters in a virtual office. Each agent walks to its desk and animates with what it is doing: typing while coding, reading while searching files. A real-time canvas for watching multi-agent activity.",
      image: `${import.meta.env.BASE_URL}pixel-agent.png`,
      link: "https://github.com/Apicad/AI-agent",
    },
    {
      id: 1,
      title: "Job-Application Pipeline",
      tags: ["Python", "Gmail API", "Google Sheets"],
      // 2026-09-03: screenshot removed. The original showed real target companies,
      // private fit scores and application statuses. Needs a redacted replacement.
      image: null,
      description:
        "A multi-stage automation pipeline that discovers and scores job postings, drafts cover letters checked against a verified-claims file so nothing is fabricated, syncs Gmail and Google Sheets, and pre-fills application forms with human review before every submission. Used for 100+ real applications.",
    },
    {
      id: 2,
      title: "AI Voice Tutor",
      tags: ["React", "Vite", "Claude API", "Google Cloud TTS", "Web Speech"],
      image: `${import.meta.env.BASE_URL}ai-voice-tutor.jpg`,
      description:
        "A voice-first study app for the Microsoft AI-901 exam. Claude teaches spoken lessons and adaptive quizzes grounded in course notes, with browser voice input, natural text-to-speech, and per-topic progress tracking.",
      link: "https://github.com/Apicad/ai-voice-tutor",
      voiceDemo: true,
    },
  ];
  return (
    <div className="container ">
      <span className="spacer" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4, once: true }}
        transition={{ duration: 0.5 }}
        className="box bullet-points"
      >
        <h2>Projects</h2>
      </motion.div>

      <div className="project-flex">
        {cardInformation.map((e, i) => (
          <Card
            key={e.id}
            title={e.title}
            description={e.description}
            image={e.image}
            link={e.link}
            linkLabel={e.linkLabel}
            tags={e.tags}
            voiceDemo={e.voiceDemo}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
