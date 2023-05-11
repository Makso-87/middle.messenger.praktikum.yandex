import Block from '../utils/block/block';
import store, { StateInterface, StoreEvents } from '../utils/store/store';
import { isEqual } from '../utils/mydash/isEqual';
import { PropsInterface } from '../utils/block/types';

export const observe = (mapPropsToState: (state: StateInterface) => StateInterface) => (Component: typeof Block) => class extends Component {
  constructor(props: PropsInterface) {
    let state = mapPropsToState(store.getState());
    super({ ...props, ...state });

    store.on(StoreEvents.Updated, () => {
      const currentState = store.getState();
      const newState = mapPropsToState(currentState);

      if (!isEqual(state, newState)) {
        this.setProps({ ...newState });

        state = { ...newState };
      }
    });
  }
};
