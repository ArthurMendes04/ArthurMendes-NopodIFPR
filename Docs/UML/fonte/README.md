# Fonte dos diagramas de casos de uso

O quadro `Casos_de_Uso.pdf` é gerado a partir de `gerar_casos_de_uso.py`. Os casos de uso, os includes e os extends ficam na lista `CASES`, no início do arquivo.

Para gerar de novo depois de editar:

```
python gerar_casos_de_uso.py
rsvg-convert -f pdf Casos_de_Uso.svg -o ../Casos_de_Uso.pdf
rsvg-convert -w 2480 Casos_de_Uso.svg -o ../Casos_de_Uso.png
```

O `Casos_de_Uso.svg` também pode ser aberto e editado diretamente no navegador, no Inkscape ou no draw.io.

## Diagramas UML (classes, sequência, atividades e visão geral dos casos de uso)

O quadro `Diagrama_UML.pdf` é gerado por `gerar_diagrama_uml.py`, da mesma forma:

```
python gerar_diagrama_uml.py
rsvg-convert -f pdf Diagrama_UML.svg -o ../Diagrama_UML.pdf
rsvg-convert -w 2480 Diagrama_UML.svg -o ../Diagrama_UML.png
```
