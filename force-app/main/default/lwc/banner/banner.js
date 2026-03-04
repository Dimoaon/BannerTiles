import { LightningElement, api } from 'lwc';

export default class Banner extends LightningElement {

    @api title = null;
    @api subtitle = null;

    @api showTitle = false;
    @api showSubtitle = false;

    @api backgroundColor = null;
    
    @api backgroundImage = null;
    @api showBackgroundImage = false;

    get bannerStyle() {
        return `background-color:${this.backgroundColor || '#f4f6f9'};`;
    }

    get getShowTitle() {
        return this.showTitle === true && this.title;
    }

    get getShowSubtitle() {
        return this.showSubtitle === true && this.subtitle;
    }

}