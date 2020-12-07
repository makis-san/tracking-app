import cheerio from 'cheerio';

export default function tableToJson(html: any) {
    var jsonResponse: any = [];
    var $ = cheerio.load(html);
  let table = '#j_idt2_head';
      var tableAsJson:any = [];
      // Get column headings
      // @fixme Doesn't support vertical column headings.
      // @todo Try to support badly formated tables.
      var columnHeadings:any = [];
      $(table).find('tr').each(function(i, row) {
        $(row).find('th').each(function(j, cell) {
          columnHeadings[j] = $(cell).text().trim();
        });
  
      // Fetch each row
      $(table).find('tr').each(function(i, row) {
        var rowAsJson:any = {};
        $(row).find('td').each(function(j, cell) {
          if (columnHeadings[j]) {
            rowAsJson[ columnHeadings[j] ] = $(cell).text().trim();
          } else {
            rowAsJson[j] = $(cell).text().trim();
          }
        });
  
        // Skip blank rows
        if (JSON.stringify(rowAsJson) != '{}')
          tableAsJson.push(rowAsJson);
      });
  
      // Add the table to the response
      if (tableAsJson.length != 0)
        jsonResponse.push(tableAsJson);
    });
    console.log('JSON ->>>>>>      '+jsonResponse);
    return jsonResponse;
  }