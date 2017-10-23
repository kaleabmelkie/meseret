export declare class TasksService {
    static add(data: any): Promise<any>;
    static getById(_id: string): Promise<any>;
    static list(limit: number, skip?: number): Promise<any>;
    static count(): Promise<any>;
    static edit(_id: string, data: any): Promise<any>;
    static remove(_id: string): Promise<any>;
}
