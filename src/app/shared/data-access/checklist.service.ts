import { Injectable, computed, effect, inject, signal } from "@angular/core";
import { AddChecklist, Checklist, EditChecklist } from "../interfaces/checklist";
import { EMPTY, map, merge, Subject } from "rxjs";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GuidHelper } from "../utils/guid.helper";
import { StorageService } from "./storage.service";
import { ChecklistItemService } from "../../checklist/data-access/checklist-item.service";
import { connect } from 'ngxtension/connect';

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
  private error$ = new Subject<string>();

  constructor() {
    // effects
    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklists(this.checklists());
      }
    });

    // reducers using ngxtension
    const nextState$ = merge(
      this.checklistsLoaded$.pipe(
        map((checklists) => ({ checklists, loaded: true }))
      ),
      this.error$.pipe(
        map((error) => ({ error }))
      ),
    );

    connect(this.state)
      .with(nextState$)
      .with(this.add$, (state, checklist) => ({
        checklists: [...state.checklists, this.addInitDataToChecklist(checklist)],
      }))
      .with(this.remove$, (state, id) => ({
        checklists: state.checklists.filter((checklist) => checklist.id !== id)
      }))
      .with(this.edit$, (state, update) => ({
        checklists: state.checklists.map((checklist) =>
          checklist.id === update.id
            ? { ...checklist, title: update.data.title }
            : checklist
        )
      }));
  }

  private addInitDataToChecklist(checklist: AddChecklist): Checklist {
    return {
      ...checklist,
      dateCreated: new Date(),
      id: GuidHelper.CreateGuid(),
    }
  }
}