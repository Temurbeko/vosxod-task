"use client";

import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import ProductCard from "../product-card/ProductCard";
import Sidebar from "../sidebar/Sidebar";
import { Product, SortField, SortOrder, FilterState } from "@/types";
import styles from "./ProductList.module.scss";

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const minPrice = Math.min(...initialProducts.map((p) => p.price));
  const maxPrice = Math.max(...initialProducts.map((p) => p.price));

  const [filters, setFilters] = useState<FilterState>({
    minPrice: minPrice,
    maxPrice: maxPrice,
    onlyNew: false,
  });

  useEffect(() => {
    let filteredProducts = initialProducts.filter((product) => {
      if (
        product.price < filters.minPrice ||
        product.price > filters.maxPrice
      ) {
        return false;
      }

      if (filters.onlyNew && !product.isNew) {
        return false;
      }

      return true;
    });

    filteredProducts = [...filteredProducts].sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
    });

    setProducts(filteredProducts);
  }, [initialProducts, sortField, sortOrder, filters]);

  const handleSortFieldChange = (event: SelectChangeEvent) => {
    setSortField(event.target.value as SortField);
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as SortOrder);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <Grid
      container
      spacing={3}
      marginTop={1}
      marginBottom={6}
      className={styles.container}
    >
      <Grid item xs={12} md={3}>
        <Sidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          minAvailablePrice={minPrice}
          maxAvailablePrice={maxPrice}
          productCount={products.length}
          totalProductCount={products.length}
        />
      </Grid>

      <Grid item xs={12} md={9}>
        <Box className={styles.sortControls}>
          <FormControl
            variant="outlined"
            size="small"
            className={styles.sortControl}
          >
            <InputLabel>Сортировать по</InputLabel>
            <Select
              value={sortField}
              onChange={handleSortFieldChange}
              label="Сортировать по"
            >
              <MenuItem value="name">Название</MenuItem>
              <MenuItem value="price">Цена</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            variant="outlined"
            size="small"
            className={styles.sortControl}
          >
            <InputLabel>Порядок</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Order"
            >
              <MenuItem value="asc"> По возрастанию (А-Я)</MenuItem>
              <MenuItem value="desc">По убыванию (Я-А)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box textAlign="center" py={5}>
                No products match your filters.
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
