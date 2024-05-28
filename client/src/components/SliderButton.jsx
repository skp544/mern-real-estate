import { useSwiper } from "swiper/react";

const SliderButton = () => {
  const swiper = useSwiper();

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => swiper.slidePrev()}
        className="bg-blue-secondary text-white px-4 py-2 rounded hover:bg-orange-600 duration-200 transition-all hover:scale-105"
      >
        &lt;
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="bg-blue-secondary text-white px-4 py-2 rounded hover:bg-orange-600  hover:scale-105"
      >
        &gt;
      </button>
    </div>
  );
};

export default SliderButton;
