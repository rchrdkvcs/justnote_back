import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('title', 255).nullable()
      table.text('content').nullable()
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.uuid('parent_note_id').nullable().references('id').inTable('notes').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
