import { ButtonModule } from 'primeng/button';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { DragDropModule } from 'primeng/dragdrop';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';


registerLocaleData(localeIt, 'it');

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TabViewModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        AvatarModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        SkeletonModule,
        DragDropModule,
        ToolbarModule,
        MenubarModule,
        TooltipModule,
        ConfirmPopupModule,
        MessagesModule,
        MessageModule,
        DividerModule,
        FieldsetModule,
        PanelModule,
        DropdownModule,
        InputTextareaModule
    ],
    exports: [
        ButtonModule,
        TabViewModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        AvatarModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        SkeletonModule,
        DragDropModule,
        ToolbarModule,
        MenubarModule,
        TooltipModule,
        ConfirmPopupModule,
        MessagesModule,
        MessageModule,
        DividerModule,
        FieldsetModule,
        PanelModule,
        DropdownModule,
        InputTextareaModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'it-IT' }
    ]
})
export class CommonSharedModule { }
