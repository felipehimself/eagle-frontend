const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg'];
const MAX_SIZE_MB = 1;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export const validateImgTypes = (files: File[]) => {
  return files.every((file) => ACCEPTED_TYPES.includes(file.type));
};

export const validateImgSizes = (files: File[]) => {
  return files.every((file) => file.size <= MAX_SIZE_BYTES);
};
