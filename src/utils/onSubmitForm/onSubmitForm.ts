import Block from '../block/block';
import { errorsMessages, isValidInputValue } from '../validators/validateInput';
import { isAllTrue } from '../mydash/isAllTrue';
import { isOneOfAllFalse } from '../mydash/isOneOfAllFalse';
import { capitalizeString } from '../mydash/capitalizeString';
import { toCamelCase } from '../mydash/toCamelCase';

export interface FormRequestData {
  [key: string]: unknown;
}

export const onSubmitForm = (form: Block, inputBlocks: Block[], controller: (data: FormRequestData) => void) => (event: FormDataEvent) => {
  event.preventDefault();
  const formData: FormData = new FormData(event.target as HTMLFormElement);

  const data: FormRequestData = inputBlocks.reduce((acc, inputBlock) => {
    const { name } = (inputBlock.children.input as Block).props.attributes;

    return {
      ...acc,
      [name]: formData.get(name),
    };
  }, {});

  const { checkPassword } = data;

  const predicates: {[key: string | never]: boolean } = {};

  inputBlocks.forEach((inputBlock) => {
    const { name } = (inputBlock.children.input as Block).props.attributes;
    const result = isValidInputValue(data[name] as string, name);

    if (result) {
      (inputBlock.children.errorMessage as Block).hide();
    } else {
      (inputBlock.children.errorMessage as Block).show();
    }

    predicates[`is${capitalizeString(toCamelCase(name))}`] = result;
  });

  const validationValues = Object.values(predicates).map((value) => value);

  if (isAllTrue(validationValues) && (checkPassword ? data?.password === checkPassword : true)) {
    (form.children.errorMessage as Block).hide();

    controller(data);
    return;
  }

  if (
    isOneOfAllFalse(validationValues)
  ) {
    (form.children.errorMessage as Block).setProps({
      errorText: errorsMessages.form,
    });

    (form.children.errorMessage as Block).show();

    return;
  }

  if (data?.password !== checkPassword && !!checkPassword) {
    (form.children.errorMessage as Block).setProps({
      errorText: errorsMessages.passwordsMatch,
    });

    (form.children.errorMessage as Block).show();
  }
};
