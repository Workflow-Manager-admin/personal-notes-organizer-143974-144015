import { Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NotesListComponent },
  { path: 'notes/:id', component: NoteDetailComponent },
  { path: 'edit', component: NoteEditorComponent },
  { path: 'edit/:id', component: NoteEditorComponent },
  { path: '**', redirectTo: 'notes' }
];
