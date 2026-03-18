import { useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { useAppStore } from './store/useAppStore'
import './App.css'

function App() {
  const isDarkMode = useAppStore(s => s.isDarkMode)

  useEffect(() => {
    const root = document.documentElement
    root.style.colorScheme = isDarkMode ? 'dark' : 'light'
    document.body.style.backgroundColor = isDarkMode ? '#0F1219' : '#F4F6F9'
    document.body.style.color = isDarkMode ? '#E8ECF4' : '#0F172A'
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', isDarkMode ? '#0F1219' : '#0EA5E9')
  }, [isDarkMode])

  return <HomePage />
}

export default App

/*
. La teva Guia d'Acció (El Workflow de l'Animador AI)
Ara que el codi estarà preparat per rebre vídeos, aquesta és la teva llista de tasques per crear el contingut. Et recomano fer-ho en lots (batching) per anar més ràpid.

Fase 1: Planificació i Llista
Fes l'inventari: Agafa el teu fitxer types.ts o la llista de dades i apunta els exercicis únics (ex: Neck-tilt, Cat-Cow, Child-pose, Shoulder-roll).

Agrupa per posició: Separa'ls entre "Drets", "Asseguts a la cadira" i "A terra (Màrfega)". Et serà més fàcil a l'hora de gravar-te.

Fase 2: Creació de la "IP" (El teu personatge)
Obre ChatGPT (DALL-E 3) o Midjourney.

Genera el teu personatge base. Requisits clau de la imatge:

Ha d'estar mirant endavant.

Postura en "A" (braços lleugerament separats del cos, no enganxats).

Fons totalment llis (un verd chroma #00FF00 o un blanc pur).

Molt important: Sense elements que pengin (caputxes amples, cabells molt llargs al vent), ja que la IA es pot confondre a l'animar-ho.

Fase 3: El "Motion Capture" (Gravar-te a tu)
Posa't roba molt ajustada (malles, samarreta tèrmica) d'un color que contrasti amb la paret de casa teva.

Posa el mòbil en un trípode (o repenjat en uns llibres) amb bona il·luminació.

Grava cada estirament. El truc d'or: Fes el moviment sencer i torna exactament a la posició inicial. Això farà que el "loop" del vídeo sigui infinit i sense talls bruscos. Cadascun hauria de durar entre 4 i 8 segons.

Fase 4: La Màgia amb Viggle AI
Entra a Viggle AI (viggle.ai o al seu Discord).

Fes servir la funció "Mix".

Puja la imatge del teu personatge (Fase 2) i el vídeo del teu estirament (Fase 3).

Deixa que la IA processi el vídeo. Obtindràs un fitxer MP4 on el teu personatge es mou exactament com tu.

Fase 5: Optimització (Molt important per al SaaS)
Els MP4 crus poden pesar molt o tenir fons lletjos.

Ves a eines gratuïtes com Unscreen (per treure el fons si cal) o Ezgif / CloudConvert.

Retalla el vídeo just on comença i acaba el loop.

Converteix-lo a format WebM. Aquest format és brutal perquè suporta fons transparent i pesa poquíssim (ideal per a webs ràpides).

Fase 6: Integració al Codi
Posa els teus fitxers WebM a la carpeta src/assets/videos/.

Comprova que els noms coincideixin amb el que t'ha preparat l'agent (ex: neck-tilt.webm).

Gaudeix veient la teva app funcionar!
*/
