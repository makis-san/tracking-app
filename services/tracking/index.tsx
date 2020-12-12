import axios from "axios";
import { DOMElement } from "react";
import cheerio from 'cheerio';
import { formatStatus, formatDateTime, formatLocal, formatOrigin, formatDestiny, parseData, parseHora } from "../formatter";
import tableToJson from '../table';
import { cos } from "react-native-reanimated";
global.Buffer = global.Buffer || require('buffer').Buffer;

const url:any = {
  Correios: {url:'https://www.linkcorreios.com.br/', method: 'get', data: {}},
  CargoBr: {url:'http://app.cargobr.com/Rastreamentos/Rastreamento/rastrear', method: 'post', data: {tipoBusca: 'P', nroBusca: ''}},
  Jadlog: {url: 'http://www.jadlog.com.br/siteInstitucional/tracking.jad', method: 'get', urlData:''}
}



export default async function track(tracking: string, carrier: 'Correios'|'CargoBr'|'Jadlog') { 
  let method:any = url[carrier].method;
  let urlData:string = '';
  let data: any = {};
  switch (carrier) {
    case'Correios':
      data = {url: tracking}
      break;
    case'CargoBr':
      data = {
        tipoBusca: 'P',
        nroBusca: tracking
      }
      break;
    case "Jadlog":
      urlData = '?cte='+tracking;
      data = {
          
      };
      break;
  }

  /// Setup Axios
  const api = axios.create({
    baseURL: url[carrier].url+urlData,
  });
    const response = (await api({
      url: data.url,
      method: url[carrier].method,
      data: data
    }).then((response) => convertHtmlToJson(response.data, carrier)))
    return response;
}

function convertHtmlToJson(htmlString:string, carrier: 'Correios'|'CargoBr'|'Jadlog') {
    const html = cheerio.load(htmlString);
    // console.log(tableToJson(htmlString));

    let find:string = '';
    const elemArray:any = [];
    let elemMap: any[] = [];
    switch (carrier) {
      case 'Correios':
        html("ul.linha_status").each((_, elem) => {
          elemArray.push(elem);
          find = 'li';
        });
          elemArray.shift()
           elemMap = elemArray.map((elem:any) => {
              const mapObj:any = {};
              html(elem)
                .find(find)
                .each((_, liElem) => {
                  const text = html(liElem).text();
                  if (text) {
                    if (text.includes("Status")) mapObj.status = formatStatus(text);
                    if (text.includes("Data")) {
                      const dateTime = formatDateTime(text);
                      mapObj.data = dateTime[0];
                      mapObj.hora = dateTime[1];
                    }
                    if (text.includes("Local")) mapObj.local = formatLocal(text);
                    if (text.includes("Origem")) mapObj.origem = formatOrigin(text);
                    if (text.includes("Destino")) mapObj.destino = formatDestiny(text);
                  }
                });
              return mapObj;
            });
            elemMap = elemMap.reverse()
        break;
      case 'CargoBr':
        let mapObj:any = {};
        html('.tracking .tracking-header').each((index, elem) => {
          const actual = index;
          elemArray[actual] = {header: '' ,body: ''}
          elemArray[index].header = html(elem).text();
          let dataAct = parseData(html(elem).text())
          mapObj.data = dataAct[0]+'/'+dataAct[1]+'/'+dataAct[2];

          html(elem).next('.tracking-detalhe').each((_,child) => {
            elemArray[actual].body = html(child).text();
            mapObj.hora = parseHora(html(child).text()).replace(' ', '');
            mapObj.status = html(child).text().replace(mapObj.hora, '');
            mapObj.local = html(child).next('span').text();
            mapObj.origem = html(child).next('span').text();
            mapObj.destino = html(child).next('span').text();

          });
        });
          elemMap = mapObj;
          return elemMap;
        break;
    }
    return elemMap;



  }