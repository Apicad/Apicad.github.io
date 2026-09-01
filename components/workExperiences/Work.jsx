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
    year: "Feb 2026 - Aug 2026",
  },
  {
    title: "Program Assistant",
    image: `${import.meta.env.BASE_URL}icons/CamEdu.jpeg`,
    description: [
      "Designed and taught engaging coding lessons using tools like Scratch, HTML/CSS, JavaScript, robotics, and IoT, adjusting difficulty based on grade level and student experience.",
      "Planned interactive, hands-on projects (games, animations, simple websites, and robotics challenges) to help students connect abstract programming concepts to real-world applications.",
      "Supported large groups of TK–8 students by creating clear routines, managing transitions, and building structured activities that kept students focused, safe, and engaged.",
      "Differentiated instruction by offering step-by-step guidance, visual aids, and extra support or extensions so that both beginner and advanced students could make progress.",
      "Collaborated with staff to coordinate daily schedules, align lessons with program goals, and troubleshoot classroom or technology issues in real time.",
      "Contributed to program improvements by sharing feedback from students, suggesting new activities or tools, and helping refine lesson plans to better match student needs and interests.",
    ],
    year: "March 2024 - Aug 2025",
  },
  {
    title: "Tutor Teacher",
    image: `${import.meta.env.BASE_URL}icons/foothillCollege.jpeg`,
    description: [
      "Tutored students in software design, programming, and core math concepts, supporting them through homework, labs, and project work.",
      "Broke down difficult coding and algorithm topics into clear, step-by-step explanations that matched each student's skill level.",
      "Guided students in building real projects such as iOS applications, helping them move from idea to working prototype while understanding the 'why' behind each step.",
      "Strengthened skills in patience, time management, and one-on-one teaching strategies to keep students engaged, on track, and confident in their learning.",
    ],
    year: "April 2022 - June 2022",
  },
  {
    title: "Dev/Mission",
    image: `${import.meta.env.BASE_URL}icons/DevMission.jpg`,
    description: [
      "Tutored students in software design, programming, and math concepts, supporting them with homework, projects, and exam preparation.",
      "Simplified difficult coding and algorithm topics into clear, step-by-step explanations that matched each student's learning pace and style.",
      "Guided students in building practical projects such as iOS applications, helping them move from idea to implementation while understanding key programming principles.",
      "Developed strong patience, time management, and effective teaching strategies to keep students engaged, build their confidence, and help them reach their academic goals.",
    ],
    year: "February 2021 - May 2021",
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
