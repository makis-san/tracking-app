export interface userData {
    parcels: [
        {
            id: number,
            name: string,
            last: string,
            events: [Record<string,string>],
            sent_at: string,
            carrier: string,
            tracking: string,
            added_at: string,
            archived: boolean
        }
    ]
};

export interface ParcelData {
    id: number,
    name: string,
    last: string,
    events: [Record<string,string>],
    sent_at: string,
    carrier: string,
    added_at: string,
    archived: boolean
};