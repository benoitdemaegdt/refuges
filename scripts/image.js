const lqip = require('lqip');

const file = `https://res.cloudinary.com/monpetitsommet/image/upload/v1603218023/bauges/randonnees/traversee-bauges-frontenex-annecy/step_7_iostyt.jpg`;

lqip.base64(file).then(res => {
  console.log('low quality image placeholder');
  console.log(res);
});
