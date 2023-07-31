import {ItemType} from './utils';

export interface ApiResponse {
    items: ItemType[];
    currentPage: number;
    totalPages: number;
    isLastPage: boolean;
}