import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import styles from "../../styles/sideBar.module.css";

export default function PositionedMenu(...props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://kitsu.io/api/edge/categories?page%5Blimit%5D=40&sort=-total_media_count"
      );
      const animeData = response.data.data;
      setCategory(animeData);
    } catch (error) {
      console.error("Erro ao buscar os dados da API", error);
    }
  };

  useEffect(() => {
    fetchImages();
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
          vertical: "left",
        }}
        transformOrigin={{
          vertical: "top",
          vertical: "left",
        }}
      >
        {category.map((item) => (
          <MenuItem
            className={styles["positioned-menu-item"]}
            onClick={handleClose}
            key={item.attributes.title}
          >
            {item.attributes.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
