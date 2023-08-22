export function formatDate(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();
  
  const isToday = date.toDateString() === currentDate.toDateString();
  const isYesterday = new Date(currentDate - 86400000).toDateString() === date.toDateString(); // Subtract 24 hours
  
  if (isToday) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  }
}

export function formatTime(dateString) {
  const date = new Date(dateString);
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  return date.toLocaleTimeString(undefined, options);
}