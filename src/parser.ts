import * as core from '@actions/core'

export function parse(excluded: string, variables: any): string[] {
    if (excluded == "") {
        return []
    } 
    core.debug(`Variables: ${JSON.stringify(variables)}`)
    let addList = excluded.replace(" ", "").split("+")
    let toAdd: string[] = []
    addList.forEach(i => {
        if (i.startsWith("\"") && i.endsWith("\"")) {
            toAdd.push(i)
        } else if (i.startsWith("var(") && i.endsWith(")")) {
            (variables[i.substring(4, i.length - 1)] as string[]).forEach(x => {
                toAdd.push(x)
            })
        } else {
            throw new Error(`Invalid Code Syntax: ${i}`)
        }
    })
    core.debug(`to add = ${JSON.stringify(toAdd)}`)
    return toAdd
}