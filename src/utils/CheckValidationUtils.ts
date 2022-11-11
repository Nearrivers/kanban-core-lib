import { validate } from "class-validator";
import { GenericEntity } from './GenericEntity';

export async function checkValidation<E extends GenericEntity>(object: E, errorKeyName: string) {
  const errors = await validate(object);
  if (errors.length > 0) {
    throw new Error(errors[0].constraints[errorKeyName]);
  }
  throw new Error()
}