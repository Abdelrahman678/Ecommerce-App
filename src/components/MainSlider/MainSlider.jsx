import React, { useState, useEffect } from "react";
import Styles from "./MainSlider.module.css";
import Slider from "react-slick";
import sliderImg1 from "../../assets/images/slider-image-3.jpeg";
import sliderImg2 from "../../assets/images/slider-image-2.jpeg";
import sliderImg3 from "../../assets/images/slider-image-1.jpeg";




export default function MainSlider() {

   // slick carousal
   var settings = {
    dots: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const [data, setData] = useState([]);
  useEffect(() => {}, []);

  return (
    <>
      <div className="flex flex-wrap p-4 lg:py-6 lg:w-2/3 lg:mx-auto md:mt-16 xl:mt-0 mb-10">
        <div className="w-3/4 ps-3">
          <Slider {...settings}>
            <div>
              <img src={sliderImg1} className="w-full h-[400px] lg:h-[600px]" alt="" />{" "}
            </div>
            <div>
              <img src={sliderImg2} className="w-full h-[400px] lg:h-[600px]" alt="" />
            </div>
            <div>
              <img src={sliderImg3} className="w-full h-[400px] lg:h-[600px]" alt="" />
            </div>
          </Slider>
        </div>

        <div className="w-1/4 pe-3">
        <div>
              <img src={sliderImg2} className="w-full h-[200px] lg:h-[300px]" alt="" />
            </div>
            <div>
              <img src={sliderImg3} className="w-full h-[200px] lg:h-[300px]" alt="" />
            </div>
        </div>
      </div>
    </>
  );
}
