import { LightningElement, api } from 'lwc';
import communityBasePath from '@salesforce/community/basePath';

export default class Tiles extends LightningElement {

    @api communityBasePath;

    /* TILE 1 */

    @api showTile1 = false;
    @api tile1ShowTitle = false;
    @api tile1Title = null;
    @api tile1ShowDescription = false;
    @api tile1Description = null;
    @api tile1ShowImage = false;
    @api tile1Image = null;
    @api tile1BackgroundColor = null;
    @api tile1LinkUrl = null;
    @api tile1OpenInNewTab = false;

    /* TILE 2 */

    @api showTile2 = false;
    @api tile2ShowTitle = false;
    @api tile2Title = null;
    @api tile2ShowDescription = false;
    @api tile2Description = null;
    @api tile2ShowImage = false;
    @api tile2Image = null;
    @api tile2BackgroundColor = null;
    @api tile2LinkUrl = null;
    @api tile2OpenInNewTab = false;

    /* TILE 3 */

    @api showTile3 = false;
    @api tile3ShowTitle = false;
    @api tile3Title = null;
    @api tile3ShowDescription = false;
    @api tile3Description = null;
    @api tile3ShowImage = false;
    @api tile3Image = null;
    @api tile3BackgroundColor = null;
    @api tile3LinkUrl = null;
    @api tile3OpenInNewTab = false;

    /* TILE 4 */

    @api showTile4 = false;
    @api tile4ShowTitle = false;
    @api tile4Title = null;
    @api tile4ShowDescription = false;
    @api tile4Description = null;
    @api tile4ShowImage = false;
    @api tile4Image = null;
    @api tile4BackgroundColor = null;
    @api tile4LinkUrl = null;
    @api tile4OpenInNewTab = false;

    /* TILE 5 */

    @api showTile5 = false;
    @api tile5ShowTitle = false;
    @api tile5Title = null;
    @api tile5ShowDescription = false;
    @api tile5Description = null;
    @api tile5ShowImage = false;
    @api tile5Image = null;
    @api tile5BackgroundColor = null;
    @api tile5LinkUrl = null;
    @api tile5OpenInNewTab = false;

    /* TILE 6 */

    @api showTile6 = false;
    @api tile6ShowTitle = false;
    @api tile6Title = null;
    @api tile6ShowDescription = false;
    @api tile6Description = null;
    @api tile6ShowImage = false;
    @api tile6Image = null;
    @api tile6BackgroundColor = null;
    @api tile6LinkUrl = null;
    @api tile6OpenInNewTab = false;


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


    /* STYLE HELPER */

    getTileImageStyle(showImage, imageUrl, backgroundColor) {
        let style = `background-color:${backgroundColor || '#f4f6f9'};`;

        if (showImage && imageUrl) {
            style += `
                background-image:url('${imageUrl}');
                background-size:cover;
                background-position:center;
                background-repeat:no-repeat;
            `;
        }

        return style;
    }


    /* NAVIGATION */

    navigate(url, newTab) {
        if (!url) {
            return;
        }

        if (newTab) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    }

    keydown(event, linkUrl, openInNewTab) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.navigate(linkUrl, openInNewTab);
        }
    }


    /* TILES ARRAY FOR TEMPLATE */

    get tiles() {

        return [
            this.createTile(
                1,
                this.showTile1,
                this.tile1ShowTitle,
                this.tile1Title,
                this.tile1ShowDescription,
                this.tile1Description,
                this.tile1ShowImage,
                this.tile1Image,
                this.tile1BackgroundColor,
                this.tile1LinkUrl,
                this.tile1OpenInNewTab
            ),

            this.createTile(
                2,
                this.showTile2,
                this.tile2ShowTitle,
                this.tile2Title,
                this.tile2ShowDescription,
                this.tile2Description,
                this.tile2ShowImage,
                this.tile2Image,
                this.tile2BackgroundColor,
                this.tile2LinkUrl,
                this.tile2OpenInNewTab
            ),

            this.createTile(
                3,
                this.showTile3,
                this.tile3ShowTitle,
                this.tile3Title,
                this.tile3ShowDescription,
                this.tile3Description,
                this.tile3ShowImage,
                this.tile3Image,
                this.tile3BackgroundColor,
                this.tile3LinkUrl,
                this.tile3OpenInNewTab
            ),

            this.createTile(
                4,
                this.showTile4,
                this.tile4ShowTitle,
                this.tile4Title,
                this.tile4ShowDescription,
                this.tile4Description,
                this.tile4ShowImage,
                this.tile4Image,
                this.tile4BackgroundColor,
                this.tile4LinkUrl,
                this.tile4OpenInNewTab
            ),

            this.createTile(
                5,
                this.showTile5,
                this.tile5ShowTitle,
                this.tile5Title,
                this.tile5ShowDescription,
                this.tile5Description,
                this.tile5ShowImage,
                this.tile5Image,
                this.tile5BackgroundColor,
                this.tile5LinkUrl,
                this.tile5OpenInNewTab
            ),

            this.createTile(
                6,
                this.showTile6,
                this.tile6ShowTitle,
                this.tile6Title,
                this.tile6ShowDescription,
                this.tile6Description,
                this.tile6ShowImage,
                this.tile6Image,
                this.tile6BackgroundColor,
                this.tile6LinkUrl,
                this.tile6OpenInNewTab
            )
        ];
        
    }

    createTile(index, show, showTitle, title, showDescription, description, showImage, image, backgroundColor, linkUrl, openInNewTab) {
        const imageUrl = this.cmsLink(image);

        return {
            index,
            show,
            title,
            description,
            showTitle: showTitle && title,
            showDescription: showDescription && description,
            imageStyle: this.getTileImageStyle(showImage, imageUrl, backgroundColor),
            class: linkUrl ? 'tile tile-clickable' : 'tile',
            style: '',
            click: () => this.navigate(linkUrl, openInNewTab),
            keydown: (event) => this.keydown(event, linkUrl, openInNewTab)
        };
    }

}
