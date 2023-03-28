import { BlockInterface } from '../block/types';

export const render = (query: string, block: BlockInterface) => {
  // eslint-disable-next-line no-undef
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
};
