import { Matches, ValidationOptions } from "class-validator";
import { NOTIMAIL_REGEX } from "./constants";

export const IsNotimail = (validationOptions?: ValidationOptions) => Matches(NOTIMAIL_REGEX, {
    message: 'invalid notimail correct format is username@pushnoti.com',
    ...{...validationOptions || {}},
});

export function isNotimail (value: any) {
    return Boolean(value) && NOTIMAIL_REGEX.test(value);
}