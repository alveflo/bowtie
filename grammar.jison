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
[!|a-zA-Z][^:\s{};]*  return 'TagIdentifier';
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

Constant
  : STRING
    {$$ = $1.substring(1, $1.length - 1)}
  | NUMBER
    {$$ = Number(yytext)}
  ;


Statement
  : OneLineTagStatement
  | BlockTagStatement
  | ClientScriptBlockPlaceholder
  | VariableAssignmentStatement
  | LoopStatement
  ;

StatementList
  : StatementList Statement
    {
      $$ = $1.concat($2)
    }
  | { $$ = [] }
  ;

OneLineTagStatement
  : OneLineTagStatement Statement
    {$$ = $1.concat($2)}
  | TagIdentifier ':' Constant
    {$$ = tagParser.parseTag($1, $3)}
  | TagIdentifier
    {$$ = tagParser.parseTag($1)}
  ;

BlockTagStatement
  : TagIdentifier BlockStatement
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

VariableAssignmentStatement
  : VariableAssignmentExpression
  ;

VariableAssignmentExpression
  : VariableIdentifier '=' Constant
    {
      variableBox[$1] = $3
      $$ = ""
    }
  ;

LoopStatement
  : LoopExpression
  ;

LoopExpression
  : "FOR" ForLoopNoIterationVariable
    {$$ = $2}
  ;

ForLoopNoIterationVariable
  : "(" VariableIdentifier IN NUMBER "." "." NUMBER ")" BlockStatement
    {
      var parsedStr = [];
      var str = "";
      for (var i = $4;i<$7;i++) {
        str = $9;
        while (str.indexOf("#{"+$2+"}") != -1) {
          str = str.replace("#{"+$2+"}", i);
        }
        while (str.indexOf($2) != -1) {
          str = str.replace($2, i);
        }
        parsedStr.push(str);
      }
      $$ = parsedStr.join(' ');
    }
  ;

%%
var variableBox = {};
variableBox['$test'] = {'foo': ['a','b','c','d','e','f','g','h','i']};
var tagParser = require(process.cwd() + '/tagparser.js');
