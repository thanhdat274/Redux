import React from "react";
import { Carousel, Image } from "antd";

const contentStyle = {
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export const Banner = () => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <Image
              src={` http://res.cloudinary.com/thaicodejj/image/upload/v1649050933/edouk8xugmy7gdekt1mz.jpg`}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <Image
              src={` https://res.cloudinary.com/thaicodejj/image/upload/v1649126274/g0ntdzppe1vpd2ux3vzq.jpg`}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <Image
              src={` https://res.cloudinary.com/thaicodejj/image/upload/v1645522692/luntmbo4bsdyn1pvfbgs.jpg`}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <Image
              src={` https://res.cloudinary.com/thaicodejj/image/upload/v1645508907/j7plcpvm4lx88wpo3hb1.png`}
            />
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
