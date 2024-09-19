import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const objetivos = pgTable('objetivos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  titulo: text('titulo').notNull(),
  frequenciaSemanal: integer('frequencia_semanal').notNull(),
  criadoEm: timestamp('cridado_em', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const objetivosConcluidos = pgTable('objetivos_concluidos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  idMeta: text('meta_id')
    .references(() => objetivos.id)
    .notNull(),
  criadoEm: timestamp('cridado_em', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
