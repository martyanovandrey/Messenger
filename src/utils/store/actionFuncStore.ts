function changeData(data: Record<string, Object>) {
    return { type: 'CHANGEDATA', data };
}

function pushData(data: Record<string, Object>) {
    return { type: 'PUSHDATA', data };
}

function deleteFromArrayData(data: Record<string, Object>) {
    return { type: 'DELETEFROMARRAY', data };
}

export {changeData, pushData, deleteFromArrayData}