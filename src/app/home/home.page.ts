import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Variáveis para construir e exibir os cálculos
  numero1: string = '';
  numero2: string = '';
  operador: string = '';
  calculo: string = '0';
  historico: string = '';
  resultado_fatorial: number = 1;

  // Variáveis para verificar as etapas da construção dos cálculos
  operador_inserido: boolean = false;
  calculo_concluido: boolean = false;

  constructor() { }

  // Método para o botão AC (limpar tudo)
  resetar() {
    this.numero1 = '';
    this.numero2 = '';
    this.operador = '';
    this.calculo = '0';
    this.historico = '';
    this.calculo_concluido = false;
    this.operador_inserido = false;
  }

// Método para os botões convencionais (valores)
  inserir_elemento(digito: string) {
    if (this.calculo_concluido) {
      this.historico = this.calculo;
      this.calculo = digito;
      this.calculo_concluido = false;
      this.operador_inserido = false;
    } else {
      if (digito == '3.14') {
        if (this.operador_inserido) {
          if (this.numero2 == '') {
            this.numero2 = digito;
            this.calculo = this.calculo + this.numero2;
          } else {
            this.numero2 = (parseFloat(this.numero2) + 3.14).toString();
            this.calculo = '';
            this.calculo = this.numero1 + this.operador + this.numero2;
          }
        } else {
          if (this.calculo == '0') {
            this.calculo = digito;
          } else {
            this.numero1 = (parseFloat(this.calculo) + 3.14).toString();
            this.calculo = this.numero1;
          }
        }
      } else {
        if (this.operador_inserido) {
          this.numero2 = this.numero2 + digito;
          this.calculo = this.calculo + digito;
        } else {
          if (this.calculo == '0') {
            this.calculo = digito;
          } else {
            this.calculo = this.calculo + digito;
          }
        }
      }
    }
  }

  // Método para iniciar um novo cálculo (após clicar no [=])
  iniciar_calculo() {
    this.historico = this.numero1 + ' ' + this.operador + ' ' + this.numero2 + ' ' + '=';
    this.numero1 = this.calculo;
    this.calculo_concluido = false;
    this.operador_inserido = false;
    this.numero2 = '';
    this.operador = '';
  }

  // Método para definir a operação a ser realizada
  inserir_operador(digito: string) {
    if (!this.operador_inserido) {
      this.calculo_concluido = false;
      if (digito == '√') {
        if (this.calculo == '0') {
          this.calculo = '';
        }
      }
      this.numero1 = this.calculo;
      this.calculo = this.calculo + digito;
      this.operador_inserido = true;
      this.operador = digito;
    }
  }

  // Método para fazer o cálculo e exibir o resultado
  calcular() {
    if (this.operador == '+' && this.numero2 != '') {
      this.calculo = (parseFloat(this.numero1) + parseFloat(this.numero2)).toString();
      this.iniciar_calculo();
    } else if (this.operador == '-' && this.numero2 != '') {
      this.calculo = (parseFloat(this.numero1) - parseFloat(this.numero2)).toString();
      this.iniciar_calculo();
    } else if (this.operador == '×' && this.numero2 != '') {
      this.calculo = (parseFloat(this.numero1) * parseFloat(this.numero2)).toString();
      this.iniciar_calculo();
    } else if (this.operador == '÷' && this.numero2 != '') {
      this.calculo = (parseFloat(this.numero1) / parseFloat(this.numero2)).toString();
      this.iniciar_calculo();
    } else if (this.operador == '%' && this.numero2 != '') {
      this.calculo = ((parseFloat(this.numero1) / 100) * parseFloat(this.numero2)).toString();
      this.iniciar_calculo();
    } else if (this.operador == '^' && this.numero2 != '') {
      this.calculo = (parseFloat(this.numero1) ** parseFloat(this.numero2)).toString();
      this.iniciar_calculo();
    } else if (this.operador == '!') {
      if (this.numero2 == '') {
        this.calculo = (this.calcular_fatorial(parseInt(this.numero1))).toString();
        this.iniciar_calculo();
      } else {
        this.calculo = (this.calcular_fatorial(parseInt(this.numero1)) * parseInt(this.numero2)).toString();
        this.iniciar_calculo();
      }
    } else if (this.operador == '√') {
      if (this.numero1 == '') {
        this.calculo = (Math.sqrt((parseFloat(this.numero2)))).toString();
        this.iniciar_calculo();
      } else {
        this.calculo = ((parseFloat(this.numero1) * Math.sqrt(parseFloat(this.numero2)))).toString();
        this.iniciar_calculo();
      }
    }
  }

  // Método para alterar o sinal (positivo/negativo)
  trocar_sinal() {
    if (this.operador == '') {
      this.numero1 = this.calculo;
      this.calculo = (parseFloat(this.numero1) * -1).toString();
    } else {
      if (parseFloat(this.numero2) > 0) {
        this.numero2 = (parseFloat(this.numero2) * -1).toString();
        this.calculo = this.numero1 + this.operador + '(' + this.numero2 + ')';
      }
    }
  }

  // Método para calcular o fatorial de um número
  calcular_fatorial(numero: number): number {
    if (numero === 0 || numero === 1) {
      return 1;
    } else {
      return numero * this.calcular_fatorial(numero - 1);
    }
  }

  // Método para deletar apenas o último dígito inserido
  deletar() {
    if (this.calculo != '0') {
      this.calculo = this.calculo.substring(0, (this.calculo.length - 1));
      if (this.operador == '') {
        this.operador_inserido = false;
      }
      if (this.calculo == '') {
        this.calculo = '0';
      }
    }
  }
}