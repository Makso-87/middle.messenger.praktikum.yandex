import Block from '../block/block';

export const render = (query: string, block: Block) => {
  const root = document.querySelector(query);

  if (root) {
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
    return root;
  }

  const noContentElement = document.createElement('div');
  noContentElement.textContent = 'no content';
  return noContentElement;
};
