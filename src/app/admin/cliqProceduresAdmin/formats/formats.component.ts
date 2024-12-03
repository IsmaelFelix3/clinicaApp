import { Component } from '@angular/core';

@Component({
  selector: 'app-formats',
  templateUrl: './formats.component.html',
  styleUrls: ['./formats.component.scss']
})
export class FormatsComponent {

  download(){
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = '/assets/formats/CLIQ-FTO-0000-NOTA-DE-ADMISION.pdf';
    link.download = 'formatoAdmision.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
