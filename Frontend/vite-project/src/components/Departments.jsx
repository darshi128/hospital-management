import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import './Department.css'

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics",       imageUrl: "/departments/pedia.jpg" },
    { name: "Orthopedics",      imageUrl: "/departments/ortho.jpg" },
    { name: "Cardiology",       imageUrl: "/departments/cardio.jpg" },
    { name: "Neurology",        imageUrl: "/departments/neuro.jpg" },
    { name: "Oncology",         imageUrl: "/departments/onco.jpg" },
    { name: "Radiology",        imageUrl: "/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
    { name: "Dermatology",      imageUrl: "/departments/derma.jpg" },
    { name: "ENT",              imageUrl: "/departments/ent.jpg" },
  ];

  return (
    <div className="container departments">
      <h2>Departments</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          0:    { slidesPerView: 1 },
          700:  { slidesPerView: 2 },
          1005: { slidesPerView: 3 },
          1324: { slidesPerView: 4 },
        }}
      >
        {departmentsArray.map((depart, index) => (
          <SwiperSlide key={index}>
            <div className="card">
              <div className="depart-name">{depart.name}</div>
              <img src={depart.imageUrl} alt={depart.name} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Departments;