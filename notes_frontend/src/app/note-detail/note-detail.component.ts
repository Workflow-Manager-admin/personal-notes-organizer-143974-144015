import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService, Note } from '../services/note.service';
import { CommonModule } from '@angular/common';

/**
 * Displays the detail of a single note.
 */
@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class NoteDetailComponent implements OnInit {
  note: Note | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteService.getNoteById(id).subscribe((note) => {
        this.note = note;
        this.loading = false;
      });
    } else {
      this.router.navigate(['/notes']);
    }
  }

  editNote() {
    if (this.note) {
      this.router.navigate(['/edit', this.note.id]);
    }
  }

  deleteNote() {
    // eslint-disable-next-line no-undef
    if (this.note && window.confirm(`Delete note "${this.note.title}"?`)) {
      this.noteService.deleteNote(this.note.id).subscribe(() => {
        this.router.navigate(['/notes']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/notes']);
  }
}
