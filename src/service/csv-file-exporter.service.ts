import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CsvFileExporterService {
  exportToCsv(data: any, headers: string[], filename: string) {
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
}
