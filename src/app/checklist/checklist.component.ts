import { Component, computed, inject } from '@angular/core';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.less'
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  route = inject(ActivatedRoute);

  params = toSignal(this.route.paramMap);

  checklist = computed(() => 
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );
}
