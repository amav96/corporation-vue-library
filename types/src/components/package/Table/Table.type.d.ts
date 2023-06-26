import { Inputs, requestConfiguration } from "../../../types";
export interface Field {
    key: string;
    sortable?: boolean;
    label?: string;
    variant?: string;
}
export interface Pagination {
    currentPage: number;
    totalRows: number;
    perPage: number;
}
export interface BackEndPagination {
    count: number;
    current_page: number;
    has_next_page: boolean;
    limit: number;
    page_count: number;
}
export interface TableProps {
    items?: object[];
    fields?: Field[];
    busy?: boolean;
    striped?: boolean;
    hover?: boolean;
    totalRows?: number;
    perPage?: number;
    currentPage?: number;
    firstNumber?: boolean;
    lastNumber?: boolean;
    searchable?: boolean;
    inputs?: Inputs[];
    requestConfiguration?: requestConfiguration;
    url?: string;
    modelKey?: string;
    aditionalParams?: object;
    searchIcon: string;
}
