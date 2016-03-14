
export const $daysSince = (past, now) => {
  const a = now ? new Date(now) : new Date();
  const b = new Date(past);
  return Math.round((a-b)/(1000*60*60*24)) + 1;
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const $humanDate = date => {
  date = new Date(date);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const thisYear = (new Date()).getFullYear();
  if (year === thisYear)
    return day + ' ' + monthNames[monthIndex];
  else
    return day + ' ' + monthNames[monthIndex] + ', ' + year;
}

