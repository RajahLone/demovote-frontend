
export class ProductionEnum { key!: string; value!: string; }

export const ProductionTypeList: ProductionEnum[] =
[
  { key: "EXECUTABLE", value: $localize`Exécutable`},
  { key: "GRAPHE", value: $localize`Graphe`},
  { key: "MUSIQUE", value: $localize`Musique`},
  { key: "VIDEO", value: $localize`Vidéo`},
  { key: "TOPIC", value: $localize`Topic`},
  { key: "AUTRE", value: $localize`Autre`}
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
  dateCreation?: string;
  dateModification?: string;
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
  numeroCategorie: number = 0;
  ordrePresentation: number = 0;
  etatMedia: number = 0;
}

export class ProductionFile
{
  numeroProduction: number = 0;
  numeroParticipant: number = 0;
  titre: string = "";
  nomArchive: string = "";
  archive!: string | any;
}

export class ProductionItem
{
  numeroProduction: number = 0;
  type: string = "AUTRE";
  titre: string = "";
  auteurs: string = "";
  groupes: string = "";
  plateforme: string = "";
  numeroOrdre: number = 0;
}

export class PresentationFile
{
  numeroProduction: number = 0;
  etatMedia: number = 0;
  mediaMime: string = "application/octet-stream";
  mediaData!: string | any;
}
