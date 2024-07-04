import logo_psoe from '../public/images/logo_psoe.svg';
import logo_pp from '../public/images/logo_pp.svg';
import logo_podemos from '../public/images/logo_podemos.svg';
import logo_ciudadanos from '../public/images/logo_ciudadanos.svg';
import logo_vox from '../public/images/logo_vox.svg';

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
