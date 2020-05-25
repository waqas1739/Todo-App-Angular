export interface FilterButton {
    type: Filter;
    label: string;
    isActive: boolean;
}

export enum Filter {
    Todo,
    Deleted,
    Done
}
