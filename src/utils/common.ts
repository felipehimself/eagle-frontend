export function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export class Formatter {
  constructor() {}

  formatCPF(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  formatCNPJ(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  formatPhone(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  }

  formatDate(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})\d+?$/, '$1');
  }

  formatCEP(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  }

  formatLicensePlate(value: string) {
    return value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '') // remove non-alphanumeric
      .replace(/([A-Z0-9]{3})([A-Z0-9])/, '$1-$2') // add dash after 3rd char
      .replace(/(-[A-Z0-9]{4})[A-Z0-9]+$/, '$1'); // limit max length
  }

  formatPIS(value: string) {
    return value
      .replace(/\D/g, '') // remove all non-digit characters
      .slice(0, 11); // limit to 11 characters
  }

  formatYear(value: string) {
    return value
      .replace(/\D/g, '') // remove all non-digit characters
      .slice(0, 4); // limit to 4 characters
  }

  formatRenavam(value: string) {
    return value
      .replace(/\D/g, '') // remove all non-digit characters
      .slice(0, 11); // limit to 11 characters
  }

  formatChassi(value: string) {
    return value.slice(0, 17).toUpperCase(); // limit to 17 characters
  }

  formatMoney(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/^0+/, '')
      .replace(/(\d*)(\d{2})$/, '$1,$2')
      .replace(/^,/, '0,')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  formatOnlyNumber = (value: string) => {
    return value.replace(/\D/g, '');
  };

  formatYYYY = (value: string) => {
    return Number(
      value
        .replace(/\D/g, '') // remove all non-digit characters
        .slice(0, 4),
    ); // limit to 4 characters
  };

  removeNonDigits(value: string) {
    return value.replace(/\D/g, '');
  }

  dateStrToISOString(date: string | undefined) {
    if (!date) return '';
    const [day, month, year] = date.split('/');
    const isoDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    ).toISOString();

    return isoDate;
  }

  removeNonAlphanumeric(str: string) {
    return str.replace(/[^a-z0-9]/gi, '');
  }

  parseMoney(value: string | undefined) {
    if (!value) return 0;

    // Remove all non-digit, non-comma, non-dot chars (handles "R$", spaces, etc.)
    const cleaned = value.replace(/[^\d.,-]/g, '');

    // Remove thousand separators and replace decimal comma with dot
    const normalized = cleaned.replace(/\./g, '').replace(',', '.');

    const num = Number(normalized);
    return isNaN(num) ? 0 : num;
  }

  parsePlaca(value: string | undefined) {
    if (!value) return '';
    return value.toUpperCase().replace(/([A-Z0-9]{3})([A-Z0-9])/, '$1-$2'); // add dash after 3rd char
  }
}

export const initialValueTrueOrFalseField = (value: undefined | boolean) => {
  return value == undefined ? '' : String(value) || '';
};

export const getTipoDocumento = (cnpj: string | undefined) => {
  if (cnpj) return 'CNPJ';
  return 'CPF';
};

export const hasSomeTruthy = (arr: boolean[]) => arr.some((v) => !!v);

export const normalizeStr = (str: string, valueToRemove: string) => {
  return str.replace(valueToRemove, '');
};
