import { useMediaLayout } from 'use-media';
//types
import { fontSizeEnum } from '../redux/types/theme.type';

function useMedia(): fontSizeEnum {
  const small = useMediaLayout({ maxWidth: '360px' });
  const medium = useMediaLayout({ maxWidth: '767px' });
  const hd = useMediaLayout({ maxWidth: '1376px' });
  return small ? 'small' : medium ? 'medium' : hd ? 'hd' : 'fhd';
}

export default useMedia;
