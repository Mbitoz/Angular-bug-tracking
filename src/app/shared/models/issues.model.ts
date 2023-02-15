export interface Issues {
    _id: number;
    title: string;
    description: string;
    fkUserId: number;
    fkUserIdDecode: string;
    state: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'DELIVERABLE';
    openTo: 'FE' | 'BE';
    priority: number;
    numberIssue: number;
}

export interface Tipologica {
    value: string | number;
    description: string;
}