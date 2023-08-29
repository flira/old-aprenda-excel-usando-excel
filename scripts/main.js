(function () {
  'use strict';
  class ExcelGrid extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      const template = document.getElementById('excel-grid-title');
      this.shadowRoot.appendChild(template?.content.cloneNode(true));
    }
  }

  const defineElement = () => {
    !customElements.get('excel-grid') &&
      customElements.define('excel-grid', ExcelGrid);
  };

  document.addEventListener('readystatechange', defineElement);
})();