export function getCategoryData(dataSource: Record<string, any>[]) {
  const categoryMap: Record<string, number> = {};

  dataSource.forEach(({ category, amount }) => {
    if (!category || !amount) return;
    categoryMap[category] = (categoryMap[category] || 0) + Number(amount);
  });

  const colors = [
    "#E38627",
    "#C13C37",
    "#6A2135",
    "#8A2BE2",
    "#FF4500",
    "#2E8B57",
    "#FF69B4",
    "#1E90FF",
  ];

  return Object.entries(categoryMap).map(([title, value], index) => ({
    title,
    value,
    color: colors[index % colors.length],
  }));
}
