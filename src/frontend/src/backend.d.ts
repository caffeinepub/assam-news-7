import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Article {
    id: bigint;
    title: string;
    content: string;
    source: Source;
    tags: Array<string>;
    publishedAt: Timestamp;
    isBreaking: boolean;
    author: string;
    summary: string;
    imageUrl?: string;
    visible: boolean;
    category: Category;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export enum Category {
    entertainment = "entertainment",
    national = "national",
    local = "local",
    technology = "technology",
    business = "business",
    sports = "sports",
    world = "world",
    health = "health",
    politics = "politics"
}
export enum Source {
    auto = "auto",
    manual = "manual"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(title: string, summary: string, content: string, category: Category, author: string, imageUrl: string | null, tags: Array<string>, isBreaking: boolean): Promise<bigint>;
    deleteArticle(id: bigint): Promise<void>;
    fetchAndImportExternalNews(): Promise<void>;
    getArticle(id: bigint): Promise<Article>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    setBreakingNews(id: bigint, isBreaking: boolean): Promise<void>;
    toggleArticleVisibility(id: bigint): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateArticle(id: bigint, title: string, summary: string, content: string, category: Category, author: string, imageUrl: string | null, tags: Array<string>): Promise<void>;
}
