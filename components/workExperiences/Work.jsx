import { useEffect, useState } from "react";
import "./Work.scss";

// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useAnimate, useInView } from "framer-motion";

export const Work = () => {
  return (
    <div className="work-wrapper">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.4, once: true }}
          transition={{ duration: 0.5 }}
          className="box"
        >
          <h2>Work Experience</h2>
        </motion.div>
        <Tabs />
      </div>
    </div>
  );
};

// a tab component
const Tabs = () => {
  //Creating two useStates that will check the id of the tab
  const [selected, setSelected] = useState(1);

  const handleSetSelected = (val) => {
    //typeof will give you the value of the selected such numbers, strin, boolean, undefined, symbols, and bigint
    if (typeof selected === "number" && typeof val === "number") {
      setSelected(val);
    } else if (val === null) {
      setSelected(null);
    }
  };

  return (
    <div className="tabs-wrapper">
      <div className="tab-container">
        {TABS.map((t) => {
          return (
            <Tab
              key={t.id}
              selected={selected}
              handleSetSelected={handleSetSelected}
              tab={t.id}
              image={t.image}
              year={t.year}
            >
              {t.title}
            </Tab>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {selected && <Content selected={selected} key={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Content = ({ selected }) => {
  const tabDescription = TABS.find((t) => t.id === selected);
  const description = tabDescription.description;

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView)
      animate(
        scope.current,
        { opacity: 1, x: 0 },
        { duration: 0.8, ease: "easeInOut" }
      );
  }, [isInView, animate, scope]);

  return (
    <motion.div
      ref={scope}
      id="overlay-content"
      className="content"
      initial={{
        opacity: 1,
        x: 15,
      }}
    >
      <ul>
        {description.map((e, index) => {
          return <li key={index}>{e}</li>;
        })}
      </ul>
    </motion.div>
  );
};

const Tab = ({ children, tab, handleSetSelected, image, selected, year }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.4, once: true }}
      transition={{ duration: 0.5 }}
      id={`shift-tab-${tab}`}
      onClick={() => handleSetSelected(tab)}
      className={`tab${selected === tab ? " selected" : ""}`}
    >
      <img src={image} alt={`${children} logo`} />
      <div className="tab-information">
        {children}
        <p>{year}</p>
      </div>
    </motion.div>
  );
};

//an array with information of the tab
const TABS = [
  {
    title: "GPO MarTech Intern",
    image: `${import.meta.env.BASE_URL}icons/linkedin.png`,
    description: [
      "Built a Node.js monitoring dashboard that integrates a marketing platform through SOAP and REST APIs and persists health and status data to SQLite, used daily by leadership teams for real-time visibility.",
      "Designed AI-driven automation prototypes that generate marketing-campaign configurations and responsive email HTML from plain-language briefs, using large language model APIs (Anthropic Claude) with structured tool-use and Zod schema validation.",
      "Maintained 10 to 15 Stensul email modules on a biweekly cadence, setting up, reviewing, and pushing changes live with internal stakeholders.",
      "Automated recurring weekly data export and backfill requests in Python, building repeatable processes that supported the data science and marketing teams.",
      "Migrated 1,300+ image assets from disparate platforms into the central Adobe EDAM digital asset management system, improving consistency and retrieval.",
      "Investigated and resolved edge cases in campaign template logic, proposing code-based fixes and documenting best practices with engineers and marketers.",
    ],
    year: "Feb 2026 - Present",
  },
  {
    title: "Program Assistant",
    image: `${import.meta.env.BASE_URL}icons/CamEdu.jpeg`,
    description: [
      "Cleaned and maintained student data in Excel and Python, reconciling rosters and validating records to ensure accurate class placement.",
      "Built tracking dashboards and internal tools (Google Sheets, Figma, Trello) to streamline day-to-day program operations.",
      "Coordinated up to 4 concurrent programs and led teams of 5 to 10 using Agile boards in Trello.",
      "Taught programming and robotics to students from TK through middle school, designing lesson plans and assessing progress.",
    ],
    year: "March 2024 - Aug 2025",
  },
  {
    title: "Student Tutor",
    image: `${import.meta.env.BASE_URL}icons/foothillCollege.jpeg`,
    description: [
      "Tutored students one-on-one in programming (mainly Java and JavaScript) and mathematics.",
      "Tailored each session to the learner's style to build problem-solving confidence.",
    ],
    year: "April 2022 - June 2022",
  },
  {
    title: "Dev/Mission",
    image: `${import.meta.env.BASE_URL}icons/DevMission.jpg`,
    description: [
      "Served as Teaching Assistant for a Google-engineer-led IoT course as a Software Pre-Apprentice, guiding about 20 students per class through hands-on Particle Photon and sensor projects.",
      "Created quizzes, debugged code and circuits, and gave one-on-one coding help.",
    ],
    year: "February 2021 - Aug 2021",
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
