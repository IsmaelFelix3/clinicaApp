import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

class Product{
  clavProdServ: string | undefined;
  cantidad: number | undefined;
  clave: number | undefined;
}


@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {

  constructor(public fb: FormBuilder){}
  ngOnInit(): void {
    let importe = this.billForm.get('precioUnitario')?.value * this.billForm.get('cantidad')?.value;
    this.billForm.get('importe')?.setValue(importe)
  }

  public billForm: FormGroup = this.fb.group({
    customerName: [],
    costumerAddress: [],
    rfc: [],
    postalCode: [],
    usoCFDI: [],
    taxRegime: [],

    certificateNumber: [],
    voucherDate: [],
    taxFolio: [],
    certificateSerialNumberSat: [],
    certificationDateAndHour: [],
    export: [],

    claveProdServ: ['85121600'],
    cantidad: [1],
    ClaveUnidad: ['XNE'],
    Descripcion: ['Consulta Medica'],
    precioUnitario: [1000],
    importe: []
  });


  generatePDF(action = 'open') {
    let docDefinition: any = {
      content: []
    };
    docDefinition = {
      content: [
        {
          text: 'ELECTRONIC SHOP',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.billForm.get('customerName')?.value,
                bold:true
              },
              { text: this.billForm.get('address')?.value },
              { text: this.billForm.get('email')?.value },
              { text: this.billForm.get('contactNo')?.value }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              // ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
              // [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
            // text: this.invoice.additionalDetails,
            // margin: [0, 0 ,0, 15]
        },
        {
          // columns: [
          //   [{ qr: `${this.invoice.customerName}`, fit: '50' }],
          //   [{ text: 'Signature', alignment: 'right', italics: true}],
          // ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };

     if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
     }
    // else if(action === 'print'){
    //   pdfMake.createPdf(docDefinition).print();
    // }else{
    //   pdfMake.createPdf(docDefinition).open();
    // }

  }

  addProduct(){
    // this.invoice.products.push(new Product());
  }

}
