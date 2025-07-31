import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteService, Note } from '../services/note.service';
import { CommonModule, SlicePipe } from '@angular/common';

/**
 * Displays a list of notes, supports search/filter.
 */
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
  standalone: true,
  imports: [CommonModule, SlicePipe]
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  filtered: Note[] = [];
  loading = true;
  q = '';

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.q = params['q'] || '';
      this.loadNotes();
    });
  }

  loadNotes() {
    this.loading = true;
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
      this.filtered = this.q
        ? notes.filter(n =>
            n.title.toLowerCase().includes(this.q.toLowerCase()) ||
            n.content.toLowerCase().includes(this.q.toLowerCase()) ||
            (n.tags || []).some(t => t.toLowerCase().includes(this.q.toLowerCase()))
          )
        : notes;
      this.loading = false;
    });
  }

  openNote(note: Note) {
    this.router.navigate(['/notes', note.id]);
  }

  deleteNote(note: Note) {
    // eslint-disable-next-line no-undef
    if (window.confirm(`Delete note "${note.title}"?`)) {
      this.noteService.deleteNote(note.id).subscribe(() => this.loadNotes());
    }
  }
}
