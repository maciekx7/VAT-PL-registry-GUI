import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'bankAccountComponent',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss']
})
export class BankAccounsComponent implements OnInit{
  title = 'cpu-vat';
  panelOpenState = false;

  constructor( public dialogRef: MatDialogRef<BankAccounsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
