import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { MessageService } from './message.service';
import { Editor } from '../models/editor';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditorService {
  private path = '/editor/';
  private editorStore: AngularFirestore;
  private editorCollection: AngularFirestoreCollection<Editor>;

  constructor(
    private db: AngularFirestore,
    private messageService: MessageService
  ) {
    this.editorStore = db;
    this.editorCollection = db.collection(this.path);
  }
  doc2editor(json: any): Editor {
    return new Editor(
      json.id,
      json.name,
      json.contact,
      json.game,
    );
  }

  getAlleditors(): Observable<Editor[]> {
    return this.editorCollection.valueChanges({ idField: 'id' }).pipe(
      tap((doc) => {
        this.messageService.log(`doc=${JSON.stringify(doc)}`);
      }),
      map((data) => data.map((doc) => this.doc2editor(doc)))
    );
  }

  addUpdateeditor(editor: Editor) {
    if (editor.id == null) {
      editor.id = this.editorStore.createId();
    }
    this.editorCollection.doc(editor.id).set(Object.assign({}, editor));
  }
  addNeweditor(editor: Editor) {
    if (editor.id == null) {
      editor.id = this.editorStore.createId();
    }
    this.editorCollection
      .doc(editor.id)
      .get()
      .subscribe((doc) => {
        if (!doc.exists) {

          const r = this.editorCollection
            .doc(editor.id)
            .set(Object.assign({}, editor));
            console.log(r)
        } // else doc exists!
      });
  }
  deleteeditor(editor: Editor) {
    this.editorStore.doc<Editor>(this.path + editor.id).delete();
  }
  geteditor(id: String): Observable<Editor> {
    var itemDoc = this.editorStore.doc<Editor>(this.path + id);
    return itemDoc.valueChanges().pipe(map((fest) => {
      console.log(fest)
      return this.doc2editor(fest)
    }));
  }
}
