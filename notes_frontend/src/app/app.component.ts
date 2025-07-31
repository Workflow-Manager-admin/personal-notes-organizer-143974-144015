import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';

/**
 * Root component for the personal notes organizer app.
 * Houses main layout (sidebar, top bar, main area).
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterModule]
})
export class AppComponent {
  title = 'Notes Organizer';
}
