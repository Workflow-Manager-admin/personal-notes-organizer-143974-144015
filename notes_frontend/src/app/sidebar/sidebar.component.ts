import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Sidebar for navigation/folder/tag selection.
 * Lists all tags/folders in the app for filtering notes.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent {
  tags: string[] = ['All Notes', 'Work', 'Personal', 'Ideas'];

  @Output() tagSelected = new EventEmitter<string>();

  onTagClick(tag: string) {
    this.tagSelected.emit(tag);
  }
}
