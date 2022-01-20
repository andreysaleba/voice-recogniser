import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

// import all the components we are going to use

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import Voice
import Voice from '@react-native-voice/voice';
import Header from './app/Header';
import QuestionModal from './app/QuestionModal';
import MicIcon from './app/MicIcon';

const PHRASE = 'La estamos haciendo muy bien.';
const PHRASE_TRANSLATE = 'We are doing very well.';

const App = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    console.log(results, results.join('') === PHRASE);
    if (results.join('') === PHRASE) {
      setResults([]);
      setDone(true);
    }
  }, [results]);

  useEffect(() => {
    setDone(false);
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      (async () => {
        //destroy the process after switching the screen
        await Voice.destroy();
        await Voice.removeAllListeners();
      })();
    };
  }, []);

  const onSpeechStart = (e: any) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = (e: any) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = (e: any) => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: any) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechVolumeChanged = (e: any) => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    console.log('startRecognizing');
    try {
      await Voice.start('es-US');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await destroyRecognizer();
    })();
  }, [done]);

  useEffect(() => {
    // console.log({error}, 'useEffect');
    if (error) {
      (async () => {
        // console.log('start restart')
        await destroyRecognizer();
        await startRecognizing();
      })();
    }
  }, [error]);

  const color = () => {
    if (done) {
      return 'green';
    }
    if (started) {
      return '#0046e2';
    }
    return 'transparent';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('./images/img.png')}>
        <LinearGradient
          colors={['transparent', color()]}
          style={styles.linearGradient}>
          {!!started && !done && (
            <Image source={require('./images/equalizer.png')} />
          )}
        </LinearGradient>
        <Header />
        <View style={styles.center}>
          <QuestionModal />
          <View style={{alignItems: 'center', flex: 0.6}}>
            {/*<View style={styles.headerContainer}>*/}
            {/*  <Text*/}
            {/*    style={styles.textWithSpaceStyle}>{`Started: ${started}`}</Text>*/}
            {/*  <Text style={styles.textWithSpaceStyle}>{`End: ${end}`}</Text>*/}
            {/*</View>*/}
            {/*<View style={styles.headerContainer}>*/}
            {/*  <Text*/}
            {/*    style={styles.textWithSpaceStyle}>{`Pitch: \n ${pitch}`}</Text>*/}
            {/*  <Text*/}
            {/*    style={styles.textWithSpaceStyle}>{`Error: \n ${error}`}</Text>*/}
            {/*</View>*/}
            {/*<Text style={{color: 'black'}}>Results</Text>*/}
            {/*<ScrollView>*/}
            {/*  {results.map((result, index) => (*/}
            {/*    <Text key={`result-${index}`} style={{color: '#0000FF'}}>*/}
            {/*      {result}*/}
            {/*    </Text>*/}
            {/*  ))}*/}
            {/*</ScrollView>*/}
          </View>
          <View
            style={{
              width: '90%',
              height: 126,
              backgroundColor: 'white',
              borderRadius: 12,
              alignItems: 'center',
            }}>
            <View style={{position: 'absolute', right: 10, top: 10}}>
              <Icon
                name={'bookmark'}
                type={'feather'}
                size={20}
                color="#CBCBCB"
                tvParallaxProperties={undefined}
              />
            </View>
            <Image
              style={{
                width: 15,
                height: 15,
                position: 'absolute',
                left: 20,
                top: 39,
              }}
              source={require('./images/speaker.png')}
            />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                color: done ? 'green' : 'black',
                fontSize: 18,
                paddingTop: 35,
              }}>
              {PHRASE}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '400',
                color: done ? 'green' : 'black',
                fontSize: 13,
                paddingTop: 8,
              }}>
              {PHRASE_TRANSLATE}
            </Text>
            {results.map((result, index) => (
              <Text key={`result-${index}`} style={{color: '#0000FF'}}>
                {result}
              </Text>
            ))}
            {!started && !done && (
              <TouchableHighlight onPress={startRecognizing}>
                <MicIcon />
              </TouchableHighlight>
            )}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingBottom: 30,
            position: 'absolute',
            alignItems: 'center',
            bottom: 0,
          }}>
          {done && (
            <TouchableHighlight
              onPress={() => {
                console.log(34444444);
                setDone(false);
              }}
              style={{
                maxWidth: 250,
                backgroundColor: 'black',
                borderRadius: 20,
                paddingVertical: 15,
                paddingHorizontal: 40,
              }}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.horizontalView}>
          <TouchableHighlight
            onPress={stopRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Stop</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={cancelRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={destroyRecognizer}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Destroy</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;
