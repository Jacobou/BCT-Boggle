import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-time-up-modal',
  templateUrl: './time-up-modal.component.html',
  styleUrls: ['./time-up-modal.component.scss']
})
export class TimeUpModalComponent {
  @Input() message: string = '';
  @Output() restartGame: EventEmitter<void> | undefined;
  constructor(public activeModal: NgbActiveModal) { }

  endGame(): void {
    this.activeModal.close('Close click');
    this.restartGame?.emit();
  }
}
