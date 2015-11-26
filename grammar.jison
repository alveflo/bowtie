/* description: jst language specification */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
"if"                  return 'IF';
"else"                return 'ELSE';
"for"                 return 'FOR';
'in'                  return 'IN';
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
[!|a-zA-Z][^:\s{};]*  return 'Identifier';
\$[a-zA-Z][^:\s{};]*  return 'VariableIdentifier';
\".*\"                return 'STRING';
"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"^"                   return '^';
"("                   return '(';
")"                   return ')';
"{"                   return '{';
"}"                   return '}';
"<"                   return '<';
">"                   return '>';
"="                   return '=';
"%"                   return '%';
":"                   return ':';
";"                   return ';';
"."                   return '.';
'!'                   return '!';
"PI"                  return 'PI';
"E"                   return 'E';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%start PROGRAM

%% /* language grammar */
PROGRAM
  : ProgramList EOF
    {
      var str = $1[0];
      var regex = /#{(\$\S+)}/g;
      var match;
      var tempstr;
      for (var i in variableBox) {
        global[i] = variableBox[i];
      }

      while (match = regex.exec(str)) {
        tempstr = str;
        var a = match[1];
        console.log(a);
        try {
          tempstr = tempstr.replace(match[0], eval(a));
        } catch (ex) {
          tempstr = tempstr.replace(match[0], 'undefined');
        }
        str = tempstr;
      }

      return str;
    }
  ;

ProgramList
  : StatementList
    {$$ = $1}
  ;

Operator
  : "=" "="
    {$$ = "=="}
  | "=" "=" "="
    {$$ = "==="}
  | "!""="
    {$$ = "!="}
  | ">"
    {$$ = ">"}
  | "<"
    {$$ = "<"}
  | ">" "="
    {$$ = ">="}
  | "<" "="
    {$$ = "<="}
  ;

UnaryOperator
  : "!"
    {$$ = "!"}
  ;
Constant
  : STRING
    {$$ = $1}
  | NUMBER
    {$$ = Number(yytext)}
  ;

Expression
  : Identifier
  | Constant
  ;

Statement
  : OneLineTagStatement
  | BlockTagStatement
  | ClientScriptBlockPlaceholder
  | LoopStatement
  | IfElseStatement
  ;

StatementList
  : StatementList Statement
    {
      $$ = $1.concat($2)
    }
  | { $$ = [] }
  ;

StringStatement
  : StringStatement STRING
    { $$ = $1.concat($2.substring(1, $2.length-1)) }
  | { $$ = [] }
  ;

OneLineTagStatement
  : OneLineTagStatement Statement
    {$$ = $1.concat($2)}
  | Identifier ':' StringStatement
    {$$ = tagParser.parseTag($1, $3.join(' '))}
  | Identifier
    {$$ = tagParser.parseTag($1)}
  ;

BlockTagStatement
  : Identifier BlockStatement
    {$$ = tagParser.parseTag($1, $2)}
  ;

ClientScriptBlockPlaceholder
  : "<" "%" "=" Constant "=" "%" ">"
    {$$ = $1+$2+$3+$4+$5+$6+$7}
  ;

BlockStatement
  : "{" StatementList "}"
    {$$ = $2.join(' ')}
  ;

LoopStatement
  : LoopExpression
  ;

LoopExpression
  : "FOR" ForLoopNoIterationVariable
    {$$ = $2}
  ;

IfElseStatement
  : IfWithoutElseExpression
  | IfElseExpression
  ;

IfWithoutElseExpression
  : "IF" "(" IfStatement ")" BlockStatement
    {
      $$ = ifParser.parseIfWithoutElse($3, $5);
    }
  ;

IfElseExpression
  : "IF" "(" IfStatement ")" BlockStatement "ELSE" BlockStatement
    {
      $$ = ifParser.parseIfElse($3,$5,$7);
    }
  ;

IfStatement
  : IfStatement Expression
    { $$ = $1.concat($2) }
  | IfStatement Operator
    { $$ = $1.concat($2) }
  | { $$ = [] }
  ;

ForLoopNoIterationVariable
  : "(" VariableIdentifier IN NUMBER "." "." NUMBER ")" BlockStatement
    {
      $$ = loopParser.parseFor($2,Number($4),Number($7),$9);
    }
  ;

%%
var variableBox = {};
var tagParser = require(process.cwd() + '/parsers/tagparser.js');
var loopParser = require(process.cwd() + '/parsers/loopparser.js');
var ifParser = require(process.cwd() + '/parsers/ifelseparser.js');
