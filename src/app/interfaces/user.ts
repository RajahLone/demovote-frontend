
export class User
{
  numeroParticipant: number = 0;
  username: string = "";
  password: string = "";
  nom: string = "";
  prenom: string = "";
  role: string = "";
  delaiAvantDeconnexion: number = 15;
  accessToken: string = "";
  refreshToken: string = "";
  erreur: string = "";
}

export class RefreshToken
{
  accessToken: string = "";
  refreshToken: string = "";
}

export class NewPassword
{
  username: string = "";
  ancien: string = "";
  nouveau: string = "";
  erreur: string = "";
}
