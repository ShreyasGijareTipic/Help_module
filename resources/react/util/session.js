/**
 * Stores user data in sessionStorage.
 *
 * @param {object} userData - The user data to store.
 */
export function storeUserData(userData) {
  if (userData && userData.token && userData.user) {
    console.log("Storing user data in sessionStorage:", userData);
    sessionStorage.setItem('userData', JSON.stringify(userData)); // Store in sessionStorage
  } else {
    console.error("Invalid userData for sessionStorage:", userData);
  }
}

/**
 * Deletes user data from sessionStorage.
 */
export function deleteUserData() {
  sessionStorage.removeItem('userData');
}

/**
 * Checks if the user is logged in by verifying the presence of userData in sessionStorage.
 */
export function isLogIn() {
  const userData = sessionStorage.getItem('userData');
  if (userData) {
    const parsedData = JSON.parse(userData);
    return !!(parsedData.token && parsedData.user); // Ensure token and user exist
  }
  return false;
}

/**
 * Retrieves the token from sessionStorage if available.
 */
export function getToken() {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  return userData ? userData.token : null;
}

/**
 * Retrieves the user data from sessionStorage if available.
 */
export function getUserData() {
  const userData = sessionStorage.getItem('userData');
  return userData ? JSON.parse(userData).user : null;
}
