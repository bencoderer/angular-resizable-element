import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ResizableModule } from 'angular-resizable-element';
import { DemoComponent } from './demo.component';
import { NgbdModalComponent } from './modal.component';

@NgModule({
  declarations: [DemoComponent, NgbdModalComponent],
  imports: [BrowserModule, ResizableModule],
  bootstrap: [NgbdModalComponent],
})
export class DemoModule {}
