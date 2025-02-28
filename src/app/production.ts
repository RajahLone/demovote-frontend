
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
  dateCreation: string = "";
  dateModification: string = "";
  numeroProduction: number = 0;
  adresseIP: string = "";
  type: ProductionTypeEnum = ProductionTypeEnum.EXECUTABLE;
  titre: string = "";
  auteurs: string = "";
  groupes: string = "";
  plateforme: string = "";
  commentaire: string = "";
  informationsPrivees: string = "";
  nomArchive: string = "";
  archive: string = "";
  vignette: string = "";
  numeroVersion: number = 1;
}

