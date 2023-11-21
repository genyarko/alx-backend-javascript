class AppController {
  /**
   * Gets the homepage.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} Express response object with a 200 status and the message.
   */
  static getHomepage(req, res) {
    return res.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
