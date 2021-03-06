import Log from "../lib/Logger";

export function getQueryVariables(values: any) {
    const columns: string[] = [];
    const vars: any[] = [];
    if (Array.isArray(values) && values.length > 0) {
        vars.push([]);
        Object.keys(values[0]).forEach((item: any) => {
            columns.push(item);
        });
        values.forEach((item: any) => {
            const innerVars: any[] = [];
            Object.keys(item).forEach((key: any) => {
                innerVars.push(item[key]);
            });
            vars[0].push(innerVars);
        });
    } else {
        Object.keys(values).forEach((item: any) => {
            columns.push(item);
            vars.push(values[item]);
        });
    }
    return [columns, vars];
}

export function prepareStmtFromObject(params: any) {
    const constraints: string[] = [];
    const data: any[] = [];
    Object.keys(params).forEach((item) => {
        if (!params[item]) {
            return;
        }
        if (Array.isArray(params[item])) {
            constraints.push(`${item} in (?)`);
            data.push(params[item]);
        } else if (typeof params[item] === "string" && params[item].indexOf(",") > -1) {
            constraints.push(`${item} in (?)`);
            data.push(params[item].split(","));
        } else if (params[item] instanceof RegExp) {
            constraints.push(`${item} REGEXP ?`);
            data.push(params[item]);
        } else if (params[item] && typeof params[item] === "object") {
            Object.keys(params[item]).forEach((value) => {
                if (value === "$gte") {
                    constraints.push(`${item} >= ?`);
                    data.push(params[item][value]);
                } else if (value === "$lte") {
                    constraints.push(`${item} <= ?`);
                    data.push(params[item][value]);
                } else if (value === "$gt") {
                    constraints.push(`${item} > ?`);
                    data.push(params[item][value]);
                } else if (value === "$lt") {
                    constraints.push(`${item} < ?`);
                    data.push(params[item][value]);
                } else if (value === "$like") {
                    if (Array.isArray(params[item][value])) {
                        const localConstraints: string[] = [];
                        params[item][value].forEach((likeValues: any) => {
                            localConstraints.push(`${item} LIKE ?`);
                            data.push(`%${likeValues}%`);
                        });
                        constraints.push(`(${localConstraints.join(" OR ")})`);
                    } else if (typeof params[item][value] === "string" && params[item][value].indexOf(",") > -1) {
                        const localConstraints: string[] = [];
                        params[item][value] = params[item][value].split(",");
                        params[item][value].forEach((likeValues: any) => {
                            localConstraints.push(`${item} LIKE ?`);
                            data.push(`%${likeValues}%`);
                        });
                        constraints.push(`(${localConstraints.join(" OR ")})`);
                    } else {
                        constraints.push(`${item} LIKE ?`);
                        data.push(`%${params[item][value]}%`);
                    }
                }
            });
        } else {
            constraints.push(`${item} = ?`);
            data.push(params[item]);
        }
    });
    return { constraints, data };
}

export function base64_encode(str: string) {
    return Buffer.from(str).toString("base64");
}

export function base64_decode(str: string) {
    return Buffer.from(str, "base64").toString("ascii");
}
