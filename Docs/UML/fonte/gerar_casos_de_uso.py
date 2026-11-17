import math, html

W, H = 2480, 1600
COLS, ROWS = 4, 2
MX, TOP, GAP = 40, 190, 28
PW = (W - 2 * MX - (COLS - 1) * GAP) / COLS
PH = (H - TOP - 40 - (ROWS - 1) * GAP) / ROWS
NAVY = "#14325C"
NEW = "#E07B00"
FONT = "Inter, DejaVu Sans, sans-serif"

PALETTE = {
    "green": ("#3F8F3A", "#E3F2DC"),
    "blue": ("#2F6DB5", "#DCEAF8"),
    "amber": ("#D49A12", "#FCF0CF"),
    "purple": ("#7B4FB0", "#ECE2F7"),
    "rose": ("#B8434E", "#F8E0E2"),
}

# (titulo, cor, caso principal, [(include, novo)], [(extend, condicao, novo)])
CASES = [
    ("1. CASO DE USO – CADASTRO DE USUÁRIOS", "green", "Cadastrar Usuário",
     [("Informar Nome", False), ("Informar Data de Nascimento", True), ("Informar E-mail", False),
      ("Definir Senha", False), ("Aceitar Termos de Uso", False), ("Aceitar Consentimento de Dados de Saúde", True)],
     [("Exibir Encaminhamento (Disque 136)", "[idade < 18]", True)]),
    ("2. CASO DE USO – LOGIN DE USUÁRIOS", "blue", "Fazer Login",
     [("Informar E-mail", False), ("Informar Senha", False), ("Validar Credenciais", False), ("Acessar Tela Inicial", False)],
     [("Aceitar Termos e Consentimento", "[aceite pendente ou versão nova]", True)]),
    ("3. CASO DE USO – RECUPERAÇÃO DE SENHA", "amber", "Recuperar Senha",
     [("Informar E-mail", False), ("Enviar E-mail de Recuperação", False), ("Redefinir Senha", False), ("Confirmar Nova Senha", False)], []),
    ("4. CASO DE USO – CADASTRO DE NOME/APELIDO", "purple", "Cadastrar Nome/Apelido",
     [("Informar Nome/Apelido", False), ("Validar Nome/Apelido", False), ("Salvar Nome/Apelido", False)], []),
    ("5. CASO DE USO – TELA INICIAL PERSONALIZADA", "green", "Visualizar Tela Inicial",
     [("Exibir Saudação Personalizada", False), ("Exibir Contador de Resistências", False), ("Exibir Última Resistência", False),
      ("Acessar Exercício de Respiração", False), ("Acessar Jornada do Usuário", False), ("Exibir Aviso de Saúde", True)], []),
    ("6. CASO DE USO – EXERCÍCIO GUIADO DE RESPIRAÇÃO", "blue", "Realizar Exercício de Respiração",
     [("Instruções do Exercício", False), ("Animação Guiada", False), ("Contagem do Tempo", False),
      ("Conclusão do Exercício", False), ("Feedback ao Usuário", False)], []),
    ("7. CASO DE USO – EXCLUSÃO DE CONTA", "rose", "Excluir Conta",
     [("Confirmar Senha", True), ("Apagar Histórico", True), ("Apagar Dados do Usuário", True), ("Apagar Login", True)], []),
]

def esc(s): return html.escape(s)

def wrap(text, maxc):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + (1 if cur else 0) <= maxc:
            cur = (cur + " " + w).strip()
        else:
            lines.append(cur); cur = w
    lines.append(cur)
    return lines

def ell_text(cx, cy, text, size, weight, maxc):
    lines = wrap(text, maxc)
    lh = size * 1.15
    y0 = cy - (len(lines) - 1) * lh / 2 + size * 0.35
    return "".join(f'<text x="{cx:.1f}" y="{y0 + i*lh:.1f}" text-anchor="middle" font-size="{size}" font-weight="{weight}" fill="#1B2533">{esc(l)}</text>' for i, l in enumerate(lines))

def ellipse(cx, cy, rx, ry, text, color, fill, new, size=14, weight=600, maxc=18):
    stroke, sw = (color, 1.6)
    return (f'<ellipse cx="{cx:.1f}" cy="{cy:.1f}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
            + ell_text(cx, cy, text, size, weight, maxc))

def edge_point(cx, cy, rx, ry, tx, ty):
    a = math.atan2(ty - cy, tx - cx)
    return cx + rx * math.cos(a), cy + ry * math.sin(a)

def arrow(x1, y1, x2, y2, label, sub=None, color="#46505C", t=0.7):
    out = f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="1.4" stroke-dasharray="7 5" marker-end="url(#open)"/>'
    ang = math.degrees(math.atan2(y2 - y1, x2 - x1))
    if ang > 90: ang -= 180
    if ang < -90: ang += 180
    lx, ly = x1 + (x2 - x1) * t, y1 + (y2 - y1) * t
    out += f'<text transform="translate({lx:.1f},{ly:.1f}) rotate({ang:.1f})" x="0" y="-5" text-anchor="middle" font-size="12" fill="#46505C" font-style="italic">{esc(label)}</text>'
    return out

def actor(x, y):
    s = "#1B2533"
    return (f'<g stroke="{s}" stroke-width="2.2" fill="none" stroke-linecap="round">'
            f'<circle cx="{x}" cy="{y-48}" r="14"/><line x1="{x}" y1="{y-34}" x2="{x}" y2="{y+6}"/>'
            f'<line x1="{x-22}" y1="{y-18}" x2="{x+22}" y2="{y-18}"/>'
            f'<line x1="{x}" y1="{y+6}" x2="{x-18}" y2="{y+38}"/><line x1="{x}" y1="{y+6}" x2="{x+18}" y2="{y+38}"/></g>'
            f'<text x="{x}" y="{y+62}" text-anchor="middle" font-size="15" font-weight="700" fill="{s}">Usuário</text>')

def panel(px, py, case):
    title, cname, main, incs, exts = case
    color, fill = PALETTE[cname]
    o = f'<rect x="{px}" y="{py}" width="{PW:.1f}" height="{PH:.1f}" rx="14" fill="#FFFFFF" stroke="#C9D3E0" stroke-width="1.5"/>'
    # header pill
    tw = min(PW - 30, len(title) * 8.6 + 40)
    o += f'<rect x="{px + (PW-tw)/2:.1f}" y="{py+16}" width="{tw:.1f}" height="38" rx="8" fill="{NAVY}"/>'
    o += f'<text x="{px+PW/2:.1f}" y="{py+41}" text-anchor="middle" font-size="15" font-weight="700" fill="#FFFFFF">{esc(title)}</text>'
    # system boundary
    bx, by, bw, bh = px + 120, py + 82, PW - 140, PH - 102
    o += f'<rect x="{bx:.1f}" y="{by:.1f}" width="{bw:.1f}" height="{bh:.1f}" rx="12" fill="none" stroke="{color}" stroke-width="2"/>'
    o += f'<rect x="{bx + bw/2 - 48:.1f}" y="{by-11}" width="96" height="22" fill="#FFFFFF"/>'
    o += f'<text x="{bx + bw/2:.1f}" y="{by+6}" text-anchor="middle" font-size="16" font-weight="800" fill="{color}" letter-spacing="1">NOPOD</text>'
    # items on the right
    items = [(t, n, None, False) for t, n in incs] + [(t, n, c, True) for t, c, n in exts]
    n = len(items)
    top, bot = by + 34, by + bh - 24
    step = (bot - top) / n
    rx, ry = 92, min(31, step / 2 - 3)
    ix = bx + bw - rx - 16
    mcx, mcy = bx + 104, by + bh / 2
    mrx, mry = 82, 40
    ax = px + 62
    # association line
    o += f'<line x1="{ax+24}" y1="{mcy-12:.1f}" x2="{mcx-mrx:.1f}" y2="{mcy:.1f}" stroke="#1B2533" stroke-width="1.6"/>'
    o += actor(ax, mcy)
    for k, (t, new, cond, is_ext) in enumerate(items):
        cy = top + step * (k + 0.5)
        efill = "#FFFFFF" if is_ext else fill
        o += ellipse(ix, cy, rx, ry, t, color, efill, new, size=13, weight=600, maxc=19)
        sx, sy = edge_point(mcx, mcy, mrx, mry, ix, cy)
        tx, ty = edge_point(ix, cy, rx, ry, mcx, mcy)
        if is_ext:
            o += arrow(tx, ty, sx, sy, "«extend»", t=0.4)
            o += f'<text x="{ix:.1f}" y="{cy + ry + 15:.1f}" text-anchor="middle" font-size="12" fill="#1B2533" font-weight="700">{esc(cond)}</text>'
        else:
            o += arrow(sx, sy, tx, ty, "«include»")
    o += ellipse(mcx, mcy, mrx, mry, main, color, fill, False, size=15, weight=700, maxc=14)
    return o

def legend(px, py):
    o = f'<rect x="{px}" y="{py}" width="{PW:.1f}" height="{PH:.1f}" rx="14" fill="#F6F8FB" stroke="#C9D3E0" stroke-width="1.5"/>'
    o += f'<text x="{px+28}" y="{py+50}" font-size="19" font-weight="800" fill="{NAVY}">LEGENDA</text>'
    y = py + 100
    o += f'<ellipse cx="{px+70}" cy="{y}" rx="42" ry="18" fill="#E3F2DC" stroke="#3F8F3A" stroke-width="1.6"/>'
    o += f'<text x="{px+130}" y="{y+5}" font-size="14.5" fill="#1B2533">Caso de uso</text>'
    y += 62
    o += f'<ellipse cx="{px+70}" cy="{y}" rx="42" ry="18" fill="#FFFFFF" stroke="#3F8F3A" stroke-width="1.6"/>'
    o += f'<text x="{px+130}" y="{y-3}" font-size="14.5" fill="#1B2533">Fundo branco: caso de extensão</text>'
    o += f'<text x="{px+130}" y="{y+16}" font-size="14.5" fill="#1B2533">(«extend»), só ocorre na condição</text>'
    y += 66
    o += f'<line x1="{px+30}" y1="{y}" x2="{px+110}" y2="{y}" stroke="#46505C" stroke-width="1.4" stroke-dasharray="7 5" marker-end="url(#open)"/>'
    o += f'<text x="{px+130}" y="{y-3}" font-size="14.5" fill="#1B2533">«include»: sempre executado</text>'
    o += f'<text x="{px+130}" y="{y+16}" font-size="14.5" fill="#1B2533">como parte do caso</text>'
    y += 62
    o += f'<line x1="{px+30}" y1="{y}" x2="{px+110}" y2="{y}" stroke="#46505C" stroke-width="1.4" stroke-dasharray="7 5" marker-end="url(#open)"/>'
    o += f'<text x="{px+130}" y="{y-3}" font-size="14.5" fill="#1B2533">«extend»: executado só quando</text>'
    o += f'<text x="{px+130}" y="{y+16}" font-size="14.5" fill="#1B2533">a condição [ ] é verdadeira</text>'
    y += 70
    notes = ["Regras de negócio:",
             "• Cadastro exige data de nascimento;",
             "  menores de 18 são encaminhados",
             "  ao Disque Saúde 136, sem conta criada.",
             "• Consentimento específico para",
             "  dados de saúde (LGPD, art. 11).",
             "• Contas sem aceite vigente passam",
             "  pela tela de consentimento no login.",
             "• Exclusão de conta apaga histórico,",
             "  dados e login (LGPD, art. 18)."]
    for i, t in enumerate(notes):
        w = 700 if i == 0 else 400
        o += f'<text x="{px+30}" y="{y + i*24}" font-size="14.5" font-weight="{w}" fill="#1B2533">{esc(t)}</text>'
    return o

svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{FONT}">',
       '<defs><marker id="open" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse">'
       '<path d="M1 1 L11 6 L1 11" fill="none" stroke="#46505C" stroke-width="1.6"/></marker></defs>',
       f'<rect width="{W}" height="{H}" fill="#EEF2F7"/>',
       f'<text x="{W/2}" y="86" text-anchor="middle" font-size="52" font-weight="800" fill="{NAVY}">DIAGRAMAS DE CASOS DE USO – NOPOD</text>',
       f'<line x1="{W/2-560}" y1="128" x2="{W/2-250}" y2="128" stroke="{NAVY}" stroke-width="2"/>',
       f'<line x1="{W/2+250}" y1="128" x2="{W/2+560}" y2="128" stroke="{NAVY}" stroke-width="2"/>',
       f'<text x="{W/2}" y="136" text-anchor="middle" font-size="24" font-weight="700" fill="{NAVY}">FUNCIONALIDADES IMPLEMENTADAS</text>']
for i, c in enumerate(CASES):
    r, k = divmod(i, COLS)
    svg.append(panel(MX + k * (PW + GAP), TOP + r * (PH + GAP), c))
svg.append(legend(MX + 3 * (PW + GAP), TOP + (PH + GAP)))
svg.append('</svg>')
open('Casos_de_Uso.svg', 'w', encoding='utf8').write("".join(svg))
print("ok", PW, PH)
