import type { HttpContext } from '@adonisjs/core/http'
import Note from '#notes/models/note'

export default class UpdateNotesController {
  public async execute({ request, response, params }: HttpContext) {
    const { noteId } = params
    const { title, content } = request.body()

    const note = await Note.findOrFail(noteId)

    await note
      .merge({
        title,
        content,
      })
      .save()

    return response.json({
      message: 'Note updated successfully',
      note,
    })
  }
}
