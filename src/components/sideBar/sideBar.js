import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

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
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        x
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "left",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "left",
          horizontal: "left",
        }}
      >
        {category.map((item) => (
          <MenuItem onClick={handleClose} key={item.attributes.title}>
            {item.attributes.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
