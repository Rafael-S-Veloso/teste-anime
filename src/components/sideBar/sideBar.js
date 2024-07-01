import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/sideBar.module.css";

export default function PositionedMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState([]);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (categoryId) => {
    handleClose();
    router.push(`/category?id=${categoryId}`);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://kitsu.io/api/edge/categories?page%5Blimit%5D=40&sort=-total_media_count"
      );
      const categoryData = response.data.data;
      setCategories(categoryData);
    } catch (error) {
      console.error("Erro ao buscar os dados da API", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles["styles-menu"]}>
      <IconButton
        className={styles["positioned-menu-button"]}
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        className={styles["positioned-menu"]}
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {categories.map((category) => (
          <MenuItem
            className={styles["positioned-menu-item"]}
            onClick={() => handleCategoryClick(category.id)}
            key={category.id}
          >
            {category.attributes.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
