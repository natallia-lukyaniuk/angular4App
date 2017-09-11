import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPopup]'
})
export class PopupDirective {

  constructor(private el: ElementRef) { }

  @Input('appPopup') color: string;

  @HostListener('mouseenter') onMouseEnter() {
    console.log(this.color);
    this.highlight(this.color || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
