import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../../utils/common";
import { getAllListings } from "../../api/listing";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import SliderButton from "../SliderButton";
import { motion } from "framer-motion";

const Residencies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getAllListings();

      if (!response.success) {
        throw new Error("Internal Server Error");
      }

      setData([...response?.listings]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="bg-blue-tertiary p-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-orange-500 font-bold text-lg">
            Best Choices
          </span>
          <h2 className="text-2xl font-bold">Popular Residencies</h2>
        </motion.div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <Swiper {...sliderSettings}>
            {data.length > 4 && <SliderButton />}

            {data.map((card, index) => (
              <SwiperSlide key={card._id}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <PropertyCard listing={card} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Residencies;
