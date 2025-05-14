import type { HttpContext } from '@adonisjs/core/http'
import Note from '#notes/models/note'

export default class MoveNotesController {
  public async execute({ request, response }: HttpContext) {
    const { noteId, parentNoteId } = request.all()

    const note = await Note.findOrFail(noteId)

    await note
      .merge({
        parentNoteId,
      })
      .save()

    return response.json({
      message: 'Note updated successfully',
      note,
    })
  }
}
