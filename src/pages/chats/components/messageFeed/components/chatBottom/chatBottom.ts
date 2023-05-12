import Block from '../../../../../../utils/block/block';
import { template } from './chatBottom.tmpl';
import { PropsInterface } from '../../../../../../utils/block/types';
import { Form } from '../../../../../../components/form';
import { InputBlock } from '../../../../../../components/inputBlock';
import { Input } from '../../../../../../components/input';
import { Button } from '../../../../../../components/button';
import { isValidInputValue } from '../../../../../../utils/validators/validateInput';
import store from '../../../../../../utils/store/store';

interface ChatBottomProps extends PropsInterface{}

export class ChatBottom extends Block<ChatBottomProps> {
  constructor(props: ChatBottomProps) {
    const newProps = {
      ...props,
      className: `chat-bottom ${props.className ?? ''}`,
    };

    super(newProps, 'div');
  }

  render() {
    return this.compile(template, this.props);
  }
}

const onSubmitForm = (event: FormDataEvent) => {
  event.preventDefault();
  const form: HTMLFormElement = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = {
    message: formData.get('message'),
    attach: formData.get('attach'),
  };

  const { sockets, chats: { data: { currentChat } } } = store.getState();

  const socket = sockets[currentChat.id];

  socket.send(JSON.stringify({ type: 'message', content: data.message }));
  form.reset();
};

const sendButton = new Button({
  initialClassName: 'send-message-button',
  className: 'send-message-button_disabled',
  attributes: {
    disabled: 'disabled',
  },
});

const validateInput = (event: InputEvent) => {
  const { value, name } = event.target as HTMLInputElement;
  const result = isValidInputValue(value, name);

  if (result) {
    sendButton.removeAttributes(['disabled']);
    sendButton.removeClassNames(['send-message-button_disabled']);
  } else {
    sendButton.setProps({
      className: 'send-message-button_disabled',
      attributes: {
        disabled: 'disabled',
      },
    });
  }
};

const inputMessage = new Input({
  initialClassName: 'message-input',
  attributes: {
    type: 'text',
    name: 'message',
    placeholder: 'Сообщение',
  },
  events: {
    input: validateInput,
  },
});

export const chatBottom = new ChatBottom({
  form: new Form({
    initialClassName: 'chat-bottom-form',
    template: '{{{attachButton}}} {{{input}}} {{{sendButton}}}',
    input: inputMessage,
    sendButton,
    events: { submit: onSubmitForm },
    attachButton: new InputBlock({
      initialClassName: 'attach-button',
      label: ' ',
      id: 'attach',
      input: new Input({
        initialClassName: 'attach-button-input',
        attributes: {
          type: 'file',
          name: 'attach',
          id: 'attach',
        },
      }),
    }),
  }),
});
