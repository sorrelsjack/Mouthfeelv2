export class ApiData {
    loading: boolean;
    data: any;
    error: any | null;

    constructor() {
        this.loading = false;
        this.data = undefined;
        this.error = null;
    }

    startLoading = () => {
        this.loading = true;
    }

    succeeded = (data: any) => {
        this.loading = false;
        this.data = data;
    }

    failed = (error: any) => {
        this.loading = false;
        this.error = error;
    }
}