export class EvenementEnum { key!: string; value!: string; }

export const EvenementTypeList: EvenementEnum[] =
[
  { key: "GENERAL", value: $localize`Général`},
  { key: "REPAS", value: $localize`Restauration`},
  { key: "CONFERENCE", value: $localize`Conférence`},
  { key: "DEMOPARTY", value: $localize`Démoparty`},
  { key: "DIVERS", value: $localize`Divers`}
];

export class Evenement
{
  numeroEvenement: number = 0;
  jourDebut: string = "";      // YYYY-MM-DD
  heureDebut: string = "";     // HH24hMI (liste) ou HH24:MI (édition)
  heureFin: string = "";       // HH24hMI
  duree: number = 0;           // en minutes
  type: string = "GENERAL";
  intitule: string = "";
  descriptif: string = "";
  lien: string = "";
}
