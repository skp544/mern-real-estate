import { motion } from "framer-motion";
import "./getStarted.css";

const GetStarted = () => {
  return (
    <section className="g-wrapper bg-blue-tertiary">
      <div className="paddings innerWidth g-container">
        <motion.div
          className="flexColCenter inner-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <span className="primaryText"> Get Started</span>
          <span className="secondaryText">
            Subscribe and find super attractive price quotes from us.
            <br /> Find your residence soon
          </span>

          <button className="button">
            <a href="mailto:iamskp2001@gmail.com">Get Started</a>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted;
