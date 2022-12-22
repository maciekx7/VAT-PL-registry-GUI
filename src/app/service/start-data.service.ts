import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StartDataService {
  setStartData(): any[] {
    return [this.data, this.searchingFlag]
  }


  searchingFlag = true
  data =  {
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
}
