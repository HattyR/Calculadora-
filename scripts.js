var operator = null;
var inputValueMemo = 0;                             //Total de un cálculo. 

function getContentClick(event) {
    const value = event.target.innerHTML;           //target e innerHTML son los valores que se sacan de la consola de la página web.
    filterAction(value);
}

const filterAction = value => {
    value === "0" ? addNumberInput(0) : null;       //Si se oprime el cero llama a la funcion addNumberInput.
    value === "1" ? addNumberInput(1) : null;
    value === "2" ? addNumberInput(2) : null;
    value === "3" ? addNumberInput(3) : null;
    value === "4" ? addNumberInput(4) : null;
    value === "5" ? addNumberInput(5) : null;
    value === "6" ? addNumberInput(6) : null;
    value === "7" ? addNumberInput(7) : null;
    value === "8" ? addNumberInput(8) : null;
    value === "9" ? addNumberInput(9) : null;
    value === "," ? addNumberInput(',') : null;

    value === "+" ? setOperation('+') : null;       //Si se oprime el + llama a la función setOperation.
    value === "-" ? setOperation('-') : null;
    value === "x" ? setOperation('*') : null;
    value === "/" ? setOperation('/') : null;
    value === "%" ? setOperation('%') : null;
    value === "+/-" ? setOperation('+/-') : null;

    value === "=" ? calculation() : null;           
    value === "AC" ? resetCalculator() : null;      
}

function addNumberInput(value) {
    const inputScreen = document.getElementsByClassName('calculator__screen')[0];       //captura el elemento de la pantalla en la posición 0.
    const inputValue = inputScreen.value;                                               //Captura las propiedades de inputScreen. 

    if(inputValue === '0' && inputValue.length === 1  && value !== ',') {                //Sustituye el cero inicial por el valor del botón que se active.
        inputScreen.value = value;
        return;
    }

    if(inputScreen.value === "" && value === ",") {                                     //Asigna un cero cuando se oprime la coma y no hay ningún número antes.
        inputScreen.value = 0 + value;
        return;
    }
    inputScreen.value = inputValue + value;                                             //Concatena los valores que se van ingresando. 
}

function setOperation(operator) {
    const inputScreenValue = document.getElementsByClassName("calculator__screen")[0].value;
    this.operator = operator;                                                           //Llama al objeto por fuera de la función. 

    if(inputScreenValue != 0) {                                                         //Si el valor es ingresado procede a hacer el cálculo. 
        calculation();
    }
}

function calculation() {
    const inputScreen = document.getElementsByClassName("calculator__screen")[0];
    let valueOne = transformCommaToPoint(this.inputValueMemo);          //Captura el valor de un resultado para volver a operarlo. 
    let valueTwo = transformCommaToPoint(inputScreen.value);            //Valor de la pantalla. 
    let total = 0;

    if(this.operator === '+' && inputScreen.value !== "") {             //Suma.
        total = valueOne + valueTwo;
    }

    if(this.operator === "-" && inputScreen !== "") {                   //Resta.
        if (valueOne !== 0) {
            total = valueOne - valueTwo;
        } else {
            total = valueTwo;
        }
    }

    if(this.operator === "*" && inputScreen !== "") {                   //Multiplicación.
        if (valueOne !== 0) {
            total = valueOne * valueTwo;
        } else {
            total = valueTwo;
        }
    }

    if(this.operator === "/" && inputScreen !== "") {                   //División.
        if (valueOne !== 0) {
            total = valueOne / valueTwo;
        } else {
            total = valueTwo;
        }
    }

    if(this.operator === "%" && inputScreen.value !== "") {             //Porcentaje.
        total = valueTwo / 100;
    }

    if(this.operator === "+/-" && inputScreen.value !== "") {           //Cambio de signo. 
        if(valueTwo > 0) {
            total = -valueTwo;
        }
    }

    total = transformPointToComma(total);                               //
    this.inputValueMemo = total;                                        //Actualiza el total. 
    inputScreen.value = "";                                             //Borra el valor actual después de presionar una operacióon. 
    inputScreen.placeholder = total;                                    //Muestra en la pantalla el valor de la operación realizada. 
}

const resetCalculator = () => {
    const inputScreen = document.getElementsByClassName("calculator__screen")[0];
    inputScreen.value = 0;
    this.inputValueMemo = 0;
    this.operator = null;
}

function transformCommaToPoint(value) {
    if(typeof value !== "number") {                                 //typeof indica el tipo de dato. Si es un string lo convierte en number para que sea posible operarlo.
        let resultTransform = value.replace(',','.');
        return parseFloat(resultTransform);                         //Convierte una cadena de texto en punto flotante. 
    }
    return value;                                                   
}

function transformPointToComma(value) {                             //Quita el punto automático al ingresar un valor decimal. 
    let resultTransform = value.toString();                         //Convierte la variable en String.
    resultTransform = resultTransform.replace('.',',');             //Cambia puntos por comas.
    return resultTransform;
}


