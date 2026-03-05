import { LightningElement, api } from 'lwc';
import communityBasePath from '@salesforce/community/basePath';

export default class Tiles extends LightningElement {

    /* TILE 1 */

    @api showTile1 = false;

    @api tile1ShowTitle = false;
    @api tile1Title = null;

    @api tile1ShowDescription = false;
    @api tile1Description = null;

    @api tile1ShowImage = false;
    @api tile1Image = null;

    @api communityBasePath;

    @api tile1BackgroundColor = null;

    @api tile1LinkUrl = null;
    @api tile1OpenInNewTab = false;


    /* CMS HELPER */

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


    /* IMAGE URL */

    get tile1ImageUrl() {
        return this.cmsLink(this.tile1Image);
    }

    /* IMAGE STYLE */

    get tile1ImageStyle() {
        let style = `background-color:${this.tile1BackgroundColor || '#f4f6f9'};`;

        if (this.tile1ShowImage && this.tile1ImageUrl) {
            style += `
                background-image:url('${this.tile1ImageUrl}');
                background-size:cover;
                background-position:center;
                background-repeat:no-repeat;
            `;
        }

        return style;
    }

    /* VISIBILITY GETTERS */

    get showTile1Title() {
        return this.tile1ShowTitle === true && this.tile1Title;
    }

    get showTile1Description() {
        return this.tile1ShowDescription === true && this.tile1Description;
    }

    get tile1Class() {
        if (this.tile1LinkUrl) {
            return 'tile tile-clickable';
        }
        
        return 'tile';
    }

    /* CLICK HANDLER */

    handleTile1Click() {
        if (!this.tile1LinkUrl) {
            return;
        }

        if (this.tile1OpenInNewTab) {
            window.open(this.tile1LinkUrl, '_blank');
        } else {
            window.open(this.tile1LinkUrl, '_self');
        }
    }

}
