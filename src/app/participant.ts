export enum ParticipantStatusEnum
{
  EN_ATTENTE = "En attente", 
  PAYE_CHEQUE = "Payé chèque", 
  PAYE_ESPECES = "Payé espèces", 
  VIREMENT_BANCAIRE = "Virement bancaire", 
  VIREMENT_PAYPAL = "Virement Paypal", 
  ORGA = "Orga", 
  GUEST = "Guest",
}

export enum ParticipantModePaiementEnum
{
  CHEQUE = "Chèque",
  VIREMENT = "Virement", 
  PAYPAL = "Paypal", 
  ESPECES = "Espèces", 
  AUTRE = "Autre",
}

export class Participant 
{
  dateCreation: string = "";
  dateModification: string = "";
  numeroParticipant: number = 0;
  nom: string = "";
  prenom: string = "";
  pseudonyme: string = "";
  groupe: string = "";
  motDePasse: string = "";
  passwordExpired: boolean = false;
  dateExpiration: string = "";
  delaiDeconnexion: number = 15;
  adresse: string = "";
  codePostal: string = "";
  ville: string = "";
  pays: string = "";
  numeroTelephone: string = "";
  email: string = "";
  status: ParticipantStatusEnum = ParticipantStatusEnum.EN_ATTENTE;
  withMachine: boolean = true;
  commentaire: string = "";
  hereDay1: boolean = false;
  hereDay2: boolean = false;
  hereDay3: boolean = false;
  sleepingOnSite: boolean = true;
  useAmigabus: boolean = false;
  modePaiement: ParticipantModePaiementEnum = ParticipantModePaiementEnum.CHEQUE;
  dateInscription: string = "";
  sommeRecue: string = "";
  arrived: boolean = false;
}

export class ParticipantShort
{
  numeroParticipant: number = 0;
  nom: string = "";
  prenom: string = "";
  pseudonyme: string = "";
}
