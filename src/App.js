import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Torch from 'react-native-torch';
import Shake from 'react-native-shake';

import darkLamp from './assets/eco-light-off.png';
import lightLamp from './assets/eco-light.png';
import lightDio from './assets/logo-dio.png';
import darkDio from './assets/logo-dio-white.png';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkTheme ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const handleChangeDark = useCallback(() => {
    setIsDarkTheme(prev => {
      Torch.switchState(!prev);
      return !prev;
    });
  }, []);

  useEffect(() => {
    const subscription = Shake.addListener(handleChangeDark);
    return () => subscription.remove();
  }, [handleChangeDark]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Pressable style={style.content} onPress={handleChangeDark}>
        <Image
          style={isDarkTheme ? style.imageDark : style.imageLight}
          source={isDarkTheme ? darkLamp : lightLamp}
        />
        <Image
          style={style.imageDio}
          source={isDarkTheme ? darkDio : lightDio}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageDark: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    tintColor: '#dbdde6',
  },
  imageLight: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  imageDio: {
    width: 200,
    height: 170,
    resizeMode: 'contain',
  },
});

export default App;
