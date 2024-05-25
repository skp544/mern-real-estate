import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="p-wrapper">
      <p className="p-container">Page does not exists. 🙄</p>
      <button className="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
