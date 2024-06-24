import { Component, TemplateRef, contentChild, effect, inject, input } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.less'
})
export class ModalComponent {
  dialog = inject(Dialog);
  isOpen = input.required<boolean>();
  template = contentChild.required(TemplateRef);

  constructor() {
    effect(() => {
      const isOpen = this.isOpen();

      if (isOpen) {
        this.dialog.open(this.template(), { panelClass: 'dialog-container' });
      } else {
        this.dialog.closeAll();
      }
    });
  }
}
