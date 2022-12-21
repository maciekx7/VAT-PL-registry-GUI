import * as JsonToXML from 'js2xmlparser';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class XmlFileExporter {
  convertXML(obj: any) {
    let options = {
      format: {
        doubleQuotes: true
      },
      declaration: {
        include: false
      }
    }

    return JsonToXML.parse("UniversalEvent", obj, options);
  }
}
