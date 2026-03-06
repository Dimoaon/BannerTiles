import { LightningElement, api } from 'lwc';
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

    isFirstRender = true;
    tileIds = this.createTileIds();


    /* GETTERS */

    get tiles() {
        const tiles = [];

        for (let index = 0; index < TILES_COUNT; index++) {
            const tileNumber = index + 1;

            tiles.push(
                this.createTile(
                    this.tileIds[index],
                    this[`showTile${tileNumber}`],
                    this[`tile${tileNumber}ShowTitle`],
                    this[`tile${tileNumber}Title`],
                    this[`tile${tileNumber}ShowDescription`],
                    this[`tile${tileNumber}Description`],
                    this[`tile${tileNumber}LinkUrl`],
                    this[`tile${tileNumber}OpenInNewTab`]
                )
            );
        }

        return tiles;
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
        let customCssStyles = '';

        const tilesConfig = [
            { id: this.tileIds[0], showImage: this.tile1ShowImage, image: this.tile1Image, color: this.tile1BackgroundColor },
            { id: this.tileIds[1], showImage: this.tile2ShowImage, image: this.tile2Image, color: this.tile2BackgroundColor },
            { id: this.tileIds[2], showImage: this.tile3ShowImage, image: this.tile3Image, color: this.tile3BackgroundColor },
            { id: this.tileIds[3], showImage: this.tile4ShowImage, image: this.tile4Image, color: this.tile4BackgroundColor },
            { id: this.tileIds[4], showImage: this.tile5ShowImage, image: this.tile5Image, color: this.tile5BackgroundColor },
            { id: this.tileIds[5], showImage: this.tile6ShowImage, image: this.tile6Image, color: this.tile6BackgroundColor }
        ];

        tilesConfig.forEach(tile => {
            const imageUrl = this.cmsLink(tile.image);
            let background = `background-color:${tile.color || '#f4f6f9'};`;

            if (tile.showImage && imageUrl) {
                background += `
                    background-image:url('${imageUrl}');
                `;
            }

            customCssStyles += `
                .tile-image-${tile.id} {
                    ${background}
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

    createTile(id, show, showTitle, title, showDescription, description, linkUrl, openInNewTab) {

        return {
            id,
            show,
            title,
            description,
            showTitle: showTitle && title,
            showDescription: showDescription && description,
            class: linkUrl ? 'tile tile-clickable' : 'tile',
            imageClass: `tile-image tile-image-${id}`,
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

    createTileIds() {
        const tileIds = [];

        for (let index = 0; index < TILES_COUNT; index++) {
            tileIds.push(this.generateId());
        }

        return tileIds;
    }

    generateId() {
        return 'tile-' + Math.random().toString(36).substring(2, 9);
    }

}
