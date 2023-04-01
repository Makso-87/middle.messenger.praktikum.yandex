import Block from '../block/block';
import { errorsMessages, isValidInputValue } from '../validators/validateInput';
import { isAllTrue } from '../mydash/isAllTrue';
import { isOneOfAllFalse } from '../mydash/isOneOfAllFalse';
import { capitalizeString } from '../mydash/capitalizeString';
import { toCamelCase } from '../mydash/toCamelCase';

export const onSubmitForm = (form: Block, inputBlocks: Block[]) => (event) => {
  event.preventDefault();
  const formData: FormData = new FormData(event.target);

  const data: {[key: string]: string} = inputBlocks.reduce((acc, inputBlock) => {
    const { name } = inputBlock.children.input.props.attributes;

    return {
      ...acc,
      [name]: formData.get(name),
    };
  }, {});

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

  if (isAllTrue(validationValues) && data.oldPassword === data.newPassword) {
    form.children.errorMessage.hide();

    // eslint-disable-next-line no-console
    console.log(data);
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

  if (data?.oldPassword !== data?.newPassword) {
    form.children.errorMessage.setProps({
      errorText: errorsMessages.passwordsMatch,
    });

    form.children.errorMessage.show();
  }
};
