import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee,faX } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FontAwesomeModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent implements OnInit{
  title = 'TodoApp';
  faCoffee = faCoffee;
  faXI=faX;
  notes: any[] = [];
  taskTitle: string = '';
  taskDescription: string = '';
  constructor(private http:HttpClient){

  }
  

  ngOnInit(): void {
    this.fetchDetails();
  
  }

  public fetchDetails(){
    this.http.get<any[]>('http://localhost:5038/api/todoapp/tasks')
  .subscribe(
    (res: any[]) => {
      console.log(res);
      this.notes = res;
    },
    (error) => {
      console.error('Error fetching data:', error);
  
    }
  );
}

public addTask(): void {
  const newTask = {
    Title: ((<HTMLInputElement>document.getElementById("form3")).value),
    Description: ((<HTMLInputElement>document.getElementById("form4")).value)
  };
  if (!newTask.Title) {
    console.error('Title is required.');
    return;
  } 
  this.http.post('http://localhost:5038/api/todoapp/tasks', newTask)
    .subscribe(
      (res) => {
        
        this.taskTitle = '';
        this.taskDescription = '';
        this.fetchDetails();
      },
      (error) => {
        console.error('Error adding task:', error);
      }
    );
}
deleteNote(id: number): void { // Use a more specific type for ID (number)
  const url = `http://localhost:5038/api/todoapp/tasks/${id}`;
  console.log(id)
  this.http.delete(url)
    .subscribe(
      (data) => {
        console.log('Note deleted successfully:', data); // Log success message (optional)
        this.fetchDetails(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting note:', error); // Handle errors
      }
    );
}




}
