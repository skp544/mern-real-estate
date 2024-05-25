import "./contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

const Contact = () => {
  return (
    <section className="c-wrapper bg-blue-tertiary">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left  */}
        <div className="flexColStart c-left">
          <span className="orangeText">Our Contacts</span>
          <span className="primaryText">Easy to contact us</span>
          <span className="secondaryText">
            We always ready to help by providing the best services and we
            believe a good place to live a can make your life better
          </span>

          <div className="flexStart contactModes">
            {/* first row */}
            <div className="flexColStart row">
              {/* mode 1 */}
              <div className="flexColCenter mode">
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
              </div>

              {/* mode 2 */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Chat</span>
                    <span className="secondaryText"> 021 123 145 14</span>
                  </div>
                </div>

                <div className="flexCenter button">Chat Now</div>
              </div>
            </div>
            {/* row 2 */}

            <div className="flexColStart row">
              {/* mode 3 */}
              <div className="flexColCenter mode">
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
              </div>

              {/* mode 4 */}
              <div className="flexColCenter mode">
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
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="c-right">
          <div className="image-container">
            <img src="./contact.jpg" alt="contact" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
