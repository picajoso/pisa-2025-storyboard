# PISA 2025 · Una década perdida en las aulas

Reportaje interactivo (scrollytelling) sobre los resultados de **PISA 2025**, construido
con datos verificados del informe oficial:

> OECD (2026), *PISA 2025 Results (Volume I): Future-Ready Students*, OECD Publishing, Paris.
> DOI: [10.1787/73451bc5-en](https://doi.org/10.1787/73451bc5-en)

## Secciones

1. **Hero** — KPIs animados: media OCDE, caídas en lectura desde 2015
2. **Ranking internacional** — España vs UE-27, OCDE y líderes globales (tabs por competencia)
3. **Brecha autonómica** — las 18 CCAA + Ceuta y Melilla, con equivalencia en cursos escolares
4. **El debate de la IA** — uso semanal, sustitución cognitiva y distracción digital
5. **Efecto calculadora** — matemáticas vs resolución computacional de problemas
6. **Pirámide del talento** — altos y bajos rendimientos por país
7. **Género** — brechas por materia, con el empate perfecto español en ciencia
8. **Equidad** — contexto socioeconómico, docente, absentismo y acoso
9. **La paradoja del bienestar** — pertenencia escolar España (0,46) vs OCDE (0,09)

## Notas metodológicas

- Los datos autonómicos provienen de las tablas web I.2.o3–I.2.o5 (Excel oficial vía
  [stat.link/xgs41b](https://stat.link/xgs41b)). **Cataluña no se desglosa** en PISA 2025
  (tasa de exclusión del 23,2 %) y **Murcia se publica «con cautela»**, según el propio informe.
- La media UE-27 es cálculo propio sobre los 27 sistemas de la UE en la Tabla I.1.
- Los valores históricos de 2015/2022 marcados como `estimated` se derivan de las
  tendencias decenales y cambios 2022→25 publicados en el informe.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · Recharts · Framer Motion · Lucide

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (tsc + vite build)
npm run lint     # oxlint
```

## Licencia y uso

Código: uso libre. Los datos PISA pertenecen a la OCDE — si reutilizas las visualizaciones,
cita el informe original.
