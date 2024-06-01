import { useParams } from "react-router-dom";
import "./property.css";
import { Map } from "../../components";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getListing } from "../../api/listing";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ContactUser from "../../components/ContactUser";

const Property = () => {
  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);

      const res = await getListing(id);

      if (!res.success) {
        return toast.error(res.message);
      }
      setData(res?.listing);
      setLoading(false);
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}

      {data && !loading && (
        <div>
          <motion.div
            initial={{ y: -100, opacity: 0 }} // Initial position and opacity
            animate={{ y: 0, opacity: 1 }} // Target position and opacity
            transition={{ duration: 0.5 }} // Animation duration
          >
            <Swiper navigation>
              {data?.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className=" flex justify-between w-[80%] mx-auto">
            <motion.div
              initial={{ x: -100, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Target position and opacity
              transition={{ duration: 0.5 }} // Animation duration
              className="flex flex-col max-w-4xl auto p-3 my-7 gap-4 w-[50%]"
            >
              <p className="text-2xl font-semibold">
                {data.name} - ₹{" "}
                {data.offer
                  ? data.discountPrice.toLocaleString("en-IN")
                  : data.regularPrice.toLocaleString("en-IN")}
                {data.type === "rent" && " / month"}
              </p>

              <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {data.address}
              </p>

              <div className=" flex gap-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {data.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {data.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    ₹{+data.regularPrice - +data.discountPrice} OFF
                  </p>
                )}
              </div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {data.description}
              </p>

              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg" />
                  {data.bedrooms > 1
                    ? `${data.bedrooms} beds `
                    : `${data.bedrooms} bed `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg" />
                  {data.bathrooms > 1
                    ? `${data.bathrooms} baths `
                    : `${data.bathrooms} bath `}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {data.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {data.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>

              {currentUser &&
                data.userRef !== (currentUser.id || currentUser._id) &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                  >
                    Contact Agent
                  </button>
                )}
              {contact && <ContactUser listing={data} />}
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }} // Initial position and opacity
              animate={{ x: 0, opacity: 1 }} // Target position and opacity
              transition={{ duration: 0.5 }} // Animation duration
              className="w-[50%] flex items-center justify-center"
            >
              <div className="map w-[90%]">
                <Map address={data?.address} />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Property;
