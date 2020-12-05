import axios from "axios";
import { DOMElement } from "react";
import cheerio from 'cheerio';
import { formatStatus, formatDateTime, formatLocal, formatOrigin, formatDestiny } from "../formatter";
global.Buffer = global.Buffer || require('buffer').Buffer;

const url:any = {
  Correios: {url:'https://www.linkcorreios.com.br/', method: 'get', data: {}},
  CargoBr: {url:'http://app.cargobr.com/Rastreamentos/Rastreamento/rastrear', method: 'post', data: {tipoBusca: 'P', nroBusca: ''}}
}

export default async function track(tracking: string, carrier: 'Correios'|'CargoBr') { 
  let method:any = url[carrier].method;
  let data: any = {};
  switch (carrier) {
    case'Correios':
      data = {url: tracking}
      break;
    case'CargoBr':
      data ={
        tipoBusca: 'P',
        nroBusca: tracking
      }
      break;
  }
  const api = axios.create({
    baseURL: url[carrier].url,
  });
    const response = (await api({
      url: data.url,
      method: url[carrier].method,
      data: data
    }).then((response) => convertHtmlToJson(response.data, carrier)))
    return response;
}

function convertHtmlToJson(htmlString:string, carrier:string) {
    const html = cheerio.load(htmlString);
    let find:string = '';
    const elemArray:any = [];
      if (carrier == 'Correios') {
       html("ul.linha_status").each((_, elem) => {
         elemArray.push(elem);
       });
       find = 'li';
    } else {
      html("div.tracking-detalhe").each((_, elem) => {
        elemArray.push(elem);
      });
      find = '.col-md-11';
    }
    elemArray.shift()
    const elemMap = elemArray.map((elem:any) => {
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
    return elemMap.reverse();
  }
  