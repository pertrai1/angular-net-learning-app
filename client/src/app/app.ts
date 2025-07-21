import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, Home],
})
export class App implements OnInit {
  private accountServe = inject(AccountService);
  private readonly http = inject(HttpClient);
  protected readonly title = signal('Dating app');
  protected members = signal<User[]>([]);
  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  async getMembers() {
    try {
      return lastValueFrom(
        this.http.get<User[]>('https://localhost:5001/api/members')
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountServe.currentUser.set(user);
  }
}
