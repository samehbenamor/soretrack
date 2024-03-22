import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Itim: require('./fonts/Itim-Regular.ttf'),
    Sed: require('./fonts/SedgwickAve-Regular.ttf'),
    Ink: require('./fonts/InknutAntiqua-Regular.ttf'),
    Inter: require('./fonts/Inter-Regular.ttf'),
  });

  return fontsLoaded;
};

export default useCustomFonts;