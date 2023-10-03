import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  hideRequiredControl = new UntypedFormControl(false);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
