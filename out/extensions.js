'use strict'

const vscode = require('vscode');

const inses = [
    "mov", "movsx", "movzx", "push", "pop", "pusha", "popa", "pushad", "popad", "bswap", "xchg", "xadd", "xlat", "cmpxchg",
    "enter", "leave",
    "in", "out",
    "lea", "lds", "les", "lfs", "lgs", "lss",
    "lahf", "sahf", "pushf", "popf", "pushd", "popd",
    "add", "adc", "inc", "aaa", "daa",
    "sub", "sbb", "dec", "neg", "cmp", "aas", "das",
    "mul", "imul", "aam",
    "div", "idiv", "aad",
    "cbw", "cwd", "cwde", "cdq",
    "and", "or", "xor", "not", "test", "shl", "sal", "shr", "sar", "rol", "ror", "rcl", "rcr",
    "movs", "movsb", "movsw", "movsd",
    "cmps", "cmpsb", "cmpsw", "cmpsd",
    "scas", "scasb", "scasw", "scasd",
    "lods", "lodsb", "lodsw", "lodsd",
    "stos", "stosb", "stosw", "stosd",
    "ins", "insb", "insw", "insd",
    "outs", "outsb", "outsw", "outsd",
    "rep", "repe", "repz", "repne", "repnz", "repc", "repnc",
    "jmp", "call", "ret", "retf", "retn",
    "ja", "jnbe", "jae", "jnb", "jb", "jnae", "jbe", "jna",
    "jg", "jnle", "jge", "jnl", "jl", "jnge", "jle", "jng",
    "je", "jz", "jne", "jnz", "jc", "jnc", "jo", "jno", "jp", "jpe", "jnp", "jpo", "js", "jns",
    "loop", "loope", "loopz", "loopne", "loopnz", "jcxz", "jecxz",
    "int", "into", "iret", "iretd",
    "lgdt", "sgdt", "lidt", "sidt", "lldt", "sldt",
    "hlt", "wait", "esc", "lock", "nop", "stc", "clc", "cmc", "std", "cld", "sti", "cli",
    "finit", "fclex", "fdisi", "feni", "fwait", "fnop", "fxch",
    "fstsw", "fldcw", "fstcw", "fldenv", "fstenv", "frstor", "fsave",
    "ffree",
    "fdecstp", "fincstp",
    "fsetpm",
    "fldz", "fld1", "fldpi", "fldl2t", "fldl2e", "fldlg2", "fldln2",
    "fld", "fild", "fbld", "fst", "fist", "fstp", "fistp", "fbstp",
    "fcmovb", "fcmovbe", "fcmove", "fcmovnb", "fcmovnbe", "fcmovne", "fcmovnu", "fcmovu",
    "fcom", "fcomi", "fcomip", "ficom", "ficomp", "ftst", "fucom", "fucomp", "fucompp", "fxam",
    "fadd", "faddp", "fiadd",
    "fsub", "fsubp", "fsubr", "fsubrp", "fisub", "fisubr",
    "fmul", "fmulp", "fimul",
    "fdiv", "fdivp", "fdivr", "fdivrp", "fidiv", "fidivr",
    "fchs", "fabs", "fsqrt", "fscale", "frndint"
];
const pseinses = [
    "db", "dw", "dd", "dq", "dt", "do", "dy",
    "byte", "word", "dword", "tword", "oword", "yword",
    "resb", "resw", "resd", "resq", "rest", "reso", "resy",
    "times",
    "section",
    "$", "$$",
    "seg", "wrt",
    "strict",
    "near", "short", "far",
    "equ", "org", "bits", "vstart",
    "default", "extern", "global"
];
const regs = [
    "al", "ah", "bl", "bh", "cl", "ch", "dl", "dh",
    "ax", "bx", "cx", "dx", "si", "di", "sp", "bp",
    "cs", "ds", "es", "fs", "gs", "ss",
    "flags",
    "eax", "ebx", "ecx", "edx", "esi", "edi", "esp", "ebp",
    "cr0", "cr1", "cr2", "cr3", "cr4",
    "eflags",
    "gdtr", "idtr", "ldtr", "tr",
    "dr0", "dr1", "dr2", "dr3", "dr4", "dr5", "dr6", "dr7"
];
const keywords = inses.concat(pseinses).concat(regs);

function activate(context) {
    const completion = vscode.languages.registerCompletionItemProvider('assembly', {
        provideCompletionItems: (document, position, token, context) => {
            var start = document.getText(document.getWordRangeAtPosition(position));
            var items = [];
            for (var index in keywords) {
                var keyword = keywords[index];
                if (keyword.startsWith(start)) {
                    items.push(new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword));
                }
            }
            return new vscode.CompletionList(items, true);
        }
    });
    context.subscriptions.push(completion);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;