import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  idreferencia: number;
  titulopub: string;  
  autores: string;
  tipopub: number;
  eventorevista: string;
  doi: string;
  anyopub: number;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id'}) as Observable<Note>;
  }

  addNote(note: Note){
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, { idreferencia: note.idreferencia, titulopub: note.titulopub, 
      autores: note.autores, eventorevista: note.eventorevista, doi: note.doi, anyopub: note.anyopub,
      tipopub: note.tipopub});
  }
}
