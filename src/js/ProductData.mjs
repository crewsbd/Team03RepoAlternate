// A Class and helper functions to handle collections of products

/**
 * Take a Response and converts it to a promise for an Object representing the JSON data
 * @param {Response} res
 * @returns {Promise<Object>}
 */
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

/**
 * A class to hold a list of object representing products
 */
export default class ProductData {
  /**
   * Sets the category and path where the json data is located.
   * @param {String} category Specifies the category of products who json file should be loaded.
   */

  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  /**
   * Get an array of objects representing products
   * @returns {Promise<Array<Object>>}An object containing all the data in the categories JSON file
   */
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  /**
   * Finds and returns a promise to one Object representing the product in the id string.
   * @param {String} id The product identifier to return
   * @returns {Promise<Object>} a promise for an object containing the product data.
   */
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
