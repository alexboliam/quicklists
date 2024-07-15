import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist, RemoveChecklist } from '../../../shared/interfaces/checklist';
import { ChecklistItem } from '../../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checklist-header.component.html',
  styleUrl: './checklist-header.component.less'
})
export class ChecklistHeaderComponent {
  checklist = input.required<Checklist>();
  items = input.required<ChecklistItem[]>();
  addItem = output();
  resetChecklist = output<RemoveChecklist>();

  itemsNum = computed(() => this.items().length);
  checkedNum = computed(() => this.items().filter(i => i.checked).length);
}
