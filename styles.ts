import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  icon: {
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: 50,
    borderRadius: 10,
  },
  center: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
    height: '100%',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 5,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: 'center',
    color: '#B0171F',
  },
  linearGradient: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    paddingBottom: 30,
    bottom: 0,
    width: '100%',
    height: '30%',
  },
});
