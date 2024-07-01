import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/category.module.css";
import Image from "next/image";
import rodape from "../../public/rodape.png";
import PositionedMenu from "../components/sideBar/sideBar";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://kitsu.io/api/edge/categories?page[limit]=40&sort=-total_media_count`
      );
      const categoryData = response.data.data.map((category) => ({
        id: category.id,
        name: category.attributes.title,
        description: category.attributes.description,
        totalMediaCount: category.attributes.totalMediaCount,
        imageUrl: category.attributes.image
          ? category.attributes.image.original
          : null,
      }));
      setCategories(categoryData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar os dados da API", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles["category-container"]}>
      <div className={styles.menu}>
        <PositionedMenu />
      </div>
      {loading ? (
        <p></p>
      ) : categories.length > 0 ? (
        categories.map((category, index) => (
          <div key={index} className={styles["category-item"]}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <p>Total de Mídias: {category.totalMediaCount}</p>
            {category.imageUrl && (
              <div className={styles["image-container"]}>
                <Image
                  src={category.imageUrl}
                  alt={`Imagem de ${category.name}`}
                  width={200}
                  height={300}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p></p>
      )}
      <div className={styles.footer}>
        <Image src={rodape} alt="Rodapé" />
      </div>
    </div>
  );
};

export default CategoryPage;
