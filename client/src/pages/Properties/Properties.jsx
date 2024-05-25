import "./properties.css";
import { PropertyCard, SearchBar } from "../../components";
import { useEffect, useState } from "react";
import { getAllListings, getByLocation, getByType } from "../../api/listing";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";

const Properties = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");

  const location = useLocation(); // Use the useLocation hook

  const onClickHandler = async () => {
    setLoading(true);
    const response = await getByLocation(locationQuery);

    setLoading(false);
    if (!response.success) {
      return toast.error(response.message);
    }

    setData([...response.data]);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const typeSearch = urlParams.get("type");

    const fetchData = async () => {
      setLoading(true);
      const response = await getByType(typeSearch);
      setLoading(false);
      if (!response.success) {
        return toast.error(response.message);
      }

      setData([...response.data]);
    };

    fetchData();
  }, [location.search]); // Add location.search as a dependency to useEffect

  return (
    <div className="bg-blue-tertiary">
      <div className="flexColCenter paddings innerWidth properties-container gap-8 ">
        <motion.div
          initial={{ y: -100, opacity: 0 }} // Initial position and opacity
          animate={{ y: 0, opacity: 1 }} // Target position and opacity
          transition={{ duration: 0.5 }} // Animation duration
        >
          <SearchBar
            locationQuery={locationQuery}
            setLocationQuery={setLocationQuery}
            onClickHandler={onClickHandler}
          />
        </motion.div>

        <div className="paddings properties gap-8 flex items-center flex-wrap">
          {loading ? (
            <Loading />
          ) : data.length > 0 ? (
            data?.map((card, index) => (
              <motion.div
                key={card._id}
                initial={{ opacity: 0, y: -50 }} // Initial position and opacity
                animate={{ opacity: 1, y: 0 }} // Target position and opacity
                transition={{ duration: 0.5, delay: index * 0.1 }} // Animation duration and delay
              >
                <PropertyCard listing={card} />
              </motion.div>
            ))
          ) : (
            <p className="text-xl text-black">No Properties are present</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
