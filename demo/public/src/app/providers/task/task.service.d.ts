import 'rxjs/operator/map';
import { ITask } from '../../models/i-task';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
export declare class SayService {
    private http;
    constructor(http: HttpClient);
    getSays(length: number, skip?: number): Observable<ITask[]>;
}
