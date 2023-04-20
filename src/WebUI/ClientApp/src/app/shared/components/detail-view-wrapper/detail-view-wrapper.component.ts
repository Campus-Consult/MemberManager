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

  @Output() onEdit = new EventEmitter<void>();
  @Output() onAssign = new EventEmitter<void>();
  @Output() onDismiss = new EventEmitter<void>();
  @Output() onShowHistory = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onEditButtonClicked() {
    this.onEdit.emit();
  }

  onAssignButtonClicked() {
    this.onAssign.emit();
  }

  onDismissButtonClicked() {
    this.onDismiss.emit();
  }

  onShowHistoryButtonClicked() {
    this.onShowHistory.emit();
  }

  onDeleteButtonClicked() {
    this.onDelete.emit();
  }
}
