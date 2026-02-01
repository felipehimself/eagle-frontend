import { z } from "zod";

export const linkRegionSchema = z.object({
  idCliente: z.number(),
  idRegiao: z.array(z.number()).min(1, "Obrigatório"),
});

export type TLinkRegionSchema = z.infer<typeof linkRegionSchema>;
