export function ago(date) {
  const d1 = new Date(date);
  const d2 = new Date();
  const diff = d2 - d1;
  var strr = "";

  if (diff > 86400e3) strr = `${Math.floor(diff / 86400e3)} days ago`;
  else if (diff > 3600e3) strr = `${Math.floor(diff / 3600e3)} hours ago`;
  else if (diff > 60e3) strr = `${Math.floor(diff / 60e3)} minutes ago`;
  else strr = `${Math.floor(diff / 1e3)} seconds ago`;

  return strr;
}
