import type { HttpContext } from '@adonisjs/core/http'
import Note from '#notes/models/note'

export default class CreateNotesController {
  public async execute({ request, response }: HttpContext) {
    const { userId, title, content, parentNoteId } = request.all()

    const note = await Note.create({
      userId,
      title,
      content,
      parentNoteId,
    })

    return response.json({
      message: 'Note created successfully',
      note,
    })
  }
}
