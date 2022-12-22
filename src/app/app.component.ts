import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BankAccounsComponent} from "./component/bank-accounts-component/bank-accounts.component";
import {DomSanitizer} from "@angular/platform-browser";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {InfoDialogComponent} from "./dialog/info-dialog/info-dialog.component";
import {SuccessDialogComponent} from "./dialog/success-dialog/success-dialog.component";
import {CsvFileExporterService} from "./service/file-exporters/csv-file-exporter.service";
import {XmlFileExporterService} from "./service/file-exporters/xml-file-exporter.service";
import {HelpDialogComponent} from "./dialog/help-dialog/help-dialog.component";
import {JsonFileExporterService} from "./service/file-exporters/json-file-exporter.service";
import {StartDataService} from "./service/start-data.service";
import {LabelsService} from "./tools/labels.service";
import {faFileCsv} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  constructor(public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private http: HttpClient,
              private xmlExporter: XmlFileExporterService,
              private csvExporter: CsvFileExporterService,
              private jsonExporter: JsonFileExporterService,
              private startData: StartDataService,
              private labelService: LabelsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nips: new FormControl(),
      accounts: new FormControl(),
      modes: new FormControl(this.mode),
      regons: new FormControl()
    })
    this.labelFiller()
    this.data = (this.startData.setStartData())[0]
    this.searching = (this.startData.setStartData())[1]

  }

  nips = ''
  accounts = ''
  regons = ''
  mode = 0


  form!: FormGroup

  panelOpenState = false;

  nipLabel = ''
  accountLabel = ''
  regonLabel = ''

  searching = false
  data: any = ''




  bankAccounts(result: any) {
    const dialogRef = this.dialog.open(BankAccounsComponent,{
      data: {
        name: result.name,
        bankAccounts: result.accountNumbers
      }
    })
  }

  downloadJSON() {
    if(this.searching) {
      return this.jsonExporter.exportData(this.data)
    } else {
      this.searchingDownloadUnavailable()
    }

  }
  downloadXML() {
    if(this.searching) {
      return this.xmlExporter.exportData(this.data)
    } else {
      this.searchingDownloadUnavailable()
    }
  }

  downloadCSV() {
    if(this.searching) {
      this.csvExporter.exportData(this.data)
    } else {
      this.searchingDownloadUnavailable()
    }
  }

  searchingDownloadUnavailable() {
    this.dialog.open(InfoDialogComponent, {
      data: "Aby pobrać plik, wyszukaj najpierw poprawną firmę!"
    })
  }

  search() {
    this.searching = false
    switch (this.mode) {
      case 0:
        let nips = this.nips.split(',')
        for(let nip of nips) {
          if(nip.length != 10 || !Number(nip)) {
            this.dialog.open(InfoDialogComponent, {
              data: "NIPy muszą składać się z 10 cyfr!"
            })
            return
          }
        }
        var link = "https://wl-api.mf.gov.pl/api/search/nips/" + this.nips + "?date=2022-12-21"
        break;
      case 1:
        let accounts = this.accounts.split(',')
        for(let account of accounts) {
          if(account.length != 26 || !Number(account)) {
            this.dialog.open(InfoDialogComponent, {
              data: "Numery kont muszą składać się z 26 cyfr!"
            })
            return
          }
        }
        var link = "https://wl-api.mf.gov.pl/api/search/bank-accounts/" + this.accounts + "?date=2022-12-21"
        break;
      case 2:
        let regons = this.regons.split(',')
        for(let regon of regons) {
          if(regon.length != 9 || !Number(regon)) {
            this.dialog.open(InfoDialogComponent, {
              data: "Numery REGON muszą składać się z 9 cyfr!"
            })
            return
          }
        }
        var link = "https://wl-api.mf.gov.pl/api/search/regons/" + this.regons + "?date=2022-12-21"
        break;
      case 3:
        console.log("nip", this.nips, this.nips.length, "account", this.accounts, this.accounts.length, "nip")
        if(!Number(this.nips) || !Number(this.accounts) || this.nips.length != 10 || this.accounts.length != 26) {
          this.dialog.open(InfoDialogComponent, {
            data: 'Numer nip powinien składać się z 10 cyfr, a numer konta z 26 cyfr'
          })
          return
        }
        var link = "https://wl-api.mf.gov.pl//api/check/nip/" + this.nips +  "/bank-account/" + this.accounts + "?date=2022-12-21"
        break;
      case 4:
        if(!Number(this.regons) || !Number(this.accounts) || this.regons.length != 9  || this.accounts.length != 26) {
          this.dialog.open(InfoDialogComponent, {
            data: 'Numer REGON powinien składać się z 9 cyfr, a numer konta z 26 cyfr'
          })
          return
        }
        var link = "https://wl-api.mf.gov.pl/api/check/regon/" + this.regons + "/bank-account/" + this.accounts + "?date=2022-12-21"
        break;
      default:
        var link = ''
    }

    this.apiSearch(link)

  }

  apiSearch(link: string) {
    let errors = false
    this.data = ''


    this.http.get<any>(link).subscribe(data => {
      console.log("data", data)
      if(this.mode == 0 || this.mode == 1 || this.mode == 2) {
        for(let entry of data.result.entries) {
          if(entry.error) {
            errors = true
            console.log(entry.error)
            this.dialog.open(InfoDialogComponent, {
              data: entry.error.message
            })
          } else if(entry.subjects.length < 1) {
            let message = 'Jadna z wyszukiwanych firm nie zwróciła wyniku. Spróbuj ponownie.'
            errors = true
            this.dialog.open(InfoDialogComponent, {
              data: message
            })
          }
        }
      } else {
        if(data.result.accountAssigned == "TAK") {
          let result = 'Dane są zgodne!'
          this.dialog.open(SuccessDialogComponent, {
            data: result
          })
        } else {

          let result = 'Niepoprawne dane'
          this.dialog.open(SuccessDialogComponent, {
            data: result
          })
        }
      }


      if(!errors) {
        this.data = data
        this.searching = true
      }
    }, error => {
      this.dialog.open(InfoDialogComponent, {
        data: error.error.message
      })
    })
  }

  selectionChange() {
    this.searching = false
    this.data = ''
    this.labelFiller()
  }

  labelFiller() {
    this. nipLabel = this.labelService.nipLabelFiller(this.mode)
    this.accountLabel = this.labelService.accountLabelFiller(this.mode)
    this.regonLabel = this.labelService.regonLabelFiller(this.mode)
  }



  help() {
    this.dialog.open(HelpDialogComponent)
  }
}
