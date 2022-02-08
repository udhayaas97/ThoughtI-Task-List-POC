import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TaskData } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  get UserList(): Observable<string[]> {
    return this.httpClient.get<TaskData>('./assets/data/tasks.json').pipe(
      map((data: TaskData) => {
        return data.Users;
      })
    );
  }
}
