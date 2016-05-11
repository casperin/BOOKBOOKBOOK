const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const human = d => {
  if (!d) return '';
  d = new Date(d);
  const thisYear = (new Date()).getFullYear();
  const weekday = WEEKDAYS[d.getDay()];
  const date = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();

  return `${weekday}, ${date} ${month}${year === thisYear ? '' : ', ' + year}`;
}

export const daysBetween = (past, now) => {
  if (!past || !now) return null;
  const b = new Date(now);
  const a = new Date(past);
  return Math.round((b-a)/(1000*60*60*24)) + 1;
};

export const getDateList = (begin, end) => {
  begin = +(new Date(begin));
  end = +(new Date(end));
  const inc = 60*60*24*1000;
  const result = [];
  while (begin < end) {
    result.push({human: human(begin), date: new Date(begin)});
    begin += inc;
  }
  return result;
}
