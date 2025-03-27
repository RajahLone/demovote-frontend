
export class User
{
  username: string = "";
  password: string = "";
  nom: string = "";
  prenom: string = "";
  role: string = "";
  accessToken: string = "";
  refreshToken: string = "";
  erreur: string = "";
}

export class RefreshToken
{
  accessToken: string = "";
  refreshToken: string = "";
}
