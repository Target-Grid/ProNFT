import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../App.css";
import frontpage from './front-page.jpg'

import { Autoplay, Pagination, Navigation } from "swiper";

const Home = () => {


  return (
    <>
      {/* <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src="https://th.bing.com/th/id/OIP.iBQO6jZ4QRjQ1Qq73pfFYQHaE8?w=282&h=188&c=7&r=0&o=5&pid=1.7" className="swiperimg"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://th.bing.com/th/id/OIP.iBQO6jZ4QRjQ1Qq73pfFYQHaE8?w=282&h=188&c=7&r=0&o=5&pid=1.7" className="swiperimg"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://th.bing.com/th/id/OIP.iBQO6jZ4QRjQ1Qq73pfFYQHaE8?w=282&h=188&c=7&r=0&o=5&pid=1.7" className="swiperimg"/>
        </SwiperSlide>

      </Swiper> */}
      <h3 className="homeh3">Blockchain - Based eCommerce product verification and warranty management system</h3>
      <img src={frontpage} alt="home-img" width="100%" height="50%"></img>
      {/* <div className="homegrid">
        <div className="item1"><button>Customer</button></div>
        <div className="item2"><button>Company</button></div>
        <div className="item3"><button>Admin</button></div>
      </div> */}
    </>
  );
}


export default Home