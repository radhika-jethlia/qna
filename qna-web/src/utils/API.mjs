/**
 * BASE URL CONSTANTS
 */
export const HOSTNAME = "http://localhost"
export const PORT = 5000
export const BASE_URI = HOSTNAME + ":" + PORT
export const API_ROOT = BASE_URI + '/api/'

/**
* SUBJECTS APIS
*/
export const GET_ACTIVE_SUBJECTS = API_ROOT + 'subjects/active_subjects'