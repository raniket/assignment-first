let colors = [
  '#00796b', '#ec407a',
  '#303f9f', '#ffb74d',
  '#9e9e9e', '#90a4ae',
  '#673ab7', '#009688',
  '#1a237e', '#f44336'
];

/**
 *
 *
 * @param {*} data
 * @returns returns the list of dataPoints
 */
let getDataPoints = (data) => {
  let items = [];
  let totalCategory = 0;
  let points = [];
  let compact = [];
  let dataPoints = [];

  for (let prop in data) {
    totalCategory++;
    let deepOne = data[prop];
    for (let prop in deepOne)
      items.push(deepOne[prop])
  }

  items.forEach(data => {
    if (typeof data === 'string') {
      data = data.slice(1, data.length)
      points.push(parseInt(data));
    } else
      points.push(data);
  })

  let chunckSize = (points.length / totalCategory);
  for (let i = 0; i < totalCategory; i+=1) {
    let temp = [];
    for (let j = 0; j < chunckSize; j+=1) {
      temp[j] = points[0];
      points.shift();
    }
    compact.push(temp);
  }

  for (let i = 0; i < compact[0].length; i+=1) {
    for (let j = 0; j < compact.length; j+=1)
      dataPoints.push(compact[j][i]);
  }

  return dataPoints;
}

/**
 *
 *
 * @param {*} data
 * @returns returns a list of category
 */
let getCategories = (data) => {
  let categories = [];
  for (let category in data)
    categories.push(category);

  return categories;
}

/**
 *
 *
 * @param {*} data
 * @returns returns list of state
 */
let getStates = (data) => {
  let states = [];
  for (let categories in data) {
    let categoriesObj = data[categories];
    for (let state in categoriesObj)
      states.push(state);
  }
  // find unique values.
  states = states.filter((x, i, a) => a.indexOf(x) == i);

  return states;
}

/**
 *
 *
 * @param {*} categories
 * @returns returns colors for categories
 */
let getColors = (categoriesLength) =>  colors.slice(0, categoriesLength);

/**
 *
 *
 * @param {*} categories
 * @param {*} colors
 * @returns returns Ojbect of category and it's coresponding color
 */
let getCategoryAndColor = (categories, colors) => {
  let categoryAndColor = [];
  for (let i = 0; i < categories.length; i++)
    categoryAndColor.push({ category: categories[i], color: colors[i]})

  return categoryAndColor;
}

module.exports.getDataPoints = getDataPoints;
module.exports.getCategories = getCategories;
module.exports.getStates = getStates;
module.exports.getColors = getColors;
module.exports.getCategoryAndColor = getCategoryAndColor;