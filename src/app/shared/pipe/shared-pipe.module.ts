import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { YesNoPipe } from "./yes-no.pipe";
import { UnderscorePipe } from './underscore.pipe';

@NgModule({
  
  imports: [
    CommonModule,
  ],
  exports: [
    YesNoPipe,
    UnderscorePipe  
  ],
  declarations: [	
    YesNoPipe,
    UnderscorePipe
   ]
})
export class SharedPipeModule { }