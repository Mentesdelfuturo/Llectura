// Cuentos, páginas de lectura y preguntas. "answer" es la posición (0, 1, 2) de la respuesta correcta.
window.STORIES = [
  {
    n: 1, title: "El dragón de fuego", color: "#2E9E5B", cover: "bruno_full",
    pages: [
      { img: "bruno_full", alt: "El dragón verde Bruno sentado en su cueva, soplando humo de colores, y un patito amarillo que baila.",
        paras: ["En una gran cueva vive un dragón verde. Su nombre es <b>Bruno</b>.", "Bruno es un dragón muy amigable."] },
      { img: "bruno_dragon", alt: "Bruno sopla humo de colores con forma de corazones y estrellas.",
        paras: ["No bota fuego, <b>bota humo de colores</b>.", "Un día, un pequeño pato se acerca y dice:", "<i>— Hola, amigo dragón.</i>"] },
      { img: "bruno_pato", alt: "El patito amarillo salta de alegría junto al dragón Bruno.",
        paras: ["Bruno se pone feliz y sopla humo de color <b>azul y rojo</b>.", "El pato salta de alegría.", "¡Y juegan juntos todo el día!"], fin: true }
    ],
    quiz: [
      { q: "¿De qué color es el dragón Bruno?", options: ["Rojo", "Verde", "Azul"], answer: 1 },
      { q: "¿Qué sale de la boca de Bruno?", options: ["Fuego", "Agua", "Humo de colores"], answer: 2 },
      { q: "¿Quién vino a jugar con Bruno?", options: ["Un patito", "Un perro", "Un gato"], answer: 0 }
    ]
  },
  {
    n: 2, title: "Mi gato Pipo y la rana", color: "#1E88E5", cover: "pipo_full",
    pages: [
      { img: "pipo_gato", sub: "Mi gato Pipo", alt: "Un gatito naranja llamado Pipo toma leche de un plato.",
        paras: ["Mi gato se llama <b>Pipo</b>.", "Pipo toma leche y&nbsp;come&nbsp;pan.", "¡Pipo es mi amigo!"] },
      { img: "pipo_rana", sub: "La rana verde", alt: "Una rana verde salta cerca de un estanque.",
        paras: ["Salta, rana, salta.", "Salta en el agua.", "La rana es <b>verde</b>.", "Adiós, rana, adiós."] }
    ],
    quiz: [
      { q: "¿Cómo se llama el gato del cuento?", options: ["Pipo", "Bruno", "Lía"], answer: 0 },
      { q: "¿Qué toma el gato Pipo?", options: ["Jugo", "Leche", "Agua"], answer: 1 },
      { q: "¿De qué color es la rana que salta?", options: ["Amarilla", "Azul", "Verde"], answer: 2 }
    ]
  },
  {
    n: 3, title: "El hada de la flor", color: "#9B5DE5", cover: "lia_full",
    pages: [
      { img: "lia_full", alt: "El hada Lía con vestido rosa y una varita de estrella, en un jardín florido junto a un ratón gris.",
        paras: ["En un lindo jardín vive una pequeña hada llamada <b>Lía</b>.", "Lía usa un vestido de color <b>rosa</b> y su varita es una <b>estrella de plata</b>."] },
      { img: "lia_raton", alt: "Un ratón gris mira hacia arriba con ganas de beber.",
        paras: ["Un día, un lindo ratón gris la saluda:", "<i>— Hola, hada Lía. El ratón tiene sed.</i>"] },
      { img: "lia_hada", alt: "El hada Lía hace aparecer una gota de agua con su varita.",
        paras: ["Lía usa su varita y crea una <b>gota de agua</b>. El ratón bebe feliz.", "Y el hada sonríe muy contenta."], fin: true }
    ],
    quiz: [
      { q: "¿De qué color es el vestido del hada Lía?", options: ["Azul", "Rosa", "Amarillo"], answer: 1 },
      { q: "¿Cómo es la varita mágica de Lía?", options: ["Una estrella de plata", "Una flor de oro", "Un palito de madera"], answer: 0 },
      { q: "¿Qué necesitaba el ratoncito gris?", options: ["Comida", "Agua porque tenía sed", "Un abrigo"], answer: 1 }
    ]
  },
  {
    n: 4, title: "El oso goloso y la luna", color: "#F28C28", cover: "oso_oso",
    pages: [
      { img: "oso_oso", sub: "El oso goloso", alt: "Un oso pardo come miel de un frasco en el bosque, con un zorro y un erizo.",
        paras: ["El oso de la selva busca <b>miel</b> y come <b>avena</b>.", "El oso goloso duerme muy contento y hermoso."] },
      { img: "oso_luna", sub: "La luna brillante", alt: "Una luna sonriente brilla sobre el mar, con peces que saltan.",
        paras: ["La luna brilla en el mar, los peces quieren cantar.", "La noche ya llegó, la estrella nos saludó."] }
    ],
    quiz: [
      { q: "¿Qué busca y come el oso goloso?", options: ["Miel y avena", "Peces y frutas", "Pan y queso"], answer: 0 },
      { q: "¿Dónde brilla la luna por la noche?", options: ["En el mar", "En la cueva", "En la montaña"], answer: 0 },
      { q: "¿Qué quieren hacer los peces de noche?", options: ["Dormir", "Cantar", "Correr"], answer: 1 }
    ]
  }
];

window.STORIES.forEach(function (s) { s.level = "intermedio"; });
window.STORIES.push(
{ n: 5, level: "avanzado", title: "El patito feo", emoji: "🦢", color: "#2A8F83",
  pages: [
    { paras: ["Era verano en el campo. Entre los trigales dorados, una pata empollaba sus huevos con paciencia. Uno a uno se rompieron los cascarones y salieron sus patitos, pequeños y amarillos. Solo el huevo más grande tardó en abrirse.", "Cuando por fin se rompió, apareció un polluelo grande, gris y desgarbado. «Qué patito tan raro», murmuraron los animales del corral."] },
    { paras: ["Desde ese día, todos lo rechazaron. Las gallinas lo picoteaban, los patos lo empujaban y hasta sus hermanos se burlaban de él. Triste y avergonzado, el patito decidió escapar una madrugada.", "Llegó a una laguna donde vivían unos patos salvajes. Ellos lo miraron con extrañeza, pero no le hicieron daño. Sin embargo, el miedo regresó pronto: unos cazadores llegaron con sus perros y el patito tuvo que huir de nuevo."] },
    { paras: ["Pasó el otoño y llegó un invierno helado. El patito sobrevivió escondido entre los juncos, con hambre y frío. Una vez quedó atrapado en el hielo del estanque; un campesino lo rescató y lo llevó a su casa, pero el patito se asustó con los niños y salió corriendo otra vez.", "Cuando por fin llegó la primavera, el sol derritió el hielo. Al sentir el calor, el patito abrió sus alas y descubrió que eran fuertes y anchas."] },
    { paras: ["Voló hasta un estanque donde nadaban tres cisnes blancos y elegantes. «Me atacarán, pero prefiero que me maten ellos a seguir sufriendo», pensó. Bajó la cabeza y vio su reflejo en el agua.", "Ya no era un pato torpe y gris: era un hermoso cisne. Los otros cisnes lo recibieron con cariño y los niños gritaron: «¡Hay un cisne nuevo, el más bello de todos!». El cisne, feliz, comprendió que nunca había sido feo: solo estaba en el lugar equivocado."], fin: true }
  ],
  quiz: [
    { q: "¿Por qué los animales del corral rechazaron al patito?", options: ["Porque era muy ruidoso", "Porque era distinto a los demás", "Porque quería robar comida"], answer: 1 },
    { q: "¿Qué sucedió cuando llegó el invierno?", options: ["Se quedó con los patos salvajes", "Volvió con su madre", "Sufrió hambre y frío escondido entre los juncos"], answer: 2 },
    { q: "¿Qué descubrió el patito al mirar su reflejo?", options: ["Que se había convertido en un cisne", "Que seguía siendo gris", "Que tenía las alas rotas"], answer: 0 },
    { q: "¿Cuál es la enseñanza principal del cuento?", options: ["Hay que huir cuando algo nos da miedo", "Nuestro valor no depende de cómo nos vean los demás", "El invierno es la mejor estación"], answer: 1 }
  ] },
{ n: 6, level: "avanzado", title: "Caperucita Roja", emoji: "🐺", color: "#C8283A",
  pages: [
    { paras: ["Había una vez una niña a quien todos querían, sobre todo su abuela, que le regaló una capa roja con capucha. Desde entonces, en el pueblo la llamaban Caperucita Roja.", "Un día su madre le dijo: «Tu abuela está enferma. Lleva esta canasta con pan y miel, y no te desvíes del camino ni hables con extraños». Caperucita prometió obedecer y salió hacia el bosque."] },
    { paras: ["A mitad del sendero se encontró con un lobo. Muy amable, él le preguntó adónde iba. Caperucita, confiada, le contó todo: que iba a casa de su abuela, al otro lado del bosque.", "El lobo sonrió con astucia. «¿Por qué no recoges unas flores para ella?», sugirió. Mientras la niña se distraía entre las flores, el lobo corrió por un atajo hasta la casa de la abuela."] },
    { paras: ["Llegó, tocó la puerta y fingió la voz de Caperucita. La abuela abrió y el lobo la encerró en un armario. Luego se puso su camisón y su gorro, y se metió en la cama.", "Cuando Caperucita llegó, notó algo extraño. «Abuela, ¡qué ojos tan grandes tienes!». «Son para verte mejor». «¡Y qué orejas tan grandes!». «Para oírte mejor». «¡Y qué dientes tan grandes!». «¡Para comerte mejor!»."] },
    { paras: ["El lobo saltó de la cama, pero Caperucita gritó con todas sus fuerzas. Un leñador que pasaba cerca oyó el alboroto, entró corriendo y ahuyentó al lobo, que escapó del bosque para siempre.", "El leñador liberó a la abuela, asustada pero sana. Caperucita la abrazó y comprendió la lección: nunca más desobedecería ni confiaría en un desconocido."], fin: true }
  ],
  quiz: [
    { q: "¿Qué le pidió la madre a Caperucita antes de salir?", options: ["Que no se desviara del camino ni hablara con extraños", "Que volviera antes del mediodía", "Que invitara al lobo a comer"], answer: 0 },
    { q: "¿Por qué el lobo sugirió recoger flores?", options: ["Porque quería regalárselas a la abuela", "Para distraer a Caperucita y ganar tiempo", "Porque le gustaban mucho las flores"], answer: 1 },
    { q: "¿Qué hizo el lobo al llegar a la casa de la abuela?", options: ["Se fue sin entrar", "Se hizo amigo de ella", "La encerró en un armario y se puso su camisón"], answer: 2 },
    { q: "En la frase «el lobo sonrió con astucia», la palabra «astucia» significa:", options: ["Habilidad para engañar", "Mucha alegría", "Gran cansancio"], answer: 0 }
  ] }
);
