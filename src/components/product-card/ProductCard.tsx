"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Skeleton,
  Fade,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import styles from "./ProductCard.module.scss";
import { formatMoney } from "@/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, incrementQuantity, decrementQuantity, cartItems } =
    useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const isInCart = Boolean(cartItem);

  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <Card className={styles.card}>
        <CardContent>
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="40%" height={32} sx={{ mt: 2 }} />
          <Skeleton variant="rectangular" height={36} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Fade in={!isLoading} timeout={500}>
      <Card className={styles.card}>
        <div className={styles.imageContainer}>
          <div
            className={styles.imagePlaceholder}
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          />

          <IconButton
            className={styles.favoriteButton}
            onClick={toggleFavorite}
            color={isFavorite ? "secondary" : "default"}
            size="small"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          {product.isNew && (
            <Chip
              label="New"
              color="primary"
              size="small"
              className={styles.newBadge}
            />
          )}
        </div>

        <CardContent className={styles.content}>
          <Link href={`/products/${product.id}`} className={styles.productLink}>
            <Typography variant="h6" component="div" className={styles.name}>
              {product.name}
            </Typography>
          </Link>

          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.brand}
          >
            {product.brand}
          </Typography>

          <Typography variant="h6" component="div" className={styles.price}>
            {formatMoney(product.price)}
          </Typography>

          {!isInCart ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => addToCart(product)}
              className={styles.addButton}
            >
              Добавить
            </Button>
          ) : (
            <Box className={styles.quantityControls}>
              <IconButton
                onClick={() => decrementQuantity(product.id)}
                size="small"
                color="primary"
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" className={styles.quantity}>
                {cartItem?.quantity || 0}
              </Typography>
              <IconButton
                onClick={() => incrementQuantity(product.id)}
                size="small"
                color="primary"
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </Card>
    </Fade>
  );
}
