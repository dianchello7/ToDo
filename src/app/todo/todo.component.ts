import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task{
  name:string;
  isUpdated:boolean;
  isVisible:boolean;
}

enum SortOptions{
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks:Task[] = [];
  readonly TASKS_KEY = 'tasks'
  SortEnum = SortOptions;
  sort: SortOptions= SortOptions.NONE
  constructor(){
  }
  ngOnInit(): void{
    let savedTasksJson = localStorage.getItem(this.TASKS_KEY)

    if (savedTasksJson != null){
      this.tasks = JSON.parse(savedTasksJson);
    }
  }

  handleSubmit(addForm: NgForm){
    let newTask = {name: addForm.value.task , isUpdated: false, isVisible:true};
    this.tasks.push(newTask);
    addForm.resetForm();
  }
  
  handleRemove(t:string){
    this.tasks = this.tasks.filter((myTask:Task) => myTask.name != t);
  }
  handleUpdate(t:Task){
    t.isUpdated = true;

  }
  handleFinishUpdate(oldName:string , newTaskName:string){
    let updatedTask:Task =
     this.tasks.filter((t)=> t.name === oldName)[0];
     updatedTask.name = newTaskName;
     updatedTask.isUpdated = false;
  }
  handleSort(sortDir:SortOptions){
    if (sortDir ===this.sort){
      this.sort = SortOptions.NONE;
      return;

    }

    this.sort = sortDir;  

    switch (sortDir) {
      case SortOptions.ASC:
        this.tasks = this.tasks.sort((a,b)=>{
          let aLow = a.name.toLowerCase();
          let bLow = b.name.toLowerCase();
          if (aLow < bLow) {
            return -1;
          }
          if (aLow > bLow) {
            return 1;
          }
          return 0;
        })
        break;
        case SortOptions.DESC:
          this.tasks = this.tasks.sort((a,b)=>{
            let aLow = a.name.toLowerCase();
            let bLow = b.name.toLowerCase();
            if (aLow < bLow) {
              return 1;
            }
            if (aLow > bLow) {
              return -1;
            }
            return 0;
          })
          break;
      case SortOptions.NONE:
      default:
        break;
      }
    }
    handleSearch(v:string){
      this.tasks.map((task)=>{
        task.isVisible = (task.name.includes(v))
      })
    }

    handleSave():void{
      localStorage.setItem(this.TASKS_KEY, JSON.stringify(this.tasks))
     }


  }




