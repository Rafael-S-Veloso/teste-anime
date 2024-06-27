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
      <PositionedMenu />
      <div className={styles.inputContainer}>
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
      <div className={styles.carousel}>
        <SimpleSlider />
      </div>
      <div className={styles.footer}>
        <Image src={rodape} alt="Rodapé" />
      </div>
    </div>
  );
}

export default Pages;
