/* description: jst language specification */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
[a-zA-Z][^:\s{}]*     return 'IDENT';
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
  : ExpressionList EOF
    {return $1[0];}
  ;

Expression
  : IDENT ':' Expression
    {$$ = tagParser.parseTag($1, $3)}
  | IDENT Block
    {$$ = tagParser.parseTag($1, $2)}
  | IDENT
    {$$ = tagParser.selfClosingTag(yytext) }
  | STRING
    {$$ = $1.substring(1, $1.length - 1)}
  | NUMBER
    {$$ = Number(yytext)}
  | '<' '%' '=' NUMBER '=' '%' '>'
    {$$ = $1+$2+$3+$4+$5+$6+$7}
  ;

ExpressionList
  : ExpressionList Expression
    {
      $$ = $1.concat($2)
    }
  | { $$ = [] }
  ;

Block
  : "{" ExpressionList "}"
    {
      $$ = $2.join('')
    }
  ;


%%
var tagParser = require(process.cwd() + '/tagparser.js');
