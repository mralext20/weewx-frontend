/**
 * @param {RequestInfo} url
 */
export async function getJson(url) {
  const request = await fetch(url);
  if (request.ok) {
    return await request.json();
  } else {
    throw new Error("responce not ok")
  }
}
