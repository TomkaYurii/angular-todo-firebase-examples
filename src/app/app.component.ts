import {Component, OnInit} from '@angular/core';
import {SharedService} from "./shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ToDoFirebaseAppExample';

  constructor(private service:SharedService) {
  }

  notes: any[] = [];

  refreshNotes(){
    this.service.getNotes().subscribe((res:any)=>{
      this.notes=res;
    })
  }
  ngOnInit(){
    this.refreshNotes();
  }

  addNote (newNote:string){
    this.service.addNote(newNote).subscribe((res : any)=>{
      console.log(res);
      this.refreshNotes();
    })
  }

  deleteNote (id:string) {
      this.service.deleteNote(id).subscribe((res) => {
      console.log(res);
      this.refreshNotes();
    })
  }

}
