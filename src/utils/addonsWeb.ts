export const EventListenerOnKeyDown = "kaioskey";

export const GetEventKey = (event: CustomKaioskeyEvent): string => {
    return event.detail.key;
}

export enum KaiosKeyEnum {
    ArrowDown="ArrowDown",
    ArrowUp="ArrowUp",
    ArrowLeft="ArrowLeft",
    ArrowRight="ArrowRight",
    Enter="Enter",
    SoftRight="SoftRight",
    SoftLeft="SoftLeft",
}

export interface IMappingKey { [key: string]: KaiosKeyEnum; }

const mapingKeysLaptop: IMappingKey = {
    "ArrowUp": KaiosKeyEnum.ArrowUp,
    "ArrowDown": KaiosKeyEnum.ArrowDown,
    "ArrowLeft": KaiosKeyEnum.ArrowLeft,
    "ArrowRight": KaiosKeyEnum.ArrowRight,
    "End": KaiosKeyEnum.SoftRight,
    "Home": KaiosKeyEnum.SoftLeft,
    "Enter": KaiosKeyEnum.Enter,
};

const mapingKeysUCBrowser: IMappingKey = {
    "8": KaiosKeyEnum.ArrowDown,
    "2": KaiosKeyEnum.ArrowUp,
    "6": KaiosKeyEnum.ArrowLeft,
    "4": KaiosKeyEnum.ArrowRight,
    "5": KaiosKeyEnum.Enter,
    "#": KaiosKeyEnum.SoftRight,
    "*": KaiosKeyEnum.SoftLeft,
};

interface CustomKaioskeyEvent{
    detail: {key: KaiosKeyEnum}
};

function mapingKeys (key: string, mappingKey: IMappingKey) : KaiosKeyEnum | null {
    const keyActive = mappingKey[key];
    return keyActive;
}

export function interceptionKeydown(mappingKey?: IMappingKey){
    document.addEventListener("keydown", function(event) {
        const keyActive = mapingKeys(event.key, mappingKey || mapingKeysLaptop);
        if (keyActive){
            const event: CustomKaioskeyEvent = {detail: { key: keyActive}}
            document.dispatchEvent(new CustomEvent(EventListenerOnKeyDown, event));
        }
    });
}