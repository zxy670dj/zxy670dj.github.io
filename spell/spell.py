from js import document

inp_tag = document.getElementById("input")
pre_tag = document.getElementById("output")

keys = {
    "A": "M",
    "B": "Qz",
    "C": "Qx",
    "D": "Qu",
    "E": "Qj",
    "F": "Qk",
    "G": "Ql",
    "H": "[",
    "I": "Qn",
    "J": "qM",
    "K": "Qn",
    "L": "q747",
    "M": "q748",
    "N": "q749",
    "O": "q714",
    "P": "q[",
    "Q": "y",
    "R": "qy",
    "S": "|(",
    "T": "q716",
    "U": "q7R21",
    "V": "q717",
    "W": "q7R12",
    "X": "q718",
    "Y": "q719",
    "Z": "q726",
    " ": "q8R26"
}

no9del = ["A","B","C","D","E","F","G","H","I","J","K","P","Q","R","S"]

base_template = """
Note: (=C) must be pressed fast for AC break

Reset all
(q93==)

LineI/LineO
(qw13)

114an
([Qrq[[q|)9[q|)999r=C!oor=q.q.!!oRq8R26!!$9o!|)+)
100 random numbers(+)14 random numbers

Hexstring @FDFDF
([Qrq[[q|)9[q|)999r=C!oor=q.q748q73lq73z73lq73zq73z)
{(!9o)} x6 (o) x10

Token n>N>dynlbfQ{\U0001D405}

(!123456$Qy$Qr1.0000$$$$623$23)

You will see this:

123456x:
@=1.000FDFD623F23

(r==E!)

Spell:
(!!!$
"""

def style_paren(text):
    result = ""
    inside = False
    i = 0

    while i < len(text):
        if text[i:i+2] == "|(":
            result += "<span class='casio'>(</span>"
            i += 2
            continue
        elif text[i:i+2] == "|)":
            result += "<span class='casio'>)</span>"
            i += 2
            continue

        char = text[i]

        if char == "(":
            inside = True
        elif char == ")":
            inside = False
        elif inside:
            result += f"<span class='casio'>{char}</span>"
        elif char == "\n":
            result += "<br>"
        else:
            result += char

        i += 1

    return result


def update_pre(event):
    if event.key == "Enter":
        inp = inp_tag.value
        inp = inp.upper()
        inp = "{:^17}".format(inp[:17])
        template = base_template

        for char in inp:
            if char in keys:
                nl = "\n" if char in no9del else "!9o!$\n"
                template += keys[char] + nl

        template += "\nRRRRRRR!!12345678901234567$$2[=)\n\n\nCre: @iilikecasio on yt"

        pre_tag.innerHTML = style_paren(template)


inp_tag.addEventListener("keydown", update_pre)
