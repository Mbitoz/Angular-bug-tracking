import { ButtonModule } from 'primeng/button';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeIt, 'it');

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TabViewModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ButtonModule,
        TabViewModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'it-IT' }
    ]
})
export class CommonSharedModule { }
