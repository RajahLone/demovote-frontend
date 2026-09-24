export class ApplicationInfo
{
  version: string = "1.0.0";
  framework: string = "Angular 22+ - Bootstrap 5";
  date: string = "20260922";
  authors: string[] = ["Rajah Lone"];
}

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
