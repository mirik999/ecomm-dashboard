import { useMediaLayout } from 'use-media';
//types
import { fontSizeEnum } from '../redux/types/theme.type';

function useMedia() {
  const small = useMediaLayout({ maxWidth: '360px' });
  const medium = useMediaLayout({ maxWidth: '767px' });
  const hd = useMediaLayout({ maxWidth: '1376px' });
  const fontSize: fontSizeEnum = small
    ? 'small'
    : medium
    ? 'medium'
    : hd
    ? 'hd'
    : 'fhd';

  return fontSize;
}

export default useMedia;
