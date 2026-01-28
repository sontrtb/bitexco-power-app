export interface IColor {
    primary: string;
    shadow: string;
    text: string;
    textNeutral: string;
    bgCard: string;
    bgImage: string;
    bottomTab: string;
    borderColor: string;
    disable: string;
    bg: string;
}

const colors: IColor = {
    primary: "#065B61",

    bg: "#F6F6F6",

    shadow: "rgba(0,0,0,0.15)",
    text: "#181818",

    textNeutral: "#6f6f6f",

    bgCard: "#FFFFFF",
    bgImage: "#effafb",

    bottomTab: "#FFFFFF",

    borderColor: "#D8D8D8",
    disable: "#CFCFCF"
};


const darkColors: IColor = {
    primary: "#00c951",

    bg: "#101010",

    shadow: "rgba(0,0,0,0.6)",
    text: "#EAEAEA",
    textNeutral: "#EAEAEA",

    bgCard: "#1A1A1A",
    bgImage: "#5e5e5eff",

    bottomTab: "#151515",

    borderColor: "#aaaaaaff",
    disable: "#3A3A3A"
};



export {
    colors,
    darkColors
};

