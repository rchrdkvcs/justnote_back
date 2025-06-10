import type { HttpContext } from '@adonisjs/core/http'
import Note from '#notes/models/note'

export default class DeleteNoteController {
  public async execute({ params, response }: HttpContext) {
    const { noteId } = params

    if (!noteId) {
      return response.status(400).json({ message: 'User ID is required' })
    }

    await Note.query().where('id', noteId).delete()

    return response.status(204)
  }
}
