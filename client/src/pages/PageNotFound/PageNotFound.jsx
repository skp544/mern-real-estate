import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="p-wrapper flex w-full min-h-screen justify-center items-center flex-col">
      <p className="p-container mb-4">Page does not exists. 🙄</p>
      <button className="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
