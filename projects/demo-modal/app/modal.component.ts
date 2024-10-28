import { Component, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  imports: [ResizableModule],
  styles: [
    `
      .rectangle {
        position: relative;
        top: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 150px;
        background-color: #fd4140;
        border: solid 1px #121621;
        color: #121621;
        margin: auto;
        box-sizing: border-box; // required for the enableGhostResize option to work
      }

      .resize-handle-top,
      .resize-handle-bottom {
        position: absolute;
        height: 5px;
        cursor: row-resize;
        width: 100%;
      }

      .resize-handle-top {
        top: 0;
      }

      .resize-handle-bottom {
        bottom: 0;
      }

      .resize-handle-left,
      .resize-handle-right {
        position: absolute;
        height: 100%;
        cursor: col-resize;
        width: 5px;
      }

      .resize-handle-left {
        left: 0;
        top: 0;
      }

      .resize-handle-right {
        right: 0;
        top: 0;
      }

      ::ng-deep .resize-ghost-element {
        overflow: hidden;
      }
    `,
  ],
  template: `
    <div
      mwlResizable
      mwlResizableRootElement=".modal-dialog"
      [enableGhostResize]="false"
      (resizing)="onResizing($event)"
    >
      <div class="modal-header">
        <h4 class="modal-title">Hi there!</h4>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="activeModal.dismiss('Cross click')"
        ></button>
      </div>
      <div class="modal-body">
        <p>Hello, {{ name }}!</p>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="activeModal.close('Close click')"
        >
          Close
        </button>
      </div>

      <div
        class="resize-handle-top"
        mwlResizeHandle
        [resizeEdges]="{ top: true }"
      ></div>
      <div
        class="resize-handle-left"
        mwlResizeHandle
        [resizeEdges]="{ left: true }"
      ></div>
      <div
        class="resize-handle-right"
        mwlResizeHandle
        [resizeEdges]="{ right: true }"
      ></div>
      <div
        class="resize-handle-bottom"
        mwlResizeHandle
        [resizeEdges]="{ bottom: true }"
      ></div>
    </div>
  `,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);

  @Input() name: string;

  public elem: ElementRef = inject(ElementRef);

  private renderer: Renderer2 = inject(Renderer2);

  onResizing(event: ResizeEvent): void {
    // modify the style of the parent (.modal-dialog) of the resizable element

    const parent = this.elem.nativeElement.closest('.modal-dialog');
    this.renderer.setStyle(parent, 'width', `${event.rectangle.width}px`);
    this.renderer.setStyle(parent, 'height', `${event.rectangle.height}px`);
    this.renderer.setStyle(parent, 'left', `${event.rectangle.left}px`);
    this.renderer.setStyle(parent, 'top', `${event.rectangle.top}px`);
    this.renderer.setStyle(parent, 'overflow', 'scroll');
    this.renderer.setStyle(parent, 'position', 'fixed');
    this.renderer.setStyle(parent, 'max-width', `${event.rectangle.width}px`);
  }
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
})
export class NgbdModalComponent {
  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }
}
