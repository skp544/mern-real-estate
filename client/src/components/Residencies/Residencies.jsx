import "./residencies.css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../../utils/common";

import { Error, Loader, PropertyCard } from "../";
// import useProperties from "../../hooks/useProperties";

const Residencies = () => {
  // const { data, isError, isLoading } = useProperties();

  // if (isError) {
  //   return <Error />;
  // }

  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <section className="r-wrapper bg-blue-tertiary">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className=" primaryText">Popular Residencies</span>
        </div>

        {/* <Swiper {...sliderSettings}>
          <SliderButton />
          {data?.map((card) => (
            <SwiperSlide key={card.id}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </section>
  );
};

const SliderButton = () => {
  const swiper = useSwiper();

  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};

export default Residencies;
