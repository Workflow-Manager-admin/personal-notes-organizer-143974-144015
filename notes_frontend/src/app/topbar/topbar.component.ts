import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

/**
 * Top bar with branding, search and note actions.
 */
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class TopbarComponent {
  query = '';

  constructor(private router: Router) {}

  onSearchKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onSearch() {
    this.router.navigate(['/notes'], { queryParams: { q: this.query } });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  newNote() {
    this.router.navigate(['/edit']);
  }
}
