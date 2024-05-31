import React, { useEffect, useState } from "react";
import { getUserListings } from "../api/auth";
import { useSelector } from "react-redux";

import Loading from "../components/Loading";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PropertyCard } from "../components";

const ShowUserProperty = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userListing, setUserListing] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleShowListings = async () => {
    setLoading(true);
    const res = await getUserListings(currentUser._id || currentUser.id);

    setLoading(false);

    if (!res.success) {
      return toast.error(res.message);
    }

    if (res.listings === 0 || res.listings === undefined) {
      return toast.error("You have no properties");
    }

    setUserListing([...res.listings]);
  };

  useEffect(() => {
    handleShowListings();
  }, [currentUser]);

  return (
    <div className="bg-blue-tertiary">
      <div className="flexColCenter paddings innerWidth properties-container gap-8 ">
        <div className="paddings properties gap-8 flex items-center flex-wrap">
          {loading ? (
            <Loading />
          ) : userListing.length > 0 ? (
            userListing?.map((card, index) => (
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
            <>
              <p className="text-xl text-black">No Properties are present</p>
              <button
                onClick={() => navigate("/create-property")}
                className="bg-blue-secondary w-full mt-4 border  text-center rounded-full px-6 py-2  transition-all duration-200 text-white hover:scale-105"
              >
                Create Property
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowUserProperty;
