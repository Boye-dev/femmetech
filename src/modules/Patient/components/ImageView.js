import { Box, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "../../../styles/global.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Close } from "@mui/icons-material";

// import "../../styles/carousel.css";
const ImageView = ({ images, onClick }) => {
  return (
    <>
      <Box
        className="bg"
        sx={{
          position: "fixed",
          top: 0,
          left: "0",
          width: "100vw",

          height: "100vh",
          backgroundColor: "rgba(128, 128, 128, 0.5)",
          zIndex: "500000",
        }}
      >
        <Box
          onClick={onClick}
          sx={{
            textAlign: "right",
            padding: "20px 20px 0 0",
            cursor: "pointer",
          }}
        >
          <Close sx={{ color: "blue", fontSize: "2rem" }} />
        </Box>
        <Swiper
          style={{ width: "100%", height: "auto" }}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {images?.map((image) => {
            return (
              <SwiperSlide>
                <Box
                  sx={{
                    width: "auto",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={image}
                    alt="Img"
                    height="80%"
                    style={{ objectFit: "contain", maxWidth: "70%" }}
                  />
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </>
  );
};

export default ImageView;
