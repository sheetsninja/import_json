/**
 * Returns JSON data for a public URL provided
 *  @param {url} the URL to a public JSON feed
 *  @param {path} the 
 * @return Simple JSON data
 * @customfunction
 * This function does not support parsing complicated JSON structures
 */
function IMPORTJSON(url,path) {  
    let response = UrlFetchApp.fetch(url);
    let data = JSON.parse(response.getContentText());
    if (path != null) {
        path = path.split(",");
        path.forEach(x => data = data[path]);
    }

    if (!data.length) { return []; }

    let rows = [];
    let headers = Object.keys(data[0]);
    rows.push(headers);

    for (i=0; i<data.length; i++) {
        let row = [];
        for (j=0; j<headers.length; j++) {
            let thisItem = data[i][headers[j]]
            if (Array.isArray(thisItem)) { thisItem = thisItem.join(",")}
            row.push(data[i][headers[j]]);
        }
        rows.push(row);
    }

    return rows;
}
