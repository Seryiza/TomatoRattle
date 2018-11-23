export default (template = '') => {
  const layout = document.createElement('div');
  layout.className = 'layout';
  layout.innerHTML = template;

  return layout;
};
