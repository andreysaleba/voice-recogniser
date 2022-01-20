import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  bar: {
    width: 237,
    height: 5,
    backgroundColor: '#707070',
    borderRadius: 6,
    marginTop: 10,
  },
  progress: {
    width: 60,
    height: 5,
    backgroundColor: '#40CC1D',
    borderRadius: 6,
    marginTop: 10,
    position: 'absolute',
  },
});
