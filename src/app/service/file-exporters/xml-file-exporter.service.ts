import * as JsonToXML from 'js2xmlparser';
import {Injectable} from "@angular/core";
import {saveAs} from "file-saver";
import {ExporterInterface} from "./exporter.interface";

@Injectable({
  providedIn: 'root'
})
export class XmlFileExporterService implements ExporterInterface{
  exportData(data: any) {
    let xml = this.convertToXML(data)
    return this.saveXML(xml)
  }

  private saveXML(xml: string) {
    return saveAs(
      new Blob([xml], { type: 'XML' }), 'wykaz-vat.xml'
    )
  }

  private convertToXML(data: any) {
    let options = {
      format: {
        doubleQuotes: true
      },
      declaration: {
        include: false
      }
    }

    return  JsonToXML.parse("UniversalEvent", data, options)
  }
}
