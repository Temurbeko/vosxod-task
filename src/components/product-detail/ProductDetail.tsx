"use client";

import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import styles from "./ProductDetail.module.scss";
import { formatMoney } from "@/utils";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, incrementQuantity, decrementQuantity, cartItems } =
    useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const isInCart = Boolean(cartItem);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Link href="/" className={styles.backLink}>
        <Button startIcon={<ArrowBackIcon />} variant="text">
          Назад к товарам
        </Button>
      </Link>

      <Paper elevation={2} className={styles.paper}>
        {product.imageUrl && (
          <Box
            className={styles.productImage}
            style={{ backgroundImage: `url(${product.imageUrl})` }}
          />
        )}

        <Box className={styles.content}>
          <Box className={styles.productInfo}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h4" component="h1" className={styles.title}>
                {product.name}
              </Typography>
              {product.isNew && (
                <Chip label="New" color="primary" size="small" />
              )}
            </Box>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {product.brand}
            </Typography>

            <Typography variant="h5" className={styles.price}>
              {formatMoney(product.price)}  
            </Typography>

            <Typography variant="body1" className={styles.description}>
              {product.description}
            </Typography>
          </Box>

          <Box className={styles.actions}>
            {!isInCart ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={() => addToCart(product)}
              >
                Добавить
              </Button>
            ) : (
              <Box className={styles.quantityControl}>
                <Typography variant="body1" gutterBottom>
                  В вашей корзине:
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton
                    onClick={() => decrementQuantity(product.id)}
                    color="primary"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h5">
                    {cartItem?.quantity || 0}
                  </Typography>
                  <IconButton
                    onClick={() => incrementQuantity(product.id)}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
