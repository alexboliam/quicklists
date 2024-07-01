import { Component, input, output } from '@angular/core';
import { ChecklistItem, RemoveChecklistItem } from '../../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
  standalone: true,
  imports: [],
  templateUrl: './checklist-item-list.component.html',
  styleUrl: './checklist-item-list.component.less'
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>();
  toggle = output<RemoveChecklistItem>();
}
