import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

/**
 * Note data model
 */
export interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
}

/**
 * NoteService provides in-memory CRUD for notes.
 */
@Injectable({ providedIn: 'root' })
export class NoteService {
  private notes: Note[] = [
    {
      id: '1',
      title: 'Welcome to Notes!',
      content: 'Start by creating a new note. Use tags to group ideas by type or topic.',
      tags: ['Personal', 'Ideas']
    },
    {
      id: '2',
      title: 'Work Tasks',
      content: '• Finish project report\n• Email John\n• Prepare meeting slides',
      tags: ['Work']
    }
  ];

  // Simulate async
  getNotes(): Observable<Note[]> {
    return of(this.notes.slice().reverse()).pipe(delay(180));
  }

  // PUBLIC_INTERFACE
  getNoteById(id: string): Observable<Note | undefined> {
    return of(this.notes.find(n => n.id === id)).pipe(delay(100));
  }

  // PUBLIC_INTERFACE
  createNote(note: Note): Observable<Note> {
    const newNote: Note = {
      ...note,
      id: (Math.random() + Date.now()).toString(36),
      tags: note.tags || [],
    };
    this.notes.push(newNote);
    return of(newNote).pipe(delay(150));
  }

  // PUBLIC_INTERFACE
  updateNote(note: Note): Observable<Note | undefined> {
    const idx = this.notes.findIndex(n => n.id === note.id);
    if (idx >= 0) {
      this.notes[idx] = { ...note };
      return of(this.notes[idx]).pipe(delay(120));
    }
    return of(undefined);
  }

  // PUBLIC_INTERFACE
  deleteNote(id: string): Observable<boolean> {
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx >= 0) {
      this.notes.splice(idx, 1);
      return of(true).pipe(delay(100));
    }
    return of(false);
  }
}
