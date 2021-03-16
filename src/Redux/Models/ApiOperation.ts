export class ApiOperation {
    loading: boolean;
    success: boolean;
    error: any;

    constructor() {
        this.loading = false;
        this.success = false;
        this.error = null;
    }

    startLoading() {
        const r = new ApiOperation();
        r.loading = true;
        return r;
    }

    succeeded() {
        const r = new ApiOperation();
        r.loading = false;
        r.success = true;
        return r;
    }

    failed(error: any) {
        const r = new ApiOperation();
        r.success = false;
        r.error = error;
        return r;
    }

    reset() {
        return new ApiOperation();
    }
}