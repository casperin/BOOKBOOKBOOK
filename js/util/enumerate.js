function* enumerate (start = 0) {
  for (let v of this)
    yield [start++, v];
};
