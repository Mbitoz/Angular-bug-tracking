export interface Issues {
    id: number;
    title: string;
    description: string;
    fkUserId: number;
    fkUserIdDecode: string;
    state: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'DELIVERABLE';
    openTo: 'FE' | 'BE';
    priority: number;
}

export interface Tipologica {
    value: string;
    description: string;
}