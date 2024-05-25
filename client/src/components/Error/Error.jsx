import { useNavigate } from "react-router-dom";
import "./error.css";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="p-wrapper">
      <p className="p-container">Error while fetching data ❌</p>
      <button className="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default Error;
