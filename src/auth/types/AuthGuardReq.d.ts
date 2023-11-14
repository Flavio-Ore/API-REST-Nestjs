export interface AuthGuardRequest extends Request {
  user: {
    email: string
  }
}
