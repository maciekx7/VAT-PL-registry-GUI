import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  nipLabelFiller(mode: number): string {
    if (mode == 0) {
      return 'Wprowadz numery NIP'
    } else {
      return 'Wprowadz numer NIP'
    }
  }

  accountLabelFiller(mode: number) {
    if(mode == 1) {
      return 'Wprowadz numery kont'
    } else {
      return 'Wprowadz numer konta'
    }
  }

  regonLabelFiller(mode: number) {
    if(mode == 2) {
      return 'Wprowadz numery REGON'
    } else {
      return 'Wprowadz numer REGON'
    }
  }
}
