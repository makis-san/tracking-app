
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