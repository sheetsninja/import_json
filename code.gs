/**
 * Returns JSON data for a public URL provided
 *  @param {url} the URL to a public JSON feed
 *  @param {path} the top-level object name where the data array is found (can use commas to delineate a single path (e.g. "data,names") to the data)
 * @return Simple JSON data
 * @customfunction
 * This function does not support parsing complicated JSON structures
 */

function IMPORTJSON(url,path) {  
    let response = JSON.parse(UrlFetchApp.fetch(url).getContentText());
    if (path != null) { // if there is a path defined, follow it
        path = path.split(","); // if there are multiple objects structured, follow it linearally (e.g. if the entirety of the 2nd object is within the 1st object)
        path.forEach(x => data = data[path]);
    }

    if (!data.length) { return []; }

    let rows = [];
    rows.push(Object.keys(data[0]))

    for (i=0; i<data.length; i++) {
        let row = [];
        for (j=0; j<headers.length; j++) {
            let thisItem = data[i][headers[j]];
            if (Array.isArray(thisItem)) { thisItem = thisItem.join(",")} // if a final item is an array, we'll combine the elements using a comma
            row.push(data[i][headers[j]]);
        }
        rows.push(row);
    }
    return rows;
}
