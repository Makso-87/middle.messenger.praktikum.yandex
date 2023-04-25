import Block from '../block/block';
import { errorsMessages, isValidInputValue } from '../validators/validateInput';
import { isAllTrue } from '../mydash/isAllTrue';
import { isOneOfAllFalse } from '../mydash/isOneOfAllFalse';
import { capitalizeString } from '../mydash/capitalizeString';
import { toCamelCase } from '../mydash/toCamelCase';

export type formRequestData<T extends Record<string, string> = unknown> = {
  [key: string]: T;
}

export const onSubmitForm = (form: Block, inputBlocks: Block[], controller: (data: formRequestData) => void) => (event: FormDataEvent) => {
  event.preventDefault();
  const formData: FormData = new FormData(event.target as HTMLFormElement);

  const data: formRequestData = inputBlocks.reduce((acc, inputBlock) => {
    const { name } = inputBlock.children.input.props.attributes;

    return {
      ...acc,
      [name]: formData.get(name),
    };
  }, {});

  const { checkPassword } = data;

  const predicates: {[key: string | never]: boolean } = {};

  inputBlocks.forEach((inputBlock) => {
    const { name } = inputBlock.children.input.props.attributes;
    const result = isValidInputValue(data[name], name);

    if (result) {
      inputBlock.children.errorMessage.hide();
    } else {
      inputBlock.children.errorMessage.show();
    }

    predicates[`is${capitalizeString(toCamelCase(name))}`] = result;
  });

  const validationValues = Object.values(predicates).map((value) => value);

  if (isAllTrue(validationValues) && (checkPassword ? data?.password === checkPassword : true)) {
    form.children.errorMessage.hide();

    controller(data);
    return;
  }

  if (
    isOneOfAllFalse(validationValues)
  ) {
    form.children.errorMessage.setProps({
      errorText: errorsMessages.form,
    });

    form.children.errorMessage.show();

    return;
  }

  if (data?.password !== checkPassword && !!checkPassword) {
    form.children.errorMessage.setProps({
      errorText: errorsMessages.passwordsMatch,
    });

    form.children.errorMessage.show();
  }
};
