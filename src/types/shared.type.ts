import { Control, FieldValues, Path } from 'react-hook-form';

export type TFormComponent<T> = {
  isLoading: boolean;
  onSubmit: (data: T) => void;
  shouldDisable: boolean;
  initialData?: T;
  isSubmitting?: boolean;
  mode?: 'CREATE' | 'EDIT';
};

export type TInput<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  disabled?: boolean;
  clearField?: () => void;
  required?: boolean;
  onClickButton?: () => Promise<void>;
};

export type TCloudinaryFile = {
  file: File;
  secureUrl: string;
  publicId?: string;
  id?: string;
  url?: string;
  dataUpload?: string;
  ativo?: boolean;
  tipoImagem?: '1' | '2';
  newImage?: boolean;
  hidden?: boolean;
};

export type TFormRef = { resetForm: () => void } | null;
