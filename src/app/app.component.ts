import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { faFlag as farFlag } from '@fortawesome/free-regular-svg-icons';
import {
  faFlag as fasFlag,
  faMinusCircle as fasMinusCircle
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Task, TaskData } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  farFlag = farFlag;
  fasFlag = fasFlag;
  fasMinusCircle = fasMinusCircle;
  isImportant = true;
  users: string[] = [];
  tasks: Task[];
  taskForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    const observer = this.taskService.taskList.subscribe(
      (taskData: TaskData) => {
        this.users = taskData.Users;
        this.tasks = taskData.Tasks;
        this.notifyImportantTasks();
      }
    );
    this.subscriptions.add(observer);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeForm(): void {
    this.taskForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(200)]],
      expiryDate: ['', Validators.required],
      user: ['', Validators.required],
      important: [true],
    });
  }

  formControls(control: string): AbstractControl | null {
    return this.taskForm.get(control);
  }

  isControlError(control: string): boolean {
    const formControl = this.taskForm.get(control);
    return formControl?.invalid && formControl?.touched ? true : false;
  }

  errors(control: string, error: string) {
    return this.taskForm.get(control)?.getError(error);
  }

  onImportantSelect(): void {
    this.isImportant = !this.isImportant;
  }

  notifyImportantTasks(): void {
    this.tasks.forEach((task: Task) => {
      if (task.Important) {
        this.toasterService.info(task.Task);
      }
    });
  }

  onAddTask(): void {}
}
