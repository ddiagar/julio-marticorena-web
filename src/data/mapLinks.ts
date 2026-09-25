export function mapLinks(address:string) {
 const query=encodeURIComponent(address);
 return {
  google:`https://www.google.com/maps/search/?api=1&query=${query}`,
  waze:`https://www.waze.com/ul?q=${query}&navigate=yes`,
  embed:`https://maps.google.com/maps?q=${query}&z=16&output=embed`,
 };
}
