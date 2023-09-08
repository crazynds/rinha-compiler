const op = {
    'Add': '+',
    'Sub': '-',
    'Mul': '*',
    'Div': '/',
    'Rem': '%',
    'Eq': '===',
    'Neq': '!=',
    'Lt': '<',
    'Gt': '>',
    'Lte': '<=',
    'Gte': '>=',
    'And': '&&',
    'Or': '||',
}
const TermReturn = {
    'Function': true,
    'Let': false,
    'If': false,
    'Var': true,
    'Int': true,
    'Str': true,
    'Bool': true,
    'Binary': true,
    'Tuple': true,
    'First': true,
    'Second': true,
    'Call': true,
    'Print': false,
}

function decalre_error(msg,location,found){
    return new Error(msg+" at "+location['start']+' (in file '+location['filename']+') but got '+JSON.stringify(found))
}

function executor(expression,forcereturn){
    var result = ''
    switch(expression['kind']){
        case 'Function':
            const params = expression['parameters']
                .map((parm)=>parm['text'])
                .reduce((acc,param)=> acc+', '+param);
            result+= "__MEMOIZER(function("+params+"){"
            result+=executor(expression['value'],true)
            result+="})"
            break
        case 'Let':
            result = 'let '+ expression['name']['text']
            if(expression['value']){
                result += ' = ' + executor(expression['value'],false)
            }
            result += ';'
            break
        case 'If':
            result = 'if(' + executor(expression['condition'],false)+'){'
            result += executor(expression['then'],forcereturn) + "}"
            if(expression['otherwise']){
                result += 'else{'
                result += executor(expression['otherwise'],forcereturn)
                result += '}'
            }
            break
        case 'Var':
            result = expression['text']
            break
        case 'Int':
            result = expression['value']
            break
        case 'Str':
            result = '"'+expression['value']+'"'
            break
        case 'Bool':
            result = expression['value'] ? 'true' :'false'
            break
        case 'Binary':
            result = '('

            result += executor(expression['lhs'],false)
            result += op[expression['op']]
            result += executor(expression['rhs'],false)

            result += ')'
            break
        case 'Tuple':
            result = '['
            result += executor(expression['first'],false)+', '
            result += executor(expression['second'],false)
            result += ']'
        case 'First':
            result = executor(expression['value'],false)+'[0]'
            break
        case 'Second':
            result = executor(expression['value'],false)+'[1]'
            break
        case 'Call':
            const arguments = expression['arguments'].map((arg)=>executor(arg,false))
                .reduce((acc,resp) => acc+', '+resp)
            result += expression['callee']['text'] + '('+arguments+")"
            break
        case 'Print':
            result += 'console.log('+executor(expression['value'],false)+")"
            break
        default:
            throw decalre_error('Kind expected',expression['location'],expression['kind'])
    }
    if(expression['next'])return result + executor(expression['next'],forcereturn)
    forcereturn &= TermReturn[expression['kind']]
    if(forcereturn)result = 'return '+result+';'
    return result
}

function memoizer(){
    return `const __MEMOIZER = fn => {
        const cache = new Map();
        return (...args) => {
          const key = args.join('-');
          if(!!cache[key]) {
            return cache[key]
          }
          const result = fn(...args);
          cache[key] = result;
          return result;
        }
      };
      `.replaceAll('\n','')
        .replaceAll('\t','')
        .replaceAll('  ',' ')
        .replaceAll('  ',' ')
        .replaceAll('  ',' ')
}


module.exports = {
    jsExecutor: executor,
    preLib: function (){
        return memoizer()
    }
}

