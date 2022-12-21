import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BankAccounsComponent} from "./bank-accounts-component/bank-accounts.component";
import {DomSanitizer} from "@angular/platform-browser";
import * as stream from "stream";
import { saveAs } from "file-saver";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {InfoDialogComponent} from "./info-dialog/info-dialog.component";
import {SuccessDialogComponent} from "./success-dialog/success-dialog.component";
import {CsvFileExporterService} from "../service/csv-file-exporter.service";
import {XmlFileExporter} from "../service/xml-file-exporter";
import * as JsonToXML from "js2xmlparser";
import {HelpDialogComponent} from "./help-dialog/help-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  constructor(public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private http: HttpClient,
              private csvFileExporterService: CsvFileExporterService,
              private xmlFileExporterService: XmlFileExporter
  ) {
  }

  nips = ''
  accounts = ''
  regons = ''
  mode = 0

  searching = false

  ngOnInit(): void {
        this.form = new FormGroup({
          nips: new FormControl(),
          accounts: new FormControl(),
          modes: new FormControl(this.mode),
          regons: new FormControl()
        })
    this.labelFiller()
    }



  form!: FormGroup
  sanitizedBlobUrl: any;
  filename!: string;

  title = 'cpu-vat';
  panelOpenState = false;

  nipLabel = ''
  accountLabel = ''
  regonlabel = ''

  data: any = {
    "result": {
      "entries": [
        {
          "identifier": "6762453507",
          "subjects": [
            {
              "name": "SOFTWARE MIND SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
              "nip": "6762453507",
              "statusVat": "Czynny",
              "regon": "122511878",
              "pesel": null,
              "krs": "0000411748",
              "residenceAddress": null,
              "workingAddress": "ALEJA JANA PAWŁA II 43B, 31-864 KRAKÓW",
              "representatives": [],
              "authorizedClerks": [],
              "partners": [],
              "registrationLegalDate": "2012-03-15",
              "registrationDenialBasis": null,
              "registrationDenialDate": null,
              "restorationBasis": null,
              "restorationDate": null,
              "removalBasis": null,
              "removalDate": null,
              "accountNumbers": [
                "57175010480000000039846853",
                "90175010480000000041159057",
                "28160014621080551550000002",
                "17160014621080551550000006",
                "22160014621080551550000013",
                "38160014621080551550000016",
                "49160014621080551550000012",
                "60160014621080551550000008",
                "65160014621080551550000015",
                "87160014621080551550000007",
                "92160014621080551550000014",
                "45175010480000000034856807",
                "92175010480000000034856737",
                "26175010480000000034856761"
              ],
              "hasVirtualAccounts": false
            }
          ]
        },
        {
          "identifier": "5860005293",
          "subjects": [
            {
              "name": "SYGNITY SPÓŁKA AKCYJNA",
              "nip": "5860005293",
              "statusVat": "Czynny",
              "regon": "190407926",
              "pesel": null,
              "krs": "0000008162",
              "residenceAddress": null,
              "workingAddress": "POSTĘPU 17B, 02-676 WARSZAWA",
              "representatives": [],
              "authorizedClerks": [],
              "partners": [],
              "registrationLegalDate": "2003-12-31",
              "registrationDenialBasis": null,
              "registrationDenialDate": null,
              "restorationBasis": null,
              "restorationDate": null,
              "removalBasis": null,
              "removalDate": null,
              "accountNumbers": [
                "06105000861000009030059993",
                "24105000861000009030056759",
                "28105000861000009030059985",
                "40124010371111001002805945",
                "35191010482268036400100001",
                "41105000861000009030068093",
                "51102010260000180202202976",
                "95105000861000009030056742",
                "46102010260000190204754505",
                "59102010260000120204802726",
                "15114019770000306731002002",
                "24160014621803944120000002",
                "51160014621803944120000001",
                "40160014621803944120000005",
                "42114019770000306731002001",
                "83194012100103771200100000"
              ],
              "hasVirtualAccounts": false
            }
          ]
        }
      ],
      "requestDateTime": "21-12-2022 17:13:02",
      "requestId": "xV5MX-8hman8e"
    }
  }


  bankAccounts(result: any) {
    const dialogRef = this.dialog.open(BankAccounsComponent,{
      data: {
        name: result.name,
        bankAccounts: result.accountNumbers
      }
    })
  }

  download() {
    if(this.searching) {
      return saveAs(
        new Blob([JSON.stringify(this.data, null, 2)], { type: 'JSON' }), 'sample.json'
      )
    } else {
      this.noSearchingDownloadAnavailable()
    }

  }
  downloadCSV() {
    if(this.searching) {
      let options = {
        format: {
          doubleQuotes: true
        },
        declaration: {
          include: false
        }
      }

      let xml =  JsonToXML.parse("UniversalEvent", this.data, options)


      return saveAs(
        new Blob([xml], { type: 'XML' }), 'sample.xml'
      )
    } else {
      this.noSearchingDownloadAnavailable()
    }
  }

  noSearchingDownloadAnavailable() {
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


    console.log(errors, 'errors')
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
    this.nipLabelFiller()
    this.accountLabelFiller()
    this.regonLabelFiller()
  }

  nipLabelFiller() {
    if(this.mode == 0) {
      this.nipLabel = 'Wprowadz NIPy'
    } else {
      this.nipLabel = 'Wprowadz NIP'
    }
  }

  accountLabelFiller() {
    if(this.mode == 1) {
      this.accountLabel = 'Wprowadz numery kont'
    } else {
      this.accountLabel = 'Wprowadz numer konta'
    }
  }

  regonLabelFiller() {
    if(this.mode == 2) {
      this.regonlabel = 'Wprowadz numery REGON'
    } else {
      this.regonlabel = 'Wprowadz numer REGON'
    }
  }

  help() {
    this.dialog.open(HelpDialogComponent)
  }
}
