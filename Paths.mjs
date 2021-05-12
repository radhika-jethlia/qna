import { dirname } from 'path'
import { fileURLToPath } from 'url'
import shortId from 'shortid'

export const uniqueFileName = shortId.generate()
export const __dirname = dirname(fileURLToPath(import.meta.url))
export const PORT = process.env.PORT || 5000
export const SERVER = 'http://localhost:' + PORT
export const SUBJECT_UPLOAD_PATH = '/uploads/subjects/'