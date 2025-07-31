import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      { path: 'notes', component: NotesListComponent },
      { path: 'notes/:id', component: NoteDetailComponent },
      { path: 'edit', component: NoteEditorComponent },
      { path: 'edit/:id', component: NoteEditorComponent },
      { path: '**', redirectTo: 'notes' }
    ]),
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    NotesListComponent,
    NoteDetailComponent,
    NoteEditorComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
