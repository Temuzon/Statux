export interface Module {
  id: number;
  title: string;
  description: string;
  content: string;
  toolId?: string;
}

export const MODULES: Module[] = [
  {
    id: 0,
    title: "Módulo 0: Activación",
    description: "Romper la mentalidad pasiva y entender el storytelling como tecnología cognitiva.",
    content: `
# Módulo 0: Activación
## Romper la mentalidad pasiva
Olvídate de contar anécdotas y esperar palmaditas. La mentalidad pasiva acepta el storytelling como mero entretenimiento. Error mortal. El verdadero storytelling es un arma de control perceptivo: no estás contando qué pasó, estás programando emociones. Cuando escuchas un relato bien construido, tu cerebro no procesa datos neutrales, sino que simula la escena como propia. Tu sistema límbico hace “clic” y vive la historia en primera persona. Aquí no se compite por likes ni meros “me gusta”: Statux posee la narrativa.

## ¿Qué es realmente el storytelling (sin humo)?
La narración es tecnología cognitiva milenaria – mucho más que marketing. Surgió miles de años antes de la escritura, con pinturas rupestres, danzas y mitos orales. Es el arte de secuestrar la realidad momentáneamente: el narrador hacker toma control de la mente del oyente para devolverla transformada, a su favor. No es magia ni suerte, es neurociencia aplicada, con la intención más oscura y elegante posible.

*   **Acoplamiento neuronal:** estudios muestran que al oír una historia, las neuronas del oyente disparan en sincronía con las del narrador. Se activan áreas sensoriales, motoras y emocionales del cerebro como si estuvieras viviendo cada evento.
*   **Dopamina y memoria:** una buena trama libera dopamina, fijando emociones en la memoria. No olvidas lo que sentiste, recuerdas cómo te sentiste.
*   **Experiencia inmersiva:** cuanto más involucradas estén las redes cerebrales (Broca, Wernicke, corteza motora/sensorial, frontal), más profundo el impacto. Un relato bien contado activa múltiples zonas de la corteza, reteniendo la atención y la conciencia.

Con Statux, el relato ya no es un cuento bonito: es una simulación de realidad diseñada con precisión. Así definida, la narrativa deja de ser un “debe ser auténtico” e inocente entretenimiento, y pasa a ser el guion maestro de tus objetivos.

## Por qué la mayoría falla
La mayoría de quienes intentan contar historias caen en vicios básicos de aficionado. Statux los elimina:

*   **Error del aficionado:** Cuenta qué pasó. **Corrección Statux:** Diseña qué debe sentir el otro.
*   **Error del aficionado:** Busca ser “auténtico” a fuerza, contando detalles que importan solo a él. **Corrección Statux:** Estructura la trama para ser inevitable y memorable.
*   **Error del aficionado:** Quiere gustar y ser simpático. **Corrección Statux:** Aspira a ser inolvidable, a dejar una huella que trascienda el instante.

El aficionado grita “¡Mira lo que hice!” con orgullo. El estratega Statux susurra con confianza: “Esto ya era parte de ti; solo te lo estoy mostrando.” Las historias van más allá del autor: se convierten en terreno féil para quien las escucha. Recuerda, los mejores márketers saben que el storytelling es un arma poderosa, no un adorno.

## Regla base: tensión sobre estabilidad
Sin conflicto no hay historia. Sin historia no hay atención. El cerebro humano ignora lo predecible y estable. Frente a la calma absoluta, prácticamente nada capta nuestra atención; frente a la fricción, somos imán. Estudios confirman que la audiencia sincroniza su atención en los momentos cargados de emoción y suspenso. Al revés, durante la pura exposición (contexto sin avance de la trama) la mente divaga.

> “La calma es invisible. La tensión es magnética.”

Este es el axioma Statux: cualquier contenido sin un punto de fricción en los primeros segundos está condenado al olvido. No se trata de melodrama vacío, sino de pinchar la curiosidad y activar el sistema de alerta de tu lector.

## Ejercicio de activación inmediata
1.  Revisa tus 3 últimos contenidos (tweet, TikTok, post, lo que sea).
2.  Identifica ¿dónde está la fricción? ¿Cuál es el conflicto, la pregunta o el choque que captura la atención?
3.  Si la respuesta es “en ningún lado”, fíjate bien: ese contenido está virtualmente muerto.
4.  Pregúntate con frialdad: ¿cómo puedo girar cada introducción hacia un choque sensorial, un deseo intenso o un miedo latente?

Esto no es dramatismo barato, es electricidad narrativa. Empezamos con tu propio material: si no encuentras tensión, entonces no se trata de hacerlo mejor, sino de empezar de nuevo. Statux no vende cuentos épicos, vende descargas eléctricas.
`
  },
  {
    id: 1,
    title: "Módulo 1: Arquetipo Narrativo",
    description: "Define tu perfil de personalidad estratégica: Rebelde, Estratega, Visionario o Cercano.",
    toolId: "story-engine",
    content: `
# Módulo 1: Arquetipo narrativo (Statux)
Perfil de personalidad que guía tono y objetivo de tu historia. Siguiendo a Jung, Statux usa cuatro: Rebelde, Estratega, Visionario y Cercano.

## Definición operativa
Patrón de estilo y actitud del narrador diseñado para influir en la audiencia de forma consistente y estratégica.

## Arquetipos Statux
*   **Rebelde:** Rasgos disruptivos, desafiantes. Tono provocador y audaz. Objetivo: romper el status quo y viralizar; error: saturar con confrontación.
*   **Estratega:** Rasgos analíticos, calculadores. Tono formal y experto. Objetivo: generar confianza y vender soluciones; error: caer en tecnicismos sin acción.
*   **Visionario:** Rasgos innovadores, inspiradores. Tono inspirador, visionario. Objetivo: inspirar aspiraciones grandes; error: ser demasiado abstracto.
*   **Cercano:** Rasgos sinceros, empáticos. Tono directo, sincero y cercano. Objetivo: conectar y generar confianza; error: volverse tedioso o genérico.

## Mapa de transformación

| Elemento | Rebelde | Estratega | Visionario | Cercano |
| :--- | :--- | :--- | :--- | :--- |
| **Hook** | “¿Cansado del statu quo?” | “Planifica cada paso.” | “Imagina un futuro.” | “Hagámoslo juntos.” |
| **Protagonista** | El inconformista | El planificador diligente | El soñador digital | El vecino solidario |
| **Conflicto** | Orden vs cambio | Caos vs método | Realidad vs utopía | Aislamiento vs apoyo |
| **Emoción** | Rabia, euforia | Determinación, control | Asombro, esperanza | Empatía, calidez |
| **CTA** | “Únete a la revolución.” | “Domina tu agenda.” | “Crea tu propio destino.” | “Vamos juntos.” |

## Reglas de uso Statux
*   **Viralidad:** Rebelde puro.
*   **Autoridad:** Estratega o Visionario (incluso combinados).
*   **Venta:** Estratega enfocado.
*   **Conexión:** Cercano, o Cercano+Visionario.

## Checklist rápido
1.  ¿El tono coincide con el arquetipo elegido?
2.  ¿El lenguaje refleja sus rasgos (ej. desafío vs cercanía)?
3.  ¿Se mantiene el mismo arquetipo en todo el texto?
4.  ¿Cumple el objetivo (viralidad, confianza, etc.)?
5.  ¿No hay contradicciones entre frases?
`
  },
  {
    id: 2,
    title: "Módulo 2: El Hook",
    description: "Detonantes iniciales para retener la atención en menos de 3 segundos.",
    toolId: "hook-generator",
    content: `
# Módulo 2: El Hook
El hook es el detonante inicial que retiene la atención en segundos. En este módulo definimos su rol: generar dopamina o urgencia, romper expectativas y crear promesas irresistibles.

## Definición operativa de Hook
**Hook (Statux):** Frase corta o pregunta diseñada para detener el scroll y activar la curiosidad o urgencia en <3s. Debe explotar brechas mentales (curiosidad), un miedo real (dolor), un choque de ideas (contradicción) o una promesa poderosa.

## Tipos de Hook
*   **Curiosidad:** Explota la brecha de información y el deseo de saber más. Neuro: activa dopamina al generar una necesidad insatisfecha.
    *   *Micro-hooks:* «¿Sabías que X...?», «El secreto de Y te sorprenderá».
    *   *Apertura:* “Imagina si pudieras... / Hasta ahora nadie te contó...”.
    *   *Cierre:* “Descúbrelo ahora.”
*   **Dolor:** Apela al miedo a perder algo (aversión a la pérdida). Neuro: la urgencia por evitar dolor/ pérdida impulsa la acción.
    *   *Micro-hooks:* «Última oportunidad para X», «Evita el peor error al...».
    *   *Apertura:* “Últimamente noté que X causa Y... / ¿Cuántas veces perdiste...?.”
    *   *Cierre:* “Actúa antes de que sea tarde.”
*   **Contradicción:** Provoca disonancia cognitiva al desafiar creencias. Obliga a reevaluar, capturando atención.
    *   *Micro-hooks:* «Todo lo que sabes sobre X está mal», «Olvídate de Y».
    *   *Apertura:* “Creías que X, pero la verdad es... / ¿Y si todo lo contrario fuera cierto?”
    *   *Cierre:* “Prepárate para cambiar de perspectiva.”
*   **Promesa:** Ofrece un beneficio concreto. Genera expectativa positiva.
    *   *Micro-hooks:* «Aumenta tus ventas un 300% con...», «La única guía que necesitas para X».
    *   *Apertura:* “Haz esto y lograrás... / Descubre cómo conseguir X en poco tiempo.”
    *   *Cierre:* “No esperes más. Hazlo realidad.”

## Reglas prácticas
*   **Viralidad:** Usa Curiosidad o Contradicción (ganchos impactantes y extraños).
*   **Venta:** Combina Dolor+Promesa (muestra pérdida/ganancia).
*   **Retención:** Predomina Curiosidad y Promesa para enganchar y mantener interés.
*   **Autoridad:** Contradicción y Promesa (reformula status quo o establece liderazgo).

## Checklist rápido (impacto en <3s)
1.  ¿Genera una brecha de curiosidad?
2.  ¿Invoca un miedo real o pérdida (urgencia)?
3.  ¿Rompe expectativas o creencias?
4.  ¿Promete un beneficio claro?
5.  ¿Lenguaje breve, directo, provocador?
6.  ¿Impacta con primeras 3 palabras?

## Métricas clave e iteración
*   **CTR:** mide efectividad del hook.
*   **Retención 3s/10s:** % que permanece.
*   **Comentarios/engagement:** reflejo de curiosidad activada.
*   *Itera A/B testeando variaciones de ganchos; prioriza los que mantengan >50% a 3s.*

## Mini-guía Tono Statux
Lenguaje corto, presente y visceral. Evita palabras débiles (ej. “intentar”, “quizá”). Prefiere verbos imperativos y preguntas directas. Usa términos potentes: “destruye”, “revela”, “transforma”. Ritmo abrupto, oraciones breves. Un toque juguetón puede ser una provocación: “Sí, te lo dijo Statux primero”.
`
  },
  {
    id: 3,
    title: "Módulo 3: Emoción y Tensión",
    description: "Diseña curvas de tensión que atrapan hasta el final. No vendes emociones, vendes resolución.",
    content: `
# Módulo 3: Emoción y Tensión
🎯 **Objetivo del módulo:** Evitar historias planas. Una historia plana no es "aburrida" por falta de datos. Es plana porque no sube ni baja la tensión emocional.

## 1. La ecuación olvidada
La mayoría cree: "Emoción = grito, llanto, música triste o final feliz." **Falso.**
La emoción en storytelling es **tensión + liberación**.
*   **Tensión** = algo en juego + incertidumbre + amenaza o deseo bloqueado
*   **Liberación** = resolución (esperada o sorpresiva)

> "No vendes emociones. Vendes la promesa de resolver una tensión."

## 2. Las 4 emociones que venden
| Emoción | Motor neuro | Aplicación Statux | Ejemplo de hook emocional |
| :--- | :--- | :--- | :--- |
| **Miedo** | Amígdala → evasión de pérdida | Urgencia, riesgo de perder lo que se tiene | "Sigues así y en 6 meses estarás igual… pero más cansado." |
| **Deseo** | Sistema de recompensa (dopamina) | Atracción hacia un futuro mejor | "Imagina despertar sin esa ansiedad." |
| **Urgencia** | Escasez + pérdida inminente | Cierre, acción inmediata | "Esto desaparece en 24h. Y no volverá." |
| **Pertenencia** | Oxitocina + validación social | Conexión tribal, comunidad | "Ellos ya lo entendieron. Tú también puedes." |

## 3. Cómo crear tensión (el esqueleto invisible)
| Palanca | Definición | Ejemplo |
| :--- | :--- | :--- |
| **Plazo** | Algo va a pasar sí o sí en un tiempo determinado | "En 3 días toma la decisión o el sistema se cierra" |
| **Riesgo** | Algo valioso puede perderse | "Si eliges mal, pierdes 6 meses de avance" |
| **Incertidumbre** | No sabes qué pasará, pero sabes que algo pasará | "Lo que viene en el siguiente párrafo te va a incomodar" |

## 4. La curva de tensión
Una historia efectiva oscila entre picos y valles:
1.  **Hook** (primeros 3 segundos)
2.  **Primera promesa o giro** (20-30%)
3.  **Punto medio** (conflicto agudizado)
4.  **Antes del cierre** (última tensión antes de resolver)

## 5. Errores mortales
*   **Emoción plana:** El cerebro se desconecta.
*   **Tensión sin liberación:** Frustra y genera desconfianza.
*   **Liberación sin tensión previa:** No emociona, es "gratis".
*   **Sobrecarga emocional:** Fatiga al lector.
`
  },
  {
    id: 4,
    title: "Módulo 4: Ventas (Story Sales)",
    description: "Convierte historias en ventas invisibles pero letales usando el Story Sales Frame.",
    content: `
# Módulo 4: Convertir historias en ventas
No "contar bonito". Vender. La venta invisible es la que convierte.

## 1. La gran mentira del storytelling "inocente"
"Cuenta historias auténticas y la gente te comprará por arte de magia." **Falso.**
Las historias sin intención de venta son entretenimiento.

> "Toda historia que no empuja hacia una acción de valor es un hobby."

## 2. Las 3 leyes de la persuasión narrativa
1.  **El producto es el héroe (disfrazado):** El cliente = héroe. Tu oferta = la herramienta/aliado sabio.
2.  **La venta empieza antes de pedir:** Vender es cada palabra que escribiste antes del CTA.
3.  **Toda objeción es una historia no contada:** Cuenta la historia que mate esa objeción antes de que nazca.

## 3. El esqueleto Story Sales Frame
1.  **Golpe:** Abre con tensión pura. El problema duele.
2.  **Identificación:** El protagonista (cliente) se ve reflejado.
3.  **Falso alivio:** Cuenta lo que intentó y no funcionó.
4.  **Encuentro con la solución:** Aparece tu método/producto como herramienta.
5.  **Transformación:** Muestra el antes/después concreto.
6.  **Puente + CTA:** Invitas a la acción con un paso claro.

## 4. Los 5 pecados capitales
*   **El CTA cobarde:** "Si quieres, tal vez..."
*   **La oferta invisible:** No decir qué vendes.
*   **El héroe equivocado:** Hablar de ti, no del cliente.
*   **Sin consecuencia:** "Esto te puede ayudar" (sin urgencia).
*   **El precio sin valor:** Dar el costo sin el beneficio.
`
  },
  {
    id: 5,
    title: "Módulo 5: Reescritura Inteligente",
    description: "Cirugía narrativa: identifica órganos muertos y trasplanta tensión y emoción.",
    toolId: "smart-rewriter",
    content: `
# Módulo 5: Reescritura Inteligente
🎯 **Objetivo:** Mejorar cualquier texto sin empezar de cero. Reescribir inteligentemente es cirugía narrativa.

## 1. Los 4 niveles de la reescritura
1.  **Estructura:** ¿La historia tiene los huesos correctos?
2.  **Emoción:** ¿La tensión sube y baja?
3.  **Persuasión:** ¿Empuja hacia una acción clara?
4.  **Estilo:** ¿El tono y ritmo atrapan?

## 2. Las 5 cirugías narrativas de Statux
1.  **Trasplante de protagonista:** De "nosotros" a una persona real con nombre y rostro.
2.  **Amputación del contexto muerto:** Corta todo lo que no sea tensión pura al inicio.
3.  **Inyección de riesgo:** Añade una frase que explicite la pérdida si no se actúa.
4.  **Puente hacia el CTA:** Conecta la emoción final con la acción necesaria.
5.  **Cambio de arquetipo:** Ajusta la voz (Rebelde, Estratega, Visionario, Cercano).

## 3. El método de las 3 versiones
*   **V1 — Estructural:** Que la historia funcione como esqueleto.
*   **V2 — Emocional:** Que se sienta (picos y valles).
*   **V3 — Persuasiva + Estilo:** Que venda y suene bien.
`
  },
  {
    id: 6,
    title: "Módulo 6: Formatos (Multiplicador)",
    description: "Una historia, 7 formatos. Multiplica tu impacto sin agotar tu creatividad.",
    toolId: "content-transformer",
    content: `
# Módulo 6: Formatos (Multiplicador)
🎯 **Objetivo:** Convertir una misma historia en múltiples formatos sin volver a empezar.

## 1. El principio de la palanca narrativa
Una buena historia es como un código fuente. Los formatos son los compiladores.
> "No necesitas 10 historias. Necesitas 1 historia bien construida y 10 formas de contarla."

## 2. Los 7 formatos clave
*   **TikTok/Reel:** Tensión pura + gancho visual (15-60 seg).
*   **Carrusel:** Una idea por lámina + cierre con gancho.
*   **Hilo de Twitter/X:** Cada tweet es un micro-hook.
*   **Email:** Personal + puente al CTA (150-300 palabras).
*   **Post estándar:** Estructura clara + ritmo (300-600 palabras).
*   **Copy de venta corto:** Story Sales Frame comprimido.
*   **Landing page:** Story Sales Frame extendido + pruebas.

## 3. El arte de comprimir (3 filtros)
1.  **Filtro 1: Conflicto:** ¿Sin esto, hay historia?
2.  **Filtro 2: Emoción:** ¿Esto genera tensión o es contexto?
3.  **Filtro 3: Acción:** ¿Esto empuja al CTA o es adorno?
`
  },
  {
    id: 7,
    title: "Módulo 7: Análisis Final",
    description: "Story Analyzer Pro: checklist de 22 puntos para validar antes de publicar.",
    toolId: "persuasion-analyzer",
    content: `
# Módulo 7: Análisis Final (Story Analyzer Pro)
🎯 **Objetivo:** Validar cualquier historia antes de publicar. Statux no reza, Statux verifica.

## 1. Los 4 niveles del análisis final
*   **Estructura:** 5/5 puntos (Protagonista, Deseo, Obstáculo, Riesgo, Antes/Después).
*   **Emoción:** 4/5 puntos (Tensión, Oscilación, Pico temprano, Respiro, Sentir el riesgo).
*   **Persuasión:** 5/6 puntos (CTA claro, Oferta rápida, Objeciones, Qué/Cómo/Por qué, Herramienta vs Héroe, Consecuencia).
*   **Formato + Estilo:** 5/6 puntos (Hook 3 palabras, Arquetipo, Frases cortas, Verbos acción, Reglas canal, Solo texto).

## 2. El semáforo de aprobación
*   🟢 **VERDE (22-20 sí):** Publica. Está lista.
*   🟡 **AMARILLO (19-17 sí):** Publicable, pero reescribe puntos débiles.
*   🟠 **NARANJA (16-14 sí):** No publiques. Reescribe 2 niveles.
*   🔴 **ROJO (13 o menos sí):** No publiques. Vuelve al Módulo 1.

## 3. Simulación de cerebro del lector
1.  **0-3s:** "¿Esto es para mí?"
2.  **3-30s:** "¿Me identifico?"
3.  **30s-2min:** "¿Y esto a mí qué?"
4.  **2-3min:** "¿Me está vendiendo algo?"
5.  **CTA:** "¿Vale la pena el siguiente paso?"
`
  }
];
