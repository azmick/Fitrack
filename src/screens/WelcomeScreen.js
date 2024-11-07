import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // 3 görsel arasında döner
          return 0;
        }
        return prevProgress + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  const getHeaderAndSubText = () => {
    switch (activeIndex) {
      case 0:
        return {
          header: 'İdmanını Oluştur',
          subText: 'Kendi antrenmanlarını sıfırdan oluştur ve hedeflerine uygun programlar tasarla.',
        };
      case 1:
        return {
          header: 'Hareketlerini Seç',
          subText: 'En sevdiğin egzersiz hareketlerini seçerek antrenmanına ekle.',
        };
      case 2:
        return {
          header: 'Takibini Gerçekleştir',
          subText: 'Gelişimini takip et ve hedeflerine ulaşmak için kendini motive et.',
        };
      default:
        return {};
    }
  };

  const { header, subText } = getHeaderAndSubText();

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress / 3}%`, left: `${(activeIndex * 100) / 3}%` }]} />
      </View>

      <Text style={styles.header}>{header}</Text>
      <Text style={styles.subText}>{subText}</Text>

      <Swiper
        showsButtons={false}
        loop={false}
        index={activeIndex}
        showsPagination={false}
        scrollEnabled={false} // Kullanıcı kaydırmasını devre dışı bırakır
        style={styles.swiper} // Swiper'ı tam ekran genişlet
      >
        <View style={styles.slide}>
          <Image source={require('../assets/create-workout.webp')} style={styles.fullImage} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../assets/select-movements.webp')} style={styles.fullImage} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../assets/track-progress.webp')} style={styles.fullImage} />
        </View>
      </Swiper>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Üye Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: '#ccc',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    position: 'absolute',
  },
  header: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  swiper: {
    height: height * 0.5, // Swiper'ın yüksekliğini tam ekran kaplayacak şekilde ayarlıyoruz
  },
  slide: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Görselin ekranı tamamen kaplaması için
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
