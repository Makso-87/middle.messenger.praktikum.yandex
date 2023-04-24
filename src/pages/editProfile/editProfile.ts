import Block from '../../utils/block/block';
import { Avatar } from '../../components/avatar';
import { Button } from '../../components/button';
import { InputBlock } from '../../components/inputBlock';
import { Input } from '../../components/input';
import { formTemplate, template } from './editProfile.tmpl';
import { Form } from '../../components/form';
import { errorsMessages, validateInput } from '../../utils/validators/validateInput';
import { onSubmitForm } from '../../utils/onSubmitForm/onSubmitForm';
import { ErrorMessage } from '../../components/errorMessage';
import { PropsInterface } from '../../utils/block/types';
import { observe } from '../../hocs/withStore';
import userController from '../../controllers/UserController';
import { NavLink } from '../../components/navLink';

interface EditProfileProps extends PropsInterface {}

export class EditProfile extends Block<EditProfileProps> {
  constructor(props: EditProfileProps) {
    const newProps = {
      ...props,
      className: `profile ${props.className ?? ''}`,
    };

    super('div', newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const onInput = (input) => (event) => {
  input.setProps({
    attributes: {
      ...input.props.attributes,
      value: event.target.value,
    },
  });
};

const FormObserved = observe(({ user }) => ({ firstName: user?.data?.first_name ?? '' }))(Form);

const AvatarObserved = observe(({ user }) => ({ url: user?.data?.avatar ?? '' }))(Avatar);

const InputEmailObserved = observe(({ user }) => (
  {
    attributes: {
      value: user?.data?.email ?? '',
      name: 'email',
      id: 'edit-email',
      placeholder: 'Почта',
      type: 'email',
    },
  }))(Input);

const InputLoginObserved = observe(({ user }) => (
  {
    attributes: {
      value: user?.data?.login ?? '',
      name: 'login',
      id: 'edit-login',
      placeholder: 'Логин',
      type: 'text',
    },
  }))(Input);

const InputFirstNameObserved = observe(({ user }) => (
  {
    attributes: {
      value: user?.data?.first_name ?? '',
      name: 'first_name',
      id: 'edit-first-name',
      placeholder: 'Имя',
      type: 'text',
    },
  }))(Input);

const InputSecondNameObserved = observe(({ user }) => (
  {
    attributes: {
      value: user?.data?.second_name ?? '',
      name: 'second_name',
      id: 'edit-last-name',
      placeholder: 'Фамилия',
      type: 'text',
    },
  }))(Input);

const InputDisplayNameObserved = observe(({ user }) => (
  {
    attributes: {
      value: user?.data?.display_name ?? '',
      name: 'display_name',
      id: 'edit-display-name',
      placeholder: 'Имя в чате',
      type: 'text',
    },
  }))(Input);

const InputPhoneObserved = observe(({ user }) => (
  {
    attributes: {
      value: user?.data?.phone ?? '',
      name: 'phone',
      id: 'edit-phone',
      placeholder: 'Телефон',
      type: 'text',
    },
  }))(Input);

const inputAvatar = new Input({
  initialClassName: 'avatar__change-button-input',
  attributes: {
    type: 'file',
    name: 'avatar',
    id: 'avatar',
  },
});

const inputEmail = new InputEmailObserved({});
const inputLogin = new InputLoginObserved({});
const inputFirstName = new InputFirstNameObserved({});
const inputSecondName = new InputSecondNameObserved({});
const inputDisplayName = new InputDisplayNameObserved({});
const inputPhone = new InputPhoneObserved({});

const inputEmailBlock = new InputBlock({
  errorText: errorsMessages.email,
  label: 'Почта',
  input: inputEmail,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.email,
  }),
});

const inputLoginBlock = new InputBlock({
  label: 'Логин',
  input: inputLogin,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.login,
  }),
});

const inputFirstNameBlock = new InputBlock({
  label: 'Имя',
  input: inputFirstName,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.first_name,
  }),
});

const inputSecondNameBlock = new InputBlock({
  label: 'Фамилия',
  input: inputSecondName,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.second_name,
  }),
});

const inputDisplayNameBlock = new InputBlock({
  label: 'Имя в чате',
  input: inputDisplayName,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.first_name,
  }),
});

const inputPhoneBlock = new InputBlock({
  label: 'Телефон',
  input: inputPhone,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.phone,
  }),
});

inputEmail.setProps({
  events: {
    blur: validateInput(inputEmailBlock),
    focus: validateInput(inputEmailBlock),
    input: onInput(inputEmail),
  },
});

inputLogin.setProps({
  events: {
    blur: validateInput(inputLoginBlock),
    focus: validateInput(inputLoginBlock),
    input: onInput(inputLogin),
  },
});

inputFirstName.setProps({
  events: {
    blur: validateInput(inputFirstNameBlock),
    focus: validateInput(inputFirstNameBlock),
    input: onInput(inputFirstName),
  },
});

inputSecondName.setProps({
  events: {
    blur: validateInput(inputSecondNameBlock),
    focus: validateInput(inputSecondNameBlock),
    input: onInput(inputSecondName),
  },
});

inputDisplayName.setProps({
  events: {
    blur: validateInput(inputDisplayNameBlock),
    focus: validateInput(inputDisplayNameBlock),
    input: onInput(inputDisplayName),
  },
});

inputPhone.setProps({
  events: {
    blur: validateInput(inputPhoneBlock),
    focus: validateInput(inputPhoneBlock),
    input: onInput(inputPhone),
  },
});

const inputs = [
  inputEmailBlock,
  inputLoginBlock,
  inputFirstNameBlock,
  inputSecondNameBlock,
  inputDisplayNameBlock,
  inputPhoneBlock,
];

const form = new FormObserved({
  className: 'form_edit-profile',
  template: formTemplate,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
  avatar: new AvatarObserved({
    inputId: 'avatar',
    input: inputAvatar,
  }),
  buttonSave: new Button({
    text: 'Сохранить',
  }),
  buttonCancel: new NavLink({
    text: 'Отменить',
    link: '/profile',
    className: 'button button_type_2',
  }),
  inputs,
});

const onChangeAvatar = (event) => {
  event.preventDefault();
  const formData = new FormData(form.getContent());
  formData.delete('email');
  formData.delete('login');
  formData.delete('first_name');
  formData.delete('second_name');
  formData.delete('display_name');
  formData.delete('phone');

  userController.updateUserAvatar(formData);
};

inputAvatar.setProps({
  events: {
    input: onChangeAvatar,
  },
});

const controller = (data: unknown) => {
  userController.updateUserData(data);
};

form.setProps({
  events: {
    submit: onSubmitForm(form, inputs, controller),
  },
});

export const editProfileData = {
  form,
};
