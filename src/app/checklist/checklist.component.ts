import { Component, computed, effect, inject, signal } from '@angular/core';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChecklistHeaderComponent } from "./ui/checklist-header/checklist-header.component";
import { ChecklistItemService } from './data-access/checklist-item.service';
import { FormBuilder } from '@angular/forms';
import { ChecklistItem } from '../shared/interfaces/checklist-item';
import { ModalComponent } from "../shared/ui/modal/modal.component";
import { FormModalComponent } from "../shared/ui/form-modal/form-modal.component";
import { ChecklistItemListComponent } from "./ui/checklist-item-list/checklist-item-list.component";

@Component({
    selector: 'app-checklist',
    standalone: true,
    templateUrl: './checklist.component.html',
    styleUrl: './checklist.component.less',
    imports: [ChecklistHeaderComponent, ModalComponent, FormModalComponent, ChecklistItemListComponent]
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  checklistItemService = inject(ChecklistItemService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  params = toSignal(this.route.paramMap);

  checklistItemsBeingEdited = signal<Partial<ChecklistItem> | null>(null);

  checklist = computed(() => 
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );

  checklistItemForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  items = computed(() => 
    this.checklistItemService
      .checklistItems()
      .filter((item) => item.checklistId === this.params()?.get('id'))
  );

  constructor() {
    effect(() => {
      const checklistItem = this.checklistItemsBeingEdited();

      if (!checklistItem) {
        this.checklistItemForm.reset();
      }
    });
  }
}
