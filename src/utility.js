export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    }
}


/* 
    get string time as 'HH:MM'
    return time as [HH, MM]
    - good for seting hours in Date()
 */
export const timeSeparator = (time) => {
    const arr = time.split(':');
    const hour = arr[0];
    const minutes = arr[1];
    const fixH = hour.indexOf('0') === 0 ? hour.substring(1) : hour;
    const fixM = minutes.indexOf('0') === 0 ? minutes.substring(1) : minutes;

    return [fixH, fixM]
};