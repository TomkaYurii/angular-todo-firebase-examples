import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  constructor(private ang_fs: AngularFirestore) { }

  getNotes(){
    let notesCollection = this.ang_fs.collection('notes').valueChanges({ idField: 'id' });
    return notesCollection;
    //.valueChanges({ idField: 'id' }) - цей метод визначає, як саме ви хочете отримувати дані з колекції. Опція { idField: 'id' }
    // встановлює поле "id" як ідентифікатор для документів, які повертаються. Це означає, що кожен об'єкт, який представляє документ
    // у колекції "notes", буде містити поле "id" зі значенням, що відповідає ідентифікатору документа в Firestore.
  }

  addNote(desc: string){
    let data = {description: desc};
    let notesCollection  = this.ang_fs.collection('notes').add({ ...data});
    return from(notesCollection);
  }

  // Ви використовуєте три крапки { ...data} для розширення об'єкта data. Ця операція називається "розпакуванням об'єкта" і дозволяє вставити
  // всі властивості об'єкта data в новий об'єкт. У вас, ймовірно, data містить дані, які ви хочете зберегти в колекції "notes" вашої бази даних Firestore.
  // За допомогою { ...data}, ви копіюєте всі властивості data і додаєте їх до нового об'єкта, який потім передається методу add для створення нового
  // документа в колекції "notes".


  deleteNote ( id : string ){
    let docRef = this.ang_fs.collection('notes').doc(id).delete();
    return from(docRef);
  }
}
