import { html, css, LitElement } from 'lit-element';

export class NaraLogo extends LitElement {
  /**
   * LitElement life cycle - css render
   */
  static get styles() {
    return [css`
      :host {
        display: inline-flex;
        padding: var(--nara-logo-padding, 5px);
      }
      img {
        width: var(--nara-logo-width, auto);
        height: var(--nara-logo-height, auto);
      }
    `];
  }

  // haxProperty definition
  static get haxProperties() {
    return {
      canScale: true,
      canPosition: true,
      canEditSource: false,
      gizmo: {
        title: "NARA logo",
        description:
          "logo element for NARA, obviously as a hax capable element.",
        icon: "icons:android",
        color: "green",
        groups: ["Logo"],
        handles: [
          {
            type: "todo:read-the-docs-for-usage"
          }
        ],
        meta: {
          author: "weikai",
          owner: "National Archives and Records Administration"
        }
      },
      settings: {
        quick: [],
        configure: [
          {
            attribute: "size",
            description: "Size of the NARA logo to place",
            inputMethod: "select",
            options: {
              mini: "Mini",
              small: "Small",
              normal: "Normal",
              large: "Large"
            },
            required: false
          },
          {
            attribute: "toupper",
            description: "Whether to transform logo to upper case",
            inputMethod: "boolean",
            required: false
          }
        ],
        advanced: []
      }
    };
  }
  
  /**
   * LitElement / popular convention
   */
  static get properties() {
    return {
      format: { type: String },
      webcBasePath: { type: String },
      __logo: { type: String },
    };
  }

  pathFromUrl(url) {
    return url.substring(0, url.lastIndexOf("/") + 1);
  }
  /**
   * HTMLElement
   */
  constructor() {
    super();
    this.format = 'stack';
    this.webcBasePath = '';
  }

  /**
   * LitElement life cycle - render
   */
  render() {
    return html`
      <a href='https://www.archives.gov'><img src="${this.__logo}" loading="lazy" alt="National Archives" /></a>
    `;
  }
  /**
   * LitElement life cycle - property changed
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == 'format') {        
        var webcbasepath = this.webcBasePath  ? this.webcBasePath: new URL('.', import.meta.url).pathname;                
        switch (this[propName]) {
          case 'stack':
          case 'horizontal':
          case 'eagle':                        
            this.__logo = `${webcbasepath}/nara-logo-${this[propName]}.svg`;
            break;
          // this way if someone screws it up it still does something
          default:
            
            this.__logo = `${webcbasepath}/nara-logo-stack.svg`;
            break;
        }
      }
    });
  }
}
