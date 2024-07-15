export interface Checklist {
  id: string;
  title: string;
  dateCreated: Date;
}

export type AddChecklist = Omit<Checklist, 'id'|'dateCreated'>;
export type EditChecklist = { id: Checklist['id'], data: AddChecklist };
export type RemoveChecklist = Checklist['id'];