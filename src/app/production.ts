
export class ProductionEnum { key!: string; value!: string; }

export const ProductionTypeList: ProductionEnum[] = 
[ 
  { key: "EXECUTABLE", value: "Exécutable"}, 
  { key: "GRAPHE", value: "Graphe"}, 
  { key: "MUSIQUE", value: "Musique"}, 
  { key: "VIDEO", value: "Vidéo"}, 
  { key: "TOPIC", value: "Topic"}, 
  { key: "AUTRE", value: "Autre"} 
];

export class Production 
{
  numeroProduction: number = 0;
  type: string = "AUTRE";
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

export class ProductionShort
{
  dateCreation: string = "";
  dateModification: string = "";
  numeroProduction: number = 0;
  adresseIP: string = "";
  type: string = "AUTRE";
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

export class ProductionFile
{
  numeroProduction: number = 0;
  titre: string = "";
  nomArchive: string = "";
  archive!: string | any;
}
