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

/**
 * QUESTIONS APIS
 */
export const GET_QUESTIONS_FROM_SUBJECT = API_ROOT + 'questions/get_questions_by_subject/'