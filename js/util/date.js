
export const $daysSince = (past, now) => {
  const b = now ? new Date(now) : new Date();
  const a = new Date(past);
  return Math.round((b-a)/(1000*60*60*24)) + 1;
};

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

export const $humanDateDay = date => {
  date = new Date(date);
  return dayNames[date.getDay()] + ', ' + $humanDate(date);
}

export const $dateList = (begin, end) => {
  begin = +(new Date(begin));
  end = +(new Date(end));
  const inc = 60*60*24*1000;
  const result = [];
  while (begin < end) {
    result.push({human: $humanDate(begin), date: new Date(begin)});
    begin += inc;
  }
  return result;
}
