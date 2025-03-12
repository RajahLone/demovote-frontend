export class ParticipantEnum { key!: string; value!: string; }

export const ParticipantStatutList: ParticipantEnum[] = 
[ 
  { key: "EN_ATTENTE", value: "En attente"}, 
  { key: "PAYE_CHEQUE", value: "Payé chèque"}, 
  { key: "PAYE_ESPECES", value: "Payé espèces"}, 
  { key: "VIREMENT_BANCAIRE", value: "Virement bancaire"}, 
  { key: "VIREMENT_PAYPAL", value: "Virement Paypal"}, 
  { key: "ORGA", value: "Orga"}, 
  { key: "GUEST", value: "Guest"} 
];

export const ParticipantModePaiementList: ParticipantEnum[] = 
[ 
  { key: "CHEQUE", value: "Chèque"}, 
  { key: "VIREMENT", value: "Virement"}, 
  { key: "PAYPAL", value: "Paypal"}, 
  { key: "ESPECES", value: "Espèces"}, 
  { key: "AUTRE", value: "Autre"}
];

export class Participant 
{
  dateCreation: string = "";
  dateModification: string = "";
  numeroParticipant: number = 0;
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
