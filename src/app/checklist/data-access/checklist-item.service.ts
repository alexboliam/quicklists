import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { AddChecklistItem, ChecklistItem, EditChecklistItem, RemoveChecklistItem } from "../../shared/interfaces/checklist-item";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GuidHelper } from "../../shared/utils/guid.helper";
import { RemoveChecklist } from "../../shared/interfaces/checklist";
import { StorageService } from "../../shared/data-access/storage.service";

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
    this.checklistItemsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (checklistItems) =>
        this.state.update((state) => ({
          ...state,
          checklistItems,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    this.add$.pipe(takeUntilDestroyed())
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

    this.toggle$.pipe(takeUntilDestroyed())
      .subscribe(
        (checklistItemId) => 
          this.state.update((state) => ({
            ...state,
            checklistItems: state.checklistItems.map((item) => 
              item.id === checklistItemId ? { ...item, checked: !item.checked } : item
            )
          }))
      );

    this.resetToggles$.pipe(takeUntilDestroyed())
      .subscribe(
        (checklistId) => 
          this.state.update((state) => ({
            ...state,
            checklistItems: state.checklistItems.map((item) => 
              item.checklistId === checklistId ? { ...item, checked: false } : item
            )
          }))
      );

    this.edit$.pipe(takeUntilDestroyed())
      .subscribe((updateChecklistItem) => 
        this.state.update((state) => ({
          ...state,
          checklistItems: state.checklistItems.map((item) =>
            item.id == updateChecklistItem.id ? { ...item, ...updateChecklistItem.data } : item
          )
        }))
      );

    this.remove$.pipe(takeUntilDestroyed())
      .subscribe((checklistItemId) => 
        this.state.update((state) => ({
          ...state,
          checklistItems: state.checklistItems.filter((item) => item.id !== checklistItemId)
        }))
      );

    this.checklistRemoved$.pipe(takeUntilDestroyed())
      .subscribe((checklistId) => 
        this.state.update((state) => ({
          ...state,
          checklistItems: state.checklistItems.filter((item) => item.checklistId !== checklistId)
        }))
      );
  }
}