import dayjs from 'dayjs';

const now = dayjs();
const now_year = now.year();

function formatTimestamp(ts) {
  // const dt = new Date(ts * 1000);
  // return dt.toLocaleString();
  const t = dayjs.unix(ts);
  if (t.year() === now_year)
    return t.format('MM-DD HH:mm:ss');
  return t.format('YYYY-MM-DD HH:mm:ss');
}

function formatUser(user) {
  if (user === null)
    return '未登录';
  const {username, dname} = user;
  if (username === dname)
    return username;
  return `${dname} (${username})`;
}

export { formatTimestamp, formatUser };
