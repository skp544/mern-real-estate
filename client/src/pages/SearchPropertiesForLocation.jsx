import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { PropertyCard } from "../components";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { getByLocation } from "../api/listing";

const SearchPropertiesForLocation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const locationSearch = urlParams.get("location");

    const fetchData = async () => {
      setLoading(true);
      const response = await getByLocation(locationSearch);
      setLoading(false);
      if (!response.success) {
        return toast.error(response.message);
      }

      setData([...response.data]);
    };

    fetchData();
  }, [location.search]);

  return (
    <div>
      <div className="flexColCenter paddings innerWidth properties-container gap-8">
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

export default SearchPropertiesForLocation;
