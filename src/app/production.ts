
export class ProductionType
{
  constructor(public value:string) { }

  toString() { return this.value; }

  static executable = new ProductionType("Exécutable");
  static graphe = new ProductionType("Graphe");
  static musique = new ProductionType("Musique");
  static video = new ProductionType("Vidéo");
  static topic = new ProductionType("Topic");
  static autre = new ProductionType("Autre");
}

export class Production 
{
  dateCreation: string = "";
  dateModification: string = "";
  numeroVariable: number = 0;
  adresseIP: string = "";
  type: ProductionType = ProductionType.executable;
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

