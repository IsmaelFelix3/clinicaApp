import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
  Input,
  Self,
  Optional
} from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[appAllowInput]"
})
export class AllowInputDirective {
  textbox!: HTMLInputElement;
  @Input()
  allowNumber!: boolean;
  @Input()
  allowLetter!: boolean;
  @Input()
  allowSpecialCharacter!: string;
  @Input()
  maxLength!: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() private ngControl: NgControl
  ) {}

  ngAfterViewInit() {
    this.textbox =
      this.el.nativeElement.tagName === "INPUT"
        ? this.el.nativeElement
        : this.el.nativeElement.querySelector("input");
    if (this.maxLength) {
      this.renderer.setAttribute(this.textbox, "maxlength", this.maxLength);
    }
  }

  @HostListener("input", ["$event"]) onInput(event: any) {
    const initalValue = this.textbox.value;
    let regexpStr = "";
    if (this.allowNumber) {
      regexpStr += "0-9";
    }
    if (this.allowLetter) {
      regexpStr += "a-zA-Z";
    }
    if (this.allowSpecialCharacter) {
      regexpStr += this.allowSpecialCharacter;
    }
    if (regexpStr === "") {
      return;
    }
    const regexp = new RegExp("[^" + regexpStr + "]*", "g");

    if (this.ngControl) {
      this.ngControl.control!.setValue(initalValue.replace(regexp, ""), {
        emitEvent: false
      });
    } else {
      this.renderer.setProperty(
        this.textbox,
        "value",
        initalValue.replace(regexp, "")
      );
      // if (initalValue !== this.textbox.value) {
      //   event.stopPropagation();
      // }
    }
  }
}
