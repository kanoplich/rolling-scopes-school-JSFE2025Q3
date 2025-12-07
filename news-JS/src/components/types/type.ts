export interface NewsData {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Array<Article>;
}

export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface SourcesData {
    status: string;
    sources: Array<Source>;
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export enum StatusCode {
    Unauthorized = 401,
    PaymentRequired,
    Forbidden,
    NotFound,
}

export type Callback<T> = (data: T) => void;

export interface Options {
    [key: string]: string;
}
