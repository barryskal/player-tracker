export function secondsBetween(start, end) {
  return start ? Math.floor((end.getTime() - start.getTime()) / 1000) : 0;
}

export function getFields(orig, ...fieldNames) {
  return fieldNames.reduce(
    (val, field) => Object.assign(val, { [field]: orig[field] }),
    {}
  );
}
