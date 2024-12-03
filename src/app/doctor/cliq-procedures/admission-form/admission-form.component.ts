import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})
export class AdmissionFormComponent {

  constructor(public fb: FormBuilder){
  }

  admissionForm: FormGroup = this.fb.group({
    medicUnit: ['',Validators.required],
    patientName: ['', ],
    patientCurp: ['', ],
    admissionDate: ['', ],
    placeOrigin: ['', ],
    patientBirthdate: ['', ],
    sex: ['', ],
    etnicGroup: ['', ],
    religion: ['', ],
    civilStatus: ['', ],
    ocupation: ['', ],
    scholarship: ['', ],
    phoneNumber: ['', ],
    street: ['', ],
    addressNumber: ['', ],
    colony: ['', ],
    municipality: ['', ],
    postCode: ['', ],
    responsibleName: ['', ],
    responsibleStreet: ['', ],
    responsibleAddressNumberInt: ['', ],
    responsibleAddressNumberExt: ['', ],
    responsibleColony: ['', ],
    responsibleMunicipality: ['', ],
    responsiblePostCode: ['', ],
    responisblePhoneNumber: ['', ],
    kinship: ['', ],
    additionalNotes: ['', ],
  });

  //Función para validar una CURP
  curpValida(curp: any) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);

    if (!validado)  //Coincide con el formato general?
      return false;
    
    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17: any) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma      = 0.0,
            lngDigito    = 0.0;
        for(var i=0; i<17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }

    if (validado[2] != digitoVerificador(validado[1])) 
      return false;
        
    return true; //Validado
  }



  campoEsValido(campo: string){
    return this.admissionForm.controls[campo].errors && this.admissionForm.controls[campo].touched;
  }

  saveAdmission(){

    if(!this.curpValida(this.admissionForm.value.patientCurp)){
      Swal.fire('CURP Invalido');
    }
    
    console.log(this.admissionForm.value)
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday and days before from being selected.
    return day !== 0 && day !== 6 && d! > new Date();
  };

}
