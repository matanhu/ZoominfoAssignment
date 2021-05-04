import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CarouselModule,
    ButtonModule
  ]
})
export class SharedModule { }
