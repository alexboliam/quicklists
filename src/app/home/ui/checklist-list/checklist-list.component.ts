import { Component, input, output } from '@angular/core';
import { Checklist, RemoveChecklist } from '../../../shared/interfaces/checklist';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './checklist-list.component.html',
  styleUrl: './checklist-list.component.less'
})
export class ChecklistListComponent {
  checklists = input.required<Checklist[]>();
  delete = output<RemoveChecklist>();
  edit = output<Checklist>();
}
