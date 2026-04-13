
export class Message
{
  erreur: string = "";
  alerte: string = "";
  information: string = "";
  autre: string = "";
}

export class Journees
{
  jour1Court: string = "";
  jour1Long: string = "";
  jour1Event: string = "";
  jour2Court: string = "";
  jour2Long: string = "";
  jour2Event: string = "";
  jour3Court: string = "";
  jour3Long: string = "";
  jour3Event: string = "";
  amigabus: boolean = false;
  dodosurplace: boolean = false;
}

export class Pagination
{
  nombreElements:number = 0;
  taillePage:number = 100;
  nombrePages:number = 1;
  pageCourante:number = 0;
}
