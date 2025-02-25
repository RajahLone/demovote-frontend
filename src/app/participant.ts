
export class ParticipantModePaiement
{
  constructor(public value:string) { }

  toString() { return this.value; }

  static cheque = new ParticipantModePaiement("Chèque");
  static virement = new ParticipantModePaiement("Virement");
  static paypal = new ParticipantModePaiement("Paypal");
  static especes = new ParticipantModePaiement("Espèces");
  static autre = new ParticipantModePaiement("Autre");
}

export class ParticipantStatus
{
  constructor(public value:string) { }

  toString() { return this.value; }

  static en_attente = new ParticipantStatus("En attente");
  static paye_cheque = new ParticipantStatus("Payé chèque");
  static paye_especes = new ParticipantStatus("Payé espèces");
  static virement_bancaire = new ParticipantStatus("Virement bancaire");
  static virement_paypal = new ParticipantStatus("Virement Paypal");
  static orga = new ParticipantStatus("Orga");
  static guest = new ParticipantStatus("Guest");
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
  status: ParticipantStatus = ParticipantStatus.en_attente;
  withMachine: boolean = true;
  commentaire: string = "";
  hereDay1: boolean = false;
  hereDay2: boolean = false;
  hereDay3: boolean = false;
  sleepingOnSite: boolean = true;
  useAmigabus: boolean = false;
  modePaiement: ParticipantModePaiement = ParticipantModePaiement.autre;
  dateInscription: string = "";
  sommeRecue: string = "";
  arrived: boolean = false;
}
