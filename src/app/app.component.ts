import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { ContatoComponent } from './components/contato/contato.component';
import { FormsModule } from '@angular/forms';
import agenda from './agenda.json';

interface Contact {
  id: number;
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContainerComponent,
    HeaderComponent,
    SeparatorComponent,
    ContatoComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  contacts: Contact[] = agenda;

  filterByText: string = "";

  private normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterContactByText(): Contact[] {
    if (!this.filterByText) {
      return this.contacts;
    }

    return this.contacts.filter(contact => {
      return this.normalizeText(contact.nome).match(this.filterByText);
    });
  }

  filterContactByLetter(letter: string) : Contact[] {
    return this.filterContactByText().filter(contact => {
      return this.normalizeText(contact.nome).startsWith(this.normalizeText(letter));
    });
  }
}
