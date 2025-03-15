"use client";

import { useCart } from "@/context/CartContext";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.scss";
import { formatMoney } from "@/utils";

export default function Header() {
  const { cartItems, getCartCount, getTotalPrice, removeFromCart } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const categories = [{ name: "Электроника", path: "/" }];

  return (
    <>
      <AppBar position="sticky" className={styles.header} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters className={styles.toolbar}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                className={styles.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Link href="/" className={styles.logoLink}>
              <Typography variant="h5" component="div" className={styles.logo}>
                E-Shop
              </Typography>
            </Link>

            {!isMobile && (
              <Box className={styles.categories}>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.path}
                    className={styles.categoryLink}
                  >
                    <Typography variant="body2">{category.name}</Typography>
                  </Link>
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Box className={styles.actions}>
              <Tooltip title="Search">
                <IconButton color="inherit" className={styles.actionIcon}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Account">
                <IconButton
                  color="inherit"
                  className={styles.actionIcon}
                  onClick={handleProfileClick}
                >
                  <PersonOutlineIcon />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleProfileClose}
                onClick={handleProfileClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>My Account</MenuItem>
                <MenuItem>My Orders</MenuItem>
                <Divider />
                <MenuItem>Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>

              <Box className={styles.cartContainer}>
                <Tooltip title="Cart">
                  <IconButton
                    color="inherit"
                    onClick={toggleCart}
                    className={styles.actionIcon}
                  >
                    <Badge badgeContent={getCartCount()} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                {cartItems.length > 0 && (
                  <Typography variant="body2" className={styles.cartTotal}>
                    {getTotalPrice()}
                  </Typography>
                )}
              </Box>
            </Box>
          </Toolbar>

          {!isMobile && (
            <Box className={styles.subHeader}>
              <Typography variant="subtitle2">
                Бесплатная доставка при заказе от {formatMoney(500)}
              </Typography>
            </Box>
          )}
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        classes={{ paper: styles.drawerPaper }}
      >
        <Box className={styles.drawerHeader}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {categories.map((category) => (
            <ListItemButton
              key={category.name}
              component={Link}
              href={category.path}
              onClick={toggleDrawer}
            >
              <ListItemText primary={category.name} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemText primary="My Account" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="My Orders" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={toggleCart}
        classes={{ paper: styles.cartDrawer }}
      >
        <Box className={styles.drawerHeader}>
          <Typography variant="h6">Ваша корзина</Typography>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {cartItems.length === 0 ? (
          <Box className={styles.emptyCart}>
            <Typography variant="body1" color="textSecondary">
              Ваша корзина пуста
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleCart}
              className={styles.continueShopping}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <>
            <List className={styles.cartItemsList}>
              {cartItems.map((item) => (
                <ListItem key={item.id} className={styles.cartItem}>
                  <Box className={styles.cartItemImage}>
                    <Avatar>{item.brand.charAt(0)}</Avatar>
                  </Box>
                  <Box className={styles.cartItemInfo}>
                    <Typography variant="body1" className={styles.cartItemName}>
                      {item.name}
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="textSecondary">
                        {item.quantity} × {formatMoney(item.price)}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {formatMoney(item.quantity * item.price)}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeItem}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>

            <Box className={styles.cartFooter}>
              <Box className={styles.cartTotal}>
                <Typography variant="body1">Total</Typography>
                <Typography variant="h6">{getTotalPrice()}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={styles.checkoutButton}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Drawer>
    </>
  );
}
