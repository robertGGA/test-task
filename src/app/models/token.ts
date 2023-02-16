export interface Token {
  auth_token: string
}

export interface TokenWrapper {
  limit: number,
  tokens: Array<MainToken>
}

export interface MainToken {
  identifier: string,
  status: boolean,
  token: string
}
