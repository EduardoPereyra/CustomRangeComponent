export async function getMinMax() {
  const response = await fetch("http://demo0534446.mockable.io/getMinMax");
  const data = await response.json();
  return data;
}
