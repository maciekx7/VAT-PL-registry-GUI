import {ExporterInterface} from "./exporter.interface";
import {saveAs} from "file-saver";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class JsonFileExporterService implements ExporterInterface{
  exportData(data: any): any {
    return saveAs(
      new Blob([JSON.stringify(data, null, 2)],
        { type: 'JSON' }),
      'wykaz-vat.json'
    )
  }
}
