export interface Issues {
    id: number;
    title: string;
    description: string;
    assigneTo: string;
    state: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'DELIVERABLE';
}