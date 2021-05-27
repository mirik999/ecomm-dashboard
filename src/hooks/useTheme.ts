import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//utils
import { getFromLocalStorage } from '../utils/storage.utils';
//actions
import { themeToDark, themeToLight } from '../redux/slices/theme.slice';
//type
import { RootState } from '../redux/store';

const rsLightCss =
  'https://cdnjs.cloudflare.com/ajax/libs/rsuite/4.9.3/styles/rsuite-default.min.css';
const rsDarkCss =
  'https://cdnjs.cloudflare.com/ajax/libs/rsuite/4.9.3/styles/rsuite-dark.min.css';

function useTheme() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state);

  useEffect(() => {
    const locTheme = getFromLocalStorage('theme');
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      if (!locTheme) {
        require('rsuite/dist/styles/rsuite-dark.css');
        dispatch(themeToDark());
      }
    }

    if (locTheme === 'dark') {
      require('rsuite/dist/styles/rsuite-dark.css');
      dispatch(themeToDark());
    }

    if (locTheme === 'light') {
      require('rsuite/dist/styles/rsuite-default.css');
      dispatch(themeToLight());
    }
  }, []);

  return theme.name === 'dark' ? rsDarkCss : rsLightCss;
}

export default useTheme;
