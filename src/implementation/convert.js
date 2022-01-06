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

// The main function to convert infix expression to postfix expression
const infixToPostfix = expression => {

    var st = []; //For stack operations
    var result = "";

    for(let i = 0; i < expression.length; i++) {
        let char = expression[i];
        // If the scanned character is
        // an operand, add it to output string.
        if((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))
            result += char;

        // If the scanned character is an
        // ‘(‘, push it to the stack.
        else if(char === '(')
            st.push('(');

        // If the scanned character is an ‘)’,
        // pop and to output string from the stack
        // until an ‘(‘ is encountered.
        else if(char === ')') {
            while(st[st.length - 1] !== '(')
            {
                result += st[st.length - 1];
                st.pop();
            }
            st.pop();
        }

        //If an operator is scanned
        else {
            while(st.length !== 0 && precedence(expression[i]) <= precedence(st[st.length - 1])) {
                result += st[st.length - 1];
                st.pop(); 
            }
            st.push(char);
        }
    }

    // Pop all the remaining elements from the stack
    while(st.length !== 0) {
        result += st[st.length - 1];
        st.pop();
    }
    
    return result
}


const prefixToPostfix = (expression) => {
    var reversedExpr = expression.split("").reverse()
    var stack = []
    console.log(reversedExpr)
    reversedExpr.forEach(char => {
        console.log(stack)
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