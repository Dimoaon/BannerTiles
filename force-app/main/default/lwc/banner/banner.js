import { LightningElement, api,track } from 'lwc';
import communityBasePath from '@salesforce/community/basePath';

export default class Banner extends LightningElement {

    /* VARIABLES */

    @api title = null;
    @api subtitle = null;

    @api showTitle = false;
    @api showSubtitle = false;

    @api backgroundColor = null;

    @api backgroundImage = null;
    @api showBackgroundImage = false;

    @api communityBasePath;

    @api titleColor = null;
    @api subtitleColor = null;

    @api titleFontSize = null;
    @api subtitleFontSize = null;

    @track isFirstRender = true;


    /* GETTERS */

    get backgroundImageUrl() {
        return this.cmsLink(this.backgroundImage);
    }

    get getShowTitle() {
        return this.showTitle === true && this.title;
    }

    get getShowSubtitle() {
        return this.showSubtitle === true && this.subtitle;
    }


    /* LIFECYCLES */

    renderedCallback() {
        if (this.isFirstRender) {
            this.isFirstRender = false;
            this.addCustomCssStyles();
        }
    }


    /* INIT METHODS */

    addCustomCssStyles() {
        const style = document.createElement('style');

        const bannerBackground = this.showBackgroundImage && this.backgroundImageUrl
            ? `
                background-image:url('${this.backgroundImageUrl}');
              `
            : `background-color:${this.backgroundColor || '#f4f6f9'};`;

        let customCssStyles = `
            .banner {
                ${bannerBackground}
            }

            .banner-title {
                color: ${this.titleColor || '#000'};
                font-size: ${this.titleFontSize || '1.5rem'};
            }

            .banner-subtitle {
                color: ${this.subtitleColor || '#000'};
                font-size: ${this.subtitleFontSize || '1rem'};
            }
        `;

        style.innerText = customCssStyles.replace(/ +(?= )|\n/g, '');

        this.template
            .querySelector('.custom-css-container')
            .appendChild(style);

    }


    /* MAIN METHODS */

    cmsLink(cmsId) {
        if (!cmsId || typeof cmsId !== 'string' || !cmsId.trim()) {
            return null;
        }

        const base = this.communityBasePath || communityBasePath;

        let link = `${base}/sfsites/c/cms/delivery/media/${cmsId}`;

        if (link.includes('/login/')) {
            link = link.replace('/login/', '/');
        }

        return link;
    }

}
