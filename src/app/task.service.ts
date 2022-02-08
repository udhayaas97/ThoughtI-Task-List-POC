import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskData } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  get taskList(): Observable<TaskData> {
    return this.httpClient.get<TaskData>('./assets/data/tasks.json');
  }
}
