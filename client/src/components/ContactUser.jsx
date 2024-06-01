import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getUser } from "../api/auth";

const ContactUser = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const handleSendMessageClick = () => {
    const emailSubject = encodeURIComponent(`Regarding ${listing.name}`);
    const emailBody = encodeURIComponent(message);
    const mailtoLink = `mailto:iamskp2001@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoLink;
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      const res = await getUser(listing.userRef);

      if (!res.success) {
        return toast.error(res.message);
      }

      setLandlord(res.user);
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg resize-none"
          />

          <Link
            to={`mailto:iamskp2001@gmail.com?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            onClick={handleSendMessageClick}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default ContactUser;
