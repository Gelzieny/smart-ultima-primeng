import {ChangeDetectorRef, Component, ElementRef, Input} from '@angular/core';
@Component({
    selector: 'popup-input-erros',
    templateUrl: './popup-inputs-error.component.html',
    styleUrls: ['./popup-inputs-error.component.scss'],
})
export class PopupInputsErrorComponent{
    parentWidth = '100%';
    showMessages: boolean;
    @Input() mode: 'popup' | 'messages' = 'popup';
    @Input() set hasErrors(value: boolean){
        this.showMessages = value;
        if (this.mode === 'popup'){
            const parentElement = this.elementRef.nativeElement.parentElement;
            this.parentWidth = parentElement ?  (parentElement.offsetWidth * 0.65) + 'px' : '100%';
        }
        this.cdr.detectChanges();
    }
    constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}
}
