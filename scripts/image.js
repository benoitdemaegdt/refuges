const lqip = require('lqip');

const file = `https://res.cloudinary.com/monpetitsommet/image/upload/v1604305406/vercors/randonnees/traversee-vercors-balcon-est/intro_xhbx3y.png`;

lqip.base64(file).then(res => {
  console.log('low quality image placeholder');
  console.log(res);
});
