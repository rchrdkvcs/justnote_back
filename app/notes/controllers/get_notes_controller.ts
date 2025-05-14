import type { HttpContext } from '@adonisjs/core/http'
import Note from '#notes/models/note'

export default class GetNotesController {
  public async execute({ request, response }: HttpContext) {
    const { userId } = request.all()

    if (!userId) {
      return response.status(400).json({ message: 'User ID is required' })
    }

    const topLevelNotes = await Note.query()
      .where('user_id', userId)
      .whereNull('parent_note_id')
      .preload('subNotes', (subNotesQuery) => {
        subNotesQuery.preload('subNotes', (nestedQuery) => {
          this.preloadSubNotes(nestedQuery)
        })
      })

    return response.json(topLevelNotes)
  }

  private preloadSubNotes(query: any) {
    query.preload('subNotes', (subQuery: any) => {
      this.preloadSubNotes(subQuery)
    })
  }
}
