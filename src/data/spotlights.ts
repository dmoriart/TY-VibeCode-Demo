export interface Spotlight {
  id: string;
  name: string;
  photo: string;
  field: string;
  biography: string;
  quote: string;
  featured?: boolean;
}

export const spotlights: Spotlight[] = [
  {
    id: "katherine-johnson",
    name: "Katherine Johnson",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/440px-Katherine_Johnson_1983.jpg",
    field: "Mathematics & Space Science",
    biography:
      "Katherine Johnson was a pioneering mathematician at NASA whose orbital mechanics calculations were critical to the success of the first U.S. crewed spaceflights. Her work on trajectory analysis for the Mercury and Apollo programs—including the Apollo 11 Moon landing—made her one of the most important figures in the history of space exploration. She was awarded the Presidential Medal of Freedom in 2015.",
    quote:
      "Like what you do, and then you will do your best.",
    featured: true,
  },
  {
    id: "marie-curie",
    name: "Marie Curie",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marie_Curie_c._1920s.jpg/440px-Marie_Curie_c._1920s.jpg",
    field: "Physics & Chemistry",
    biography:
      "Marie Curie was a Polish-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize, the only person to win Nobel Prizes in two different sciences (Physics in 1903 and Chemistry in 1911), and the first woman to become a professor at the University of Paris. Her discoveries of polonium and radium transformed our understanding of atomic science.",
    quote:
      "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
  },
  {
    id: "grace-hopper",
    name: "Grace Hopper",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg/440px-Commodore_Grace_M._Hopper%2C_USN_%28covered%29.jpg",
    field: "Computer Science",
    biography:
      "Rear Admiral Grace Hopper was a trailblazing computer scientist and U.S. Navy officer who developed the first compiler for a computer programming language and conceptualized machine-independent programming languages. She popularized the idea of machine-independent programming, which led to the development of COBOL, one of the first high-level programming languages still in use today. She was awarded the Presidential Medal of Freedom posthumously in 2016.",
    quote:
      "The most dangerous phrase in the language is: 'We've always done it this way.'",
  },
  {
    id: "mae-jemison",
    name: "Mae C. Jemison",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Mae_C._Jemison.jpg/440px-Mae_C._Jemison.jpg",
    field: "Aerospace Engineering & Medicine",
    biography:
      "Mae C. Jemison is an American engineer, physician, and former NASA astronaut. On September 12, 1992, she became the first African American woman to travel to space when she flew aboard the Space Shuttle Endeavour. She holds a degree in chemical engineering from Stanford and a Doctor of Medicine from Cornell University. After NASA, she founded a technology research company and has advocated tirelessly for science education.",
    quote:
      "Don't let anyone rob you of your imagination, your creativity, or your curiosity.",
  },
  {
    id: "rosalind-franklin",
    name: "Rosalind Franklin",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Rosalind_Franklin_%281920-1958%29.jpg/440px-Rosalind_Franklin_%281920-1958%29.jpg",
    field: "Molecular Biology & Chemistry",
    biography:
      "Rosalind Franklin was a British chemist and X-ray crystallographer whose work was central to the understanding of the molecular structures of DNA, RNA, viruses, coal, and graphite. Her X-ray diffraction images of DNA—particularly Photo 51—provided crucial evidence that DNA has a double helix structure. Despite her fundamental contributions, her role was overlooked during her lifetime; today she is widely celebrated as a scientific pioneer.",
    quote:
      "Science and everyday life cannot and should not be separated.",
  },
  {
    id: "ada-lovelace",
    name: "Ada Lovelace",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/440px-Ada_Lovelace_portrait.jpg",
    field: "Mathematics & Computing",
    biography:
      "Ada Lovelace was a 19th-century English mathematician often regarded as the world's first computer programmer. She worked with Charles Babbage on his proposed mechanical general-purpose computer, the Analytical Engine, and wrote what is recognized as the first algorithm intended for a machine to carry out. Her visionary notes went far beyond Babbage's own thinking, anticipating capabilities like music composition and complex computation.",
    quote:
      "That brain of mine is something more than merely mortal, as time will show.",
  },
];
