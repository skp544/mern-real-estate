import "./contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="c-wrapper bg-blue-tertiary">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left  */}
        <motion.div
          className="flexColStart c-left"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="orangeText">Our Contacts</span>
          <span className="primaryText">Easy to contact us</span>
          <span className="secondaryText">
            We always ready to help by providing the best services and we
            believe a good place to live can make your life better
          </span>

          <div className="flexStart contactModes">
            {/* first row */}
            <div className="flexColStart row">
              {/* mode 1 */}
              <motion.div
                className="flexColCenter mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Call</span>
                    <span className="secondaryText"> 021 123 145 14</span>
                  </div>
                </div>

                <div className="flexCenter button">Call Now</div>
              </motion.div>

              {/* mode 2 */}
              <motion.div
                className="flexColCenter mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Chat</span>
                    <span className="secondaryText"> +91 9852751539</span>
                  </div>
                </div>

                <div className="flexCenter button">Chat Now</div>
              </motion.div>
            </div>
            {/* row 2 */}

            <div className="flexColStart row">
              {/* mode 3 */}
              <motion.div
                className="flexColCenter mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Video Call </span>
                    <span className="secondaryText"> 021 123 145 14</span>
                  </div>
                </div>

                <div className="flexCenter button">Video Call Now</div>
              </motion.div>

              {/* mode 4 */}
              <motion.div
                className="flexColCenter mode"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <HiChatBubbleBottomCenter size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Message</span>
                    <span className="secondaryText"> 021 123 145 14</span>
                  </div>
                </div>

                <div className="flexCenter button">Message Now</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* right */}
        <motion.div
          className="c-right"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="image-container">
            <img src="./contact.jpg" alt="contact" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
