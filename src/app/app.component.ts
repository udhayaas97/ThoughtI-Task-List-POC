import { Component, OnDestroy, OnInit } from '@angular/core';
import { faFlag as farFlag } from '@fortawesome/free-regular-svg-icons';
import { faFlag as fasFlag } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  farFlag = farFlag;
  fasFlag = fasFlag;
  isImportant = true;
  users: string[] = [];
  private subscriptions = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const observer = this.taskService.UserList.subscribe((users) => {
      this.users = users;
    });
    this.subscriptions.add(observer);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onImportantSelect(): void {
    this.isImportant = !this.isImportant;
  }
}
