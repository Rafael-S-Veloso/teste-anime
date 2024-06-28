/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SimpleSlider from "@/components/Carousel";
import PositionedMenu from "../components/sideBar/sideBar";
import rodape from "../../public/rodape.png";

function Pages() {
  const [images, setImages] = useState([]);
  const [topRatedImages, setTopRatedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async (url, setState) => {
      try {
        const response = await axios.get(url);
        const animeData = response.data.data;
        const imageUrls = animeData.map(
          (anime) => anime.attributes.posterImage.small
        );
        setState(imageUrls);
      } catch (error) {
        setError("Error fetching data from API");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages(
      "https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-average_rating",
      setImages
    );
    fetchImages(
      "https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-user_count",
      setTopRatedImages
    );
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <PositionedMenu />
      </div>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Buscar..." className={styles.input} />
      </div>

      <div className={styles.h1font}>
        <h1>
          <span className={styles.orangeText}>Anime</span>{" "}
          <span className={styles.greenText}>Mais Populares</span>
        </h1>
      </div>

      <div className={styles.populares}>
        {topRatedImages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Popular Anime ${index + 1}`}
            className={styles.image}
          />
        ))}
      </div>

      <div className={styles.carrossel}>
        <SimpleSlider />
      </div>
      <div className={styles.h2}>
        <h2>
          <span className={styles.orangeText}>Anime</span>{" "}
          <span className={styles.greenText}>Mais bem Classificados</span>
        </h2>
      </div>
      <div className={styles.classificados}>
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Top Rated Anime ${index + 1}`}
            className={styles.image}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <Image src={rodape} alt="Rodapé" />
      </div>
    </div>
  );
}

export default Pages;
