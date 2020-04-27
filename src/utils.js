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

/**
 * coppied from stackoverflow: https://stackoverflow.com/a/30465299/3236881
 * @param {string} startDate
 * @param {string} endDate
 */
export function dateRange(startDate, endDate) {
  let start = startDate.split('-');
  let end = endDate.split('-');
  let startYear = parseInt(start[0]);
  let endYear = parseInt(end[0]);
  let dates = [];

  for (let i = startYear; i <= endYear; i++) {
    let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    let startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      let month = j + 1;
      let displayMonth = month < 10 ? '0' + month : month;
      dates.push([i, displayMonth].join('-'));
    }
  }
  return dates;
}


/**
 * produces an array of the values between two numbers. inclusive.
 * @param {number} start
 * @param {number} end
 */
export function arrayFromRange(start, end) {
  let range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}