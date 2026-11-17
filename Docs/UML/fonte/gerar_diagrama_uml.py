import math, html

W, H = 2480, 1740
NAVY = "#14325C"
INK = "#1B2533"
EDGE = "#46505C"
FONT = "Inter, DejaVu Sans, sans-serif"
GREEN, GREEN_F = "#3F8F3A", "#E3F2DC"
BLUE, BLUE_F = "#2F6DB5", "#DCEAF8"
AMBER, AMBER_F = "#D49A12", "#FCF0CF"
PURPLE, PURPLE_F = "#7B4FB0", "#ECE2F7"
ROSE, ROSE_F = "#B8434E", "#F8E0E2"

def esc(s): return html.escape(s)

def text(x, y, s, size=14, weight=400, anchor="middle", fill=INK, italic=False):
    st = ' font-style="italic"' if italic else ""
    return f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}" font-size="{size}" font-weight="{weight}" fill="{fill}"{st}>{esc(s)}</text>'

def mtext(x, y, lines, size=14, weight=400, anchor="middle", fill=INK):
    lh = size * 1.18
    y0 = y - (len(lines) - 1) * lh / 2 + size * 0.35
    return "".join(text(x, y0 + i * lh, l, size, weight, anchor, fill) for i, l in enumerate(lines))

def panel(x, y, w, h, title):
    o = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="#FFFFFF" stroke="#C9D3E0" stroke-width="1.5"/>'
    tw = len(title) * 9.2 + 48
    o += f'<rect x="{x + (w - tw) / 2:.1f}" y="{y + 16}" width="{tw:.1f}" height="38" rx="8" fill="{NAVY}"/>'
    o += text(x + w / 2, y + 41, title, 15, 700, fill="#FFFFFF")
    return o

def line(x1, y1, x2, y2, dashed=False, arrow=True, color=EDGE, width=1.5, head="filled"):
    d = ' stroke-dasharray="7 5"' if dashed else ""
    m = f' marker-end="url(#{head})"' if arrow else ""
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{width}"{d}{m}/>'

def path(d, dashed=False, arrow=True):
    da = ' stroke-dasharray="7 5"' if dashed else ""
    return f'<path d="{d}" fill="none" stroke="{EDGE}" stroke-width="1.5"{da}{" marker-end=\"url(#filled)\"" if arrow else ""}/>'

# ---------------- Classes ----------------
def uml_class(x, y, w, name, attrs, ops, color, fill):
    lh = 23
    hh = 42
    ah = len(attrs) * lh + 16
    oh = len(ops) * lh + 16 if ops else 0
    h = hh + ah + oh
    o = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#FFFFFF" stroke="{color}" stroke-width="1.8"/>'
    o += f'<path d="M{x} {y + hh} V{y + 6} Q{x} {y} {x + 6} {y} H{x + w - 6} Q{x + w} {y} {x + w} {y + 6} V{y + hh} Z" fill="{fill}" stroke="{color}" stroke-width="1.8"/>'
    o += text(x + w / 2, y + 27, name, 17, 800)
    for i, a in enumerate(attrs):
        o += text(x + 16, y + hh + 26 + i * lh, a, 13.5, 400, "start")
    if ops:
        yo = y + hh + ah
        o += f'<line x1="{x}" y1="{yo}" x2="{x + w}" y2="{yo}" stroke="{color}" stroke-width="1.4"/>'
        for i, op in enumerate(ops):
            o += text(x + 16, yo + 26 + i * lh, op, 13.5, 600, "start")
    return o, h

def classes(px, py, pw, ph):
    o = panel(px, py, pw, ph, "DIAGRAMA DE CLASSES")
    ux, uy, uw = px + 40, py + 90, 330
    c, uh = uml_class(ux, uy, uw, "User", [
        "- uid: string", "- name: string", "- email: string",
        "- birthDate: string (AAAA-MM-DD)", "- createdAt: timestamp",
        "- currentStreak: int", "- longestStreak: int",
        "- totalResisted: int", "- totalSmoked: int",
        "- lastSmokeDate: timestamp", "- lastResistanceDate: timestamp",
        "- consents: {terms, healthData}"],
        ["+ cadastrar()", "+ aceitarConsentimentos()", "+ excluirConta()"], GREEN, GREEN_F)
    o += c
    hx, hy, hw = px + pw - 40 - 300, py + 110, 300
    c, hh = uml_class(hx, hy, hw, "History", [
        "- id: string", "- type: \"resisted\" | \"smoked\"", "- createdAt: timestamp"],
        ["+ registrar()"], BLUE, BLUE_F)
    o += c
    ax, ay, aw = hx, py + 420, 300
    c, ah = uml_class(ax, ay, aw, "Acceptance", [
        "- version: string", "- acceptedAt: timestamp"], [], PURPLE, PURPLE_F)
    o += c
    # composição User -> History
    y1 = hy + 60
    o += f'<polygon points="{ux + uw},{y1} {ux + uw + 14},{y1 - 8} {ux + uw + 28},{y1} {ux + uw + 14},{y1 + 8}" fill="{EDGE}"/>'
    o += line(ux + uw + 28, y1, hx, y1, arrow=False)
    o += text(ux + uw + 40, y1 - 10, "1", 13.5, 700, "start")
    o += text(hx - 10, y1 - 10, "0..*", 13.5, 700, "end")
    o += text((ux + uw + 28 + hx) / 2, y1 + 24, "histórico (subcoleção)", 13, 400, italic=True)
    # composição User -> Acceptance
    y2 = ay + 40
    o += f'<polygon points="{ux + uw},{y2} {ux + uw + 14},{y2 - 8} {ux + uw + 28},{y2} {ux + uw + 14},{y2 + 8}" fill="{EDGE}"/>'
    o += line(ux + uw + 28, y2, ax, y2, arrow=False)
    o += text(ux + uw + 40, y2 - 10, "1", 13.5, 700, "start")
    o += text(ax - 10, y2 - 10, "2", 13.5, 700, "end")
    o += text((ux + uw + 28 + ax) / 2, y2 + 24, "consents.terms /", 13, 400, italic=True)
    o += text((ux + uw + 28 + ax) / 2, y2 + 42, "consents.healthData", 13, 400, italic=True)
    o += mtext(px + pw / 2, py + ph - 46, [
        "Users é uma coleção do Firestore; History é subcoleção de cada usuário.",
        "Acceptance registra versão e data do aceite dos Termos e do consentimento de saúde."], 13, 400, fill="#46505C")
    return o

# ---------------- Sequência ----------------
def sequence(px, py, pw, ph):
    o = panel(px, py, pw, ph, "DIAGRAMA DE SEQUÊNCIA – CADASTRO E REGISTRO DE RESISTÊNCIA")
    names = ["Usuário", "App (React Native)", "Firebase Auth", "Firestore"]
    cols = [(GREEN, GREEN_F), (BLUE, BLUE_F), (AMBER, AMBER_F), (PURPLE, PURPLE_F)]
    xs = [px + 150 + i * (pw - 300) / 3 for i in range(4)]
    top = py + 82
    bottom = py + ph - 26
    for x, n, (c, f) in zip(xs, names, cols):
        o += f'<line x1="{x:.1f}" y1="{top + 44}" x2="{x:.1f}" y2="{bottom}" stroke="#9AA6B5" stroke-width="1.4" stroke-dasharray="6 6"/>'
        o += f'<rect x="{x - 95:.1f}" y="{top}" width="190" height="44" rx="8" fill="{f}" stroke="{c}" stroke-width="1.8"/>'
        o += text(x, top + 28, n, 15, 700)
    U, A, AU, F = xs
    y = top + 82
    step = 41

    def msg(x1, x2, yy, label, ret=False):
        r = line(x1, yy, x2, yy, dashed=ret, head="open" if ret else "filled")
        lx = (x1 + x2) / 2
        return r + text(lx, yy - 8, label, 13, 400)

    o += msg(U, A, y, "1: preenche cadastro (nome, nascimento, e-mail, senha, aceites)"); y += step
    # self message
    o += path(f"M{A:.1f} {y - 10} h46 v24 h-46")
    o += text(A + 56, y + 6, "2: verifica idade ≥ 18", 13, 400, "start"); y += step + 8
    # alt fragment
    fx, fw = U - 70, (F + 70) - (U - 70)
    fy = y - 14
    y += 40
    o += msg(A, U, y, "3: exibe tela de encaminhamento (Disque Saúde 136), sem criar conta", ret=True); y += 26
    sep = y
    y += 44
    o += msg(A, AU, y, "4: criar usuário (e-mail, senha)"); y += step
    o += msg(AU, A, y, "5: uid", ret=True); y += step
    o += msg(A, F, y, "6: salvar users/{uid} (birthDate, consents)"); y += step
    o += msg(F, A, y, "7: ok (regras validam 18+ e aceites)", ret=True)
    fh = y + 18 - fy
    o += f'<rect x="{fx:.1f}" y="{fy:.1f}" width="{fw:.1f}" height="{fh:.1f}" fill="none" stroke="{EDGE}" stroke-width="1.3"/>'
    o += f'<path d="M{fx:.1f} {fy:.1f} h52 v18 l-8 8 h-44 z" fill="#EEF2F7" stroke="{EDGE}" stroke-width="1.3"/>'
    o += text(fx + 22, fy + 18, "alt", 13.5, 800)
    o += text(fx + 64, fy + 18, "[idade < 18]", 13, 700, "start")
    o += f'<line x1="{fx:.1f}" y1="{sep:.1f}" x2="{fx + fw:.1f}" y2="{sep:.1f}" stroke="{EDGE}" stroke-width="1.2" stroke-dasharray="8 5"/>'
    o += text(fx + 10, sep + 18, "[idade ≥ 18]", 13, 700, "start")
    y += step + 22
    o += msg(U, A, y, "8: conclui o exercício de respiração"); y += step
    o += msg(A, F, y, "9: criar users/{uid}/history (resisted)"); y += step
    o += msg(F, A, y, "10: ok (regra exige consentimento registrado)", ret=True); y += step
    o += msg(A, U, y, "11: atualiza o contador na tela inicial", ret=True)
    return o

# ---------------- Atividades ----------------
def act(cx, cy, label, color=BLUE, fill=BLUE_F, w=150, h=56):
    o = f'<rect x="{cx - w / 2:.1f}" y="{cy - h / 2:.1f}" width="{w}" height="{h}" rx="16" fill="{fill}" stroke="{color}" stroke-width="1.7"/>'
    words = label.split()
    lines, cur = [], ""
    for wd in words:
        if len(cur) + len(wd) + 1 <= 17:
            cur = (cur + " " + wd).strip()
        else:
            lines.append(cur); cur = wd
    lines.append(cur)
    return o + mtext(cx, cy, lines, 13, 600)

def dec(cx, cy, lines, w=140, h=92):
    o = f'<polygon points="{cx},{cy - h / 2} {cx + w / 2},{cy} {cx},{cy + h / 2} {cx - w / 2},{cy}" fill="{AMBER_F}" stroke="{AMBER}" stroke-width="1.7"/>'
    return o + mtext(cx, cy, lines, 12.5, 700)

def activities(px, py, pw, ph):
    o = panel(px, py, pw, ph, "DIAGRAMA DE ATIVIDADES – FLUXO PRINCIPAL")
    yM = py + ph / 2 + 30
    yT, yB, yE = yM - 150, yM + 150, yM - 270
    X = {"start": px + 60, "A1": px + 185, "D1": px + 360, "C1": px + 530, "D2": px + 700,
         "C2": px + 870, "C3": px + 1040, "T1": px + 1210, "X1": px + 1380, "R1": px + 1550, "end": px + 1660}
    hw, dw = 75, 70
    # start/end
    o += f'<circle cx="{X["start"]}" cy="{yM}" r="15" fill="{INK}"/>'
    o += line(X["start"] + 15, yM, X["A1"] - hw, yM)
    o += act(X["A1"], yM, "Abrir aplicativo")
    o += line(X["A1"] + hw, yM, X["D1"] - dw, yM)
    o += dec(X["D1"], yM, ["Possui", "conta?"])
    # não -> cadastro (topo)
    o += path(f'M{X["D1"]} {yM - 46} V{yT} H{X["C1"] - hw}')
    o += text(X["D1"] + 10, yM - 60, "não", 13, 700, "start")
    o += act(X["C1"], yT, "Preencher cadastro", GREEN, GREEN_F)
    o += line(X["C1"] + hw, yT, X["D2"] - dw, yT)
    o += dec(X["D2"], yT, ["Idade", "≥ 18?"])
    o += path(f'M{X["D2"]} {yT - 46} V{yE + 28}')
    o += text(X["D2"] + 10, yT - 60, "não", 13, 700, "start")
    o += act(X["D2"], yE, "Tela de encaminhamento (Disque 136)", ROSE, ROSE_F, w=170, h=56)
    o += line(X["D2"] + 85, yE, X["C2"] - 17, yE)
    o += f'<circle cx="{X["C2"]}" cy="{yE}" r="15" fill="none" stroke="{INK}" stroke-width="2"/><circle cx="{X["C2"]}" cy="{yE}" r="9" fill="{INK}"/>'
    o += line(X["D2"] + dw, yT, X["C2"] - hw, yT)
    o += text(X["D2"] + 40, yT - 30, "sim", 13, 700, "start")
    o += act(X["C2"], yT, "Aceitar Termos e consentimento", GREEN, GREEN_F)
    o += line(X["C2"] + hw, yT, X["C3"] - hw, yT)
    o += act(X["C3"], yT, "Criar conta", GREEN, GREEN_F)
    o += path(f'M{X["C3"] + hw} {yT} H{X["T1"]} V{yM - 28}')
    # sim -> login (base)
    o += path(f'M{X["D1"]} {yM + 46} V{yB} H{X["C1"] - hw}')
    o += text(X["D1"] + 10, yM + 66, "sim", 13, 700, "start")
    o += act(X["C1"], yB, "Fazer login")
    o += line(X["C1"] + hw, yB, X["D2"] - dw, yB)
    o += dec(X["D2"], yB, ["Credenciais", "válidas?"])
    o += path(f'M{X["D2"]} {yB + 46} V{yB + 92} H{X["C1"]} V{yB + 28}')
    o += text(X["D2"] + 10, yB + 66, "não", 13, 700, "start")
    o += line(X["D2"] + dw, yB, X["C2"] - dw, yB)
    o += text(X["D2"] + 40, yB - 30, "sim", 13, 700, "start")
    o += dec(X["C2"], yB, ["Aceites", "vigentes?"])
    o += line(X["C2"] + dw, yB, X["C3"] - hw, yB)
    o += text(X["C2"] + 40, yB + 42, "não", 13, 700, "start")
    o += act(X["C3"], yB, "Tela de consentimento", GREEN, GREEN_F)
    o += path(f'M{X["C3"] + hw} {yB} H{X["T1"]} V{yM + 28}')
    o += path(f'M{X["C2"]} {yB - 46} V{yM} H{X["T1"] - hw}')
    o += text(X["C2"] + 10, yB - 60, "sim", 13, 700, "start")
    # fluxo principal
    o += act(X["T1"], yM, "Tela inicial")
    o += line(X["T1"] + hw, yM, X["X1"] - hw, yM)
    o += act(X["X1"], yM, "Exercício de respiração")
    o += line(X["X1"] + hw, yM, X["R1"] - hw, yM)
    o += act(X["R1"], yM, "Registrar resistência")
    o += line(X["R1"] + hw, yM, X["end"] - 17, yM)
    o += f'<circle cx="{X["end"]}" cy="{yM}" r="15" fill="none" stroke="{INK}" stroke-width="2"/><circle cx="{X["end"]}" cy="{yM}" r="9" fill="{INK}"/>'
    return o

# ---------------- Casos de uso (visão geral) ----------------
def usecases(px, py, pw, ph):
    o = panel(px, py, pw, ph, "CASOS DE USO – VISÃO GERAL")
    bx, by, bw, bh = px + 170, py + 92, pw - 196, ph - 116
    o += f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" rx="12" fill="none" stroke="{NAVY}" stroke-width="2"/>'
    o += f'<rect x="{bx + bw / 2 - 48}" y="{by - 11}" width="96" height="22" fill="#FFFFFF"/>'
    o += text(bx + bw / 2, by + 6, "NOPOD", 16, 800, fill=NAVY)
    cases = [("Cadastrar Usuário", GREEN, GREEN_F), ("Fazer Login", BLUE, BLUE_F), ("Recuperar Senha", AMBER, AMBER_F),
             ("Cadastrar Nome/Apelido", PURPLE, PURPLE_F), ("Visualizar Tela Inicial", GREEN, GREEN_F),
             ("Realizar Exercício de Respiração", BLUE, BLUE_F), ("Excluir Conta", ROSE, ROSE_F)]
    ax, ay = px + 80, by + bh / 2
    s = INK
    o += (f'<g stroke="{s}" stroke-width="2.2" fill="none" stroke-linecap="round">'
          f'<circle cx="{ax}" cy="{ay - 48}" r="14"/><line x1="{ax}" y1="{ay - 34}" x2="{ax}" y2="{ay + 6}"/>'
          f'<line x1="{ax - 22}" y1="{ay - 18}" x2="{ax + 22}" y2="{ay - 18}"/>'
          f'<line x1="{ax}" y1="{ay + 6}" x2="{ax - 18}" y2="{ay + 38}"/><line x1="{ax}" y1="{ay + 6}" x2="{ax + 18}" y2="{ay + 38}"/></g>')
    o += text(ax, ay + 62, "Usuário", 15, 700)
    n = len(cases)
    step = (bh - 40) / n
    ex = bx + bw - 175
    for i, (c, col, fill) in enumerate(cases):
        cy = by + 20 + step * (i + 0.5)
        o += f'<line x1="{ax + 24}" y1="{ay - 18}" x2="{ex - 150:.1f}" y2="{cy:.1f}" stroke="{INK}" stroke-width="1.3"/>'
        o += f'<ellipse cx="{ex}" cy="{cy:.1f}" rx="150" ry="{min(30, step / 2 - 6):.1f}" fill="{fill}" stroke="{col}" stroke-width="1.6"/>'
        o += text(ex, cy + 5, c, 14, 600)
    return o

svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="{FONT}">',
       '<defs>'
       f'<marker id="filled" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M1 1 L11 6 L1 11 Z" fill="{EDGE}"/></marker>'
       f'<marker id="open" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M1 1 L11 6 L1 11" fill="none" stroke="{EDGE}" stroke-width="1.6"/></marker>'
       '</defs>',
       f'<rect width="{W}" height="{H}" fill="#EEF2F7"/>',
       f'<text x="{W / 2}" y="86" text-anchor="middle" font-size="52" font-weight="800" fill="{NAVY}">DIAGRAMAS UML – NOPOD</text>',
       f'<line x1="{W / 2 - 560}" y1="128" x2="{W / 2 - 200}" y2="128" stroke="{NAVY}" stroke-width="2"/>',
       f'<line x1="{W / 2 + 200}" y1="128" x2="{W / 2 + 560}" y2="128" stroke="{NAVY}" stroke-width="2"/>',
       f'<text x="{W / 2}" y="136" text-anchor="middle" font-size="24" font-weight="700" fill="{NAVY}">VISÃO GERAL DO SISTEMA</text>']
svg.append(classes(40, 190, 900, 720))
svg.append(sequence(968, 190, 1472, 720))
svg.append(activities(40, 938, 1700, 760))
svg.append(usecases(1768, 938, 672, 760))
svg.append('</svg>')
open("Diagrama_UML.svg", 'w', encoding='utf8').write("".join(svg))
print("ok")
