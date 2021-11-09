import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-detail-view-wrapper',
  templateUrl: './detail-view-wrapper.component.html',
  styleUrls: ['./detail-view-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailViewWrapperComponent implements OnInit {
  @Input() title: string = '';
  @Input() subTitle?: string;
  @Input() disablePersonRemoveButton: boolean;

  @Output() onEdit = new EventEmitter();
  @Output() onAssign = new EventEmitter();
  @Output() onDismiss = new EventEmitter();
  @Output() onShowHistory = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEditButtonClicked() {
    this.onEdit.emit(undefined);
  }

  onAssignButtonClicked() {
    this.onAssign.emit(undefined);
  }

  onDismissButtonClicked() {
    this.onDismiss.emit(undefined);
  }

  onShowHistoryButtonClicked() {
    this.onShowHistory.emit(undefined);
  }

  onDeleteButtonClicked() {
    this.onDelete.emit(undefined);
  }
}
