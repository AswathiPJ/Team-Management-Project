export const getTimeRemaining = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);

  const seconds = Math.floor((due - now) / 1000);

  if (seconds <= 0) {
    return "Overdue!";
  }

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    return `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
  }
};
