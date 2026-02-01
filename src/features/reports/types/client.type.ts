// import { z } from "zod";

// export const clientSchema = z.object({
//   id: z.number().optional(),
//   nome: z.string().trim().min(1, "Obrigatório"),
//   cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),
//   // regiaoBase: z.array(z.number()).min(1, "Obrigatório"),

//   email: z
//     .string()
//     .optional()
//     .refine(
//       (val) =>
//         !val ||
//         val === "" ||
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
//       {
//         message: "E-mail inválido",
//       }
//     ),

//   telefone: z
//     .string()
//     // .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "(00) 0000-0000)")
//     .optional()
//     .refine(
//       (val) => !val || val === "" || /^\(\d{2}\) \d{5}-\d{4}$/.test(val),
//       {
//         message: "(00) 0000-0000)",
//       }
//     ),
// });

// export type TClientSchema = z.infer<typeof clientSchema>;
