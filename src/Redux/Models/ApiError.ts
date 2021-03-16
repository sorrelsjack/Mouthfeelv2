// TODO: Maybe fix this so it's lowercase

export interface ApiError {
    ErrorCode: number;
    DescriptiveErrorCode?: string;
    Message: string;
}