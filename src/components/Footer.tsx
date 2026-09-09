import { Database, FileText } from 'lucide-react'
import { reportSource } from '../data/pisaData'

const HISTORICAL_SOURCES = [
  { year: '2015', cite: 'PISA 2015 Results (Vol. I): Excellence and Equity in Education', doi: '10.1787/9240011-en' },
  { year: '2018', cite: 'PISA 2018 Results (Vol. I): What Students Know and Can Do', doi: '10.1787/5f07c754-en' },
  { year: '2022', cite: 'PISA 2022 Results (Vol. I): The State of Learning and Equity in Education', doi: '10.1787/53f23881-en' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 border-t border-slate-800 pt-10 md:flex-row md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-lg text-slate-200">Fuentes</p>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-500">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                Principal · {reportSource.title}. {reportSource.publisher}. DOI:{' '}
                <a
                  href={`https://doi.org/${reportSource.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400/90 underline decoration-cyan-400/30 underline-offset-2 hover:text-cyan-300"
                >
                  {reportSource.doi}
                </a>
              </span>
            </p>
            {HISTORICAL_SOURCES.map((s) => (
              <p key={s.year} className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-500">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                <span>
                  Serie histórica · {s.cite}. DOI:{' '}
                  <a
                    href={`https://doi.org/${s.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400/90 underline decoration-cyan-400/30 underline-offset-2 hover:text-cyan-300"
                  >
                    {s.doi}
                  </a>
                </span>
              </p>
            ))}
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-500">
              <Database className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                Tablas web autonómicas:{' '}
                <a
                  href="https://gpseducation.oecd.org/CountryProfile?primaryCountry=ESP"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400/90 underline decoration-cyan-400/30 underline-offset-2 hover:text-cyan-300"
                >
                  OECD Education GPS · España
                </a>
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-1.5 text-sm text-slate-500 sm:grid-cols-2">
            {Object.values(reportSource.keyTables).map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-700">
          Reportaje interactivo construido con datos verificados sobre los Volumen I oficiales de cada ciclo · Las
          medias UE-27 son cálculo propio sobre los 27 sistemas de la UE en la Tabla I.1 · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
