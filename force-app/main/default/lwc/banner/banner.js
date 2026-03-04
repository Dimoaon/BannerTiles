import { LightningElement, api } from 'lwc';
import communityBasePath from '@salesforce/community/basePath';

export default class Banner extends LightningElement {

    @api title = null;
    @api subtitle = null;

    @api showTitle = false;
    @api showSubtitle = false;

    @api backgroundColor = null;

    @api backgroundImage = null;
    @api showBackgroundImage = false;

    @api communityBasePath;

    cmsLink(cmsId) {

        if (!cmsId || typeof cmsId !== 'string' || !cmsId.trim()) {
            return null;
        }

        const base = this.communityBasePath || window.location.origin;

        let link = `${base}/sfsites/c/cms/delivery/media/${cmsId}`;

        if (link.includes('/login/')) {
            link = link.replace('/login/', '/');
        }

        return link;
    }

    get backgroundImageUrl() {
        return this.cmsLink(this.backgroundImage);
    }

    get bannerStyle() {

        let style = `background-color:${this.backgroundColor || '#f4f6f9'};`;

        if (this.showBackgroundImage && this.backgroundImageUrl) {

            style += `
                background-image:url('${this.backgroundImageUrl}');
                background-size:cover;
                background-position:center;
                background-repeat:no-repeat;
            `;
        }

        return style;
    }

    get getShowTitle() {
        return this.showTitle === true && this.title;
    }

    get getShowSubtitle() {
        return this.showSubtitle === true && this.subtitle;
    }

}