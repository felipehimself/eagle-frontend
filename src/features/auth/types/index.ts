import { z } from 'zod';

export const signinSchema = z.object({
  email: z.email('E-mail inválido'),
  senha: z.string(),
});

export type TSigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
  nome: z.string().min(1, 'Obrigatório'),
  email: z
    .string()
    .regex(
      /^[^\s@]+@eagletransportes\.com\.br$/,
      'O e-mail deve ser do domínio eagletransportes.com.br'
    ),
  senha: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/,
      'A senha deve ter 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.'
    ),
});

export type TSignupSchema = z.infer<typeof signupSchema>;

export type TAuthError = {
  Email: ["O email deve pertencer ao domínio 'eagletransportes.com.br'."];
  Senha: ['Informe uma senha forte com pelo menos 8 caracteres.'];
  status: number;
  title: string;
  traceId: string;
  type: string;
};
