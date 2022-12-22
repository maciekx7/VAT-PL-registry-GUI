import {Injectable} from "@angular/core";
import {CsvDataModel} from "../../model/csv-data.model";
import {ExporterInterface} from "./exporter.interface";

@Injectable({
  providedIn: 'root'
})
export class CsvFileExporterService implements ExporterInterface{
  exportData(data: any) {
    let csv: any[] = this.convertToCSV(data)
    return this.exportToCsv(csv[0], csv[1], 'wykaz-vat')
  }


  private exportToCsv(data: any, headers: string[], filename: string) {
    const replacer = (key: any, value: null) => (value === null ? '' : value); //null values
    const header = headers
    const csv = data.map((row: { [x: string]: any; }) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(';')
    );
    csv.unshift(header.join(';'));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob(["\ufeff", csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = filename + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }


  convertToCSV(data: any) {
    let result: CsvDataModel[] = []
    for(let entry of data.result.entries) {
      let vat: CsvDataModel = new CsvDataModel()
      vat.name = entry.subjects[0].name
      vat.nip = entry.subjects[0].nip
      vat.krs = entry.subjects[0].krs
      vat.regon = entry.subjects[0].regon
      vat.residenceAddress = entry.subjects[0].residenceAddress
      vat.workingAddress = entry.subjects[0].workingAddress
      vat.registrationLegalDate = entry.subjects[0].registrationLegalDate
      vat.statusVat = entry.subjects[0].statusVat
      if(entry.subjects[0]) {
        vat.accounts = entry.subjects[0].accountNumbers.join(",")
      }
      result.push(vat)
    }
    let columns: string[] = ['name', 'nip', 'krs', 'regon',
      'residenceAddress', 'workingAddress', 'registrationLegalDate',
      'statusVat', 'accounts']

    return [result, columns]
    // return this.exportToCsv(result, columns, 'wykaz-vat')
  }
}
