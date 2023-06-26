export interface Item {
    title: string;
    colorTextItem?: string;
    image: string;
    name?: object;
    path?: string;
    redirect?: string;
    visible?: boolean;
}
export interface ItemSideBar extends Item {
    deployed?: boolean;
    subSection?: Array<Item>;
}
export interface Menu {
    top: Array<ItemSideBar>;
    above: Array<ItemSideBar>;
}
