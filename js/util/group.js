const id = x => x;

export default function group (fn = id) {
  return [...this].reduce((acc, v) => {
    const key = fn(v);
    if (!acc[key]) acc[key] = [];
    acc[key].push(v);
    return acc;
  }, {});
};
