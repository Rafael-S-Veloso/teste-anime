import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        <image src="/public/banner1.png" alt="banner" />
      </div>
      <div className="card">
        <image src="/public/banner2.png" alt="" />
      </div>
      <div className="card">
        <image src="/public/banner3.png" alt="" />
      </div>
    </Carousel>
  );
}
