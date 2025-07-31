import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService, Note } from '../services/note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Editor for creating or editing a note.
 */
@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NoteEditorComponent implements OnInit {
  note: Note = { id: '', title: '', content: '', tags: [] };
  isEdit = false;
  tagString = '';
  loading = true;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.noteService.getNoteById(id).subscribe((note) => {
        if (note) {
          this.note = { ...note };
          this.tagString = (note.tags || []).join(', ');
        }
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  // PUBLIC_INTERFACE
  save() {
    this.note.tags = this.tagString
      .split(',')
      .map(t => t.trim())
      .filter(t => !!t);
    if (!this.note.title.trim() || !this.note.content.trim()) {
      // eslint-disable-next-line no-undef
      window.alert('Title and content are required.');
      return;
    }
    if (this.isEdit) {
      this.noteService.updateNote(this.note).subscribe(() => {
        this.router.navigate(['/notes', this.note.id]);
      });
    } else {
      this.noteService.createNote(this.note).subscribe((note) => {
        this.router.navigate(['/notes', note.id]);
      });
    }
  }

  // PUBLIC_INTERFACE
  cancel() {
    if (this.isEdit) {
      this.router.navigate(['/notes', this.note.id]);
    } else {
      this.router.navigate(['/notes']);
    }
  }
}
