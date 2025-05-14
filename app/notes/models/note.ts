import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#users/models/user'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare parentNoteId: string | null

  @belongsTo(() => Note, {
    foreignKey: 'parentNoteId',
  })
  declare parentNote: BelongsTo<typeof Note>

  @hasMany(() => Note, {
    foreignKey: 'parentNoteId',
  })
  declare subNotes: HasMany<typeof Note>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static generateUuid(note: Note) {
    note.id = crypto.randomUUID()
  }
}
