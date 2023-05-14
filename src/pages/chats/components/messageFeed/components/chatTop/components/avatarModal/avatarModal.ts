import { ModalPopup } from '../../../../../../../../components/modalPopup';
import { CustomComponent } from '../../../../../../../../components/customComponent';
import { Form } from '../../../../../../../../components/form';
import { formTemplate } from './avatarModal.tmpl';
import { ErrorMessage } from '../../../../../../../../components/errorMessage';
import { errorsMessages } from '../../../../../../../../utils/validators/validateInput';
import { Input } from '../../../../../../../../components/input';
import { observe } from '../../../../../../../../hocs/withStore';
import { Avatar } from '../../../../../../../../components/avatar';
import { Button } from '../../../../../../../../components/button';
import chatsController from '../../../../../../../../controllers/ChatsController';
import store from '../../../../../../../../utils/store/store';
import Block from '../../../../../../../../utils/block/block';

const inputAvatar = new Input({
  initialClassName: 'avatar__change-button-input',
  attributes: {
    type: 'file',
    name: 'avatar',
    id: 'avatar',
  },
});

const AvatarObserved = observe(({ chats }) => ({ url: chats?.data?.currentChat?.avatar ?? '' }))(Avatar as typeof Block);

const form = new Form({
  className: 'form_chat-avatar',
  template: formTemplate,
  errorMessage: new ErrorMessage({
    errorText: errorsMessages.form,
  }),
  avatar: new AvatarObserved({
    inputId: 'avatar',
    input: inputAvatar,
  }),
  buttonCancel: new Button({
    text: 'Отменить',
    link: '/profile',
    className: 'button button_type_2',
  }),
});

const onChangeAvatar = (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form.getContent() as HTMLFormElement);
  formData.set('chatId', String(store.getState().chats?.data?.currentChat?.id));

  chatsController.setChatAvatar(formData);
};

inputAvatar.setProps({
  events: {
    input: onChangeAvatar,
  },
});

export const avatarModal = new ModalPopup({
  className: 'chat-users-modal',
  content: new CustomComponent({
    tagName: 'div',
    initialClassName: 'chat-users-modal__content',
    content: [
      new CustomComponent({
        initialClassName: 'avatar-modal-title',
        tagName: 'h2',
        text: 'Изменить аватарку чата',
      }),
      form,
    ],
  }),
});

avatarModal.hide();
