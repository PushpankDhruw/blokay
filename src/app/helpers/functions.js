export const money = (n) => {
  let Currency = {
    decimals: 0,
    prefix: "$",
    suffix: "",
    thousands: ",",
  };

  let c = Currency.decimals,
    d = Currency.decimal,
    t = Currency.thousands,
    s = n < 0 ? "-" : "",
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    j = i.length;

  j = j > 3 ? j % 3 : 0;
  let formattedVal =
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) +
    (c
      ? d +
        Math.abs(n - parseInt(i))
          .toFixed(c)
          .slice(2)
      : "");

  return Currency.prefix + formattedVal + Currency.suffix;
};
