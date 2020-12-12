export interface userData {
    parcels: [
        {
            id: string,
            name: string,
            last: string,
            events: [Record<string,string>],
            sent_at: string,
            carrier: 'Correios'|'CargoBr'|'Jadlog',
            tracking: string,
            added_at: string,
            updated_at?: string,
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
    carrier: 'Correios'|'CargoBr'|'Jadlog',
    added_at: string,
    updated_at?: string,
    archived: boolean
};

export interface EventsData {
    data: string,
    hora: string,
    destino?: string,
    origem?: string,
    local?: string,
    status?: string
}