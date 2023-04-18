import template from './navLink.tmpl';
import router from '../../utils/router/router';
import { Link } from '../link';
import { LinkProps } from '../link/link';

export class NavLink extends Link {
  constructor(props: LinkProps) {
    const newProps = {
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go(props.link || '#');
        },
        ...props.events ?? {},
      },
    };

    super(newProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
