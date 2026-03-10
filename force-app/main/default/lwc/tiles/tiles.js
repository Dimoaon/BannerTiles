import { LightningElement, api, track } from 'lwc';
import communityBasePath from '@salesforce/community/basePath';

const LABELS = {
    openLink: 'Open the link'
};

const TILES_COUNT = 6;

export default class Tiles extends LightningElement {

    LABELS = LABELS;

    /* VARIABLES */

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

    /* COMMON */

    @api titleColor = null;
    @api titleFontSize = null;

    @api descriptionColor = null;
    @api descriptionFontSize = null;


    /* INTERNAL VARIABLES */

    @track isFirstRender = true;
    tiles = [];

    /* GETTERS */


    /* LIFECYCLES */

    renderedCallback() {
        if (this.isFirstRender) {
            this.parseTiles();
            this.addCustomCssStyles();
            this.isFirstRender = false;
        }
    }


    /* INIT METHODS */

    addCustomCssStyles() {
        const style = document.createElement('style');
        let customCssStyles = '';

        this.tiles.forEach(tile => {
            customCssStyles += `
                .tile-image-container-${tile.id} {
                    background-color:${tile.backgroundColor || '#f4f6f9'};
                }
                    
                .tile-title {
                    color: ${this.titleColor || '#000'};
                    font-size: ${this.titleFontSize || '1.125rem'};
                }

                .tile-description {
                    color: ${this.descriptionColor || '#000'};
                    font-size: ${this.descriptionFontSize || '0.875rem'};
                }
            `;
        });

        style.innerText = customCssStyles.replace(/ +(?= )|\n/g, '');

        this.template
            .querySelector('.custom-css-container')
            .appendChild(style);
    }


    parseTiles() {
        this.tiles = [];

        for (let index = 0; index < TILES_COUNT; index++) {
            let tileNumber = index + 1;

            if (!this[`showTile${tileNumber}`]) {
                continue;
            }

            this.tiles.push(
                this.createTile(
                    this.generateId(),
                    this[`tile${tileNumber}ShowTitle`],
                    this[`tile${tileNumber}Title`],
                    this[`tile${tileNumber}ShowImage`],
                    this.cmsLink(this[`tile${tileNumber}Image`]),
                    this[`tile${tileNumber}BackgroundColor`],
                    this[`tile${tileNumber}ShowDescription`],
                    this[`tile${tileNumber}Description`],
                    this[`tile${tileNumber}LinkUrl`],
                    this[`tile${tileNumber}OpenInNewTab`]
                )
            );
        }
    }
    

    /* HANDLERS */

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


    /* MAIN METHODS */

    createTile(id, showTitle, title, showImage, imageUrl, backgroundColor, showDescription, description, linkUrl, openInNewTab) {

        return {
            id,
            title,
            description,
            backgroundColor,
            showTitle: showTitle && title,
            showImage: showImage && imageUrl,
            imageUrl,
            imageContainerClass: `tile-image-container tile-image-container-${id}`,
            showDescription: showDescription && description,
            class: linkUrl ? 'tile tile-clickable' : 'tile',
            ariaLabel: title ? `${this.LABELS.openLink}: ${title}` : this.LABELS.openLink,
            click: () => this.navigate(linkUrl, openInNewTab),
            keydown: (event) => this.keydown(event, linkUrl, openInNewTab)
        };
    }


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


    generateId() {
        return 'tile-' + Math.random().toString(36).substring(2, 9);
    }

}
