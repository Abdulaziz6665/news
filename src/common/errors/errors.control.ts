import { ResError } from '../../interfaces/general.interfaces';

export class ErrorsControl {
  private errors = {
    1000: 'Server error',
    1001: 'Wrong code',
    1002: 'Recieved code expired',
    1003: 'News not found',
  };
  getError(code: number, keyWord?: string): ResError {
    if (!keyWord) return { code, errorMessage: this.errors[code] };
    return { code, errorMessage: `${keyWord} ${this.errors[code]}` };
  }
}
