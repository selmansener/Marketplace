export interface SubmenuProps {
    mainCategory: {
        text: string;
        path: string;
    };
    subCategories: {
        text: string;
        path: string;
    }[];
}

export * from "./male-menu-items";
export * from "./female-menu-items";