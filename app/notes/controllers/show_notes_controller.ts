import type { HttpContext } from '@adonisjs/core/http'
import Note from '#notes/models/note'

export default class ShowNotesController {
  public async execute({ response, params }: HttpContext) {
    const { noteId } = params

    if (!noteId) {
      return response.status(400).json({ message: 'Note ID is not defined' })
    }

    const note = await Note.findOrFail(noteId)

    return response.json(note)
  }
}
