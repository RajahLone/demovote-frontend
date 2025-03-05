
export enum ProductionTypeEnum
{
  EXECUTABLE = "Exécutable",
  GRAPHE = "Graphe", 
  MUSIQUE = "Musique", 
  VIDEO = "Vidéo", 
  TOPIC = "Topic",
  AUTRE = "Autre"
}

export class Production 
{
  numeroProduction: number = 0;
  type: ProductionTypeEnum = ProductionTypeEnum.EXECUTABLE;
  titre: string = "";
  auteurs: string = "";
  groupes: string = "";
  plateforme: string = "";
  commentaire: string = "";
  informationsPrivees: string = "";
  numeroParticipant: number = 0;
  nomArchive: string = "";
  archive!: string | any;
  vignette!: string | any;
  numeroVersion: number = 0;
}


export enum ProductionTypeKeys
{
  EXECUTABLE = "EXECUTABLE",
  GRAPHE = "GRAPHE", 
  MUSIQUE = "MUSIQUE", 
  VIDEO = "VIDEO", 
  TOPIC = "TOPIC",
  AUTRE = "AUTRE"
}

export class ProductionShort
{
  dateCreation: string = "";
  dateModification: string = "";
  numeroProduction: number = 0;
  adresseIP: string = "";
  type: ProductionTypeKeys = ProductionTypeKeys.EXECUTABLE;
  titre: string = "";
  auteurs: string = "";
  groupes: string = "";
  plateforme: string = "";
  commentaire: string = "";
  informationsPrivees: string = "";
  numeroGestionnaire: number = 0;
  nomGestionnaire: string = "";
  nomArchive: string = "";
  vignette!: string | any;
  numeroVersion: number = 0;
}
