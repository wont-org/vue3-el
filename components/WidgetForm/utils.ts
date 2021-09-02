import {
    OptionItem, FieldNames, Cate 
} from './interface'

export const formatOptions = (
    opt: OptionItem[],
    fieldNames: FieldNames
): FieldNames[] => {
    return opt.map((item) => ({
        value: item[fieldNames.value] || '',
        label: item[fieldNames.label],
    }))
}

export const getCateFullPath = (
    originArr: Cate[],
    v: string | number
): any[] => {
    if (!v) {return []}
    const pathArr: number[] = []
    let needBreak = false
    const getPathArr = (arr: any[]) => {
        for (let i = 0; i < arr.length; i += 1) {
            if (needBreak) {break}
            pathArr[arr[i].level - 1] = arr[i].categoryId
            if (arr[i].categoryId === v) {
                needBreak = true
                break
            } else if (arr[i].childs) {
                getPathArr(arr[i].childs || [])
            }
        }
    }
    getPathArr(originArr)
    return needBreak ? pathArr : []
}
