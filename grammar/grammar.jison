/* description: jst language specification */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
\/\/.*                        return 'COMMENT'
"if"                          return 'IF';
"else"                        return 'ELSE';
"for"                         return 'FOR';
"in"                          return 'IN';
"import"                      return 'IMPORT';
"extend"                      return 'EXTEND';
"content"                     return 'EXTENTIONCONTENTBLOCK';
[0-9]+("."[0-9]+)?\b          return 'NUMBER';
[!|a-zA-Z][^:\s{};,]*         return 'Identifier';
\$[a-zA-Z][\w|.|\[|\]]*       return 'VariableIdentifier';
\"[^\"]*\"                    return 'STRING';
"*"                           return '*';
"/"                           return '/';
"-"                           return '-';
"+"                           return '+';
"^"                           return '^';
"("                           return '(';
")"                           return ')';
"{"                           return '{';
"}"                           return '}';
"<"                           return '<';
">"                           return '>';
"="                           return '=';
"%"                           return '%';
":"                           return ':';
";"                           return ';';
"."                           return '.';
","                           return ',';
"!"                           return '!';
"PI"                          return 'PI';
"E"                           return 'E';
<<EOF>>                       return 'EOF';

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
      var content = "";
      if (yy.parentTemplate) {
        content = yy.settings.parsers.contentParser.parseString(yy.parentTemplate.replace("<%=BOWTIE-CONTENT=%>", $1[$1.length-1]), yy.settings);
      } else {
        content = yy.settings.parsers.contentParser.parseString($1[$1.length-1], yy.settings.locals);
      }
      return content;
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
  | MixinDeclarationStatement
  | MixinCallStatement
  | Content
  | ImportStatement
  | ExtendStatement
  ;

StatementList
  : StatementList Statement
    {
      $$ = $1.concat($2)
    }
  | { $$ = [] }
  ;

Content
  : Content "+" STRING
    { $$ = $1.concat($3.substring(1, $3.length - 1)) }
  | Content "+" VariableIdentifier
    { $$ = $1.concat("#{" + $3 + "}") }
  | STRING
    { $$ = [$1.substring(1, $1.length - 1)] }
  | VariableIdentifier
    { $$ = ["#{" + $1 + "}"] }
  | EXTENTIONCONTENTBLOCK
    { $$ = "<%=BOWTIE-CONTENT=%>" }
  | COMMENT
    { $$ = "" }
  ;

ImportStatement
  : IMPORT STRING
    { $$ = yy.settings.$_compile_bowtie(path.join(process.cwd(), $2.substring(1, $2.length-1)), yy.settings) }
  ;

ExtendStatement
  : EXTEND STRING
    {
      yy.parentTemplate = yy.settings.$_compile_bowtie(path.join(path.parse(yy.settings.filename).dir, $2.substring(1, $2.length - 1)), yy.settings.locals)
      $$ = "";
    }
  ;

OneLineTagStatement
  : OneLineTagStatement Statement
    {$$ = $1.concat($2)}
  | Identifier ':' Content
    {$$ = yy.settings.parsers.tagParser.parseTag($1, $3.join(' '))}
  | Identifier
    {$$ = yy.settings.parsers.tagParser.parseTag($1)}
  ;

BlockTagStatement
  : Identifier BlockStatement
    {$$ = yy.settings.parsers.tagParser.parseTag($1, $2)}
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
  | "FOR" ForLoopWithIterationVariable
    {$$ = $2}
  ;

IfElseStatement
  : IfWithoutElseExpression
  | IfElseExpression
  ;

IfWithoutElseExpression
  : "IF" "(" IfStatement ")" BlockStatement
    {
      $$ = yy.settings.parsers.ifParser.parseIfWithoutElse($3, $5, yy.settings.locals);
    }
  ;

IfElseExpression
  : "IF" "(" IfStatement ")" BlockStatement "ELSE" BlockStatement
    {
      $$ = yy.settings.parsers.ifParser.parseIfElse($3,$5,$7, yy.settings.locals);
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
      $$ = yy.settings.parsers.loopParser.loopBasic($2,Number($4),Number($7),$9);
    }
  ;

ForLoopWithIterationVariable
  : "(" VariableIdentifier IN VariableIdentifier ")" BlockStatement
    {
      $$ = yy.settings.parsers.loopParser.loopObject($2, $4, $6, yy.settings.locals);
    }
  ;

MixinCallStatement
  : VariableIdentifier "(" ArgumentList ")"
    {
      $$ = yy.settings.parsers.mixinParser.evalMixin($1, $3);
    }
  ;

MixinDeclarationStatement
  : VariableIdentifier "-" ">" "(" ArgumentList ")" BlockStatement
    {
      $$ = yy.settings.parsers.mixinParser.newMixin($1, $5, $7);
    }
  ;

ArgumentList
  : ArgumentList "," VariableIdentifier
    { $$ = $1.concat($3) }
  | ArgumentList "," Content
    { $$ = $1.concat($3) }
  | VariableIdentifier
    { $$ = [$1] }
  | Content
    { $$ = [$1] }
  ;

%%
var path = require('path');
var variableBox = {};
