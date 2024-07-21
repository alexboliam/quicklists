import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { AddChecklistItem, ChecklistItem, EditChecklistItem, RemoveChecklistItem } from "../../shared/interfaces/checklist-item";
import { map, merge, Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GuidHelper } from "../../shared/utils/guid.helper";
import { RemoveChecklist } from "../../shared/interfaces/checklist";
import { StorageService } from "../../shared/data-access/storage.service";
import { connect } from "ngxtension/connect";

export interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistItemService {
  storageService = inject(StorageService);
  
  // state 
  private state = signal<ChecklistItemsState>({
    checklistItems: [],
    loaded: false,
    error: null,
  });

  // selectors
  checklistItems = computed(() => this.state().checklistItems);
  loaded = computed(() => this.state().loaded);

  // sources
  private checklistItemsLoaded$ = this.storageService.loadChecklistItems();
  add$ = new Subject<AddChecklistItem>();
  toggle$ = new Subject<RemoveChecklistItem>();
  resetToggles$ = new Subject<RemoveChecklist>();
  edit$ = new Subject<EditChecklistItem>();
  remove$ = new Subject<RemoveChecklistItem>();
  private error$ = new Subject<string>();

  // shared sources
  checklistRemoved$ = new Subject<RemoveChecklist>();

  constructor() {
    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklistItems(this.checklistItems());
      }
    });

    // reducers
    const nextState$ = merge(
      this.checklistItemsLoaded$.pipe(
        map((checklistItems) => ({ checklistItems, loaded: true }))
      ),
      this.error$.pipe(
        map((error) => ({ error }))
      )
    );

    connect(this.state)
      .with(nextState$)
      .with(this.add$, (state, checklistItem) => ({
        checklistItems: [
          ...state.checklistItems,
          {
            ...checklistItem.item,
            id: GuidHelper.CreateGuid(),
            createdDate: new Date(),
            checklistId: checklistItem.checklistId,
            checked: false
          }
        ]
      }))
      .with(this.edit$, (state, updateChecklistItem) => ({
        checklistItems: state.checklistItems.map((item) =>
          item.id == updateChecklistItem.id ? { ...item, ...updateChecklistItem.data } : item
        )
      }))
      .with(this.remove$, (state, checklistItemId) => ({
        checklistItems: state.checklistItems.filter((item) => item.id !== checklistItemId)
      }))
      .with(this.toggle$, (state, checklistItemId) => ({
        checklistItems: state.checklistItems.map((item) => 
          item.id === checklistItemId ? {
            ...item,
            checked: !item.checked,
            closedDate: !item.checked ? new Date() : undefined
          } : item
        )
      }))
      .with(this.resetToggles$, (state, checklistId) => ({
        checklistItems: state.checklistItems.map((item) => 
          item.checklistId === checklistId ? { ...item, checked: false, closedDate: undefined } : item
        )
      }))
      .with(this.checklistRemoved$, (state, checklistId) => ({
        checklistItems: state.checklistItems.filter((item) => item.checklistId !== checklistId)
      }))
  }
}