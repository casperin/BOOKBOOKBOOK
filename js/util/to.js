export default function to (Type) {
  switch (Type) {
    case Array:
      return [...this];
    case Object:
      return [...this].reduce((accumulation, [k, v]) =>
                              ({...accumulation, [k]: v}), {});
    case String:
      return [...this].join("");
    default:
      return new Type([...this]);

  }
};
