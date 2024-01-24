export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const formatDate = (dateString) => {
  let date = new Date(dateString);
  let formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return formattedDate;
};
