export class ParticipantEnum { key!: string; value!: string; }

export const ProfilList: ParticipantEnum[] =
[
  { key: "ADMIN", value: $localize`Administrateur`},
  { key: "ORGA", value: $localize`Organisateur`},
  { key: "USER", value: $localize`Participant`},
];

export const ParticipantStatutList: ParticipantEnum[] =
[
  { key: "EN_ATTENTE", value: $localize`En attente`},
  { key: "PAYE_CHEQUE", value: $localize`Payé chèque`},
  { key: "PAYE_ESPECES", value: $localize`Payé espèces`},
  { key: "VIREMENT_BANCAIRE", value: $localize`Virement bancaire`},
  { key: "VIREMENT_PAYPAL", value: $localize`Virement Paypal`},
  { key: "ORGA", value: $localize`Orga`},
  { key: "GUEST", value: $localize`Guest`}
];

export const ParticipantModePaiementList: ParticipantEnum[] =
[
  { key: "CHEQUE", value: $localize`Chèque`},
  { key: "VIREMENT", value: $localize`Virement`},
  { key: "PAYPAL", value: $localize`Paypal`},
  { key: "ESPECES", value: $localize`Espèces`},
  { key: "AUTRE", value: $localize`Autre`}
];

export class Participant
{
  dateCreation?: string;
  dateModification?: string;
  numeroParticipant: number = 0;
  role: string = "USER";
  nom: string = "";
  prenom: string = "";
  pseudonyme: string = "";
  motDePasse: string = "";
  groupe: string = "";
  delaiDeconnexion: number = 15;
  adresse: string = "";
  codePostal: string = "";
  ville: string = "";
  pays: string = "";
  numeroTelephone: string = "";
  email: string = "";
  statut: string = "EN_ATTENTE";
  withMachine: boolean = true;
  commentaire: string = "";
  hereDay1: boolean = false;
  hereDay2: boolean = false;
  hereDay3: boolean = false;
  sleepingOnSite: boolean = true;
  useAmigabus: boolean = false;
  modePaiement: string = "CHEQUE";
  dateInscription: string = "";
  sommeRecue: string = "";
  arrived: boolean = false;
}

export class ParticipantShort
{
  numeroParticipant: number = 0;
  pseudonyme: string = "";
  nom: string = "";
  prenom: string = "";
}

export class ParticipantList
{
  numeroParticipant: number = 0;
  nom: string = "";
  prenom: string = "";
  pseudonyme: string = "";
  groupe: string = "";
  email: string = "";
  statut: string = "EN_ATTENTE";
  hereDay1: boolean = false;
  hereDay2: boolean = false;
  hereDay3: boolean = false;
  sleepingOnSite: boolean = true;
  arrived: boolean = false;
}
