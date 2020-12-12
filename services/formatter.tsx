
    export function formatStatus(str:any) {
      /**
       * Função responsável formatar o Local de entrega de uma encomenda
       */
      const res = str.replace("Status", "").replace(":", "").trim();
      return res;
    }
  
    export function formatDateTime(str:any) {
      /**
       * Função responsável por a formatação da data e hora de entrega de uma encomenda
       */
      const res = str
        .split(" ")
        .join("")
        .replace("Data:", "")
        .replace("Hora:", "")
        .split("|");
  
      return res;
    }
  
    export function formatLocal(str:any) {
      /**
       * Função responsável formatar o Local de entrega de uma encomenda
       */
      const res = str.replace("Local", "").replace(":", "").trim();
      return res;
    }
    
    export function formatOrigin(str:string) {
      /**
       * Função responsável formatar o Origem do trajeto de entrega de uma encomenda
       */
      const res = str.replace("Origem", "").replace(":", "").trim();
      return res;
    }
  
    export function formatDestiny(str:string) {
      /**
       * Função responsável formatar o Destino do trajeto de entrega de uma encomenda
       */
      const res = str.replace("Destino", "").replace(":", "").trim();
      return res;
    }

    export function parseData(str:string) {
      const hoje = new Date();
      const ano = hoje.getFullYear();
      if (!str) return;
      let data:any = [];

      data[0] = str.match(/\d+/g);
      if (data[0].length < 2) data[0] = '0'+data[0];
      
      if (str.indexOf('janeiro')) data[1] = '01';
      if (str.indexOf('fevereiro')) data[1] = '02';
      if (str.indexOf('março')) data[1] = '03';
      if (str.indexOf('abril')) data[1] = '04';
      if (str.indexOf('maio')) data[1] = '05';
      if (str.indexOf('junho')) data[1] = '06';
      if (str.indexOf('julho')) data[1] = '07';
      if (str.indexOf('agosto')) data[1] = '08';
      if (str.indexOf('setembro')) data[1] = '09';
      if (str.indexOf('outubro')) data[1] = '10';
      if (str.indexOf('novembro')) data[1] = '11';
      if (str.indexOf('dezembro')) data[1] = '12';


      data[2] = ano;

      return data;
    }

    export function parseHora(str: string) {
      const data = (str.substr(3, str.indexOf(':'))).replace('', ''); 
      return data;
    }