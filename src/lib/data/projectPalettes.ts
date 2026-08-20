export type ProjectPalette = {
  background: string;
  accent: string;
  stroke: string;
  text: string;
  rotation: number;
  depth: number;
  /** tile width in px (horizontal scroll grid) */
  w: number;
  /** tile height in px */
  h: number;
  /** vertical offset to create scattered/staggered feel */
  offsetY: number;
};

export const projectPalettes: ProjectPalette[] = [
  {
    background: '#F6C452',
    accent: '#F3A720',
    stroke: '#C27709',
    text: '#593102',
    rotation: -4,
    depth: 80,
    w: 180,
    h: 190,
    offsetY: 80,
  },
  {
    background: '#F08B2C',
    accent: '#FB9D4A',
    stroke: '#B55605',
    text: '#4B1F00',
    rotation: 3,
    depth: 40,
    w: 210,
    h: 230,
    offsetY: 0,
  },
  {
    background: '#C99DFF',
    accent: '#B27BFF',
    stroke: '#6D41C3',
    text: '#2F165C',
    rotation: -2,
    depth: 120,
    w: 160,
    h: 170,
    offsetY: 140,
  },
  {
    background: '#8E6BE0',
    accent: '#7451C8',
    stroke: '#3D1E86',
    text: '#F5F2FF',
    rotation: 1,
    depth: 60,
    w: 220,
    h: 250,
    offsetY: 20,
  },
  {
    background: '#F5B7D7',
    accent: '#F09BC6',
    stroke: '#B75686',
    text: '#4B1D35',
    rotation: 5,
    depth: 100,
    w: 180,
    h: 195,
    offsetY: 100,
  },
  {
    background: '#FDB089',
    accent: '#F78C5C',
    stroke: '#C95A1E',
    text: '#48210A',
    rotation: -3,
    depth: 30,
    w: 200,
    h: 215,
    offsetY: 0,
  },
  {
    background: '#FFD47D',
    accent: '#F7B647',
    stroke: '#C5820D',
    text: '#4E2A02',
    rotation: 2,
    depth: 150,
    w: 170,
    h: 180,
    offsetY: 120,
  },
];
