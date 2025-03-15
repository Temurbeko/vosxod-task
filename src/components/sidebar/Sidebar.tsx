"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  FormControlLabel,
  Switch,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Chip,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { FilterState } from "@/types";
import styles from "./Sidebar.module.scss";
import { formatMoney } from "@/utils";

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  minAvailablePrice: number;
  maxAvailablePrice: number;
  productCount: number;
  totalProductCount: number;
}

export default function Sidebar({
  filters,
  onFilterChange,
  minAvailablePrice,
  maxAvailablePrice,
  productCount,
  totalProductCount,
}: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | false>("pricePanel");

  const isFiltered =
    filters.minPrice > minAvailablePrice ||
    filters.maxPrice < maxAvailablePrice ||
    filters.onlyNew;

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleNewProductsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({ ...filters, onlyNew: event.target.checked });
  };

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const resetFilters = () => {
    onFilterChange({
      minPrice: minAvailablePrice,
      maxPrice: maxAvailablePrice,
      onlyNew: false,
    });
  };

  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  const filterContent = (
    <>
      <Box className={styles.filterHeader}>
        <Box display="flex" alignItems="center">
          <FilterAltIcon className={styles.filterIcon} />
          <Typography variant="h6" component="h2">
            Фильтры
          </Typography>
        </Box>

        {isMobile && (
          <IconButton
            onClick={toggleMobileFilter}
            size="small"
            className={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {isFiltered && (
        <Box className={styles.activeFiltersContainer}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="body2" color="text.secondary">
              Активные фильтры:
            </Typography>
            <Button
              size="small"
              startIcon={<RestartAltIcon />}
              onClick={resetFilters}
              className={styles.resetButton}
            >
              Сбросить всё
            </Button>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={1}>
            {filters.minPrice > minAvailablePrice && (
              <Chip
                label={`Min:  ${formatMoney(filters.minPrice)}`}
                onDelete={() =>
                  onFilterChange({ ...filters, minPrice: minAvailablePrice })
                }
                size="small"
                className={styles.filterChip}
              />
            )}

            {filters.maxPrice < maxAvailablePrice && (
              <Chip
                label={`Max:  ${formatMoney(filters.maxPrice)}`}
                onDelete={() =>
                  onFilterChange({ ...filters, maxPrice: maxAvailablePrice })
                }
                size="small"
                className={styles.filterChip}
              />
            )}

            {filters.onlyNew && (
              <Chip
                label="New items only"
                onDelete={() => onFilterChange({ ...filters, onlyNew: false })}
                size="small"
                className={styles.filterChip}
              />
            )}
          </Box>
        </Box>
      )}

      <Box className={styles.resultCount}>
        <Typography variant="body2" color="text.secondary">
          Showing <strong>{productCount}</strong> of {totalProductCount}{" "}
          products
        </Typography>
      </Box>

      <Divider className={styles.divider} />

      <Accordion
        expanded={expanded === "pricePanel"}
        onChange={handleAccordionChange("pricePanel")}
        elevation={0}
        className={styles.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="price-panel-content"
          id="price-panel-header"
          className={styles.accordionSummary}
        >
          <Typography variant="subtitle1">Диапазон цен</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails}>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={minAvailablePrice}
            max={maxAvailablePrice}
            step={0.01}
            className={styles.priceSlider}
          />
          <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
            <Typography variant="body2" className={styles.priceLabel}>
               {formatMoney(filters.minPrice)}
            </Typography>
            <Typography variant="body2" className={styles.priceLabel}>
               {formatMoney(filters.maxPrice)}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider className={styles.divider} />

      <Accordion
        expanded={expanded === "availabilityPanel"}
        onChange={handleAccordionChange("availabilityPanel")}
        elevation={0}
        className={styles.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="availability-panel-content"
          id="availability-panel-header"
          className={styles.accordionSummary}
        >
          <Typography variant="subtitle1">Наличие</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails}>
          <FormControlLabel
            control={
              <Switch
                checked={filters.onlyNew}
                onChange={handleNewProductsChange}
                color="primary"
                className={styles.switch}
              />
            }
            label="Только новинки"
            className={styles.switchLabel}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );

  return (
    <>
      {isMobile && (
        <Box className={styles.mobileFilterToggle}>
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={toggleMobileFilter}
            className={styles.filterButton}
            size="small"
          >
            Filter ({isFiltered ? "Active" : "None"})
          </Button>
        </Box>
      )}

      {!isMobile && (
        <Paper className={styles.sidebar} elevation={1}>
          {filterContent}
        </Paper>
      )}

      {isMobile && (
        <Collapse
          in={mobileFilterOpen}
          className={styles.mobileFilterContainer}
        >
          <Paper className={styles.mobileSidebar} elevation={2}>
            {filterContent}

            <Box className={styles.mobileActions}>
              <Button
                variant="outlined"
                fullWidth
                onClick={toggleMobileFilter}
                className={styles.closeFilterButton}
              >
                Close
              </Button>

              {isFiltered && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={resetFilters}
                  className={styles.applyButton}
                >
                  Reset Filters
                </Button>
              )}
            </Box>
          </Paper>
        </Collapse>
      )}
    </>
  );
}
