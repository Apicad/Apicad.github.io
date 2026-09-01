import "./AboutMe.scss";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Overview = () => {
  return (
    <div className="Overview-container">
      <div className="profile-container">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.4, once: true }}
          transition={{ duration: 0.5 }}
          className="box circle"
        >
          <div className="circle-inner">
            <img
              className="profile"
              src={`${import.meta.env.BASE_URL}profile.png`}
              alt="Profile"
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4, once: true }}
        transition={{ duration: 0.5 }}
        className="box bullet-points"
      >
        <ul>
          <li>
            🚀 Passionate about technology with a strong curiosity to learn,
            explore new tools, and stay up to date with innovations in software
            development and data.
          </li>
          <li>
            🎓 Strong foundation in computer science and programming, including
            algorithms and computational thinking, which supports both software
            and data-focused work.
          </li>
          <li>
            👨‍🏫 Hands-on experience as a Tech Educator teaching programming,
            robotics, and creative problem-solving to students from kindergarten
            through middle school, often leading large groups and creating
            engaging, project-based lessons.
          </li>
          <li>
            💡 Skilled at breaking down complex technical concepts into clear,
            simple explanations, adapting my teaching style to different
            learning needs, and creating supportive, collaborative learning
            environments for students and peers.
          </li>
          <li>
            ⚡ Comfortable working in fast-paced, changing environments where I
            need to stay organized, communicate clearly, and manage multiple
            responsibilities at once.
          </li>
          <li>
            🎯 Brings creativity, adaptability, and persistence to every project
            and professional opportunity, always looking for ways to improve,
            learn new skills, and add value to the team.
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

const AboutMe = () => {
  //initial trasition we want the box to have an opacity of 0.
  // as you scroll to the part of the website we want the opacity to be off
  // the animation should be our boxes coming from different sides.
  // one box should come from the left and the right
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4, once: true }}
        transition={{ duration: 0.5 }}
        className="box"
      >
        <h2>About Me</h2>
      </motion.div>
      <Overview />
    </div>
  );
};

export default AboutMe;
