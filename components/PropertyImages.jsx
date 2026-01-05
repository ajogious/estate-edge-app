"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PropertyImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {/* 📱 MOBILE — SWIPE */}
        <div className="block md:hidden">
          <Swiper spaceBetween={12} slidesPerView={1}>
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Property image ${index + 1}`}
                  width={1800}
                  height={400}
                  className="h-[300px] w-full object-cover rounded-xl cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 💻 DESKTOP — GRID */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                images.length === 3 && index === 2
                  ? "md:col-span-2"
                  : "col-span-1"
              }`}
            >
              <Image
                src={image}
                alt={`Property image ${index + 1}`}
                width={1800}
                height={400}
                className="h-[400px] w-full object-cover rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🔍 ZOOM MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Zoomed property"
            width={2000}
            height={1200}
            className="max-h-[90vh] w-auto rounded-xl"
          />
        </div>
      )}
    </section>
  );
};

export default PropertyImages;
