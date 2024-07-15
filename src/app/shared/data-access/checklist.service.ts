import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { AddChecklist, Checklist, EditChecklist } from "../interfaces/checklist";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GuidHelper } from "../utils/guid.helper";
import { StorageService } from "./storage.service";
import { ChecklistItemService } from "../../checklist/data-access/checklist-item.service";

export interface ChecklistState {
  checklists: Checklist[];
  loaded: boolean;
  error: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  storageService = inject(StorageService);
  checklistItemService = inject(ChecklistItemService);  

  // state
  private state = signal<ChecklistState>({
    checklists: [],
    loaded: false,
    error: null,
  });

  // selectors
  checklists = computed(() => this.state().checklists);
  loaded = computed(() => this.state().loaded);

  // sources
  private checklistsLoaded$ = this.storageService.loadChecklists();
  add$ = new Subject<AddChecklist>();
  remove$ = this.checklistItemService.checklistRemoved$;
  edit$ = new Subject<EditChecklist>();

  constructor() {
    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklists(this.checklists());
      }
    });

    // reducers
    this.checklistsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (checklists) =>
        this.state.update((state) => ({
          ...state,
          checklists,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });

    this.add$
      .pipe(takeUntilDestroyed())
      .subscribe((checklist) => 
        this.state.update((state) => ({
          ...state,
          checklists: [...state.checklists, this.addInitDataToChecklist(checklist)],
        })
      ));

    this.remove$.pipe(takeUntilDestroyed()).subscribe((id) =>
      this.state.update((state) => ({
        ...state,
        checklists: state.checklists.filter((checklist) => checklist.id !== id),
      }))
    );

    this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
      this.state.update((state) => ({
        ...state,
        checklists: state.checklists.map((checklist) =>
          checklist.id === update.id
            ? { ...checklist, title: update.data.title }
            : checklist
        ),
      }))
    );
  }

  private addInitDataToChecklist(checklist: AddChecklist): Checklist {
    return {
      ...checklist,
      dateCreated: new Date(),
      id: GuidHelper.CreateGuid(),
    }
  }
}