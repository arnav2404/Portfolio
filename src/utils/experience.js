export function getFriendlyExperience(startDate, currentDate = new Date()) {
  const start = new Date(startDate);
  const now = new Date(currentDate);

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (now.getDate() < start.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years <= 0) {
    if (months <= 0) return "Less than 1 mo";
    return `${months} ${months === 1 ? "mo" : "mos"}`;
  }

  if (months > 6) {
    return `Approx ${years + 1} yrs`;
  }

  if (months === 0) {
    return `${years} ${years === 1 ? "yr" : "yrs"}`;
  }

  return `${years} ${years === 1 ? "yr" : "yrs"} ${months} ${months === 1 ? "mo" : "mos"}`;
}