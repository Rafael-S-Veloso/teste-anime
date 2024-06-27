import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Carousel {...settings}>
      <div className="card">
        <Image src="/banner1.png" alt="banner" width={1208} height={200} />
      </div>
      <div className="card">
        <Image src="/banner2.png" alt="" width={1208} height={200} />
      </div>
      <div className="card">
        <Image src="/banner3.png" alt="" width={1208} height={200} />
      </div>
    </Carousel>
  );
}
