export interface MatchDetailResp {
    id: string;
    name: string;
    client_name: string;
    channel_id: string;
    slug: string;
    image: string;
    public_url: string;
}

export interface MatchListResp {
    id: string;
    name: string;
    client_name: string;
    channel_id: string;
    slug: string;
    public_url?: string;
}

export interface MatchTokenDetailResp {
    token: string;
    uid: number;
}