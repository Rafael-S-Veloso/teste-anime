/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import SimpleSlider from "@/components/Carousel";

function Pages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-average_rating"
        );
        const animeData = response.data.data;

        const imageUrls = animeData.map(
          (anime) => anime.attributes.posterImage.small
        );
        setImages(imageUrls);
      } catch (error) {
        console.error("Erro ao buscar os dados da API", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <input type="text" placeholder="Buscar..." className={styles.input} />
      </div>
      <div className={styles.imagesContainer}>
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Anime ${index}`}
            className={styles.image}
          />
        ))}
      </div>
      <div className={styles.carossel}>
        <SimpleSlider />
      </div>
    </div>
  );
}

export default Pages;
