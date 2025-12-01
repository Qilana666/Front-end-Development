/**
 * @function getUserById - Finds a user object in the array of users by their ID.
 * @param {number} id - The ID of the user to find.
 * @param {Array} users - The array of user objects.
 * @returns {Object|undefined} - The user object with the matching ID, or undefined if not found.
 */
async function getUserById(id, users) {
  return users.find(user => user.id === id);
}


//根据邮箱获取用户
/**
 * @function getUserByEmail - Finds a user object in the array of users by their email.
 * @param {string} email - The email of the user to find.
 * @param {Array} users - The array of user objects.
 * @returns {Object|undefined} - The user object with the matching email, or undefined if not found.
 */
async function getUserByEmail(email, users) {
  return users.find(user => user.email === email);
}

//根据用户名获取用户
/**
 * @function getUserByUsername - Finds a user object in the array of users by their username.
 * @param {string} username - The username of the user to find.
 * @param {Array} users - The array of user objects.
 * @returns {Object|undefined} - The user object with the matching username, or undefined if not found.
 */
async function getUserByUsername(username, users) {
  return users.find(user => user.username === username);
}