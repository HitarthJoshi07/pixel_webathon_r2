const totalFrames1 = 91;
const base = import.meta.env.BASE_URL; 

const frames = [];

for (let i = 1; i <= totalFrames1; i++) {
  frames.push(`${base}/images/1/ezgif-frame-${String(i).padStart(3, '0')}.jpg`);
}



export default frames;
