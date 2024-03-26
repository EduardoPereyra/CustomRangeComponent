export async function getMinMax() {
  const response = await fetch("http://demo0534446.mockable.io/minMax");
  const data = await response.json();
  return data;
}

export async function getPosibleValues() {
  const response = await fetch("http://demo0534446.mockable.io/posibleValues");
  const data = await response.json();
  return data;
}
