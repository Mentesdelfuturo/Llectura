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
