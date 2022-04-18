export const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} hod`;
  } else if (!totalMinutes) {
    return 'Neuvedené';
  }
  return `${hours} hod ${minutes} min`;
};



