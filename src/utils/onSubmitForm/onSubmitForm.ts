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
      inputBlock.setProps({ error: false });
    } else {
      inputBlock.setProps({ error: true });
    }

    predicates[`is${capitalizeString(toCamelCase(name))}`] = result;
  });

  const validationValues = Object.values(predicates).map((value) => value);

  if (isAllTrue(validationValues) && data.oldPassword === data.newPassword) {
    form.setProps({
      error: false,
    });

    // eslint-disable-next-line no-console
    console.log(data);
    return;
  }

  if (
    isOneOfAllFalse(validationValues)
  ) {
    form.setProps({
      errorText: errorsMessages.form,
      error: true,
    });

    return;
  }

  if (data?.oldPassword !== data?.newPassword) {
    form.setProps({
      errorText: errorsMessages.passwordsMatch,
      error: true,
    });
  }
};
