import { Injectable, computed, signal } from "@angular/core";
import { AddChecklist, Checklist } from "../interfaces/checklist";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GuidHelper } from "../utils/guid.helper";

export interface ChecklistState {
  checklists: Checklist[]
}
@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  // state
  private state = signal<ChecklistState>({
    checklists: []
  });

  // selectors
  checklists = computed(() => this.state().checklists);

  // sources
  add$ = new Subject<AddChecklist>();

  constructor() {
    // reducers
    this.add$
    .pipe(takeUntilDestroyed())
    .subscribe((checklist) => 
      this.state.update((state) => ({
        ...state,
        checklists: [...state.checklists, this.addIdToChecklist(checklist)],
      })
    ));
  }

  private addIdToChecklist(checklist: AddChecklist): Checklist {
    return {
      ...checklist,
      id: GuidHelper.CreateGuid(),
    }
  }
}