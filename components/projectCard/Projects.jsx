import "./Projects.scss";

import { motion } from "framer-motion";

const Card = ({ title, description, image, link }) => {
  const CardTag = link ? motion.a : motion.div;
  return (
    <CardTag
      className="card-container"
      whileHover={{ scale: 1.1, y: -30 }}
      {...(link && { href: link, target: "_blank", rel: "noreferrer" })}
    >
      <div className="picture-container">
        <img
          className={`picture-of-card${image ? " project-screenshot" : ""}`}
          src={image || `${import.meta.env.BASE_URL}Unavailable.png`}
          alt={title}
        />
      </div>
      <div>
        <h2 className="title-of-card">{title}</h2>
        <p>{description}</p>
      </div>
    </CardTag>
  );
};

const Projects = () => {
  const cardInformation = [
    {
      id: 0,
      title: "Pixel Agents",
      description:
        "A game-like interface that turns Claude Code AI agents into characters in a pixel-art office. Each agent walks to a desk and animates based on what it's doing - typing while coding, reading while searching files - with a real-time canvas for monitoring multi-agent activity.",
      image: `${import.meta.env.BASE_URL}pixel-agent.png`,
      link: "https://github.com/Apicad/AI-agent",
    },
    {
      id: 1,
      title: "Job-Application Pipeline",
      description:
        "A multi-stage automation pipeline in Python and the Claude API: discovers and scores job postings, drafts cover letters validated against a verified-claims file to prevent fabrication, syncs Gmail and Google Sheets, and fills application forms with human review before every submission. Used for 100+ real applications.",
    },
    {
      id: 2,
      title: "AI Voice Tutor",
      description:
        "A voice tutor web app for the Microsoft AI-901 exam. Claude teaches spoken lessons and adaptive quizzes grounded in course notes, with browser voice input, text-to-speech, and per-topic progress tracking. Built with React and Vite.",
      link: "https://github.com/Apicad/ai-voice-tutor",
    },
    {
      id: 3,
      title: "FlashDesk",
      description:
        "A zero-dependency spaced-repetition flashcard app in Node.js: vanilla JS front end, JSON file persistence, an interval-ladder scheduler, quiz mode, and a seedable sample deck.",
      link: "https://github.com/Apicad/flashdesk",
    },
    {
      id: 4,
      title: "Basketball Scheduler",
      description:
        "A scheduling tool that organizes basketball games, teams, and time slots. It helps automate match rotations, track scores, and manage multiple courts or groups efficiently.",
      link: "https://github.com/Apicad/basketball-scheduler",
    },
    {
      id: 5,
      title: "Phaser.JS Game",
      description:
        "An interactive web-based game built with the Phaser.js framework. It uses JavaScript to create animations, scenes, and logic for player interaction, focusing on fun gameplay and smooth graphics.",
      link: "https://github.com/Apicad/Phaser-Pixel-Game",
    },
    {
      id: 6,
      title: "Ticket Tracker",
      description:
        "A lightweight system to log, assign, and monitor tasks or issues. It helps manage workflow by tracking ticket status, priority, and resolution history, improving organization and accountability.",
      link: "https://github.com/Apicad/ticket-finder",
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

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4, once: true }}
        transition={{ duration: 0.5 }}
        className="project-flex"
      >
        {cardInformation.map((e) => (
          <Card
            key={e.id}
            title={e.title}
            description={e.description}
            image={e.image}
            link={e.link}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
