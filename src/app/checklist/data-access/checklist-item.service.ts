import { Injectable, computed, signal } from "@angular/core";
import { AddChecklistItem, ChecklistItem, RemoveChecklistItem } from "../../shared/interfaces/checklist-item";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GuidHelper } from "../../shared/utils/guid.helper";

export interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistItemService {
  // state 
  private state = signal<ChecklistItemsState>({
    checklistItems: []
  });

  // selectors
  checklistItems = computed(() => this.state().checklistItems);

  // sources
  add$ = new Subject<AddChecklistItem>();
  toggle$ = new Subject<RemoveChecklistItem>();

  constructor() {
    // reducers
    this.add$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (checklistItem) => 
          this.state.update((state) => ({
            ...state,
            checklistItems: [
              ...state.checklistItems,
              {
                ...checklistItem.item,
                id: GuidHelper.CreateGuid(),
                checklistId: checklistItem.checklistId,
                checked: false
              }
            ]
          }))
    );

    this.toggle$
      .pipe(takeUntilDestroyed())
      .subscribe(
        (checklistItemId) => 
          this.state.update((state) => ({
            ...state,
            checklistItems: state.checklistItems.map((item) => 
              item.id === checklistItemId
                ? { ...item, checked: !item.checked }
                : item
            )
          }))
      );
  }
}