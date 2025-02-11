export interface APIResp<T> {
    status: number;
    message: string;
    data: T;
}

export interface APIReq<T> {
    method: string;
    headers: Record<string, string>;
    body?: T|null;
}