const precedence = operator => {
    switch(operator){
    case "^":
        return 3;
    case "*":
    case "/":
        return 2;
    case "+":
    case "-":
        return 1;
    default:
        return -1;
    }
}

const isOperator = (char) => {
    return ['^', '-', '+', '/', '*'].includes(char)
}

/**
 * Converts an infix expression to postfix notation
 * @param {string} expression 
 * @returns infix expression 
 */

const infixToPostfix = expression => {

    var st = []; 
    var result = "";

    for(let i = 0; i < expression.length; i++) {
        let char = expression[i];
        if((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))
            result += char;

        else if(char === '(')
            st.push('(');

        else if(char === ')') {
            while(st[st.length - 1] !== '(')
            {
                result += st[st.length - 1];
                st.pop();
            }
            st.pop();
        }

        else {
            while(st.length !== 0 && precedence(expression[i]) <= precedence(st[st.length - 1])) {
                result += st[st.length - 1];
                st.pop(); 
            }
            st.push(char);
        }
    }

    while(st.length !== 0) {
        result += st[st.length - 1];
        st.pop();
    }
    
    return result
}

/**
 * Converts prefix expression to postfix
 * @param {string} expression 
 * @returns postfix expression of the string entered
 */
const prefixToPostfix = (expression) => {
    var reversedExpr = expression.split("").reverse()
    var stack = []

    reversedExpr.forEach(char => {
        if((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9')){
            stack.push(char);
        } else if(isOperator(char)) {
            var expr = ''
            var i = 0
            while (stack.length > 0 && i < 2) {
                let firstVal = stack.pop()
                expr += firstVal
                i += 1
            }
            expr += char
            stack.push(expr)
        } 
        
    });

    return stack.length > 1 ? 'Not Valid' : stack.join('')
}

export { infixToPostfix, prefixToPostfix }