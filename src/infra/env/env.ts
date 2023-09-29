import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CLUSTER: z
    .string()
    .transform((value) => {
      if (
        !value ||
        value.toLowerCase() === 'false' ||
        value.toLowerCase() !== 'true'
      ) {
        return false
      }

      return true
    })
    .optional(),
  CLUSTER_WORKERS: z.coerce.number().default(1),
  PORT: z.coerce.number().optional().default(3333),
  DB_POOL: z.coerce.number(),
})

export type Env = z.infer<typeof envSchema>
