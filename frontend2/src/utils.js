import logo_psoe from './images/logo_psoe.png';
import logo_pp from './images/logo_pp.png';
import logo_podemos from './images/logo_podemos.png';
import logo_ciudadanos from './images/logo_ciudadanos.png';
import logo_vox from './images/logo_vox.png';

export const getPartidoImage = (partido) => {
  switch (partido) {
    case 'psoe':
      return logo_psoe;
    case 'pp':
      return logo_pp;
    case 'podemos':
      return logo_podemos;
    case 'ciudadanos':
      return logo_ciudadanos;
    case 'vox':
      return logo_vox;
    default:
      return null;
  }
};
