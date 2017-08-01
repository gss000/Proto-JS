window.onload = function(){
    var calc = $('calc'),
        inputs = calc.getElementsByTagName('input'),
        _li = calc.getElementsByTagName('li'),
        _a = calc.getElementsByTagName('a');
    var flag = false;

    for(var i=0; i<_a.length; i++){
        _a[i].onclick = function(){
            switch (this.innerHTML){
                case "C":
                    flag = false, inputs[0].value = '', inputs[1].value='0';
                    break;
                case "+":
                    count("+");
                    break;
                case "-":
                    count("-");
                    break;
                case "×":
                    count("*");
                    break;
                case "÷":
                    count("/");
                    break;
                case "%":
                    count("%");
                    break;
                case "=":
                    flag || (inputs[0].value += inputs[1].value);
                    inputs[1].value = eval(inputs[0].value);
                    inputs[1].value = inputs[1].value.substr(0, 10).replace("NaN", 0);
                    flag = true;
                    break;
                case ".":
                    if(inputs[1].value.search(/[\.\%\*\/\+\-]/) != -1);
                    break;
                default:
                    flag && (inputs[0].value = '', inputs[1].value=0, flag=false);
                    inputs[1].value.length < 10 && (inputs[1].value = (inputs[1].value + this.innerHTML).replace(/^[0\%\/\*\+\-](\d)/, "$1"));
                    break;
            }
        }
    }

    function count(s){
        if(flag){
            inputs[1].value = inputs[1] + s;
            inputs[1].value = s;
            flag = false;
        }else{
            /[\/\*\+\-\%]$/.test(inputs[1].value) || (inputs[0].value += inputs[1].value);
            inputs[1].value = s;
            /[\%\/\*\+\-]$/.test(inputs[0].value) || (inputs[0].value += inputs[1].value);
            inputs[0].value = inputs[0].value.slice(-1) != s ? inputs[0].value.replace(/.$/, s) : inputs[0].value;
        }
    }

    function $(id){
        return document.getElementById(id);
    }

}


