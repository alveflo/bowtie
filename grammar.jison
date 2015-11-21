/* description: jst language specification */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
[!|a-zA-Z][^:\s{};]*  return 'TagIdentifier';
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
  : StatementList EOF
    {return $1[0];}
  ;

Statement
  : OneLineTagStatement
  | BlockTagStatement
  | ClientScriptBlockPlaceholder
  ;

Expression
  : STRING
    {$$ = $1.substring(1, $1.length - 1)}
  | NUMBER
    {$$ = Number(yytext)}
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
  | TagIdentifier ':' Expression
    {$$ = tagParser.parseTag($1, $3)}
  | TagIdentifier
    {$$ = tagParser.parseTag($1)}
  ;

BlockTagStatement
  : TagIdentifier Block
    {$$ = tagParser.parseTag($1, $2)}
  ;

ClientScriptBlockPlaceholder
  : "<" "%" "=" Expression "=" "%" ">"
    {$$ = $1+$2+$3+$4+$5+$6+$7}
  ;

Block
  : "{" StatementList "}"
    {$$ = $2.join('')}
  ;


%%
var tagParser = require(process.cwd() + '/tagparser.js');
