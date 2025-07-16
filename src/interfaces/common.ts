export interface PaginationParameters {
    page: number;
    pageSize: number;
}

export interface Pagination {
    page: number;
    pages: number;
    pageSize: number;
    total: number;
}

export type SortOrder = 'ascending' | 'descending';