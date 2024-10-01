import { DomainException } from "@ttt-domain/shared";

export class EmailAlreadyInUseException extends DomainException {
  errCode = "email_already_in_use";
  domain = "user_management";
}
