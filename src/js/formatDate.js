export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
};

export const truncateSubject = (subject) => {
  const maxLength = 15;
  if (subject.length > maxLength) {
    return `${subject.substring(0, maxLength)}...`;
  }
  return subject;
};
