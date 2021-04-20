import { ApiError } from '.';
import { ErrorCodes } from '../../Common';

export class ApiData<T> {
    loading: boolean;
    data: T | null;
    error: ApiError | null;
    initial: T;
    forLoading: T;

    constructor(initial: T = null, forLoading: T = initial) {
        this.loading = false;
        this.data = initial;
        this.error = null;
        this.initial = initial;
        this.forLoading = forLoading
    }

    startLoading() {
        const r = new ApiData<T>(this.initial, this.forLoading);
        r.loading = true;
        r.data = this.forLoading;
        return r;
    }

    succeeded(data: T) {
        const r = new ApiData<T>(this.initial, this.forLoading);
        r.data = data;
        return r;
    }

    formatError(error: any) {
        const newError: ApiError = {
            ErrorCode: error?.ErrorCode || 500,
            DescriptiveErrorCode: error?.DescriptiveErrorCode || ErrorCodes.internalError,
            Message: error?.Message || 'An internal error occurred.'
        }

        return newError;
    }

    failed(error: any) {
        const r = new ApiData<T>(this.initial, this.forLoading);
        r.data = this.initial;
        r.error = this.formatError(error);
        return r;
    }

    reset() {
        return new ApiData<T>(this.initial, this.forLoading);
    }
}