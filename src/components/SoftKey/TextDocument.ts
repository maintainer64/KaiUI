enum TextAlightWithAggregate{
    LEFT = 1,
    CENTER = 2,
    RIGHT = 3,
}

function trimString(v: string, count: number): string {
    return v.slice(0, count);
}

function alignTextSumbols(v: string, aggregate: string, lenght: number, align: TextAlightWithAggregate):string {
    const count_symbols = lenght - v.length;
    if (count_symbols <= 0){
        return v;
    }
    const left = Math.floor(count_symbols/2);
    const right = count_symbols - left;
    const left_string = aggregate.repeat(left);
    const right_string = aggregate.repeat(right);
    switch (align){
        case TextAlightWithAggregate.LEFT:
            return v + left_string + right_string;
        case TextAlightWithAggregate.CENTER:
            return left_string + v + right_string;
        case TextAlightWithAggregate.RIGHT:
            return left_string + right_string + v;
        default:
            return '';
    }
}

export function titleDocumentString({ left, right, center }: { left?: string; right?: string; center?: string}):string {
    const separator = '_';
    console.log("titleDocumentStringINPUT", { left, right, center })
    return alignTextSumbols(trimString(left || '', 9), separator, 9, TextAlightWithAggregate.LEFT) +
        separator +
        alignTextSumbols(trimString(center || '', 10), separator, 10, TextAlightWithAggregate.CENTER) +
        separator +
        alignTextSumbols(trimString(right || '', 9), separator, 9, TextAlightWithAggregate.RIGHT)
}
