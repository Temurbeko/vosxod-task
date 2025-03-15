export const formatMoney = (
  amount: number,
  currency: string = "RUB",
  locale: string = "ru-RU"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
